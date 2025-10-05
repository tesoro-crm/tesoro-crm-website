/* eslint-env node */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { parse as parseYaml } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const DEFAULT_EXPORT_PATH = path.join(ROOT_DIR, 'project-tracker', 'github-export', 'github-export.yaml');
const DEFAULT_REPOSITORY = 'tesoro-crm/tesoro-crm-website';

const { console } = globalThis;
const { process } = globalThis;

/**
 * @param {string[]} args
 * @param {{input?: string, quiet?: boolean}} options
 */
async function runGh(args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn('gh', args, {
      stdio: ['pipe', 'pipe', 'inherit'],
    });

    let output = '';
    if (!options.quiet) {
      child.stdout.on('data', (chunk) => {
        output += chunk.toString();
      });
    } else {
      child.stdout.resume();
    }

    child.on('error', (error) => reject(error));
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`gh ${args.join(' ')} exited with code ${code}`));
        return;
      }
      resolve(output.trim());
    });

    if (options.input) {
      child.stdin.write(options.input);
    }
    child.stdin.end();
  });
}

/**
 * @param {string[]} args
 */
async function runGhJson(args) {
  const raw = await runGh([...args, '--output', 'json'], { quiet: true });
  if (!raw) return undefined;
  return JSON.parse(raw);
}

function parseArgs() {
  const argv = process.argv.slice(2);
  const flags = new Map();
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--dry-run') {
      flags.set('dryRun', true);
    } else if (arg === '--file') {
      flags.set('file', argv[i + 1]);
      i += 1;
    } else if (arg.startsWith('--file=')) {
      flags.set('file', arg.split('=')[1]);
    }
  }
  return {
    dryRun: flags.get('dryRun') ?? false,
    file: flags.get('file') ?? DEFAULT_EXPORT_PATH,
  };
}

function ensureIsoDate(value) {
  if (!value) return null;
  if (/T/.test(value)) {
    return value;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return `${value}T00:00:00Z`;
  }
  return value;
}

function mapMilestoneState(value) {
  if (!value) return 'open';
  switch (value.toLowerCase()) {
    case 'done':
    case 'closed':
      return 'closed';
    default:
      return 'open';
  }
}

function hashToColor(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = ((hash << 5) - hash) + input.charCodeAt(i);
    hash |= 0;
  }
  const color = (hash >>> 0).toString(16).padStart(6, '0');
  return color.slice(0, 6);
}

function sanitizeLabels(labels) {
  return [...new Set(labels.filter(Boolean))];
}

function buildIssueBody(issue, lookupParentNumber) {
  const sections = [];
  if (issue.body) {
    sections.push(issue.body.trim());
  }
  const metaLines = [];
  metaLines.push(`**Original ID:** ${issue.id}`);
  metaLines.push(`**Type:** ${issue.type}`);
  metaLines.push(`**Epic:** ${issue.milestone}`);
  if (issue.directory) {
    metaLines.push(`**Source:** ${issue.directory}`);
  }
  if (issue.parent) {
    const parentNumber = lookupParentNumber(issue.parent);
    if (parentNumber) {
      metaLines.push(`**Parent Story:** #${parentNumber}`);
    } else {
      metaLines.push(`**Parent Story:** ${issue.parent}`);
    }
  }
  if (issue.meta?.sprint) {
    metaLines.push(`**Sprint:** ${issue.meta.sprint}`);
  }
  sections.push(metaLines.join('  \n'));
  return sections.join('\n\n---\n\n');
}

async function loadYaml(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  return parseYaml(content);
}

async function fetchExistingMilestones(repo) {
  try {
    const milestones = await runGhJson(['api', `repos/${repo}/milestones`, '--paginate']);
    if (!Array.isArray(milestones)) return new Map();
    return new Map(milestones.map((item) => [item.title, item]));
  } catch (error) {
    console.warn('[import-project-tracker] Kon bestaande milestones niet ophalen:', error.message);
    return new Map();
  }
}

async function fetchExistingLabels(repo) {
  try {
    const labels = await runGhJson(['api', `repos/${repo}/labels`, '--paginate', '--per-page', '100']);
    if (!Array.isArray(labels)) return new Map();
    return new Map(labels.map((item) => [item.name, item]));
  } catch (error) {
    console.warn('[import-project-tracker] Kon bestaande labels niet ophalen:', error.message);
    return new Map();
  }
}

async function fetchExistingIssues(repo) {
  try {
    const issues = await runGhJson(['issue', 'list', '--repo', repo, '--state', 'all', '--limit', '2000', '--json', 'number,title,labels']);
    if (!Array.isArray(issues)) return new Map();
    const map = new Map();
    for (const issue of issues) {
      const idLabel = issue.labels?.find((label) => label.name?.startsWith('id:'));
      if (idLabel?.name) {
        map.set(idLabel.name, issue);
      }
    }
    return map;
  } catch (error) {
    console.warn('[import-project-tracker] Kon bestaande issues niet ophalen:', error.message);
    return new Map();
  }
}

async function ensureMilestones(repo, milestones, existingMilestones, dryRun) {
  const result = new Map();
  for (const milestone of milestones) {
    const title = milestone.title;
    const existing = existingMilestones.get(title);
    if (existing) {
      console.log(`🔁 Milestone bestaat al: ${title}`);
      result.set(title, existing.number);
      continue;
    }

    if (dryRun) {
      console.log(`📝 [Dry Run] Milestone zou aangemaakt worden: ${title}`);
      result.set(title, null);
      continue;
    }

    const args = [
      'api',
      `repos/${repo}/milestones`,
      '--method', 'POST',
      '--field', `title=${title}`,
      '--field', `state=${mapMilestoneState(milestone.state)}`,
      '--field', `description=${milestone.description ?? ''}`,
    ];
    const due = ensureIsoDate(milestone.dueDate);
    if (due) {
      args.push('--field', `due_on=${due}`);
    }
    const created = await runGhJson([...args, '--silent']);
    const number = created?.number ?? null;
    console.log(`✅ Milestone aangemaakt: ${title}${number ? ` (#${number})` : ''}`);
    result.set(title, number);
  }
  return result;
}

async function ensureLabels(repo, issues, existingLabels, dryRun) {
  const desiredLabels = new Set();
  for (const issue of issues) {
    const labels = sanitizeLabels([...issue.labels, `id:${issue.id}`]);
    issue.labels = labels;
    labels.forEach((label) => desiredLabels.add(label));
  }

  for (const label of desiredLabels) {
    if (existingLabels.has(label)) continue;
    if (dryRun) {
      console.log(`📝 [Dry Run] Label zou aangemaakt worden: ${label}`);
      continue;
    }
    const color = hashToColor(label);
    await runGh(['api', `repos/${repo}/labels`, '--method', 'POST', '--field', `name=${label}`, '--field', `color=${color}`, '--field', 'description=Imported from project-tracker'], { quiet: true });
    console.log(`🏷️ Label aangemaakt: ${label}`);
  }
}

async function createIssues(repo, issues, milestonesLookup, existingIssues, dryRun) {
  const createdNumbers = new Map();

  const lookupParentNumber = (parentId) => {
    const idLabel = `id:${parentId}`;
    if (createdNumbers.has(parentId)) return createdNumbers.get(parentId);
    const existing = existingIssues.get(idLabel);
    return existing?.number ?? null;
  };

  for (const issue of issues) {
    const idLabel = `id:${issue.id}`;
    const existing = existingIssues.get(idLabel);
    if (existing) {
      console.log(`🔁 Issue bestaat al: ${issue.id} (#${existing.number})`);
      createdNumbers.set(issue.id, existing.number);
      continue;
    }

    const milestoneNumber = milestonesLookup.get(issue.milestone);
    const labels = sanitizeLabels([...issue.labels, idLabel]);
    const args = [
      'issue',
      'create',
      '--repo', repo,
      '--title', issue.title,
      '--body', buildIssueBody(issue, lookupParentNumber),
    ];
    if (milestoneNumber) {
      args.push('--milestone', String(milestoneNumber));
    } else {
      args.push('--milestone', issue.milestone);
    }
    labels.forEach((label) => {
      args.push('--label', label);
    });

    if (dryRun) {
      console.log(`📝 [Dry Run] Issue zou aangemaakt worden: ${issue.id}`);
      continue;
    }

    const created = await runGhJson([...args, '--json', 'number,url']);
    const number = created?.number;
    createdNumbers.set(issue.id, number ?? null);
    console.log(`✅ Issue aangemaakt: ${issue.id}${number ? ` (#${number})` : ''}`);
  }
}

async function main() {
  const { dryRun, file } = parseArgs();
  const exportPath = path.resolve(file);
  const yamlData = await loadYaml(exportPath);
  const repo = yamlData.repository ?? DEFAULT_REPOSITORY;

  console.log(`📦 Repo: ${repo}`);
  console.log(`📄 Export: ${exportPath}`);
  if (dryRun) {
    console.log('🚧 Dry run modus actief - er worden geen wijzigingen doorgevoerd.');
  }

  const milestones = yamlData.milestones ?? [];
  const issues = yamlData.issues ?? [];

  const existingMilestones = await fetchExistingMilestones(repo);
  const milestoneLookup = await ensureMilestones(repo, milestones, existingMilestones, dryRun);

  const existingLabels = await fetchExistingLabels(repo);
  await ensureLabels(repo, issues, existingLabels, dryRun);

  const existingIssues = await fetchExistingIssues(repo);
  await createIssues(repo, issues, milestoneLookup, existingIssues, dryRun);

  console.log('🎉 Import afgerond.');
}

main().catch((error) => {
  console.error('[import-project-tracker] Import mislukt:', error);
  process.exitCode = 1;
});

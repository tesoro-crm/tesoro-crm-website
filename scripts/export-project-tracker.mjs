/* eslint-env node */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml, stringify } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const EPICS_DIR = path.join(ROOT_DIR, 'project-tracker', 'epics');
const EXPORT_DIR = path.join(ROOT_DIR, 'project-tracker', 'github-export');

const DEFAULT_REPOSITORY = 'tesoro-crm/tesoro-crm-website';

const { console } = globalThis;
const { process } = globalThis;

/**
 * Parse Markdown with frontmatter.
 * @param {string} content
 * @returns {{frontmatter: Record<string, any>, body: string}}
 */
function parseFrontmatter(content) {
  const match = /^---\n([\s\S]+?)\n---\n?([\s\S]*)$/m.exec(content);
  if (!match) {
    return { frontmatter: {}, body: content.trim() };
  }
  const [, yamlSource, body] = match;
  const frontmatter = yamlParseSafe(yamlSource);
  return { frontmatter, body: body.trim() };
}

function yamlParseSafe(source) {
  try {
    const data = parseYaml(source);
    return data && typeof data === 'object' ? data : {};
  } catch (error) {
    console.warn('[export-project-tracker] Kon YAML niet parsen:', error.message);
    return {};
  }
}

/**
 * Maak een nette titel op basis van mapnaam of frontmatter.
 * @param {string} identifier
 * @param {string} dirName
 */
function buildTitle(identifier, dirName) {
  const slug = dirName.replace(new RegExp(`^${identifier.toLowerCase()}-?`, 'i'), '') || dirName;
  const words = slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return words.length ? `${identifier} · ${words.join(' ')}` : identifier;
}

/**
 * Maak label namen.
 * @param {Record<string, any>} fm
 * @param {string} type
 * @param {string} epicId
 */
function buildLabels(fm, type, epicId) {
  const labels = new Set();
  labels.add(type);
  labels.add(`epic:${epicId}`);
  if (fm.status) labels.add(`status:${fm.status}`);
  if (fm.priority) labels.add(`priority:${fm.priority}`);
  if (fm.sprint) labels.add(`sprint:${fm.sprint}`);
  if (fm.owner) labels.add(`owner:${fm.owner}`);
  (fm.labels ?? []).forEach((label) => {
    if (label) labels.add(label);
  });
  return [...labels];
}

async function collectEpics() {
  const items = await fs.readdir(EPICS_DIR, { withFileTypes: true });
  const epics = [];
  for (const item of items) {
    if (!item.isDirectory()) continue;
    const epicDir = path.join(EPICS_DIR, item.name);
    const epicFile = path.join(epicDir, 'epic.md');
    const epicMd = await readFileSafe(epicFile);
    if (!epicMd) {
      console.warn(`[export-project-tracker] epic.md ontbreekt in ${path.relative(ROOT_DIR, epicDir)}, overslaan.`);
      continue;
    }
    const { frontmatter, body } = parseFrontmatter(epicMd);
    const epicId = frontmatter.id ?? item.name.toUpperCase();
    const milestone = {
      id: epicId,
      title: frontmatter.titel ?? frontmatter.title ?? epicId,
      state: frontmatter.status ?? 'proposed',
      description: body,
      owner: frontmatter.eigenaar ?? frontmatter.owner ?? 'unassigned',
      startDate: frontmatter.startdatum ?? frontmatter.startDate ?? null,
      dueDate: normalizeDate(frontmatter.einddatum ?? frontmatter.dueDate),
      metrics: frontmatter['key-metrics'] ?? frontmatter.metrics ?? [],
      dependencies: frontmatter.afhankelijkheden ?? frontmatter.dependencies ?? [],
      directory: path.relative(ROOT_DIR, epicDir),
    };
    const stories = await collectStories(epicDir, epicId);
    epics.push({ milestone, stories });
  }
  return epics;
}

async function collectStories(epicDir, epicId) {
  const storiesDir = path.join(epicDir, 'backlog');
  const exists = await existsAsync(storiesDir);
  if (!exists) return [];

  const entries = await fs.readdir(storiesDir, { withFileTypes: true });
  const stories = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const storyDir = path.join(storiesDir, entry.name);
    const storyFile = path.join(storyDir, 'story.md');
    const storyContent = await readFileSafe(storyFile);
    if (!storyContent) {
      console.warn(`[export-project-tracker] story.md ontbreekt in ${path.relative(ROOT_DIR, storyDir)}, overslaan.`);
      continue;
    }
    const { frontmatter, body } = parseFrontmatter(storyContent);
    const storyId = frontmatter.id ?? entry.name.toUpperCase();
    const title = buildTitle(storyId, entry.name);
    const storyIssue = {
      id: storyId,
      type: 'story',
      title,
      milestone: epicId,
      labels: buildLabels(frontmatter, 'story', epicId),
      assignee: frontmatter.owner ?? null,
      meta: {
        sprint: frontmatter.sprint ?? null,
      },
      body,
      directory: path.relative(ROOT_DIR, storyDir),
    };
    const subIssues = await collectIssues(storyDir, storyId, epicId);
    stories.push({ story: storyIssue, subIssues });
  }
  return stories;
}

async function collectIssues(storyDir, storyId, epicId) {
  const issuesDir = path.join(storyDir, 'issues');
  const exists = await existsAsync(issuesDir);
  if (!exists) return [];
  const entries = await fs.readdir(issuesDir, { withFileTypes: true });
  const issues = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const issueDir = path.join(issuesDir, entry.name);
    const issueFile = path.join(issueDir, 'issue.md');
    const issueContent = await readFileSafe(issueFile);
    if (!issueContent) {
      console.warn(`[export-project-tracker] issue.md ontbreekt in ${path.relative(ROOT_DIR, issueDir)}, overslaan.`);
      continue;
    }
    const { frontmatter, body } = parseFrontmatter(issueContent);
    const issueId = frontmatter.id ?? entry.name.toUpperCase();
    const title = buildTitle(issueId, entry.name);
    issues.push({
      id: issueId,
      type: 'issue',
      title,
      milestone: epicId,
      parent: storyId,
      labels: buildLabels(frontmatter, 'issue', epicId),
      assignee: frontmatter.assignee ?? null,
      dueDate: frontmatter['due-date'] ?? null,
      body,
      directory: path.relative(ROOT_DIR, issueDir),
    });
  }
  return issues;
}

async function existsAsync(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readFileSafe(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

function normalizeDate(value) {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || /^tbd$/i.test(trimmed)) return null;
  return trimmed;
}

async function main() {
  const epics = await collectEpics();
  const exportPayload = {
    generatedAt: new Date().toISOString(),
    repository: process.env.GITHUB_REPOSITORY ?? DEFAULT_REPOSITORY,
    milestones: [],
    issues: [],
  };

  for (const epic of epics) {
    exportPayload.milestones.push(epic.milestone);
    for (const storyData of epic.stories) {
      exportPayload.issues.push(storyData.story);
      storyData.subIssues.forEach((issue) => exportPayload.issues.push(issue));
    }
  }

  await fs.mkdir(EXPORT_DIR, { recursive: true });
  const targetFile = path.join(EXPORT_DIR, 'github-export.yaml');
  const yamlContent = stringify(exportPayload);
  await fs.writeFile(targetFile, yamlContent, 'utf8');
  console.log(`[export-project-tracker] Export voltooid → ${path.relative(ROOT_DIR, targetFile)}`);
}

main().catch((error) => {
  console.error('[export-project-tracker] Export mislukt:', error);
  process.exitCode = 1;
});

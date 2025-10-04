import { promises as fs, Dirent } from "node:fs";
import { basename, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const projectRoot: string = fileURLToPath(new URL("../../", import.meta.url));
const trackerRoot: string = join(projectRoot, "project-tracker");
const epicsRoot: string = join(trackerRoot, "epics");
const execAsync = promisify(exec);

export interface IssueRecord {
  readonly id: string;
  readonly status: string;
  readonly path: string;
  readonly content?: string;
}

export interface StoryRecord {
  readonly id: string;
  readonly status: string;
  readonly path: string;
  readonly content?: string;
  readonly issues: readonly IssueRecord[];
}

export interface EpicRecord {
  readonly id: string;
  readonly title: string;
  readonly status: string;
  readonly path: string;
  readonly content?: string;
  readonly stories: readonly StoryRecord[];
}

export interface StatusSnapshot {
  readonly generatedAt: string;
  readonly branch: string;
  readonly epics: readonly EpicRecord[];
}

interface TrackerFrontMatter {
  readonly id?: string;
  readonly title?: string;
  readonly status?: string;
}

export async function loadStatusSnapshot(): Promise<StatusSnapshot> {
  const epics: readonly EpicRecord[] = await collectEpics(epicsRoot);
  const branch: string = await getCurrentBranch();
  return {
    generatedAt: new Date().toISOString(),
    branch,
    epics
  };
}

export function countStatuses(collection: readonly { readonly status: string }[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of collection) {
    const key: string = normalizeStatus(item.status);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

export function normalizeStatus(value: string | undefined): string {
  const normalized: string = (value ?? "todo").toLowerCase();
  if (normalized === "todo" || normalized === "in-progress" || normalized === "done" || normalized === "on-hold") {
    return normalized;
  }
  return "todo";
}

async function getCurrentBranch(): Promise<string> {
  try {
    const { stdout } = await execAsync("git rev-parse --abbrev-ref HEAD", { cwd: projectRoot });
    const branch: string = stdout.trim();
    return branch.length > 0 ? branch : "unknown";
  } catch {
    return "unknown";
  }
}

async function collectEpics(root: string): Promise<readonly EpicRecord[]> {
  const entries: readonly Dirent[] = await fs.readdir(root, { withFileTypes: true });
  const epics: EpicRecord[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const epicPath: string = join(root, entry.name);
    epics.push(await buildEpicRecord(epicPath));
  }
  return epics;
}

async function buildEpicRecord(epicPath: string): Promise<EpicRecord> {
  const epicFilePath = join(epicPath, "epic.md");
  const frontMatter: TrackerFrontMatter = await readFrontMatter(epicFilePath);
  let content = '';
  try {
    content = await fs.readFile(epicFilePath, 'utf-8');
  } catch {
    // File might not exist, that's ok
  }
  const stories: readonly StoryRecord[] = await collectStories(join(epicPath, "backlog"));
  const fallbackId: string = basename(epicPath);
  return {
    id: frontMatter.id ?? fallbackId,
    title: frontMatter.title ?? frontMatter.id ?? fallbackId,
    status: normalizeStatus(frontMatter.status),
    path: relative(projectRoot, epicPath),
    content,
    stories
  };
}

async function collectStories(backlogPath: string): Promise<readonly StoryRecord[]> {
  let entries: readonly Dirent[] = [];
  try {
    entries = await fs.readdir(backlogPath, { withFileTypes: true });
  } catch {
    return [];
  }
  const stories: StoryRecord[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const storyPath: string = join(backlogPath, entry.name);
    stories.push(await buildStoryRecord(storyPath));
  }
  return stories;
}

async function buildStoryRecord(storyPath: string): Promise<StoryRecord> {
  const storyFilePath = join(storyPath, "story.md");
  const frontMatter: TrackerFrontMatter = await readFrontMatter(storyFilePath);
  let content = '';
  try {
    content = await fs.readFile(storyFilePath, 'utf-8');
  } catch {
    // File might not exist, that's ok
  }
  const issues: readonly IssueRecord[] = await collectIssues(join(storyPath, "issues"));
  const fallbackId: string = basename(storyPath);
  return {
    id: frontMatter.id ?? fallbackId,
    status: normalizeStatus(frontMatter.status),
    path: relative(projectRoot, storyPath),
    content,
    issues
  };
}

async function collectIssues(issuesPath: string): Promise<readonly IssueRecord[]> {
  let entries: readonly Dirent[] = [];
  try {
    entries = await fs.readdir(issuesPath, { withFileTypes: true });
  } catch {
    return [];
  }
  const issues: IssueRecord[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const issueFilePath: string = join(issuesPath, entry.name, "issue.md");
    issues.push(await buildIssueRecord(issueFilePath));
  }
  return issues;
}

async function buildIssueRecord(issueFilePath: string): Promise<IssueRecord> {
  const frontMatter: TrackerFrontMatter = await readFrontMatter(issueFilePath);
  let content = '';
  try {
    content = await fs.readFile(issueFilePath, 'utf-8');
  } catch {
    // File might not exist, that's ok
  }
  const fallbackId: string = basename(join(issueFilePath, ".."));
  return {
    id: frontMatter.id ?? fallbackId,
    status: normalizeStatus(frontMatter.status),
    path: relative(projectRoot, issueFilePath),
    content
  };
}

async function readFrontMatter(filePath: string): Promise<TrackerFrontMatter> {
  try {
    const raw: string = await fs.readFile(filePath, "utf-8");
    return parseFrontMatter(raw);
  } catch {
    return {};
  }
}

function parseFrontMatter(content: string): TrackerFrontMatter {
  const result: Record<string, string> = {};
  const lines: readonly string[] = content.split("\n");
  let capturing: boolean = false;
  for (const line of lines) {
    const trimmed: string = line.trim();
    if (trimmed === "---") {
      capturing = !capturing;
      if (!capturing) {
        break;
      }
      continue;
    }
    if (!capturing || trimmed.length === 0 || trimmed.startsWith("-")) {
      continue;
    }
    const separatorIndex: number = trimmed.indexOf(":");
    if (separatorIndex <= 0) {
      continue;
    }
    const key: string = trimmed.slice(0, separatorIndex).trim();
    const value: string = trimmed.slice(separatorIndex + 1).trim().replace(/^"|"$/g, "");
    if (key.length > 0 && value.length > 0) {
      result[key] = value;
    }
  }
  return result;
}

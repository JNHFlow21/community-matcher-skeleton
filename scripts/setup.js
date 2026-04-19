#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const skillName = "community-matcher";
const agents = [".claude", ".codex", ".hermes"];
const files = [
  {
    category: "root",
    relative: "SKILL.md",
    source: `.matcher/skills/${skillName}/SKILL.md`,
    targetInAgent: `skills/${skillName}/SKILL.md`,
  },
  {
    category: "asset",
    relative: "assets/raw.md",
    source: `.matcher/skills/${skillName}/assets/raw.md`,
    targetInAgent: `skills/${skillName}/assets/raw.md`,
  },
  {
    category: "asset",
    relative: "assets/member.md",
    source: `.matcher/skills/${skillName}/assets/member.md`,
    targetInAgent: `skills/${skillName}/assets/member.md`,
  },
  {
    category: "asset",
    relative: "assets/match.md",
    source: `.matcher/skills/${skillName}/assets/match.md`,
    targetInAgent: `skills/${skillName}/assets/match.md`,
  },
  {
    category: "asset",
    relative: "assets/feishu-member-form.md",
    source: `.matcher/skills/${skillName}/assets/feishu-member-form.md`,
    targetInAgent: `skills/${skillName}/assets/feishu-member-form.md`,
  },
  {
    category: "reference",
    relative: "references/schema.md",
    source: `.matcher/skills/${skillName}/references/schema.md`,
    targetInAgent: `skills/${skillName}/references/schema.md`,
  },
  {
    category: "reference",
    relative: "references/quality-checklist.md",
    source: `.matcher/skills/${skillName}/references/quality-checklist.md`,
    targetInAgent: `skills/${skillName}/references/quality-checklist.md`,
  },
  {
    category: "script",
    relative: "scripts/lint.sh",
    source: `.matcher/skills/${skillName}/scripts/lint.sh`,
    targetInAgent: `skills/${skillName}/scripts/lint.sh`,
  },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function safeUnlink(target) {
  if (!fs.existsSync(target)) return;
  const stat = fs.lstatSync(target);
  if (stat.isDirectory() && !stat.isSymbolicLink()) {
    fs.rmSync(target, { recursive: true, force: true });
    return;
  }
  fs.rmSync(target, { force: true });
}

function sameFileContent(a, b) {
  if (!fs.existsSync(a) || !fs.existsSync(b)) return false;
  return fs.readFileSync(a, "utf8") === fs.readFileSync(b, "utf8");
}

function tryCreateSymbolicLink(sourceAbs, targetAbs) {
  const relativeTarget = path.relative(path.dirname(targetAbs), sourceAbs);
  fs.symlinkSync(relativeTarget, targetAbs);
  return { mode: "symlink" };
}

function tryCreateHardLink(sourceAbs, targetAbs) {
  fs.linkSync(sourceAbs, targetAbs);
  return { mode: "hardlink" };
}

function createLink(sourceAbs, targetAbs) {
  safeUnlink(targetAbs);
  ensureDir(path.dirname(targetAbs));

  try {
    return tryCreateSymbolicLink(sourceAbs, targetAbs);
  } catch (error) {
    if (process.platform !== "win32") throw error;
  }

  try {
    return tryCreateHardLink(sourceAbs, targetAbs);
  } catch (error) {
    throw new Error(`failed to create link for ${path.basename(targetAbs)}: ${error.message}`);
  }
}

function ensureGitKeep(dir) {
  const marker = path.join(dir, ".gitkeep");
  if (!fs.existsSync(marker)) {
    fs.writeFileSync(marker, "");
  }
}

function main() {
  console.log("Initializing community matcher skeleton...");

  for (const dir of ["raw", "members", "matches", "scripts", ".matcher/skills/community-matcher"]) {
    ensureDir(path.join(root, dir));
  }

  for (const dir of ["raw", "members", "matches"]) {
    ensureGitKeep(path.join(root, dir));
  }

  const summary = [];

  for (const agent of agents) {
    for (const file of files) {
      const sourceAbs = path.join(root, file.source);
      const targetAbs = path.join(root, agent, file.targetInAgent);
      if (!fs.existsSync(sourceAbs)) {
        throw new Error(`missing source file: ${file.source}`);
      }

      const result = createLink(sourceAbs, targetAbs);
      summary.push(`${agent}/${file.targetInAgent} -> ${file.source} (${result.mode})`);
    }
  }

  const indexPath = path.join(root, "index.md");
  const logPath = path.join(root, "log.md");
  if (!fs.existsSync(indexPath) || !sameFileContent(indexPath, indexPath)) {
    ensureDir(root);
  }
  if (!fs.existsSync(logPath) || !sameFileContent(logPath, logPath)) {
    ensureDir(root);
  }

  console.log("Setup complete.");
  for (const item of summary) console.log(`- ${item}`);
  console.log("");
  console.log("Next steps:");
  console.log("- macOS / Linux: bash scripts/lint.sh");
  console.log("- Windows PowerShell: node .\\scripts\\lint.js");
}

main();

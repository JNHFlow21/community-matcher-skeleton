#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const requiredRootFiles = ["MATCHER.md", "AGENTS.md", "CLAUDE.md", "CODEX.md", "HERMES.md", "index.md", "log.md"];
const requiredDirs = ["raw", "members", "matches", "scripts", ".matcher/skills/community-matcher"];
const agents = [".claude", ".codex", ".hermes"];
const skillName = "community-matcher";
const sharedSkill = `.matcher/skills/${skillName}/SKILL.md`;
const skillAssets = ["raw.md", "member.md", "match.md", "feishu-member-form.md"];
const skillReferences = ["schema.md", "quality-checklist.md"];
const skillScripts = ["lint.sh"];

const schemas = {
  raw: {
    dir: "raw",
    fields: ["title", "source", "captured", "processed", "members"],
  },
  member: {
    dir: "members",
    fields: [
      "name",
      "aliases",
      "city",
      "community",
      "role",
      "stage",
      "offers",
      "needs",
      "looking_for",
      "can_help_with",
      "scenarios",
      "tags",
      "status",
      "source",
      "created",
      "updated",
    ],
    enums: {
      role: ["frontstage-leader", "backend-operator", "business-resource", "event-organizer", "content-curator", "connector", "member"],
      stage: ["seed", "active", "normal", "silent", "risk"],
      status: ["active", "inactive", "blocked", "left"],
    },
  },
  match: {
    dir: "matches",
    fields: ["date", "requester", "need", "recommended", "status", "result", "created", "updated"],
    enums: {
      status: ["draft", "sent", "reviewed", "closed"],
      result: ["pending", "introduced", "replied", "rejected", "deal", "no_response"],
    },
    sections: ["需求复述", "推荐对象", "推荐理由", "可能风险", "私聊话术", "下一步动作", "结果复盘"],
  },
};

function rel(filePath) {
  return path.relative(root, filePath);
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function parseFrontmatter(text) {
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) return null;
  return text.slice(4, end);
}

function parseScalar(frontmatter, key) {
  if (!frontmatter) return null;
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.*)$`, "m"));
  if (!match) return null;
  return match[1].trim().replace(/^["']|["']$/g, "");
}

function parseKeys(frontmatter) {
  if (!frontmatter) return [];
  return frontmatter
    .split("\n")
    .map((line) => line.match(/^([A-Za-z0-9_-]+):/))
    .filter(Boolean)
    .map((match) => match[1]);
}

function parseWikiLinks(text) {
  const links = [];
  const cleaned = text.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]+`/g, "");
  let index = 0;
  while (index < cleaned.length) {
    const start = cleaned.indexOf("[[", index);
    if (start === -1) break;
    const end = cleaned.indexOf("]]", start + 2);
    if (end === -1) break;
    const target = cleaned.slice(start + 2, end).split("|")[0].split("#")[0].trim().replace(/\.md$/i, "");
    links.push(target);
    index = end + 2;
  }
  return links;
}

function isHardLinked(a, b) {
  try {
    const statA = fs.statSync(a);
    const statB = fs.statSync(b);
    return statA.ino === statB.ino && statA.dev === statB.dev && statA.nlink > 1 && statB.nlink > 1;
  } catch {
    return false;
  }
}

function validateLinkedFile(filePath, expectedRelativeTarget) {
  if (!fs.existsSync(filePath)) {
    return `missing linked file: ${rel(filePath)}`;
  }

  const stat = fs.lstatSync(filePath);
  if (stat.isSymbolicLink()) {
    const target = fs.readlinkSync(filePath);
    if (target !== expectedRelativeTarget) {
      return `${rel(filePath)} points to ${target}, expected ${expectedRelativeTarget}`;
    }
    return null;
  }

  const expectedAbs = path.resolve(path.dirname(filePath), expectedRelativeTarget);
  if (isHardLinked(filePath, expectedAbs)) {
    return null;
  }

  return `${rel(filePath)} must be a symlink or hard link to ${expectedRelativeTarget}`;
}

function collectNotes() {
  const notes = new Map();
  for (const file of requiredRootFiles) {
    if (!exists(file)) continue;
    notes.set(path.basename(file, ".md"), file);
  }
  for (const dir of ["raw", "members", "matches"]) {
    const absDir = path.join(root, dir);
    if (!fs.existsSync(absDir)) continue;
    for (const file of fs.readdirSync(absDir).filter((name) => name.endsWith(".md"))) {
      notes.set(path.basename(file, ".md"), path.join(dir, file));
    }
  }
  return notes;
}

const issues = [];

for (const file of requiredRootFiles) {
  if (!exists(file)) issues.push(`missing root file: ${file}`);
}

for (const dir of requiredDirs) {
  if (!exists(dir) || !fs.statSync(path.join(root, dir)).isDirectory()) {
    issues.push(`missing directory: ${dir}`);
  }
}

if (!exists(sharedSkill)) {
  issues.push(`missing shared skill: ${sharedSkill}`);
} else {
  const skillText = read(sharedSkill);
  const frontmatter = parseFrontmatter(skillText);
  const keys = parseKeys(frontmatter);
  if (!frontmatter) issues.push(`${sharedSkill} missing frontmatter`);
  if (parseScalar(frontmatter, "name") !== skillName) issues.push(`${sharedSkill} name must be ${skillName}`);
  if (!parseScalar(frontmatter, "description")) issues.push(`${sharedSkill} missing description`);
  const unexpected = keys.filter((key) => !["name", "description"].includes(key));
  if (unexpected.length) issues.push(`${sharedSkill} frontmatter has unsupported keys: ${unexpected.join(", ")}`);
}

for (const agent of agents) {
  const linkPath = path.join(root, agent, "skills", skillName, "SKILL.md");
  const skillIssue = validateLinkedFile(linkPath, `../../../.matcher/skills/${skillName}/SKILL.md`);
  if (skillIssue) issues.push(skillIssue);

  for (const asset of skillAssets) {
    const assetPath = path.join(root, agent, "skills", skillName, "assets", asset);
    const expected = `../../../../.matcher/skills/${skillName}/assets/${asset}`;
    const issue = validateLinkedFile(assetPath, expected);
    if (issue) issues.push(issue);
  }

  for (const reference of skillReferences) {
    const referencePath = path.join(root, agent, "skills", skillName, "references", reference);
    const expected = `../../../../.matcher/skills/${skillName}/references/${reference}`;
    const issue = validateLinkedFile(referencePath, expected);
    if (issue) issues.push(issue);
  }

  for (const script of skillScripts) {
    const scriptPath = path.join(root, agent, "skills", skillName, "scripts", script);
    const expected = `../../../../.matcher/skills/${skillName}/scripts/${script}`;
    const issue = validateLinkedFile(scriptPath, expected);
    if (issue) issues.push(issue);
  }
}

for (const [type, schema] of Object.entries(schemas)) {
  const absDir = path.join(root, schema.dir);
  if (!fs.existsSync(absDir)) continue;

  for (const file of fs.readdirSync(absDir).filter((name) => name.endsWith(".md"))) {
    const relativePath = path.join(schema.dir, file);
    const text = read(relativePath);
    const frontmatter = parseFrontmatter(text);
    if (!frontmatter) {
      issues.push(`${relativePath} missing frontmatter`);
      continue;
    }

    for (const field of schema.fields) {
      if (!new RegExp(`^${field}:`, "m").test(frontmatter)) {
        issues.push(`${relativePath} missing field: ${field}`);
      }
    }

    for (const [field, allowed] of Object.entries(schema.enums || {})) {
      const value = parseScalar(frontmatter, field);
      if (value && !allowed.includes(value)) {
        issues.push(`${relativePath} invalid ${field}: ${value}`);
      }
    }

    for (const section of schema.sections || []) {
      if (!new RegExp(`^##\\s+${section}\\s*$`, "m").test(text)) {
        issues.push(`${relativePath} missing section: ${section}`);
      }
    }
  }
}

const notes = collectNotes();
for (const file of requiredRootFiles) {
  if (!exists(file)) continue;
  for (const target of parseWikiLinks(read(file))) {
    if (!notes.has(target)) issues.push(`${file} has broken wikilink: [[${target}]]`);
  }
}

const indexText = exists("index.md") ? read("index.md") : "";
for (const dir of ["members", "matches"]) {
  const absDir = path.join(root, dir);
  if (!fs.existsSync(absDir)) continue;
  for (const file of fs.readdirSync(absDir).filter((name) => name.endsWith(".md"))) {
    const stem = path.basename(file, ".md");
    if (!indexText.includes(`[[${stem}]]`)) {
      issues.push(`index.md missing link to ${dir}/${file}`);
    }
  }
}

if (issues.length) {
  console.error("community_matcher lint failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("community_matcher lint passed");

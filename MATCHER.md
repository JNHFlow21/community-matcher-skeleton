# Community Matcher Operating Protocol

This file is the canonical protocol for `community_matcher`. Hermes, Claude Code, Codex, and any other agent must follow it before changing `raw/`, `members/`, `matches/`, `index.md`, `log.md`, scripts, or skills.

Related entry files: [[AGENTS]], [[CLAUDE]], [[CODEX]], [[HERMES]], [[index]], [[log]].

## Authority

1. `MATCHER.md` is the single source of truth.
2. Agent-specific files (`AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `HERMES.md`) are entry points only.
3. The shared project skill lives at `.matcher/skills/community-matcher/SKILL.md`.
4. `.claude/skills/community-matcher/SKILL.md`, `.codex/skills/community-matcher/SKILL.md`, and `.hermes/skills/community-matcher/SKILL.md` must be symlinks to the shared skill file.
5. Run `bash scripts/lint.sh` before claiming a matcher change is complete.

## Directory Contract

- `raw/`: original member introductions, event signup exports, or chat extracts. Do not rewrite source body text.
- `members/`: one standardized Markdown profile per member.
- `matches/`: optional Markdown reports for formal introductions, detailed matching memos, and outcome review. Ordinary Q&A does not need to be written here.
- `index.md`: navigation for every member and match report.
- `log.md`: append one dated entry for every meaningful change.
- `scripts/`: project checks and deterministic utilities.
- `.matcher/skills/community-matcher/`: shared project skill source, templates, references, and wrappers.
- `.claude/`, `.codex/`, `.hermes/`: agent-specific skill mirrors via symlink.

There are intentionally no `communities/`, `needs/`, `templates/`, `queries/`, or `feedback/` directories. Community, needs, templates, Q&A, and results are standardized through frontmatter, skill assets, direct answers, and optional match reports.

## Naming Rules

- Raw: `raw/YYYYMMDD_来源_主题.md`
- Member: `members/姓名.md`
- Match: `matches/YYYYMMDD_请求者_需求.md`

Use short, readable Chinese filenames. Avoid slashes, colons, and overly long titles.

## Link Rules

- Wikilinks target the filename stem only, without directory and without `.md`.
- Member links use `[[姓名]]`.
- Match reports should link `requester` and `recommended` people to real `members/` files when known.
- `index.md` must link to every `members/` and `matches/` file.

## Standard Properties

Frontmatter is a fixed contract, not a freeform note area. Quote strings that contain colons, brackets, links, or Chinese punctuation.

## Standard Collection Form

Future member collection should use `.matcher/skills/community-matcher/assets/feishu-member-form.md` as the source template for Feishu Docs, Feishu Forms, or Feishu Base forms.

Required collection fields:
- `name`: 姓名/昵称
- `city`: 所在城市
- `community`: 所属社群/活动
- `intro`: 我是谁
- `offers`: 我能提供什么
- `needs`: 我正在找什么
- `looking_for`: 我想链接谁
- `can_help_with`: 我能帮社群做什么
- `scenarios`: 适合参与/被推荐的场景

Optional collection fields:
- `notes`
- `tags`
- `role`
- `stage`

When importing from Feishu, first normalize the export into these field names, then run the `import-member` workflow.

Raw frontmatter:
```yaml
title: ""
source: ""
captured: YYYY-MM-DD
processed: false
members: []
```

Member frontmatter:
```yaml
name: ""
aliases: []
city: ""
community: ""
role: "member"
stage: "normal"
offers: []
needs: []
looking_for: []
can_help_with: []
scenarios: []
tags: []
status: "active"
source: ""
created: YYYY-MM-DD
updated: YYYY-MM-DD
```

Match frontmatter:
```yaml
date: YYYY-MM-DD
requester: ""
need: ""
recommended: []
status: "draft"
result: "pending"
created: YYYY-MM-DD
updated: YYYY-MM-DD
```

Allowed enum values live in `.matcher/skills/community-matcher/references/schema.md`.

## Workflows

Answer query:
1. Read `index.md` and relevant files in `members/`.
2. Answer the user's natural-language question directly. Do not write a file by default.
3. Recommend only people whose member properties support the recommendation.
4. Use the standard answer format: recommendation, reasons, introduction order, outreach message, risks, and missing information.
5. If the user asks to save, formalize, or actively introduce, create a report in `matches/` with the `create-match-report` workflow.

Import member:
1. Capture or identify the raw introduction.
2. Save original text to `raw/` if it does not already exist.
3. Create or update exactly one profile in `members/` using the member template.
4. Normalize `role`, `stage`, `status`, `offers`, `needs`, `looking_for`, and `can_help_with`.
5. Update `index.md` and append `log.md`.
6. Run `bash scripts/lint.sh`.

Generate match:
1. Read `index.md` and relevant files in `members/`.
2. Restate the requester's need.
3. Recommend only people whose properties support the recommendation.
4. Create one report in `matches/` using the match template.
5. Include recommended people, reasons, risks, outreach message, and next action.
6. Update `index.md` and append `log.md`.
7. Run `bash scripts/lint.sh`.

Create match report:
1. Use this only when the user asks to save a detailed matching memo, actively broker an introduction, or track outcomes.
2. Follow the same steps as `Generate match`.

Review match:
1. Read the match report and user-provided result.
2. Update `result`, `status`, `updated`, and the `结果复盘` section.
3. Update member notes only when the new fact belongs on the member profile.
4. Append `log.md`.
5. Run `bash scripts/lint.sh`.

## Completion Gate

Do not say work is complete until `bash scripts/lint.sh` has just passed.

# Repository Guidelines

This project is a file-based community people-matching system. Read `MATCHER.md` before changing `raw/`, `members/`, `matches/`, `index.md`, `log.md`, scripts, or skills.

## Structure

- `raw/`: original member introductions and signup exports.
- `members/`: standardized member profiles.
- `matches/`: matching reports and introduction outcomes.
- `index.md`: links to every member and match report.
- `log.md`: operation history.
- `.matcher/skills/community-matcher/`: shared project-level skill.
- `.claude/`, `.codex/`, `.hermes/`: agent skill mirrors via symlink.

## Commands

- `bash scripts/lint.sh`: validate structure, skill symlinks, frontmatter, enum values, and index coverage.

## Rules

- Standardize every repeatable workflow through the project skill.
- Use the templates in `.matcher/skills/community-matcher/assets/`.
- Do not invent new frontmatter fields without updating `MATCHER.md`, `references/schema.md`, and `scripts/lint.js`.
- Run `bash scripts/lint.sh` before claiming completion.

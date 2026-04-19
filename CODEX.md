# Codex Entry

Codex must use [[MATCHER]] as the canonical project protocol. `AGENTS.md` is the default contributor guide; this file exists so explicit `CODEX.md` lookups land on the same rules.

Required sequence:

1. Read [[MATCHER]].
2. If using skills, prefer `.codex/skills/community-matcher/SKILL.md`.
3. Before editing, identify whether the task is `import-member`, `match`, `review-match`, or project maintenance.
4. Use skill assets and schema instead of free-form output.
5. After edits to `raw/`, `members/`, `matches/`, `index.md`, `log.md`, scripts, or skills, run `bash scripts/lint.sh`.

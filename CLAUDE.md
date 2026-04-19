# Claude Code Entry

Claude Code must use [[MATCHER]] as the canonical project protocol.

Required sequence:

1. Read [[MATCHER]].
2. Read `.claude/skills/community-matcher/SKILL.md` when importing members, generating matches, reviewing outcomes, or editing project rules.
3. Use templates from `.claude/skills/community-matcher/assets/`.
4. Use schema rules from `.claude/skills/community-matcher/references/schema.md`.
5. After edits, run `bash scripts/lint.sh`.

Do not follow stale instructions that conflict with [[MATCHER]].

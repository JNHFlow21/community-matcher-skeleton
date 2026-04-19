# Community Matcher Quality Checklist

## Project Structure

- [ ] `MATCHER.md` is the single source of truth.
- [ ] `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, and `HERMES.md` point to `MATCHER.md`.
- [ ] `.matcher/skills/community-matcher/SKILL.md` is the only editable skill source.
- [ ] `assets/feishu-member-form.md` exists and defines the standard collection fields.
- [ ] `.claude`, `.codex`, and `.hermes` skill `SKILL.md` files are symlinks to the shared skill.
- [ ] `bash scripts/lint.sh` passes.

## Member Profiles

- [ ] Source data came from the standard Feishu collection fields, or was normalized into that shape before import.
- [ ] Member file uses `assets/member.md`.
- [ ] Required properties are present.
- [ ] Enum fields use values from `schema.md`.
- [ ] Unknown values are empty, not hallucinated.
- [ ] `offers`, `needs`, `looking_for`, and `can_help_with` are concrete enough for matching.
- [ ] `scenarios` are reusable scene labels, not long sentences.
- [ ] `index.md` links to the profile.

## Match Reports

- [ ] Match file uses `assets/match.md`.
- [ ] Requester and recommended people are linked when known.
- [ ] Recommendations are justified by member properties.
- [ ] Risks and next action are included.
- [ ] Outreach message is specific and low-pressure.
- [ ] `index.md` links to the report.

## Safety

- [ ] No private contact detail is stored unless the user explicitly asked to store it.
- [ ] No unauthorized data acquisition instructions are added.
- [ ] Raw source text is not rewritten.

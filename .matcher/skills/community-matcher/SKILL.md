---
name: community-matcher
description: Use when working inside Knowledge_OS/community_matcher to answer community member matching questions, import member introductions, standardize profiles, create optional matching reports, draft outreach messages, review match outcomes, or maintain matcher schemas, templates, indexes, logs, scripts, and agent entry files.
---

# Community Matcher Skill

This is the shared project skill for Hermes, Claude Code, and Codex.

The canonical operating protocol is `MATCHER.md`; read it first. If any instruction conflicts with `MATCHER.md`, follow `MATCHER.md` and repair the stale text.

## Activation

Use this skill when the user asks to:

- import a community member introduction
- create or use the standard Feishu member collection form
- standardize a member profile
- convert signup forms, chat introductions, or notes into `members/`
- answer who a member should connect with
- answer who can help solve a concrete member problem
- generate a matching report or outreach message
- review whether a match succeeded
- edit project schema, templates, lint checks, or agent entry files

## IO Contract

### create-collection-form

Input:
- User asks to collect community member information through Feishu Docs, Feishu Forms, or Feishu Base.

Output:
- Use `assets/feishu-member-form.md` as the canonical field template.
- Do not invent additional required fields unless `MATCHER.md`, `references/schema.md`, and lint rules are updated.
- If creating an actual Feishu document, preserve field names exactly: `name`, `city`, `community`, `intro`, `offers`, `needs`, `looking_for`, `can_help_with`, `scenarios`, `notes`, `tags`, `role`, `stage`.

### import-member

Input:
- Raw self-introduction text, Feishu form export text, or a `raw/` file path.
- Optional context: community name, city, event name, or source.

Output:
- One file in `members/` following `assets/member.md`.
- Updated `index.md` and `log.md`.
- Passing `bash scripts/lint.sh`.

### answer-query

Input:
- A natural-language question about who to connect, who can help, who has a resource, or who fits a scenario.
- Optional constraints: requester, city, community, industry, scenario, excluded members, max recommendations.

Output:
- Direct answer in the current conversation. Do not write a file by default.
- Must include: recommended people, reasons, introduction order, outreach message, risks, and missing information.
- If no strong match exists, state the closest options and what additional member data is missing.

Standard answer format:

```markdown
## 推荐结论

## 推荐理由

## 介绍顺序

## 可直接发送的话术

## 风险提醒

## 信息缺口
```

### create-match-report

Input:
- A requester member name and concrete need, or a prior `answer-query` result the user wants to save.
- Optional constraints: city, community, industry, scenario, excluded members, max recommendations.

Output:
- One file in `matches/` following `assets/match.md`.
- Recommended people, reasons, risks, outreach message, next action, and result placeholder.
- Updated `index.md` and `log.md`.
- Passing `bash scripts/lint.sh`.

### review-match

Input:
- A `matches/` report path.
- Outcome: `pending`, `introduced`, `replied`, `rejected`, `deal`, or `no_response`.
- Notes from the user.

Output:
- Updated match report frontmatter and `结果复盘` section.
- Updated member notes only if the new fact belongs on the profile.
- Appended `log.md`.
- Passing `bash scripts/lint.sh`.

## Standardization Rules

- Use `assets/raw.md`, `assets/member.md`, and `assets/match.md` instead of inventing formats.
- Use `assets/feishu-member-form.md` for member collection before import.
- When importing Feishu exports, normalize fields according to `references/schema.md` before writing `members/`.
- Use enum values from `references/schema.md`.
- Keep directories flat: use only `raw/`, `members/`, and `matches/` for content.
- Do not add new frontmatter fields unless `MATCHER.md`, `references/schema.md`, and `scripts/lint.js` are updated together.
- Never fabricate private information. If a field is unknown, leave it empty or use an empty list.
- Do not include sensitive contact details unless the user explicitly provides and asks to store them.

## Matching Principles

- Match from concrete `needs` to concrete `offers`, `can_help_with`, `looking_for`, city, community, and tags.
- Use `scenarios` as the first routing layer when the query contains a scene such as enterprise training, local events, CRM, short-video growth, legal compliance, or automation.
- Prefer high-signal recommendations over long lists.
- Explain why each recommendation is useful and what could go wrong.
- Include an outreach message that is specific, low-pressure, and honest.
- Treat the system as社群自治基础设施: identify seed users and connectors, not only buyers and sellers.

## References

- Schema: `.matcher/skills/community-matcher/references/schema.md`
- Quality checklist: `.matcher/skills/community-matcher/references/quality-checklist.md`
- Templates: `.matcher/skills/community-matcher/assets/`
- Root protocol: `MATCHER.md`

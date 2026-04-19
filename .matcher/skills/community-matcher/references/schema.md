# Community Matcher Schema

Frontmatter is fixed. Do not add fields without updating `MATCHER.md` and `scripts/lint.js`.

## Feishu Collection Form

Use `assets/feishu-member-form.md` as the standard collection template for Feishu Docs, Feishu Forms, or Feishu Base forms.

Required collection fields:
- `name`
- `city`
- `community`
- `intro`
- `offers`
- `needs`
- `looking_for`
- `can_help_with`
- `scenarios`

Optional collection fields:
- `notes`
- `tags`
- `role`
- `stage`

Field mapping:
- `name` -> member `name`, filename, `aliases`
- `city` -> member `city`
- `community` -> member `community`
- `intro` -> member `## 一句话介绍`
- `offers` -> member `offers` and `## 能提供什么`
- `needs` -> member `needs` and `## 正在寻找什么`
- `looking_for` -> member `looking_for` and `## 适合链接的人`
- `can_help_with` -> member `can_help_with`
- `scenarios` -> member `scenarios`
- `notes` -> member `## 备注`
- `tags` -> member `tags`
- `role` -> member `role`
- `stage` -> member `stage`

If `role`, `stage`, or `tags` are absent, infer them from the required fields. Never invent contact details.

## Raw

Required fields:
- `title`
- `source`
- `captured`
- `processed`
- `members`

## Member

Required fields:
- `name`
- `aliases`
- `city`
- `community`
- `role`
- `stage`
- `offers`
- `needs`
- `looking_for`
- `can_help_with`
- `scenarios`
- `tags`
- `status`
- `source`
- `created`
- `updated`

Allowed `role` values:
- `frontstage-leader` — 前台灵魂人物
- `backend-operator` — 后台技术工具
- `business-resource` — 商业变现资源
- `event-organizer` — 活动组织者
- `content-curator` — 内容整理者
- `connector` — 资源连接者
- `member` — 普通成员

Allowed `stage` values:
- `seed` — 种子用户
- `active` — 活跃成员
- `normal` — 普通成员
- `silent` — 沉默成员
- `risk` — 风险成员

Allowed `status` values:
- `active`
- `inactive`
- `blocked`
- `left`

`scenarios` should use short reusable phrases. Prefer consistent scenario names such as:
- `企业内训`
- `园区专场`
- `线下活动`
- `社群运营`
- `成员匹配`
- `个人IP`
- `内容增长`
- `短视频获客`
- `小红书获客`
- `直播转化`
- `AI自动化`
- `RPA`
- `飞书系统`
- `CRM搭建`
- `数据看板`
- `法律合规`
- `财税合规`
- `制造业提效`
- `跨境电商`
- `门店增长`
- `教育招生`
- `资源对接`
- `场地合作`
- `商业摄影`
- `企业服务销售`

## Match

Required fields:
- `date`
- `requester`
- `need`
- `recommended`
- `status`
- `result`
- `created`
- `updated`

Allowed `status` values:
- `draft`
- `sent`
- `reviewed`
- `closed`

Allowed `result` values:
- `pending`
- `introduced`
- `replied`
- `rejected`
- `deal`
- `no_response`

## Match Report Sections

Every match report must include:
- `## 需求复述`
- `## 推荐对象`
- `## 推荐理由`
- `## 可能风险`
- `## 私聊话术`
- `## 下一步动作`
- `## 结果复盘`

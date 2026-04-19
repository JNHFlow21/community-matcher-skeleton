# Community Matcher Skeleton

一个可直接克隆的社群人脉匹配智能体骨架仓库。

这个仓库基于一个已经落地验证过的本地知识库系统抽离而成，保留了以下核心能力：

- 项目级 Skill
- 标准化成员收集模板
- 标准化成员档案模板
- 标准化匹配报告模板
- 项目协议 `MATCHER.md`
- Hermes / Claude Code / Codex 三端共用的 Skill 结构
- Obsidian Vault 基础配置
- 基础校验脚本

本仓库默认不包含任何真实数据。`raw/`、`members/`、`matches/` 都为空目录，仅保留结构。

## Quick Start

### 1. 克隆仓库

仓库地址：

```text
https://github.com/JNHFlow21/community-matcher-skeleton.git
```

macOS:

```bash
git clone https://github.com/JNHFlow21/community-matcher-skeleton.git
cd community-matcher-skeleton
```

Windows PowerShell:

```powershell
git clone https://github.com/JNHFlow21/community-matcher-skeleton.git
Set-Location .\community-matcher-skeleton
```

### 2. 安装依赖

本仓库默认只依赖 `Node.js`。

验证环境：

macOS:

```bash
node -v
```

Windows PowerShell:

```powershell
node -v
```

### 3. 初始化项目

本仓库使用一份共享 Skill 源 `.matcher/skills/community-matcher/`，初始化时会自动为 Hermes、Claude Code、Codex 建立镜像链接。

直接运行：

macOS:

```bash
node scripts/setup.js
bash scripts/lint.sh
```

Windows PowerShell:

```powershell
node .\scripts\setup.js
node .\scripts\lint.js
```

## 推荐的 AI 安装 Prompt

把下面这段 Prompt 原样发给你的 AI，即可让 AI 在这个仓库根目录里帮你完成初始化。

```text
你现在在这个仓库根目录，请按下面步骤帮我完成安装和初始化：

1. 先阅读 README.md、MATCHER.md、AGENTS.md、.matcher/skills/community-matcher/SKILL.md。
2. 运行项目初始化脚本，完成项目级 Skill 的本地镜像链接搭建。
   - macOS / Linux: node scripts/setup.js
   - Windows PowerShell: node .\scripts\setup.js
3. 运行校验。
   - macOS / Linux: bash scripts/lint.sh
   - Windows PowerShell: node .\scripts\lint.js
4. 如果校验失败，请直接修复，不要只告诉我失败原因。
5. 安装完成后，请用教学口吻向我讲解这个仓库：
   - 每个目录是做什么的
   - Skill 是怎么工作的
   - 导入成员数据的标准流程是什么
   - 问答和匹配报告有什么区别
   - 我第一步应该往哪里放原始数据
6. 最后再带我做一次仓库巡检，确认我已经可以开始录入第一批成员数据。
```

## 推荐的 AI 交互式讲解 Prompt

安装完成后，把下面这段 Prompt 发给 AI，AI 会开始像助教一样带你熟悉仓库。

```text
请作为这个 community matcher 仓库的交互式助教，带我熟悉整个项目。

要求：

1. 先按目录顺序带我看：
   - raw/
   - members/
   - matches/
   - .matcher/skills/community-matcher/
   - scripts/
   - index.md
   - log.md
2. 每讲完一个部分，就告诉我这个部分在真实工作流里起什么作用。
3. 讲解过程中，请始终结合 MATCHER.md 和 SKILL.md，不要脱离仓库结构泛泛而谈。
4. 最后给我一个最小起步任务清单，让我知道下一步该做什么。
```

## 推荐工作流

### 工作流 1：先收集成员信息

优先使用：

- 飞书文档
- 飞书表单
- 飞书多维表格表单

标准字段模板在：

```text
.matcher/skills/community-matcher/assets/feishu-member-form.md
```

### 工作流 2：把原始数据放进 `raw/`

命名规则：

```text
raw/YYYYMMDD_来源_主题.md
```

例如：

```text
raw/20260420_飞书表单_第一批成员报名.md
```

### 工作流 3：让 AI 导入成员

示例 Prompt：

```text
请使用 community-matcher Skill，把 raw/20260420_飞书表单_第一批成员报名.md 导入为标准成员档案，并更新 index.md 和 log.md。
```

### 工作流 4：开始问答

示例问题：

```text
现在有一个成员想找直播带货资源，他应该找谁？
```

```text
如果我要组织一场线下活动，成员库里哪些人最适合参与？
```

### 工作流 5：需要留档时再生成匹配报告

示例 Prompt：

```text
请把刚才的匹配建议生成正式报告，保存到 matches/。
```

## 仓库结构

```text
community-matcher-skeleton/
├── README.md
├── MATCHER.md
├── AGENTS.md
├── CLAUDE.md
├── CODEX.md
├── HERMES.md
├── index.md
├── log.md
├── raw/
├── members/
├── matches/
├── scripts/
│   ├── setup.js
│   ├── lint.js
│   └── lint.sh
├── .matcher/
│   └── skills/community-matcher/
│       ├── SKILL.md
│       ├── assets/
│       ├── references/
│       └── scripts/
└── .obsidian/
```

## 重要说明

### 关于 Windows

Windows 默认使用 `PowerShell`。

本仓库初始化时会优先创建：

- `macOS / Linux`：符号链接 `symlink`
- `Windows`：符号链接；若权限不足，则自动尝试创建硬链接 `hard link`

这样做的目的是尽量保持“一份共享 Skill 源，多端共用”的结构。

### 关于数据

本仓库故意不附带示例数据，因为这份仓库的用途是作为骨架，而不是交付现成成员库。

学生克隆后应自行添加：

- 原始成员信息到 `raw/`
- 标准成员档案到 `members/`
- 正式匹配报告到 `matches/`

### 关于 Obsidian

本仓库可以直接作为 Obsidian Vault 打开。

打开方式：

1. 启动 Obsidian
2. 选择 `Open folder as vault`
3. 选中本仓库根目录

随后可查看：

- `index.md`
- `members/*.md`
- Graph View

## 下一步

如果已经完成初始化，建议立刻做三件事：

1. 阅读 `MATCHER.md`
2. 阅读 `.matcher/skills/community-matcher/SKILL.md`
3. 新建第一份 `raw/` 原始成员数据，开始导入流程

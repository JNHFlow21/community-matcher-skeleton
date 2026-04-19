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

## 如何用这个仓库进行交互式学习

这个仓库不只是一个模板仓库，更适合被当作“AI 陪学环境”来使用。

准确地说，交互式学习的主体不是仓库本身，而是：

```text
骨架仓库 + AI 助教 + 学生自己的第一批数据
```

学生可以把 AI 当成仓库教练，而不是只当成命令执行器。

### 建议的学习顺序

#### 第 1 轮：先认识结构

目标：

- 知道每个目录是做什么的
- 知道 `MATCHER.md` 和 `SKILL.md` 分别负责什么
- 知道为什么这个系统只有 `raw/`、`members/`、`matches/` 三个内容目录

建议发送给 AI：

```text
请不要急着帮我写数据，先带我认识这个仓库。请按目录顺序讲解，并告诉我每个目录在真实工作流里的作用。
```

这一轮结束后，学生至少应该能回答三个问题：

- 为什么原始数据要放在 `raw/`？
- 为什么标准成员档案要放在 `members/`？
- 为什么普通问答默认不写入 `matches/`？

#### 第 2 轮：跟着 AI 完成第一次导入

目标：

- 学会把原始成员信息放进 `raw/`
- 学会让 AI 按 Skill 工作流导入成员
- 学会检查 `index.md` 和 `log.md` 是否同步更新

建议发送给 AI：

```text
请带我完成第一次成员导入。不要直接替我全部做完，而是一步一步告诉我现在该准备什么、放到哪里、然后再执行哪一步。
```

这一轮结束后，学生应该亲手完成：

- 新建一份 `raw/YYYYMMDD_来源_主题.md`
- 让 AI 导入至少 1 名成员
- 检查 `members/`、`index.md`、`log.md`

#### 第 3 轮：跟着 AI 完成第一次问答

目标：

- 学会提一个符合真实业务的问题
- 学会判断 AI 的推荐是否有依据
- 学会区分“普通问答”和“正式匹配报告”

建议发送给 AI：

```text
请基于我当前成员库，带我做第一次匹配问答。你先帮我把一个好问题改写出来，再回答，并解释你为什么这样推荐。
```

这一轮结束后，学生应该知道：

- AI 是根据哪些字段完成推荐的
- 一次好的回答为什么必须包含推荐理由、介绍顺序、风险和信息缺口
- 什么时候只在对话里回答，什么时候要写报告

#### 第 4 轮：自己提需求，让 AI 只做助教

目标：

- 从“跟着学”过渡到“自己做”
- 让 AI 负责提示、检查、纠错，而不是全包

建议发送给 AI：

```text
从现在开始，你不要替我直接完成整个项目。你作为助教，先告诉我下一步该做什么；我做完后，你再帮我检查并指出问题。
```

这一步非常关键。因为真正的学习，不是看 AI 做完，而是自己做一遍、再让 AI 帮忙校正。

### 推荐的四种提问方式

学生在交互式学习中，建议优先使用下面四类问题。

#### 1. 结构理解类

例如：

```text
为什么这个项目要把原始数据和标准成员档案分开？
```

```text
为什么不单独建一个 needs/ 目录？
```

#### 2. 工作流跟学类

例如：

```text
请带我完成一次从 raw 到 members 的完整流程。
```

```text
请一步一步教我生成第一份匹配报告。
```

#### 3. 结果检查类

例如：

```text
请检查我刚导入的成员档案，告诉我哪些字段还不够标准。
```

```text
请帮我判断我这次问答推荐有没有依据不足的地方。
```

#### 4. 反思升级类

例如：

```text
如果这个仓库未来要服务 200 个成员，现在哪些字段可能不够？
```

```text
如果我要把这个系统升级为个人 CRM，哪些部分可以直接复用？
```

### 学生每学完一轮，应当产出什么？

为了防止“看懂了但没做会”，建议学生每一轮都留下一个可检查结果。

第 1 轮结束后：

- 能口头说明仓库结构

第 2 轮结束后：

- 至少导入 1 名成员

第 3 轮结束后：

- 至少完成 1 次问答匹配

第 4 轮结束后：

- 至少提出 1 个自己的真实业务问题，并让 AI 帮忙分析

### 一个重要边界

这个仓库可以很好地支持交互式学习，但前提是学生使用的 AI 具备以下能力：

- 能读取本地仓库文件
- 能在仓库根目录执行命令
- 能按 Prompt 顺序协作

如果只是把仓库下载下来但不连接 AI，那么它仍然只是一个结构完整的模板仓库，不会自动教学。

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

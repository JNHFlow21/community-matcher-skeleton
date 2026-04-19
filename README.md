# Community Matcher Skeleton

一个给 AI 使用的社群人脉匹配知识库骨架。

这个仓库不是让你手动照着命令一步步安装的。最简单的用法是：把下面的 Prompt 复制给你的 AI，让 AI 帮你完成安装、初始化和讲解。

## 1. 安装：把这段 Prompt 发给 AI

```text
请帮我安装并初始化这个项目：

https://github.com/JNHFlow21/community-matcher-skeleton

目标：
把这个 community matcher skeleton 初始化成一个可使用的本地社群人脉匹配知识库。

请按下面步骤执行：

1. 如果本地还没有仓库，请先克隆：
   git clone https://github.com/JNHFlow21/community-matcher-skeleton.git

2. 进入仓库根目录：
   community-matcher-skeleton

3. 先阅读这些文件，理解项目规则后再操作：
   - README.md
   - MATCHER.md
   - AGENTS.md
   - .matcher/skills/community-matcher/SKILL.md

4. 检查本机是否有 Node.js：
   node -v

   如果没有 Node.js，请先告诉我如何安装。不要跳过这一步。

5. 运行初始化脚本：
   - macOS / Linux:
     node scripts/setup.js
     bash scripts/lint.sh

   - Windows PowerShell:
     node .\scripts\setup.js
     node .\scripts\lint.js

6. 如果初始化或校验失败，请直接定位原因并修复，然后重新运行校验。

7. 安装完成后，请用简洁的方式告诉我：
   - 这个仓库现在能做什么
   - raw/、members/、matches/ 分别放什么
   - MATCHER.md 和 SKILL.md 分别负责什么
   - 我下一步应该如何录入第一批成员数据
```

## 2. 学习：把这段 Prompt 发给 AI

安装完成后，把下面这段 Prompt 发给 AI，让它用交互式方式带你熟悉项目。

```text
请作为 community matcher 项目的交互式助教，带我从零开始学会使用这个仓库。

教学目标：
我不只是想听你介绍仓库，而是要自己完成一次最小可用流程：
1. 看懂项目结构
2. 准备第一份原始成员数据
3. 导入至少 1 个标准成员档案
4. 做一次匹配问答
5. 理解什么时候需要生成正式匹配报告

教学要求：

1. 不要一次性长篇讲完。请按阶段带我做，每个阶段结束后停下来，让我确认或实际操作。

2. 讲解必须基于仓库文件，不要泛泛而谈。请始终结合：
   - MATCHER.md
   - .matcher/skills/community-matcher/SKILL.md
   - index.md
   - log.md

3. 第一阶段：带我认识结构。
   请依次解释这些位置的作用：
   - raw/
   - members/
   - matches/
   - index.md
   - log.md
   - scripts/
   - .matcher/skills/community-matcher/

   每解释一个位置，都请告诉我：
   - 它在真实工作流里解决什么问题
   - 我什么时候会用到它
   - 我不应该在这里做什么

4. 第二阶段：带我准备第一份 raw 原始数据。
   请先告诉我标准命名规则，然后让我创建一份类似这样的文件：
   raw/YYYYMMDD_来源_主题.md

   在我准备好原始成员信息前，不要替我编造任何成员数据。

5. 第三阶段：带我导入第一个成员。
   请使用 community-matcher Skill 的规则，把 raw/ 里的原始信息转换成 members/ 里的标准成员档案。

   导入时请检查：
   - 字段是否符合标准
   - 没有的信息是否保持为空
   - 是否更新 index.md
   - 是否追加 log.md
   - 是否通过校验脚本

6. 第四阶段：带我做第一次匹配问答。
   请先帮我把一个真实需求改写成更适合匹配的问题，再基于成员库回答。

   回答必须包含：
   - 推荐结论
   - 推荐理由
   - 介绍顺序
   - 可直接发送的话术
   - 风险提醒
   - 信息缺口

7. 第五阶段：解释普通问答和正式匹配报告的区别。
   请告诉我：
   - 什么情况只需要在对话里回答
   - 什么情况需要写入 matches/
   - 写入 matches/ 后 index.md 和 log.md 应如何更新

8. 全程请用助教模式：
   - 先告诉我下一步要做什么
   - 等我完成后再检查
   - 发现问题时指出具体文件和具体字段
   - 不要替我虚构数据
   - 不要把所有步骤一次性做完

现在请从第一阶段开始。
```

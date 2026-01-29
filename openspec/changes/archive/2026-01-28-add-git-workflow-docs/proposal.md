## Why

目前 `02-development/shared/` 目錄缺少 Git 工作流程文件，AI Agent 在執行分支操作、合併流程時沒有標準化指引可參考。這導致團隊協作時分支命名不一致、環境推進流程不明確。

## What Changes

- 新增 `git-workflow.md`：標準化分支策略、環境推進流程、問題修復指引
- 新增 `prompts/git-branch-create.md`：建立分支的 Prompt 範本
- 新增 `prompts/git-merge-flow.md`：環境間合併流程的 Prompt 範本

## Capabilities

### New Capabilities

- `git-workflow`: 標準化的 Git 工作流程規範，包含分支命名、環境推進、AI Agent 協作指引

### Modified Capabilities

（無修改現有 capabilities）

## Impact

- 新增檔案至 `plugins/ai-coding-workflow/skills/ai-coding-workflow/references/02-development/shared/`
- AI Agent 可根據 git-workflow.md 執行標準化的 Git 操作
- 與現有 validation-framework.md、integration.md、testing.md 互補

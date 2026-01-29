# Tasks: add-git-workflow-docs

> Git 工作流程文件建置任務

## 1. 主要文件

- [x] 1.1 建立 `02-development/shared/git-workflow.md`
  - 分支命名規範（環境分支、功能分支、修復分支）
  - 環境推進流程（dev → staging → prod）
  - AI Agent 協作指引
  - YAML Front Matter 元資料

## 2. Prompt 範本

- [x] 2.1 建立 `02-development/shared/prompts/git-branch-create.md`
  - 分支類型選擇指引
  - 命名規範檢查
  - 安全檢查步驟
  - 使用範例

- [x] 2.2 建立 `02-development/shared/prompts/git-merge-flow.md`
  - 環境順序驗證
  - 合併前檢查清單
  - 衝突處理指引
  - 回滾策略

## 3. 驗證

- [x] 3.1 確認所有文件包含正確的 YAML Front Matter
- [x] 3.2 確認變數使用 `${VARIABLE_NAME}` 語法
- [x] 3.3 測試 Prompt 範本可供 AI Agent 使用

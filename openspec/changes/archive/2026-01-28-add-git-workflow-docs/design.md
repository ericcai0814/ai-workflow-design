## Context

目前 `02-development/shared/` 目錄已有 validation-framework.md、integration.md、testing.md，但缺少 Git 工作流程相關文件。團隊在 AI 協作開發時需要標準化的分支策略和操作指引。

現有分支策略需求（來自 archived change 的 spec）：

- 分支命名：`${ENV}_[frontend/backend]_[system]_[collaborator]`
- 環境變數預設值：dev、staging、prod
- 功能分支前綴：feature/、fix-issue/、hotfix/

## Goals / Non-Goals

**Goals:**

- 提供標準化 Git 分支命名規範
- 定義環境推進流程（dev → staging → prod）
- 建立 AI Agent 協作時的 Git 操作指引
- 提供可直接使用的 Prompt 範本

**Non-Goals:**

- 不涉及 CI/CD 配置細節（屬於 DevOps 範疇）
- 不強制特定 Git 托管平台（GitHub/GitLab/Bitbucket）
- 不處理衝突解決的具體技術方案

## Decisions

### 1. 檔案位置

**決策**：放置於 `02-development/shared/` 目錄

**原因**：Git 工作流程是前後端共用的開發流程，與 validation-framework.md、testing.md 屬於同一層級。

### 2. 環境命名可配置

**決策**：使用 `${ENV_DEV}`、`${ENV_STAGING}`、`${ENV_PROD}` 變數，預設值為 dev/staging/prod

**原因**：不同團隊可能有不同的環境命名習慣（如 development/testing/production），保持彈性。

### 3. Prompt 範本結構

**決策**：建立兩個獨立的 Prompt 檔案

- `git-branch-create.md`：分支建立指引
- `git-merge-flow.md`：合併流程指引

**原因**：每個 Prompt 聚焦單一任務，方便 AI Agent 精確引用。

## Risks / Trade-offs

| Risk                          | Mitigation                   |
| ----------------------------- | ---------------------------- |
| 團隊已有既定 Git 流程         | 文件設計為可配置，變數可覆寫 |
| AI Agent 可能誤操作 main 分支 | Prompt 範本包含安全檢查步驟  |
| 環境命名不一致                | 首次使用時詢問用戶偏好並記錄 |

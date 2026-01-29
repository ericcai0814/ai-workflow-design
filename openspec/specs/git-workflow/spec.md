## ADDED Requirements

### Requirement: Branch Naming Convention

系統 SHALL 提供標準化的 Git 分支命名規範，確保團隊協作時分支命名一致。

#### Scenario: 建立環境主分支

- **WHEN** 開發者需要建立環境主分支
- **THEN** 分支名 SHALL 遵循 `${ENV}_[frontend/backend]_[system]_[collaborator]` 格式
- **AND** 環境變數 SHALL 提供預設值：`${ENV_DEV}=dev`, `${ENV_STAGING}=staging`, `${ENV_PROD}=prod`

#### Scenario: 建立功能分支

- **WHEN** 開發者需要建立功能開發分支
- **THEN** 分支名 SHALL 使用 `feature/<description>` 前綴
- **AND** description SHALL 使用 kebab-case 格式

#### Scenario: 建立問題修復分支

- **WHEN** 開發者需要修復已知問題
- **THEN** 一般問題 SHALL 使用 `fix-issue/<issue-id>-<description>` 前綴
- **AND** 緊急修復 SHALL 使用 `hotfix/<description>` 前綴

---

### Requirement: Environment Promotion Flow

系統 SHALL 定義標準化的環境推進流程，確保程式碼按正確順序部署。

#### Scenario: 開發到測試環境

- **WHEN** 功能開發完成並通過 code review
- **THEN** 變更 SHALL 合併至 `${ENV_DEV}` 分支
- **AND** 合併後 SHALL 觸發開發環境部署

#### Scenario: 測試到預發環境

- **WHEN** 開發環境測試通過
- **THEN** 變更 SHALL 合併至 `${ENV_STAGING}` 分支
- **AND** 合併前 SHALL 執行完整測試套件

#### Scenario: 預發到正式環境

- **WHEN** 預發環境驗證完成
- **THEN** 變更 SHALL 合併至 `${ENV_PROD}` 分支
- **AND** 合併 SHALL 經過相應的審核流程

---

### Requirement: AI Agent Git Collaboration

AI Agent 執行 Git 操作時 SHALL 遵循標準化指引，確保操作安全性。

#### Scenario: 首次 Git 分支操作

- **WHEN** AI Agent 首次需要執行 Git 分支操作
- **THEN** Agent SHALL 詢問用戶環境命名偏好
- **AND** Agent SHALL 提供預設值（dev、staging、prod）供用戶選擇或自定義
- **AND** Agent SHALL 記錄用戶偏好供後續使用

#### Scenario: 建立分支前檢查

- **WHEN** AI Agent 準備建立新分支
- **THEN** Agent SHALL 確認目標分支不存在
- **AND** Agent SHALL 確認基準分支為正確的環境分支
- **AND** Agent SHALL 使用標準命名規範

#### Scenario: 合併操作前檢查

- **WHEN** AI Agent 準備執行合併操作
- **THEN** Agent SHALL 確認目標分支正確
- **AND** Agent SHALL 確認無未提交的變更
- **AND** Agent SHALL 避免直接操作 main/master 分支

---

### Requirement: Git Workflow Prompt Templates

系統 SHALL 提供可直接使用的 Prompt 範本，供 AI Agent 執行 Git 操作。

#### Scenario: 分支建立 Prompt

- **WHEN** 需要建立新分支
- **THEN** SHALL 提供 `git-branch-create.md` Prompt 範本
- **AND** 範本 SHALL 包含分支類型選擇、命名規範、安全檢查步驟

#### Scenario: 合併流程 Prompt

- **WHEN** 需要執行環境間合併
- **THEN** SHALL 提供 `git-merge-flow.md` Prompt 範本
- **AND** 範本 SHALL 包含環境順序驗證、衝突處理指引、回滾策略

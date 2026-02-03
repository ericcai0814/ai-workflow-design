## ADDED Requirements

### Requirement: Validation skill 獨立處理驗證測試任務

validation skill SHALL 作為獨立的 skill 處理驗證測試相關任務，包含驗證框架、整合測試、E2E 測試。

#### Scenario: 觸發驗證 skill

- **WHEN** 用戶輸入包含「驗證」、「測試」、「整合」、「E2E」、「端對端」關鍵字
- **THEN** 系統 SHALL 載入 validation skill

#### Scenario: 執行 Phase 1-4 流程

- **WHEN** validation skill 被載入
- **THEN** 系統 SHALL 依序執行 Phase 1（任務理解）→ Phase 2（任務規劃）→ WAIT FOR CONFIRMATION → Phase 3（任務執行）→ Phase 4（驗收交付）

#### Scenario: 載入正確的參考文件

- **WHEN** validation skill 進入 Phase 3（任務執行）
- **THEN** 系統 SHALL 引導讀取 `02-development/shared/` 目錄下的參考文件（validation-framework.md, integration.md, testing.md）

### Requirement: Validation skill 調用 detect-context

validation skill SHALL 在 Phase 1 開頭調用 detect-context agent 偵測專案上下文。

#### Scenario: 偵測測試框架

- **WHEN** validation skill 開始執行
- **THEN** 系統 SHALL 調用 detect-context agent 偵測專案的測試框架、覆蓋率設定

#### Scenario: 偵測失敗時 fallback

- **WHEN** detect-context agent 無法確定專案上下文
- **THEN** 系統 SHALL 使用 AskUserQuestion 詢問用戶

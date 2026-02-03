## ADDED Requirements

### Requirement: Backend skill 獨立處理後端開發任務

backend skill SHALL 作為獨立的 skill 處理後端開發相關任務，包含 API 設計、資料庫、認證、商業邏輯。

#### Scenario: 觸發後端 skill

- **WHEN** 用戶輸入包含「API 設計」、「資料庫」、「後端」、「認證」、「商業邏輯」、「中間件」關鍵字
- **THEN** 系統 SHALL 載入 backend skill

#### Scenario: 執行 Phase 1-4 流程

- **WHEN** backend skill 被載入
- **THEN** 系統 SHALL 依序執行 Phase 1（任務理解）→ Phase 2（任務規劃）→ WAIT FOR CONFIRMATION → Phase 3（任務執行）→ Phase 4（驗收交付）

#### Scenario: 載入正確的參考文件

- **WHEN** backend skill 進入 Phase 3（任務執行）
- **THEN** 系統 SHALL 引導讀取 `02-development/backend/` 目錄下的參考文件（api-design.md, database.md, authentication.md, business-logic.md）

### Requirement: Backend skill 調用 detect-context

backend skill SHALL 在 Phase 1 開頭調用 detect-context agent 偵測專案上下文。

#### Scenario: 偵測後端技術棧

- **WHEN** backend skill 開始執行
- **THEN** 系統 SHALL 調用 detect-context agent 偵測專案的後端框架、資料庫、ORM

#### Scenario: 偵測失敗時 fallback

- **WHEN** detect-context agent 無法確定專案上下文
- **THEN** 系統 SHALL 使用 AskUserQuestion 詢問用戶

## ADDED Requirements

### Requirement: Frontend skill 獨立處理前端開發任務

frontend skill SHALL 作為獨立的 skill 處理前端開發相關任務，包含設計系統、元件開發、狀態管理、路由。

#### Scenario: 觸發前端 skill

- **WHEN** 用戶輸入包含「設計系統」、「建立元件」、「前端」、「UI」、「元件開發」、「狀態管理」關鍵字
- **THEN** 系統 SHALL 載入 frontend skill

#### Scenario: 執行 Phase 1-4 流程

- **WHEN** frontend skill 被載入
- **THEN** 系統 SHALL 依序執行 Phase 1（任務理解）→ Phase 2（任務規劃）→ WAIT FOR CONFIRMATION → Phase 3（任務執行）→ Phase 4（驗收交付）

#### Scenario: 載入正確的參考文件

- **WHEN** frontend skill 進入 Phase 3（任務執行）
- **THEN** 系統 SHALL 引導讀取 `02-development/frontend/` 目錄下的參考文件（design-system.md, component-development.md, state-management.md, routing.md）

### Requirement: Frontend skill 調用 detect-context

frontend skill SHALL 在 Phase 1 開頭調用 detect-context agent 偵測專案上下文。

#### Scenario: 偵測前端技術棧

- **WHEN** frontend skill 開始執行
- **THEN** 系統 SHALL 調用 detect-context agent 偵測專案的前端框架、UI 庫、狀態管理方案

#### Scenario: 偵測失敗時 fallback

- **WHEN** detect-context agent 無法確定專案上下文
- **THEN** 系統 SHALL 使用 AskUserQuestion 詢問用戶

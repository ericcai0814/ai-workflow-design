## ADDED Requirements

### Requirement: Planning skill 獨立處理規劃任務

planning skill SHALL 作為獨立的 skill 處理專案規劃相關任務，包含需求分析、技術選型、架構設計。

#### Scenario: 觸發規劃 skill

- **WHEN** 用戶輸入包含「分析需求」、「建立計畫」、「專案規劃」、「技術選型」、「架構設計」關鍵字
- **THEN** 系統 SHALL 載入 planning skill

#### Scenario: 執行 Phase 1-4 流程

- **WHEN** planning skill 被載入
- **THEN** 系統 SHALL 依序執行 Phase 1（任務理解）→ Phase 2（任務規劃）→ WAIT FOR CONFIRMATION → Phase 3（任務執行）→ Phase 4（驗收交付）

#### Scenario: 載入正確的參考文件

- **WHEN** planning skill 進入 Phase 3（任務執行）
- **THEN** 系統 SHALL 引導讀取 `01-planning/` 目錄下的參考文件（requirement-analysis.md, tech-stack-selection.md, architecture-design.md）

### Requirement: Planning skill 調用 detect-context

planning skill SHALL 在 Phase 1 開頭調用 detect-context agent 偵測專案上下文。

#### Scenario: 偵測專案技術棧

- **WHEN** planning skill 開始執行
- **THEN** 系統 SHALL 調用 detect-context agent 偵測專案的技術棧、狀態、結構

#### Scenario: 偵測失敗時 fallback

- **WHEN** detect-context agent 無法確定專案上下文
- **THEN** 系統 SHALL 使用 AskUserQuestion 詢問用戶

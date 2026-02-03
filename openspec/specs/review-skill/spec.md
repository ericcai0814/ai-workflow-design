## ADDED Requirements

### Requirement: Review skill 獨立處理程式碼審查任務

review skill SHALL 作為獨立的 skill 處理程式碼審查相關任務，包含程式碼審查、安全審查、效能審查。

#### Scenario: 觸發審查 skill

- **WHEN** 用戶輸入包含「程式碼審查」、「review」、「安全審查」、「效能審查」、「code review」關鍵字
- **THEN** 系統 SHALL 載入 review skill

#### Scenario: 執行 Phase 1-4 流程

- **WHEN** review skill 被載入
- **THEN** 系統 SHALL 依序執行 Phase 1（任務理解）→ Phase 2（任務規劃）→ WAIT FOR CONFIRMATION → Phase 3（任務執行）→ Phase 4（驗收交付）

#### Scenario: 載入正確的參考文件

- **WHEN** review skill 進入 Phase 3（任務執行）
- **THEN** 系統 SHALL 引導讀取 `03-review/` 目錄下的參考文件（code-review.md, security-review.md, performance-review.md）

### Requirement: Review skill 調用 detect-context

review skill SHALL 在 Phase 1 開頭調用 detect-context agent 偵測專案上下文。

#### Scenario: 偵測專案規範

- **WHEN** review skill 開始執行
- **THEN** 系統 SHALL 調用 detect-context agent 偵測專案的程式碼規範、lint 設定

#### Scenario: 偵測失敗時 fallback

- **WHEN** detect-context agent 無法確定專案上下文
- **THEN** 系統 SHALL 使用 AskUserQuestion 詢問用戶

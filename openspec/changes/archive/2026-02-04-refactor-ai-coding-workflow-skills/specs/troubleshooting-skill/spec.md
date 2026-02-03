## ADDED Requirements

### Requirement: Troubleshooting skill 獨立處理問題排查任務

troubleshooting skill SHALL 作為獨立的 skill 處理問題排查相關任務，包含踩坑案例、除錯流程、錯誤分析。

#### Scenario: 觸發問題排查 skill

- **WHEN** 用戶輸入包含「問題」、「錯誤」、「bug」、「修復」、「除錯」、「debug」關鍵字
- **THEN** 系統 SHALL 載入 troubleshooting skill

#### Scenario: 執行 Phase 1-4 流程

- **WHEN** troubleshooting skill 被載入
- **THEN** 系統 SHALL 依序執行 Phase 1（任務理解）→ Phase 2（任務規劃）→ WAIT FOR CONFIRMATION → Phase 3（任務執行）→ Phase 4（驗收交付）

#### Scenario: 載入正確的參考文件

- **WHEN** troubleshooting skill 進入 Phase 3（任務執行）
- **THEN** 系統 SHALL 引導讀取 `appendix/pitfalls/` 目錄下的踩坑案例文件

### Requirement: Troubleshooting skill 調用 detect-context

troubleshooting skill SHALL 在 Phase 1 開頭調用 detect-context agent 偵測專案上下文。

#### Scenario: 偵測專案技術棧

- **WHEN** troubleshooting skill 開始執行
- **THEN** 系統 SHALL 調用 detect-context agent 偵測專案的技術棧以便對照相關踩坑案例

#### Scenario: 偵測失敗時 fallback

- **WHEN** detect-context agent 無法確定專案上下文
- **THEN** 系統 SHALL 使用 AskUserQuestion 詢問用戶

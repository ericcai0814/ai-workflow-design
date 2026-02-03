## ADDED Requirements

### Requirement: Phase 模板提供標準化的四階段流程結構

phase-template SHALL 提供標準化的 Phase 1-4 流程結構，供各任務 skill 內嵌使用。

#### Scenario: 模板包含完整的四階段定義

- **WHEN** 任務 skill 需要內嵌 Phase 結構
- **THEN** 模板 SHALL 提供 Phase 1（任務理解）、Phase 2（任務規劃）、Phase 3（任務執行）、Phase 4（驗收交付）的完整定義

#### Scenario: Phase 1 任務理解

- **WHEN** 進入 Phase 1
- **THEN** 系統 SHALL 執行：重述需求、列出假設清單、判斷任務類型

#### Scenario: Phase 2 任務規劃

- **WHEN** 進入 Phase 2
- **THEN** 系統 SHALL 執行：判斷複雜度、對應參考文件、輸出規劃、等待用戶確認

#### Scenario: Phase 2 等待確認

- **WHEN** Phase 2 規劃輸出完成
- **THEN** 系統 MUST 等待用戶確認後才能進入 Phase 3

#### Scenario: Phase 3 任務執行

- **WHEN** 用戶確認後進入 Phase 3
- **THEN** 系統 SHALL 按步驟執行、更新進度、引導讀取參考文件

#### Scenario: Phase 4 驗收交付

- **WHEN** 進入 Phase 4
- **THEN** 系統 SHALL 執行：70% MVP 標準檢查、輸出檢查清單、確認完成狀態

### Requirement: Phase 模板支援任務特定微調

phase-template SHALL 允許各任務 skill 對 Phase 結構進行微調。

#### Scenario: 微調 Phase 3 參考文件

- **WHEN** 任務 skill 內嵌模板
- **THEN** 任務 skill SHALL 能夠自定義 Phase 3 要引導讀取的參考文件

#### Scenario: 保持結構一致性

- **WHEN** 任務 skill 進行微調
- **THEN** 四階段的基本結構（Phase 1-4）MUST 保持一致，僅內容可調整

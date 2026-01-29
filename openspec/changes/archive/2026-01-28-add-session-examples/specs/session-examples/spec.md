## ADDED Requirements

### Requirement: Session Examples Directory Structure

系統 SHALL 提供精選 AI 協作對話的目錄結構，供學習有效的協作模式。

#### Scenario: 查找精選對話索引

- **WHEN** 用戶或 AI Agent 進入 `appendix/sessions/` 目錄
- **THEN** SHALL 存在 `index.md` 索引文件
- **AND** 索引 SHALL 列出所有精選對話及其摘要

#### Scenario: 精選對話檔案命名

- **WHEN** 建立新的精選對話文件
- **THEN** 檔名 SHALL 遵循 `session-##-description.md` 格式
- **AND** ## SHALL 為兩位數序號（如 01, 02）
- **AND** description SHALL 使用 kebab-case 格式

---

### Requirement: Session Document Format

每個精選對話文件 SHALL 包含標準化的結構，確保學習價值。

#### Scenario: 標準文件結構

- **WHEN** 建立精選對話文件
- **THEN** 文件 SHALL 包含以下章節：
  - 背景說明（Context）
  - 關鍵對話（Key Dialogue）
  - 學習重點（Takeaways）
- **AND** 文件 SHALL 包含 YAML Front Matter 元資料

#### Scenario: 對話格式標示

- **WHEN** 記錄對話內容
- **THEN** 用戶發言 SHALL 使用 `> **User**: ...` 格式
- **AND** AI 回應 SHALL 使用 `> **AI**: ...` 格式

#### Scenario: 學習重點標註

- **WHEN** 標註可學習的 Prompt 模式
- **THEN** SHALL 使用明確的標籤或編號
- **AND** SHALL 說明該模式的適用場景

---

### Requirement: Session Coverage Scenarios

精選對話 SHALL 涵蓋不同的開發場景，提供多元的學習範例。

#### Scenario: 設計系統建立對話

- **WHEN** 收錄設計系統相關對話
- **THEN** SHALL 展示如何定義設計 Token
- **AND** SHALL 展示如何建立元件規範

#### Scenario: API 整合對話

- **WHEN** 收錄 API 整合相關對話
- **THEN** SHALL 展示前後端協作模式
- **AND** SHALL 展示 API 契約定義流程

#### Scenario: 問題排查對話

- **WHEN** 收錄除錯相關對話
- **THEN** SHALL 展示問題定位策略
- **AND** SHALL 展示有效的除錯 Prompt 模式

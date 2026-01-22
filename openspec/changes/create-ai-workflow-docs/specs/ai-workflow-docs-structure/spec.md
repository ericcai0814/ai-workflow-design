## ADDED Requirements

### Requirement: AI Workflow Documentation Structure

系統 SHALL 提供標準化的 AI 輔助開發工作流程文件結構，包含規劃、開發、審核三個階段的完整文件。

#### Scenario: AI Agent 載入入口文件

- **GIVEN** AI Agent 開始新的開發任務
- **WHEN** Agent 讀取 `ai-coding-workflow/README.md`
- **THEN** Agent SHALL 獲得完整的文件系統導航資訊
- **AND** Agent SHALL 能夠根據任務類型定位到相關文件

#### Scenario: 工程師按階段查找文件

- **GIVEN** 工程師處於開發的某個階段
- **WHEN** 工程師進入對應的階段目錄（01-planning/, 02-development/, 03-review/）
- **THEN** 工程師 SHALL 找到該階段所需的所有流程文件
- **AND** 每個文件 SHALL 包含可執行的 Prompt 範本

---

### Requirement: Technology Stack Agnostic Design

所有流程文件 SHALL 保持技術棧無關，使用變數語法 `${VARIABLE_NAME}` 表示可替換的技術選擇。

#### Scenario: 使用變數的 Prompt 範本

- **GIVEN** 一個包含 Prompt 範本的流程文件
- **WHEN** Prompt 涉及特定技術棧（框架、語言、工具）
- **THEN** Prompt SHALL 使用 `${VARIABLE_NAME}` 語法
- **AND** 文件 SHALL 在開頭列出所有使用的變數及其說明

#### Scenario: 技術棧範例放置位置

- **GIVEN** 需要提供特定技術棧的實作範例
- **WHEN** 建立範例內容
- **THEN** 範例 SHALL 放置在 `appendix/tech-stack-examples/` 目錄下
- **AND** 範例 SHALL 按技術棧分類（如 react-nextjs/, vue-nuxt/）

---

### Requirement: YAML Front Matter Metadata

所有文件 SHALL 包含標準化的 YAML Front Matter 元資料，供 AI Agent 解析和索引。

#### Scenario: 標準元資料欄位

- **GIVEN** 任何 ai-coding-workflow/ 下的 Markdown 文件
- **WHEN** 文件被建立或更新
- **THEN** 文件 SHALL 包含以下必填欄位：
  - `title`: 文件標題
  - `id`: 唯一識別碼（kebab-case）
  - `category`: planning | development | review
  - `ai_usage`: 使用場景列表
- **AND** development 類別的文件 SHALL 額外包含 `subcategory`: frontend | backend | shared

#### Scenario: AI Agent 解析元資料

- **GIVEN** AI Agent 需要查找特定類型的文件
- **WHEN** Agent 解析文件的 YAML Front Matter
- **THEN** Agent SHALL 能夠根據 `category` 和 `ai_usage` 判斷文件相關性
- **AND** Agent SHALL 能夠根據 `id` 建立文件間的引用關係

---

### Requirement: Frontend Backend Separation

開發階段文件 SHALL 明確區分前端（frontend/）、後端（backend/）和共用（shared/）流程。

#### Scenario: 前端專屬流程

- **GIVEN** 涉及 UI/UX、元件、狀態管理、路由的開發任務
- **WHEN** 查找相關流程文件
- **THEN** 相關文件 SHALL 位於 `02-development/frontend/` 目錄

#### Scenario: 後端專屬流程

- **GIVEN** 涉及 API、資料庫、認證、商業邏輯的開發任務
- **WHEN** 查找相關流程文件
- **THEN** 相關文件 SHALL 位於 `02-development/backend/` 目錄

#### Scenario: 共用流程

- **GIVEN** 涉及驗證框架、整合測試、E2E 測試的開發任務
- **WHEN** 查找相關流程文件
- **THEN** 相關文件 SHALL 位於 `02-development/shared/` 目錄

---

### Requirement: Design System Priority

設計系統（design-system.md）SHALL 作為前端開發的核心基礎，優先於其他前端元件開發文件。

#### Scenario: 設計系統前置條件

- **GIVEN** 開始前端元件開發
- **WHEN** AI Agent 或工程師準備建立新元件
- **THEN** 系統 SHALL 提示先確認設計系統是否已建立
- **AND** 設計系統文件 SHALL 包含：色彩系統、字體排版、間距規範、元件設計原則

#### Scenario: 設計系統 Prompt 目錄

- **GIVEN** 設計系統文件 design-system.md
- **WHEN** 需要執行設計系統相關任務
- **THEN** 相關 Prompt 範本 SHALL 位於 `02-development/frontend/prompts/` 目錄
- **AND** Prompt 文件 SHALL 以數字前綴排序（如 01-setup-design-tokens.md）

---

### Requirement: Case Library Structure

系統 SHALL 提供案例庫結構，累積團隊的成功經驗和踩坑教訓。

#### Scenario: 踩坑案例格式

- **GIVEN** 團隊遇到一個值得記錄的踩坑經驗
- **WHEN** 建立踩坑案例文件
- **THEN** 文件 SHALL 位於 `appendix/pitfalls/`
- **AND** 文件名 SHALL 遵循 `case-##-description.md` 格式
- **AND** 文件內容 SHALL 包含：問題描述、原因分析、解決方案、預防措施

#### Scenario: 成功案例格式

- **GIVEN** 團隊完成一個值得分享的成功實作
- **WHEN** 建立成功案例文件
- **THEN** 文件 SHALL 位於 `appendix/success-cases/`
- **AND** 文件名 SHALL 遵循 `case-##-description.md` 格式
- **AND** 文件內容 SHALL 包含：背景、實作方式、關鍵決策、成果指標

#### Scenario: 精選對話格式

- **GIVEN** 一段高品質的 AI 協作對話值得保留
- **WHEN** 建立精選對話文件
- **THEN** 文件 SHALL 位於 `appendix/sessions/`
- **AND** 文件名 SHALL 遵循 `session-##-description.md` 格式
- **AND** 文件 SHALL 保留完整對話上下文，並標註學習重點

---

### Requirement: Template Files

系統 SHALL 提供可複製的模板文件，加速新文件建立。

#### Scenario: 使用文件模板

- **GIVEN** 需要建立新的流程文件
- **WHEN** 查找可用模板
- **THEN** 模板 SHALL 位於 `templates/` 目錄
- **AND** 模板 SHALL 包含完整的 YAML Front Matter 結構
- **AND** 模板 SHALL 包含標準章節結構（概述、流程、Prompts、檢查清單）

#### Scenario: 可用模板類型

- **GIVEN** templates/ 目錄
- **WHEN** 列出可用模板
- **THEN** SHALL 至少包含以下模板：
  - `document-template.md` - 通用文件模板
  - `component-template.md` - 元件開發模板
  - `api-template.md` - API 設計模板
  - `test-template.md` - 測試案例模板

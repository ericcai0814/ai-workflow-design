---
name: ai-coding-workflow
description: 團隊標準化開發工作流程。使用時機：開始新專案、建立設計系統、開發元件/API、排查問題。根據任務類型自動導向對應的參考文件，快速產出 70% MVP。
---

# AI Coding Workflow

## 概述

這個 skill 提供團隊標準化的 AI 輔助開發工作流程，涵蓋從規劃到部署的完整開發週期。

**版本**：1.1.0

**主要用戶**：AI Agent（Claude Code、Cursor）+ 前後端工程師

**核心價值**：標準化 AI 協作流程、提供可重用的 Prompt 範本、記錄踩坑案例和成功模式

## 結構化執行流程

本 workflow 採用 Phase 結構，確保每個階段都有明確的輸出和確認機制。

```
Phase 1: 任務理解
        ↓ [輸出：需求重述、假設清單、提問]
Phase 2: 任務規劃
        ↓ [輸出：執行計畫] → **WAIT FOR CONFIRMATION**
Phase 3: 任務執行
        ↓ [按步驟執行、更新進度]
Phase 4: 驗收與交付
        ↓ [輸出：70% MVP、產出清單]
```

---

## Phase 1: 任務理解

**目標**：確保正確理解用戶需求，避免誤解

### 執行步驟

1. **重述需求**：用自己的話重述用戶的任務
2. **列出假設**：列出執行此任務的假設
3. **提出問題**：如有不確定的地方，提出問題

### 輸出格式

```markdown
## 任務理解

### 需求重述

[用自己的話重述用戶的需求]

### 假設

- [ ] 假設 1
- [ ] 假設 2
- [ ] 假設 3

### 確認問題（如有）

1. [問題 1]
2. [問題 2]
```

### 任務類型判斷

根據用戶輸入的關鍵字判斷任務類型：

| 任務類型 | 觸發關鍵字                                        |
| -------- | ------------------------------------------------- |
| 規劃     | 分析需求、建立計畫、專案規劃、技術選型、任務拆解  |
| 前端     | 設計系統、建立元件、前端、UI、樣式、Token、元件庫 |
| 後端     | API 設計、資料庫、後端、認證、REST、GraphQL       |
| 驗證     | 驗證、測試、整合、防止 bug、三層驗證              |
| 審查     | 程式碼審查、review、檢查品質、PR review           |
| 問題     | 問題、錯誤、bug、不 work、失敗、修復              |

---

## Phase 2: 任務規劃

**目標**：建立執行計畫，獲得用戶確認

### 執行步驟

1. **判斷複雜度**：根據影響範圍判斷 High/Medium/Low
2. **讀取參考文件**：根據任務類型讀取對應的 references
3. **制定執行計畫**：列出具體步驟
4. **評估風險**：識別潛在問題

### 複雜度判斷標準

| 複雜度 | 判斷標準                           |
| ------ | ---------------------------------- |
| High   | 跨多個模組、需要設計決策、影響架構 |
| Medium | 單一模組內、有既定模式可循         |
| Low    | 單一檔案、小幅修改、有明確範例     |

### 參考文件對應

| 任務類型 | 讀取文件                                                   |
| -------- | ---------------------------------------------------------- |
| 規劃     | `references/01-planning/overview.md`                       |
| 前端     | `references/02-development/frontend/design-system.md`      |
| 後端     | `references/02-development/backend/api-design.md`          |
| 驗證     | `references/02-development/shared/validation-framework.md` |
| 審查     | `references/03-review/code-review-checklist.md`            |
| 問題     | `references/appendix/pitfalls/index.md`                    |

### 輸出格式

```markdown
## 任務規劃

**任務類型**: [類型]
**複雜度**: [High / Medium / Low]

### 執行計畫

| 步驟 | 動作       | 參考文件       |
| ---- | ---------- | -------------- |
| 1    | [具體動作] | [相關參考文件] |
| 2    | [具體動作] | [相關參考文件] |
| 3    | [具體動作] | [相關參考文件] |

### 風險評估

- [風險 1]：[緩解措施]
- [風險 2]：[緩解措施]

---

**WAITING FOR CONFIRMATION**

請確認執行計畫：

- `yes` - 開始執行
- `modify` - 修改計畫
- `cancel` - 取消
```

### 關鍵：WAIT FOR CONFIRMATION

**Phase 2 結束後，必須等待用戶確認才能進入 Phase 3。**

- 不要自動繼續執行
- 使用 AskUserQuestion 或等待用戶回覆
- 如果用戶選擇 `modify`，根據反饋調整計畫

---

## Phase 3: 任務執行

**目標**：按計畫執行，更新進度

### 執行步驟

1. **按步驟執行**：遵循 Phase 2 制定的計畫
2. **更新進度**：每完成一個步驟，更新狀態
3. **遇到問題時**：說明問題，詢問用戶意見

### 進度更新格式

```markdown
## 執行進度

| 步驟 | 狀態      | 備註       |
| ---- | --------- | ---------- |
| 1    | ✅ 完成   | [完成內容] |
| 2    | 🔄 進行中 | [當前進度] |
| 3    | ⏸️ 待執行 |            |
```

### 執行原則

1. **務必替換變數**：${FRAMEWORK}、${LANGUAGE} 等替換為實際值
2. **遵循參考文件**：按 references 中的指引執行
3. **使用腳本輔助**：可使用 `scripts/` 目錄中的腳本
4. **及時回報**：遇到問題立即回報，不要自行決定跳過

---

## Phase 4: 驗收與交付

**目標**：確認 70% MVP 完成，交付產出清單

### 70% MVP 標準

**驗收標準**：樣式正常、功能正常

| 項目     | MVP 包含                       | 人工迭代           |
| -------- | ------------------------------ | ------------------ |
| 檔案結構 | ✅ 正確位置、正確命名          | -                  |
| 基本功能 | ✅ 核心功能可運行              | 功能調整、功能疊加 |
| 樣式     | ✅ 套用 Design Token、樣式正常 | 細節微調           |
| 型別定義 | ✅ 主要 props/types            | 完整型別           |
| 邊界處理 | ⏸️ 基本處理                    | 完整邊界處理       |

### MVP 檢查清單

執行完成後，逐項檢查：

- [ ] 檔案放在正確位置
- [ ] 命名符合專案規範
- [ ] 核心功能可運行
- [ ] 樣式正常顯示
- [ ] 無明顯錯誤

### 輸出格式

```markdown
## 任務完成

### 產出清單

| 類型 | 檔案路徑             | 說明   |
| ---- | -------------------- | ------ |
| 元件 | `src/components/...` | [說明] |
| 樣式 | `src/styles/...`     | [說明] |
| 型別 | `src/types/...`      | [說明] |

### MVP 檢查

- [x] 檔案放在正確位置
- [x] 命名符合專案規範
- [x] 核心功能可運行
- [x] 樣式正常顯示
- [x] 無明顯錯誤

### 後續建議

1. [建議 1]
2. [建議 2]

---

**MVP 已完成，請檢查後告訴我需要調整的地方。**
```

---

## 使用時機

### 規劃階段

**觸發關鍵字**：分析需求、建立計畫、專案規劃、技術選型、任務拆解

**使用時機**：

- 開始新專案
- 需要拆解複雜功能
- 選擇技術棧
- 建立開發計畫

**讀取**：

- `references/01-planning/overview.md`
- `references/01-planning/task-decomposition.md`
- `references/01-planning/prompts/analyze-requirements.md`

### 前端開發

**觸發關鍵字**：設計系統、建立元件、前端、UI、樣式、Token、元件庫

**使用時機**：

- 建立設計系統（核心流程）
- 開發 UI 元件
- 設定狀態管理
- 實作路由

**讀取**：

- `references/02-development/frontend/design-system.md`（優先）
- `references/02-development/frontend/component-development.md`
- `references/02-development/frontend/prompts/create-component.md`

### 後端開發

**觸發關鍵字**：API 設計、資料庫、後端、認證、REST、GraphQL

**使用時機**：

- 設計 API
- 建立資料庫 Schema
- 實作認證授權
- 開發後端服務

**讀取**：

- `references/02-development/backend/api-design.md`
- `references/02-development/backend/database.md`
- `references/02-development/backend/prompts/design-api.md`

### 驗證與測試

**觸發關鍵字**：驗證、測試、整合、防止 bug、三層驗證

**使用時機**：

- 需要防止「修 A 壞 B」問題
- 設定測試策略
- 提交前驗證

**讀取**：

- `references/02-development/shared/validation-framework.md`（關鍵）
- `references/02-development/shared/testing.md`

### 程式碼審查

**觸發關鍵字**：程式碼審查、review、檢查品質、PR review

**使用時機**：

- 審查 Pull Request
- 檢查程式碼品質
- 部署前驗證

**讀取**：

- `references/03-review/code-review-checklist.md`
- `references/03-review/prompts/review-code.md`

### 問題排查

**觸發關鍵字**：問題、錯誤、bug、不 work、失敗、修復

**使用時機**：

- 遇到錯誤
- 想檢查已知踩坑
- 需要除錯指引

**讀取**：

- `references/appendix/pitfalls/index.md`
- `references/appendix/prompt-cheatsheet.md`

---

## 技術棧適配

本 workflow 是**技術棧無關**的。Prompt 使用變數語法，需替換為實際技術棧：

### 變數系統

```
${PROJECT_NAME}     - 專案名稱
${FRAMEWORK}        - 前端框架（Vue 3、React、Angular）
${UI_LIBRARY}       - UI 框架（Vuetify、Ant Design、Material-UI）
${LANGUAGE}         - 後端語言（Python、C#、Node.js、Go）
${DATABASE}         - 資料庫（PostgreSQL、MySQL、MongoDB）
${API_STYLE}        - API 風格（RESTful、GraphQL）
```

### 上下文偵測

使用 `detect-context` skill 或 agent 偵測專案技術棧：

```
Skill: ai-coding-workflow:detect-context
```

或：

```
Task tool:
  subagent_type: detect-context
  prompt: "偵測當前專案的技術棧和狀態"
```

---

## 核心流程

### 1. 新專案設置

```
1. 讀取：references/01-planning/tech-stack-selection.md
2. 執行：references/01-planning/prompts/analyze-requirements.md
3. 執行：references/01-planning/prompts/create-plan.md
4. 根據專案類型選擇前端/後端路徑
```

### 2. 設計系統設置（前端）

```
1. 讀取：references/02-development/frontend/design-system.md
2. 執行：references/02-development/frontend/prompts/setup-design-system.md
3. 執行：references/02-development/frontend/prompts/setup-token-system.md
4. 執行：references/02-development/frontend/prompts/create-component.md
5. 驗證：references/02-development/shared/validation-framework.md
```

### 3. API 開發（後端）

```
1. 讀取：references/02-development/backend/api-design.md
2. 執行：references/02-development/backend/prompts/design-api.md
3. 執行：references/02-development/backend/prompts/create-model.md
4. 執行：references/02-development/backend/prompts/setup-auth.md（如需要）
5. 驗證：references/02-development/shared/validation-framework.md
```

### 4. Bug 修復

```
1. 檢查：references/appendix/pitfalls/index.md 是否有類似問題
2. 若有：套用已記錄的解決方案
3. 若無：執行 references/02-development/shared/prompts/bug-fixing.md
4. 記錄：若問題重要，新增到 appendix/pitfalls/
```

---

## 輔助腳本

位於 `scripts/` 目錄，用於自動化重複動作：

| 腳本                  | 用途                 | 範例                                   |
| --------------------- | -------------------- | -------------------------------------- |
| `create-component.sh` | 建立元件檔案結構     | `./scripts/create-component.sh Button` |
| `create-dbml.sh`      | 建立 DBML 資料庫定義 | `./scripts/create-dbml.sh users`       |
| `run-tests.sh`        | 執行測試             | `./scripts/run-tests.sh`               |

---

## 文件索引

### 規劃（references/01-planning/）

- `overview.md` - 規劃階段總覽
- `task-decomposition.md` - 任務拆解方法
- `tech-stack-selection.md` - 技術棧選擇指南
- `prompts/analyze-requirements.md` - 需求分析
- `prompts/create-plan.md` - 計畫建立

### 開發 - 前端（references/02-development/frontend/）

- `overview.md` - 前端開發總覽
- `design-system.md` - **核心**：設計系統完整流程
- `component-development.md` - 元件開發標準
- `state-management.md` - 狀態管理模式
- `routing.md` - 路由設計
- `prompts/setup-design-system.md` - 設計系統設置
- `prompts/create-component.md` - 元件建立

### 開發 - 後端（references/02-development/backend/）

- `overview.md` - 後端開發總覽
- `api-design.md` - API 設計原則
- `database.md` - 資料庫設計
- `authentication.md` - 認證授權
- `prompts/design-api.md` - API 設計
- `prompts/create-model.md` - 模型建立

### 開發 - 共用（references/02-development/shared/）

- `validation-framework.md` - **核心**：三層驗證框架
- `integration.md` - 前後端整合
- `testing.md` - 測試策略
- `prompts/feature-implementation.md` - 功能實作
- `prompts/bug-fixing.md` - Bug 修復

### 審核（references/03-review/）

- `overview.md` - 審核階段總覽
- `code-review-checklist.md` - 程式碼審查清單
- `prompts/review-code.md` - 程式碼審查

### 附錄（references/appendix/）

- `pitfalls/index.md` - 踩坑案例索引
- `success-cases/index.md` - 成功案例索引
- `tech-stack-examples/` - 技術棧範例
- `prompt-cheatsheet.md` - Prompt 速查表

---

## 快速參考

### 常見場景 → 文件對應

| 場景         | 讀取                                             | 執行                            |
| ------------ | ------------------------------------------------ | ------------------------------- |
| 新專案       | 01-planning/overview.md                          | prompts/analyze-requirements.md |
| 建立設計系統 | 02-development/frontend/design-system.md         | prompts/setup-design-system.md  |
| 建立元件     | 02-development/frontend/component-development.md | prompts/create-component.md     |
| 設計 API     | 02-development/backend/api-design.md             | prompts/design-api.md           |
| 修復 Bug     | appendix/pitfalls/index.md                       | shared/prompts/bug-fixing.md    |
| 程式碼審查   | 03-review/code-review-checklist.md               | prompts/review-code.md          |

---

## 重要提醒

### 必須先讀

- **references/02-development/frontend/design-system.md** - 所有前端工作的基礎
- **references/02-development/shared/validation-framework.md** - 防止「修 A 壞 B」

### 不可跳過

- **檢查 prerequisites**（YAML Front Matter 中）
- **偵測專案技術棧**後再使用 Prompt
- **執行 Prompt 後用清單驗證**
- **`requires_human_review: true` 時請求人工審核**
- **Phase 2 結束後等待用戶確認**

### Prompt 使用規則

1. **務必替換變數**（${FRAMEWORK}、${LANGUAGE}）為實際值
2. **執行前展示給用戶**（除非是簡單任務）
3. **包含 Prompt 中的驗證步驟**
4. **需要技術細節時參考 tech-stack-examples**

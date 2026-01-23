---
name: ai-coding-workflow
description: 團隊標準化開發工作流程。使用時機：開始新專案、建立設計系統、開發元件/API、排查問題。根據任務類型自動導向對應的參考文件，快速產出 70% MVP。
---

# AI Coding Workflow

## 概述

這個 skill 提供團隊標準化的 AI 輔助開發工作流程，涵蓋從規劃到部署的完整開發週期。

**版本**：1.0.0

**主要用戶**：AI Agent（Claude Code、Cursor）+ 前後端工程師

**核心價值**：標準化 AI 協作流程、提供可重用的 Prompt 範本、記錄踩坑案例和成功模式

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

## 執行流程

```
1. 根據任務關鍵字判斷類型
        ↓
2. 讀取對應的 references 文件
        ↓
3. 執行任務（可使用 scripts/ 腳本）
        ↓
4. 產出 70% MVP
        ↓
5. 提示：「MVP 已完成，請檢查後告訴我需要調整的地方」
```

## 70% MVP 標準

**驗收標準**：樣式正常、功能正常

| 項目 | MVP 包含 | 人工迭代 |
|------|----------|----------|
| 檔案結構 | ✅ 正確位置、正確命名 | - |
| 基本功能 | ✅ 核心功能可運行 | 功能調整、功能疊加 |
| 樣式 | ✅ 套用 Design Token、樣式正常 | 細節微調 |
| 型別定義 | ✅ 主要 props/types | 完整型別 |
| 邊界處理 | ⏸️ 基本處理 | 完整邊界處理 |

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

### 自動偵測策略
1. 檢查 `package.json` 確認前端框架
2. 檢查 `requirements.txt` / `.csproj` / `go.mod` 確認後端語言
3. 檢查 `docker-compose.yml` 確認資料庫
4. 不確定時詢問用戶

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

## 輔助腳本

位於 `scripts/` 目錄，用於自動化重複動作：

| 腳本 | 用途 | 範例 |
|------|------|------|
| `create-component.sh` | 建立元件檔案結構 | `./scripts/create-component.sh Button` |
| `create-dbml.sh` | 建立 DBML 資料庫定義 | `./scripts/create-dbml.sh users` |
| `run-tests.sh` | 執行測試 | `./scripts/run-tests.sh` |

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

## 快速參考

### 常見場景 → 文件對應

| 場景 | 讀取 | 執行 |
|------|------|------|
| 新專案 | 01-planning/overview.md | prompts/analyze-requirements.md |
| 建立設計系統 | 02-development/frontend/design-system.md | prompts/setup-design-system.md |
| 建立元件 | 02-development/frontend/component-development.md | prompts/create-component.md |
| 設計 API | 02-development/backend/api-design.md | prompts/design-api.md |
| 修復 Bug | appendix/pitfalls/index.md | shared/prompts/bug-fixing.md |
| 程式碼審查 | 03-review/code-review-checklist.md | prompts/review-code.md |

## 重要提醒

### 必須先讀
- **references/02-development/frontend/design-system.md** - 所有前端工作的基礎
- **references/02-development/shared/validation-framework.md** - 防止「修 A 壞 B」

### 不可跳過
- **檢查 prerequisites**（YAML Front Matter 中）
- **偵測專案技術棧**後再使用 Prompt
- **執行 Prompt 後用清單驗證**
- **`requires_human_review: true` 時請求人工審核**

### Prompt 使用規則
1. **務必替換變數**（${FRAMEWORK}、${LANGUAGE}）為實際值
2. **執行前展示給用戶**（除非是簡單任務）
3. **包含 Prompt 中的驗證步驟**
4. **需要技術細節時參考 tech-stack-examples**

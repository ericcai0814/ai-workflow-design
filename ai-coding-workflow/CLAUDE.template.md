# CLAUDE.md Template

> **使用方式**：將下方 `<!-- AI-CODING-WORKFLOW:START -->` 到 `<!-- AI-CODING-WORKFLOW:END -->` 的內容複製到你專案的 CLAUDE.md 中，並填入專案的技術棧資訊。

---

<!-- AI-CODING-WORKFLOW:START -->
# AI Coding Workflow

本專案使用 AI Coding Workflow 文件系統來標準化 AI 輔助開發流程。

## 入口文件

- 總入口：`ai-coding-workflow/AGENTS.md`
- 快速開始：`ai-coding-workflow/QUICKSTART.md`

## 專案技術棧

<!-- 請填入你的專案技術棧 -->
```yaml
framework: React          # React / Vue / Angular / Svelte / Astro
language: TypeScript      # TypeScript / JavaScript
css_solution: Tailwind    # Tailwind / CSS Modules / Styled-components
ui_library: Shadcn        # Shadcn / Vuetify / Ant Design / MUI / None
state_manager: Zustand    # Zustand / Redux / Pinia / Jotai / None
api_style: REST           # REST / GraphQL / tRPC
database: PostgreSQL      # PostgreSQL / MongoDB / MySQL / None
orm: Prisma               # Prisma / Drizzle / TypeORM / None
```

## 強制讀取規則

**重要**：當任務符合以下情境時，你**必須**先使用 Read 工具讀取對應文件，然後才能開始工作。這不是建議，是強制要求。

### 前端開發

| 觸發條件 | 強制動作 |
|----------|----------|
| 用戶要求建立/開發 UI 元件 | `Read ai-coding-workflow/02-development/frontend/component-development.md` |
| 用戶要求建立設計系統或 Token | `Read ai-coding-workflow/02-development/frontend/design-system.md` |
| 用戶要求處理狀態管理 | `Read ai-coding-workflow/02-development/frontend/state-management.md` |
| 用戶要求處理路由 | `Read ai-coding-workflow/02-development/frontend/routing.md` |

### 後端開發

| 觸發條件 | 強制動作 |
|----------|----------|
| 用戶要求設計/建立 API | `Read ai-coding-workflow/02-development/backend/api-design.md` |
| 用戶要求設計資料庫/Schema | `Read ai-coding-workflow/02-development/backend/database.md` |
| 用戶要求處理認證/授權 | `Read ai-coding-workflow/02-development/backend/authentication.md` |

### 規劃階段

| 觸發條件 | 強制動作 |
|----------|----------|
| 用戶要求分析需求/規劃功能 | `Read ai-coding-workflow/01-planning/requirement-analysis.md` |
| 用戶要求選擇技術棧 | `Read ai-coding-workflow/01-planning/tech-stack-selection.md` |
| 用戶要求設計架構 | `Read ai-coding-workflow/01-planning/architecture-design.md` |

### 問題排查

| 觸發條件 | 強制動作 |
|----------|----------|
| 用戶遇到部署/環境/錯誤問題 | `Read ai-coding-workflow/appendix/pitfalls/` 目錄下的相關案例 |

## 執行流程

```
1. 收到用戶請求
2. 檢查是否符合上述觸發條件
3. 如果符合 → 立即使用 Read 工具讀取對應文件
4. 閱讀文件中的流程和 Prompt 範本
5. 依照文件指引執行任務
```

## 工作原則

1. **先讀後做**：符合觸發條件時，必須先讀取文件再開始工作
2. **使用 Prompt 範本**：文件中的 Prompt 區塊可直接使用或調整
3. **遇到問題查案例**：先查 `appendix/pitfalls/` 是否有類似問題
4. **記錄新踩坑**：遇到新問題時，記錄到 `appendix/pitfalls/`

<!-- AI-CODING-WORKFLOW:END -->

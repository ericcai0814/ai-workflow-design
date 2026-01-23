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

## 自動讀取規則

當任務符合以下情境時，請**先閱讀對應文件**再開始工作：

### 規劃階段

| 觸發關鍵字 | 閱讀文件 |
|------------|----------|
| 需求分析、功能規劃 | `ai-coding-workflow/01-planning/requirement-analysis.md` |
| 技術棧選擇、框架選型 | `ai-coding-workflow/01-planning/tech-stack-selection.md` |
| 架構設計 | `ai-coding-workflow/01-planning/architecture-design.md` |

### 前端開發

| 觸發關鍵字 | 閱讀文件 |
|------------|----------|
| 設計系統、Design Token | `ai-coding-workflow/02-development/frontend/design-system.md` |
| 元件開發、Component | `ai-coding-workflow/02-development/frontend/component-development.md` |
| 狀態管理 | `ai-coding-workflow/02-development/frontend/state-management.md` |
| 路由 | `ai-coding-workflow/02-development/frontend/routing.md` |

### 後端開發

| 觸發關鍵字 | 閱讀文件 |
|------------|----------|
| API 設計 | `ai-coding-workflow/02-development/backend/api-design.md` |
| 資料庫設計、Schema | `ai-coding-workflow/02-development/backend/database.md` |
| 認證、授權 | `ai-coding-workflow/02-development/backend/authentication.md` |

### 問題排查

| 觸發情境 | 閱讀文件 |
|----------|----------|
| 遇到部署/環境問題 | `ai-coding-workflow/appendix/pitfalls/` |

## 工作原則

1. **先讀文件再動手**：符合觸發條件時，先閱讀對應文件
2. **使用 Prompt 範本**：文件中的 Prompt 區塊可直接使用
3. **遇到問題查案例**：先查 `appendix/pitfalls/` 是否有類似問題
4. **記錄新踩坑**：遇到新問題時，記錄到 `appendix/pitfalls/`

<!-- AI-CODING-WORKFLOW:END -->

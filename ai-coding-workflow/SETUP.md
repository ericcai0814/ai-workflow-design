---
title: "專案設置指南"
id: "setup"
version: "1.0.0"
last_updated: "2026-01-23"
---

# AI Coding Workflow - 專案設置指南

> 這份文件指引 AI Agent 如何在專案中設置 AI Coding Workflow。

---

## 前置條件

確認以下條件已滿足：

- [ ] `ai-coding-workflow/` 目錄已複製到專案根目錄
- [ ] 專案有 `CLAUDE.md`（或其他 AI 指引文件）

---

## 設置步驟

### Step 1：分析專案技術棧

請分析專案的以下文件來判斷技術棧：

| 檔案 | 判斷項目 |
|------|----------|
| `package.json` | 前端框架、UI 庫、狀態管理、測試框架 |
| `tsconfig.json` | 是否使用 TypeScript |
| `tailwind.config.*` | 是否使用 Tailwind |
| `vite.config.*` / `next.config.*` | 建置工具 |
| `prisma/schema.prisma` | ORM 和資料庫 |
| `docker-compose.yml` | 資料庫類型 |

**輸出格式：**

```yaml
tech_stack:
  framework: [React / Vue / Angular / Svelte / Astro]
  language: [TypeScript / JavaScript]
  css_solution: [Tailwind / CSS Modules / Styled-components / SCSS]
  ui_library: [Shadcn / Vuetify / Ant Design / MUI / None]
  state_manager: [Zustand / Redux / Pinia / Jotai / None]
  api_style: [REST / GraphQL / tRPC]
  database: [PostgreSQL / MongoDB / MySQL / SQLite / None]
  orm: [Prisma / Drizzle / TypeORM / None]
  test_framework: [Vitest / Jest / Playwright / None]
```

### Step 2：更新 CLAUDE.md

在專案的 `CLAUDE.md` 中加入以下區塊：

```markdown
<!-- AI-CODING-WORKFLOW:START -->
# AI Coding Workflow

本專案使用 AI Coding Workflow 文件系統。

## 入口文件

閱讀 `ai-coding-workflow/AGENTS.md` 了解如何使用。

## 專案技術棧

<!-- 將 Step 1 分析的結果填入 -->
- Framework: ${FRAMEWORK}
- Language: ${LANGUAGE}
- CSS: ${CSS_SOLUTION}
- UI Library: ${UI_LIBRARY}
- State: ${STATE_MANAGER}
- API: ${API_STYLE}
- Database: ${DATABASE}
- ORM: ${ORM}

## 自動讀取規則

當任務符合以下情境時，先閱讀對應文件：

| 觸發情境 | 閱讀文件 |
|----------|----------|
| 設計系統、Design Token | `ai-coding-workflow/02-development/frontend/design-system.md` |
| 元件開發 | `ai-coding-workflow/02-development/frontend/component-development.md` |
| API 設計 | `ai-coding-workflow/02-development/backend/api-design.md` |
| 資料庫設計 | `ai-coding-workflow/02-development/backend/database.md` |
| 遇到問題 | `ai-coding-workflow/appendix/pitfalls/` |

<!-- AI-CODING-WORKFLOW:END -->
```

### Step 3：驗證設置

執行以下驗證：

- [ ] `ai-coding-workflow/AGENTS.md` 可正常讀取
- [ ] `CLAUDE.md` 已包含 AI-CODING-WORKFLOW 區塊
- [ ] 技術棧變數已填入實際值

---

## 設置完成後

告知使用者：

```
AI Coding Workflow 已設置完成。

技術棧：
- Framework: [分析結果]
- Language: [分析結果]
- ...

已更新：CLAUDE.md

現在我會在以下情境自動參考對應的工作流程文件：
- 建立設計系統時 → design-system.md
- 開發元件時 → component-development.md
- 設計 API 時 → api-design.md
- 遇到問題時 → appendix/pitfalls/
```

---

## 進階設置（可選）

### 自訂觸發規則

如果專案有特殊需求，可以在 CLAUDE.md 中新增自訂規則：

```markdown
## 專案特定規則

| 觸發情境 | 閱讀文件 |
|----------|----------|
| [自訂情境] | [自訂文件路徑] |
```

### 新增團隊踩坑案例

如果團隊有自己的踩坑經驗，可以新增到 `appendix/pitfalls/`：

```
appendix/pitfalls/
├── case-01-cicd-configuration.md    # 通用案例
├── case-02-astro5-env-variables.md  # 通用案例
└── team-case-01-xxx.md              # 團隊專屬案例
```

---

## 故障排除

### Q: AI 沒有自動讀取工作流程文件？

A: 確認 CLAUDE.md 中的觸發規則是否正確設置。

### Q: 變數沒有被替換？

A: 在使用 Prompt 時，手動將 `${VARIABLE}` 替換為實際值，或在 CLAUDE.md 中預先定義。

### Q: 找不到適合的踩坑案例？

A: 查看 `appendix/pitfalls/` 索引，或記錄新案例供未來參考。

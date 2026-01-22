---
title: "AI Coding Workflow Documentation"
id: "ai-coding-workflow-root"
version: "0.1.0"
last_updated: "2026-01-23"
---

# AI Coding Workflow Documentation

> AI-First 的全棧開發工作流程文件系統

## Quick Navigation

```
你是什麼角色？需要做什麼？
│
├─ AI Agent（開始新任務）
│   └─ 閱讀本文件 → 根據任務類型選擇對應目錄
│
├─ 前端工程師
│   └─ 02-development/frontend/design-system.md → 設計系統
│   └─ 02-development/frontend/ → 元件、狀態、路由
│
├─ 後端工程師
│   └─ 02-development/backend/api-design.md → API 設計
│   └─ 02-development/backend/ → 資料庫、認證
│
├─ 遇到問題
│   └─ appendix/pitfalls/ → 踩坑案例
│
└─ 學習最佳實踐
    └─ appendix/success-cases/ → 成功案例
    └─ appendix/sessions/ → 精選 AI 對話
```

## Directory Structure

```
ai-coding-workflow/
├── README.md                 # ← 你在這裡（AI 入口點）
├── QUICKSTART.md             # 快速開始指南
│
├── 01-planning/              # 規劃階段
│   ├── requirement-analysis.md
│   ├── tech-stack-selection.md
│   └── architecture-design.md
│
├── 02-development/           # 開發階段
│   ├── frontend/             # 前端開發
│   │   ├── design-system.md  # ⭐ 設計系統（核心基礎）
│   │   ├── component-development.md
│   │   ├── state-management.md
│   │   ├── routing.md
│   │   └── prompts/          # 前端 Prompt 範本
│   │
│   ├── backend/              # 後端開發
│   │   ├── api-design.md
│   │   ├── database.md
│   │   ├── authentication.md
│   │   ├── business-logic.md
│   │   └── prompts/          # 後端 Prompt 範本
│   │
│   └── shared/               # 共用流程
│       ├── validation-framework.md
│       ├── integration.md
│       └── testing.md
│
├── 03-review/                # 審核階段
│   ├── code-review.md
│   ├── security-review.md
│   └── performance-review.md
│
├── appendix/                 # 附錄
│   ├── pitfalls/             # 踩坑案例
│   ├── success-cases/        # 成功案例
│   ├── sessions/             # 精選 AI 對話
│   ├── tech-stack-examples/  # 技術棧參考實作
│   │   └── react-nextjs/
│   └── prompt-cheatsheet.md
│
└── templates/                # 可複製模板
```

## For AI Agents

### 使用方式

1. **接收任務後**：根據任務類型定位到對應目錄
2. **閱讀相關文件**：獲取流程步驟和 Prompt 範本
3. **執行任務**：使用文件中的 Prompt 或根據 SOP 操作
4. **遇到問題**：查閱 `appendix/pitfalls/` 尋找類似案例

### 任務類型對應

| 任務類型 | 起始文件 |
|----------|----------|
| 新專案規劃 | `01-planning/requirement-analysis.md` |
| 技術棧選擇 | `01-planning/tech-stack-selection.md` |
| 前端元件開發 | `02-development/frontend/design-system.md` → `component-development.md` |
| API 開發 | `02-development/backend/api-design.md` |
| 資料庫設計 | `02-development/backend/database.md` |
| 前後端整合 | `02-development/shared/integration.md` |
| 程式碼審查 | `03-review/code-review.md` |

### 變數系統

本文件系統使用 `${VARIABLE}` 語法保持技術棧無關：

```markdown
使用 ${FRAMEWORK} 建立 ${COMPONENT_NAME} 元件...
```

常用變數：
- `${FRAMEWORK}` — 前端框架（React, Vue, Angular）
- `${LANGUAGE}` — 程式語言（TypeScript, JavaScript）
- `${CSS_SOLUTION}` — CSS 方案（Tailwind, CSS Modules）
- `${API_STYLE}` — API 風格（REST, GraphQL, tRPC）
- `${DATABASE}` — 資料庫（PostgreSQL, MongoDB）
- `${ORM}` — ORM 工具（Prisma, Drizzle）

## For Engineers

### 快速開始

1. 閱讀 `QUICKSTART.md` 了解基本概念
2. 根據角色選擇對應的 `02-development/` 子目錄
3. 遇到問題時查閱 `appendix/pitfalls/`

### 貢獻指南

- **新增踩坑案例**：`appendix/pitfalls/case-##-description.md`
- **新增成功案例**：`appendix/success-cases/case-##-description.md`
- **優化 Prompt**：更新對應流程文件的 Prompts 章節
- **新增技術棧範例**：`appendix/tech-stack-examples/[tech-stack]/`

### 文件格式

所有文件遵循統一格式，詳見 `openspec/project.md`：

```yaml
---
title: "文件標題"
id: "唯一識別碼"
category: "planning|development|review"
subcategory: "frontend|backend|shared"  # development 必填
ai_usage: ["使用場景"]
version: "1.0.0"
last_updated: "YYYY-MM-DD"
---
```

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1.0 | 2026-01-23 | MVP：目錄結構、README、design-system、踩坑案例 |

---

*Maintained with [OpenSpec](../openspec/)*

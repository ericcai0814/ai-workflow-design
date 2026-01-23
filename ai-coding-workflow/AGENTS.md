---
title: "AI Agents 指引"
id: "agents"
version: "1.0.0"
last_updated: "2026-01-23"
---

# AI Coding Workflow - Agents 指引

> 這是 AI Agent 的總入口文件。當你被要求使用 AI Coding Workflow 時，請閱讀此文件。

---

## 這是什麼？

AI Coding Workflow 是一個**標準化的 AI 輔助開發流程系統**，提供：

- **流程文件**：規劃、開發、審核各階段的標準流程
- **Prompt 範本**：可直接使用的 AI Prompt
- **踩坑案例**：從真實專案提煉的問題與解決方案
- **最佳實踐**：團隊通用的開發規範

---

## 快速導航

### 我要做什麼？

| 任務 | 閱讀文件 |
|------|----------|
| 設置 Workflow 到專案 | `SETUP.md` |
| 規劃新功能 | `01-planning/requirement-analysis.md` |
| 選擇技術棧 | `01-planning/tech-stack-selection.md` |
| 建立設計系統 | `02-development/frontend/design-system.md` |
| 開發前端元件 | `02-development/frontend/component-development.md` |
| 設計 API | `02-development/backend/api-design.md` |
| 設計資料庫 | `02-development/backend/database.md` |
| 排查問題 | `appendix/pitfalls/` |

### 文件結構

```
ai-coding-workflow/
├── AGENTS.md           ← 你在這裡（AI 總入口）
├── SETUP.md            ← 如何設置到專案
├── README.md           ← 系統總覽
├── QUICKSTART.md       ← 快速開始
│
├── 01-planning/        ← 規劃階段
├── 02-development/     ← 開發階段
│   ├── frontend/       ← 前端開發
│   ├── backend/        ← 後端開發
│   └── shared/         ← 共用流程
├── 03-review/          ← 審核階段
│
└── appendix/           ← 附錄
    ├── pitfalls/       ← 踩坑案例
    ├── success-cases/  ← 成功案例
    └── glossary.md     ← 術語表
```

---

## 工作原則

### 1. 先讀文件再動手

當任務符合以下情境時，**先閱讀對應文件**：

- 建立設計系統 → 讀 `design-system.md`
- 開發新元件 → 讀 `component-development.md`
- 設計 API → 讀 `api-design.md`
- 遇到問題 → 查 `appendix/pitfalls/`

### 2. 使用 Prompt 範本

每個流程文件都包含 `## Prompts` 區塊，提供可直接使用的 Prompt 範本。

### 3. 替換變數

文件中的 `${VARIABLE}` 需要替換為專案的實際值：

| 變數 | 說明 | 範例 |
|------|------|------|
| `${FRAMEWORK}` | 前端框架 | React, Vue, Angular |
| `${LANGUAGE}` | 程式語言 | TypeScript, JavaScript |
| `${CSS_SOLUTION}` | CSS 方案 | Tailwind, CSS Modules |
| `${UI_LIBRARY}` | UI 元件庫 | Shadcn, Vuetify, MUI |
| `${DATABASE}` | 資料庫 | PostgreSQL, MongoDB |
| `${ORM}` | ORM 工具 | Prisma, Drizzle |

### 4. 記錄新發現

- 遇到新踩坑 → 記錄到 `appendix/pitfalls/`
- 發現好模式 → 記錄到 `appendix/success-cases/`

---

## 常見場景

### 場景 1：新專案啟動

```
1. 閱讀 01-planning/requirement-analysis.md
2. 閱讀 01-planning/tech-stack-selection.md
3. 根據選定的技術棧，進入 02-development/
```

### 場景 2：前端功能開發

```
1. 確認設計系統已建立（02-development/frontend/design-system.md）
2. 閱讀 02-development/frontend/component-development.md
3. 使用 Prompt 範本開發元件
```

### 場景 3：遇到部署問題

```
1. 查閱 appendix/pitfalls/ 目錄
2. 找到類似問題的案例
3. 參考解決方案
```

---

## 與其他系統的關係

| 系統 | 關係 |
|------|------|
| **OpenSpec** | 可並存使用。OpenSpec 管理變更提案，AI Coding Workflow 管理開發流程 |
| **CLAUDE.md** | AI Coding Workflow 的觸發規則會加入 CLAUDE.md |

---

## 相關文件

- [SETUP.md](./SETUP.md) — 如何設置到專案
- [README.md](./README.md) — 系統總覽
- [QUICKSTART.md](./QUICKSTART.md) — 快速開始
- [DESIGN.md](./DESIGN.md) — 技術設計文件

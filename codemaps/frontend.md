# Frontend Codemap

**Last Updated:** 2026-01-28
**Scope:** Skills, Commands（面向用戶的介面）

## Overview

此專案沒有傳統前端 UI，但有以下用戶介面：

```
├── plugins/ai-coding-workflow/skills/
│   └── ai-coding-workflow/
│       ├── SKILL.md              # Skill 入口
│       ├── references/           # 開發參考文件（55 個）
│       └── templates/            # 輸出模板（6 個）
└── .claude/
    ├── skills/openspec-*/        # OpenSpec Skills（10 個）
    └── commands/opsx/            # OpenSpec Commands（10 個）
```

## AI Coding Workflow Skill

### Entry Point

**File:** `plugins/ai-coding-workflow/skills/ai-coding-workflow/SKILL.md`

**觸發方式：**

- 執行 `/ai-coding-workflow` 命令
- 關鍵字自動觸發

### Trigger Keywords

| 關鍵字                       | 任務類型 | 讀取目錄                              |
| ---------------------------- | -------- | ------------------------------------- |
| 分析需求、建立計畫、技術選型 | 規劃     | `references/01-planning/`             |
| 設計系統、建立元件、Token    | 前端開發 | `references/02-development/frontend/` |
| API 設計、資料庫、認證       | 後端開發 | `references/02-development/backend/`  |
| 驗證、測試、三層驗證         | 測試整合 | `references/02-development/shared/`   |
| 程式碼審查、PR review        | 審核     | `references/03-review/`               |
| 問題、錯誤、bug              | 排查     | `references/appendix/pitfalls/`       |

### Reference Structure

```
references/
├── 01-planning/           # 規劃階段
│   ├── overview.md
│   ├── task-decomposition.md
│   ├── tech-stack-selection.md
│   └── prompts/           # 可執行 Prompt
├── 02-development/        # 開發階段
│   ├── frontend/          # 前端（10 個文件）
│   ├── backend/           # 後端（8 個文件）
│   └── shared/            # 共用（6 個文件）
├── 03-review/             # 審核階段
│   └── code-review-checklist.md
└── appendix/              # 附錄
    ├── pitfalls/          # 踩坑案例
    ├── success-cases/     # 成功案例
    └── prompt-cheatsheet.md
```

### Templates

| Template              | Purpose            |
| --------------------- | ------------------ |
| `feature-spec.md`     | 功能規格模板       |
| `api-spec.md`         | API 規格模板       |
| `component-spec.md`   | 元件規格模板       |
| `database-schema.md`  | 資料庫 Schema 模板 |
| `task-plan.md`        | 任務計畫模板       |
| `deviation-report.md` | 偏差報告模板       |

## OpenSpec Skills

位於 `.claude/skills/`，用於規格驅動開發：

| Skill                          | Purpose    | Command              |
| ------------------------------ | ---------- | -------------------- |
| `openspec-explore`             | 探索模式   | `/opsx:explore`      |
| `openspec-new-change`          | 建立新變更 | `/opsx:new`          |
| `openspec-continue-change`     | 繼續變更   | `/opsx:continue`     |
| `openspec-ff-change`           | 快進建立   | `/opsx:ff`           |
| `openspec-apply-change`        | 實作變更   | `/opsx:apply`        |
| `openspec-verify-change`       | 驗證變更   | `/opsx:verify`       |
| `openspec-sync-specs`          | 同步規格   | `/opsx:sync`         |
| `openspec-archive-change`      | 歸檔變更   | `/opsx:archive`      |
| `openspec-bulk-archive-change` | 批量歸檔   | `/opsx:bulk-archive` |
| `openspec-onboard`             | 導覽教學   | `/opsx:onboard`      |

## OpenSpec Commands

位於 `.claude/commands/opsx/`，為 Skills 的快捷入口。

## Related Codemaps

- [Architecture](./architecture.md)
- [Backend (Hooks/Scripts)](./backend.md)
- [Data (Configs)](./data.md)

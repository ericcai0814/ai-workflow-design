# Frontend Codemap

**Last Updated:** 2026-02-05
**Scope:** Skills, Commands（面向用戶的介面）

## Overview

此專案沒有傳統前端 UI，但有以下用戶介面：

```
├── plugins/ai-coding-workflow/skills/
│   ├── planning/                  # 規劃 Skill
│   │   ├── SKILL.md
│   │   └── references/ (7 個文件)
│   ├── frontend/                  # 前端開發 Skill
│   │   ├── SKILL.md
│   │   └── references/ (13 個文件)
│   ├── backend/                   # 後端開發 Skill
│   │   ├── SKILL.md
│   │   └── references/ (8 個文件)
│   ├── validation/                # 驗證測試 Skill
│   │   ├── SKILL.md
│   │   └── references/ (9 個文件)
│   ├── review/                    # 程式碼審查 Skill
│   │   ├── SKILL.md
│   │   └── references/ (3 個文件)
│   ├── troubleshooting/           # 問題排查 Skill
│   │   ├── SKILL.md
│   │   └── references/ (6 個文件)
│   └── detect-context/            # 上下文偵測 Skill
│       └── SKILL.md
├── plugins/ai-coding-workflow/templates/
│   ├── phase-structure.md         # 四階段流程結構模板
│   └── prompt-variable-guide.md   # Prompt 變數說明模板
└── .claude/
    ├── skills/openspec-*/         # OpenSpec Skills（10 個）
    └── commands/opsx/             # OpenSpec Commands（10 個）
```

## AI Coding Workflow Skills (v2.1.0)

### Skill 架構

v2.1.0 將原本的單一 skill 拆分為 **7 個獨立 skills**，每個 skill 服務單一任務類型，降低 context 消耗。

每個 skill 遵循標準化四階段流程：

1. **Phase 1** — 任務理解（調用 detect-context + 需求釐清）
2. **Phase 2** — 任務規劃（複雜度評估 + 執行計畫，需用戶確認）
3. **Phase 3** — 任務執行（強制讀取 prompt 指令 + 逐步實作）
4. **Phase 4** — 交付驗證（70% MVP 輸出）

### Trigger Keywords

| Skill           | 關鍵字                       | Reference 文件數 |
| --------------- | ---------------------------- | ---------------- |
| planning        | 分析需求、建立計畫、技術選型 | 7                |
| frontend        | 設計系統、建立元件、Token    | 13               |
| backend         | API 設計、資料庫、認證       | 8                |
| validation      | 驗證、測試、三層驗證         | 9                |
| review          | 程式碼審查、PR review        | 3                |
| troubleshooting | 問題、錯誤、bug              | 6                |
| detect-context  | （自動調用）                 | 0（知識庫內建）  |

### Reference Structure（per skill）

每個 skill 的 references/ 目錄結構：

```
references/
├── *.md              # 主題參考文件
└── prompts/          # 可執行 Prompt（含變數說明）
    └── *.md
```

### Planning References (7)

| File                            | Purpose         |
| ------------------------------- | --------------- |
| overview.md                     | 規劃流程概覽    |
| requirement-analysis.md         | 需求分析方法    |
| task-decomposition.md           | 任務拆解策略    |
| tech-stack-selection.md         | 技術選型指南    |
| architecture-design.md          | 架構設計原則    |
| prompts/analyze-requirements.md | 需求分析 Prompt |
| prompts/create-plan.md          | 建立計畫 Prompt |

### Frontend References (13)

| File                              | Purpose           |
| --------------------------------- | ----------------- |
| overview.md                       | 前端開發概覽      |
| design-system.md                  | 設計系統建立      |
| component-development.md          | 元件開發方法      |
| component-library.md              | 元件庫規劃        |
| routing.md                        | 路由設定          |
| state-management.md               | 狀態管理          |
| token-system.md                   | Design Token      |
| documentation-guide.md            | 文件撰寫指南      |
| prompts/create-component.md       | 建立元件 Prompt   |
| prompts/setup-design-system.md    | 設計系統 Prompt   |
| prompts/setup-routing.md          | 路由設定 Prompt   |
| prompts/setup-state-management.md | 狀態管理 Prompt   |
| prompts/setup-token-system.md     | Token 系統 Prompt |

### Backend References (8)

| File                    | Purpose           |
| ----------------------- | ----------------- |
| overview.md             | 後端開發概覽      |
| api-design.md           | API 設計規範      |
| database.md             | 資料庫設計        |
| authentication.md       | 認證授權          |
| business-logic.md       | 商業邏輯          |
| prompts/create-model.md | 建立 Model Prompt |
| prompts/design-api.md   | API 設計 Prompt   |
| prompts/setup-auth.md   | 認證設定 Prompt   |

### Validation References (9)

| File                              | Purpose         |
| --------------------------------- | --------------- |
| validation-framework.md           | 驗證框架概覽    |
| testing.md                        | 測試策略        |
| git-workflow.md                   | Git 工作流      |
| integration.md                    | 整合策略        |
| prompts/bug-fixing.md             | Bug 修復 Prompt |
| prompts/feature-implementation.md | 功能實作 Prompt |
| prompts/git-branch-create.md      | 分支建立 Prompt |
| prompts/git-merge-flow.md         | 合併流程 Prompt |
| prompts/integration-test.md       | 整合測試 Prompt |

### Review References (3)

| File                     | Purpose           |
| ------------------------ | ----------------- |
| overview.md              | 審查流程概覽      |
| code-review-checklist.md | 審查清單          |
| prompts/review-code.md   | 程式碼審查 Prompt |

### Troubleshooting References (6)

| File                            | Purpose          |
| ------------------------------- | ---------------- |
| index.md                        | 案例索引         |
| prompt-cheatsheet.md            | Prompt 速查表    |
| case-01-cicd-configuration.md   | CI/CD 配置踩坑   |
| case-02-astro5-env-variables.md | Astro 5 環境變數 |
| case-03-vercel-api-404.md       | Vercel API 404   |
| prompts/bug-fixing.md           | Bug 修復 Prompt  |

### Templates (共用)

| Template                   | Purpose             |
| -------------------------- | ------------------- |
| `phase-structure.md`       | 四階段流程結構定義  |
| `prompt-variable-guide.md` | Prompt 變數使用指南 |

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

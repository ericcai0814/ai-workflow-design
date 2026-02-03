# AI Coding Workflow Plugin

> Claude Code 插件：團隊標準化 AI 輔助開發工作流程

## 安裝

```bash
# 1. 添加 marketplace
/plugin marketplace add https://github.com/ericcai0814/ai-workflow-design.git

# 2. 安裝插件
/plugin install ai-coding-workflow@ai-coding-workflow
```

## Skills

v2.0 重構為 6 個獨立 skill，各自服務單一任務類型：

| Skill             | 描述                                         | 觸發關鍵字                                         |
| ----------------- | -------------------------------------------- | -------------------------------------------------- |
| `planning`        | 專案規劃（需求分析、技術選型、架構設計）     | 分析需求、建立計畫、專案規劃、技術選型、架構設計   |
| `frontend`        | 前端開發（設計系統、元件開發、狀態管理）     | 設計系統、建立元件、前端、UI、元件開發、狀態管理   |
| `backend`         | 後端開發（API 設計、資料庫、認證）           | API 設計、資料庫、後端、認證、商業邏輯、中間件     |
| `validation`      | 驗證測試（驗證框架、整合測試、E2E 測試）     | 驗證、測試、整合、E2E、端對端                      |
| `review`          | 程式碼審查（程式碼審查、安全審查、效能審查） | 程式碼審查、review、安全審查、效能審查、code review|
| `troubleshooting` | 問題排查（踩坑案例、除錯流程、錯誤分析）     | 問題、錯誤、bug、修復、除錯、debug                 |
| `detect-context`  | 專案上下文偵測（技術棧、狀態、結構）         | 由其他 skill 自動調用                              |

### 使用方式

```bash
# 直接使用 skill
/planning
/frontend
/backend
/validation
/review
/troubleshooting

# 或透過關鍵字自動觸發
"幫我分析這個需求"  # 觸發 planning
"建立一個 Button 元件"  # 觸發 frontend
"設計 User API"  # 觸發 backend
"幫我寫測試"  # 觸發 validation
"review 這段程式碼"  # 觸發 review
"這個 bug 怎麼修"  # 觸發 troubleshooting
```

## 四階段工作流程

每個 skill 都遵循標準化的 Phase 結構：

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

## Hooks

| Hook                      | 階段        | 描述                                              |
| ------------------------- | ----------- | ------------------------------------------------- |
| `sensitive-file-guard.js` | PreToolUse  | 阻止讀取或修改敏感檔案（.env, credentials, keys） |
| `markdown-lint.js`        | PostToolUse | Markdown 格式檢查（YAML Front Matter, 標題層級）  |

## 目錄結構

```
ai-coding-workflow/
├── .claude-plugin/
│   └── plugin.json           # Plugin 元數據
├── skills/
│   ├── planning/SKILL.md     # 規劃 skill
│   ├── frontend/SKILL.md     # 前端 skill
│   ├── backend/SKILL.md      # 後端 skill
│   ├── validation/SKILL.md   # 驗證 skill
│   ├── review/SKILL.md       # 審查 skill
│   ├── troubleshooting/SKILL.md  # 問題排查 skill
│   └── detect-context/SKILL.md   # 上下文偵測 skill
├── agents/
│   └── detect-context.md     # 上下文偵測 agent
├── templates/
│   └── phase-structure.md    # Phase 結構模板
├── hooks/
│   ├── hooks.json
│   └── scripts/
│       ├── sensitive-file-guard.js
│       └── markdown-lint.js
└── README.md
```

## 遷移指南（v1.x → v2.0）

| 舊命令                       | 新命令           | 說明                       |
| ---------------------------- | ---------------- | -------------------------- |
| `/ai-coding-workflow`        | `/planning`      | 規劃類任務                 |
| `/ai-coding-workflow`        | `/frontend`      | 前端開發任務               |
| `/ai-coding-workflow`        | `/backend`       | 後端開發任務               |
| `/ai-coding-workflow`        | `/validation`    | 驗證測試任務               |
| `/ai-coding-workflow`        | `/review`        | 程式碼審查任務             |
| `/ai-coding-workflow`        | `/troubleshooting` | 問題排查任務             |
| `/ai-coding-workflow:start`  | (已移除)         | 功能已整合到各獨立 skill   |
| `/ai-coding-workflow:guide`  | (已移除)         | 功能已整合到各獨立 skill   |

### Breaking Changes

- `ai-coding-workflow` skill 已移除，請使用對應的獨立 skill
- `start` skill 已移除，直接使用對應任務類型的 skill
- `guide` skill 已移除，各 skill 已包含使用指引

## 版本

| 版本  | 日期       | 變更                                                   |
| ----- | ---------- | ------------------------------------------------------ |
| 2.0.0 | 2026-02-04 | 重構為 6 個獨立 skill，移除 ai-coding-workflow、start、guide |
| 1.1.0 | 2026-02-03 | 重構為結構化四階段工作流程                             |
| 1.0.0 | 2026-01-27 | 初始 plugin 版本，包含 skill + hooks                   |

## 授權

MIT

# Change: 將 AI Coding Workflow 轉化為 Agent Skill

## Why

目前 ai-coding-workflow 以獨立目錄形式存在於專案根目錄，需要透過 CLAUDE.md 觸發規則來引導 AI 讀取。

**問題**：
- 觸發規則是「建議」而非「指令」，AI 可能忽略
- 結構不符合 Claude Code Skills 官方規範
- 難以透過 `/skill-name` 直接調用

**顧問建議（Kyle）**：
> 「定義公司自己的 Agent Skills，讓 AI Agent 用 Skills 完成任務，把規範訂在 Skills 裡面，包含腳本。」
>
> 「與其讓 Agent 每次做的東西每一步符合規範，不如讓 Agent 在一個定義清楚的架構下，快速完成 70%，先得到一個能用的 MVP，再讓人工介入快速迭代細節調修。」

## What Changes

### 1. 架構轉變

```
現況：
ai-coding-workflow/（專案根目錄）
      ↓
CLAUDE.md 觸發規則 → AI 讀取 → AI 判斷執行
                                    ↑
                              品質不穩定

目標：
.claude/skills/ai-coding-workflow/（符合官方規範）
├── SKILL.md              # 統一入口 + 索引
└── references/           # 知識庫（原 ai-coding-workflow 內容）
      ↓
/ai-coding-workflow → SKILL.md 索引導向 → 讀取 references → 產出 70% MVP → 人工迭代
```

### 2. 目錄結構（符合官方規範）

```
.claude/skills/ai-coding-workflow/
├── SKILL.md                        # ⭐ 主要 skill 文件（統一入口 + 索引）
├── README.md                       # 使用指南
├── QUICKSTART.md                   # 快速開始
│
├── references/                     # 📚 知識庫（原 ai-coding-workflow 內容）
│   ├── 01-planning/
│   │   ├── overview.md
│   │   ├── task-decomposition.md
│   │   └── prompts/
│   │       ├── analyze-requirements.md
│   │       └── create-plan.md
│   │
│   ├── 02-development/
│   │   ├── frontend/
│   │   │   ├── design-system.md
│   │   │   ├── component-development.md
│   │   │   └── prompts/
│   │   ├── backend/
│   │   │   ├── api-design.md
│   │   │   └── prompts/
│   │   └── shared/
│   │       ├── validation-framework.md
│   │       └── prompts/
│   │
│   ├── 03-review/
│   │   ├── code-review-checklist.md
│   │   └── prompts/
│   │
│   └── appendix/
│       ├── pitfalls/
│       ├── success-cases/
│       └── prompt-cheatsheet.md
│
├── scripts/                        # 輔助腳本（重複動作自動化）
│   ├── create-component.sh         # 建立元件檔案結構
│   ├── create-dbml.sh              # 建立 DBML 檔案
│   └── run-tests.sh                # 執行測試
│
└── assets/                         # 資源文件
```

### 3. SKILL.md 設計（統一入口 + 索引）

**Frontmatter**：
```yaml
---
name: ai-coding-workflow
description: 團隊標準化開發工作流程。使用時機：開始新專案、建立設計系統、開發元件/API、排查問題。根據任務類型自動導向對應的參考文件，快速產出 70% MVP。
---
```

**索引邏輯**：

| 觸發關鍵字 | 任務類型 | 導向文件 |
|------------|----------|----------|
| 分析需求、建立計畫、專案規劃 | 規劃 | `references/01-planning/` |
| 設計系統、建立元件、前端 | 前端開發 | `references/02-development/frontend/` |
| API 設計、資料庫、後端 | 後端開發 | `references/02-development/backend/` |
| 程式碼審查、review | 審核 | `references/03-review/` |
| 問題、錯誤、bug、不 work | 排查 | `references/appendix/pitfalls/` |

**執行流程**：
1. 根據關鍵字判斷任務類型
2. 導向對應的 `references/` 文件
3. 讀取參考文件
4. 執行任務（可調用 scripts/ 中的腳本）
5. 產出 70% MVP
6. 提示：「MVP 已完成，請檢查後告訴我需要調整的地方」

### 4. 腳本定義（scripts/）

針對重複性動作建立自動化腳本：

| 腳本 | 用途 | 範例 |
|------|------|------|
| `create-component.sh` | 建立元件檔案結構 | `./scripts/create-component.sh Button` |
| `create-dbml.sh` | 建立 DBML 資料庫定義檔 | `./scripts/create-dbml.sh users` |
| `run-tests.sh` | 執行測試 | `./scripts/run-tests.sh` |

### 5. 70% MVP 定義

**驗收標準**：樣式正常、功能正常

| 項目 | MVP 包含 | 人工迭代 |
|------|----------|----------|
| 檔案結構 | ✅ 正確位置、正確命名 | - |
| 基本功能 | ✅ 核心功能可運行 | 功能調整、功能疊加 |
| 樣式 | ✅ 套用 Design Token、樣式正常 | 細節微調 |
| 型別定義 | ✅ 主要 props/types | 完整型別 |
| 邊界處理 | ⏸️ 基本處理 | 完整邊界處理 |

## Impact

### Affected Systems
- **移除**：專案根目錄的 `ai-coding-workflow/`
- **新增**：`.claude/skills/ai-coding-workflow/`
- **調整**：CLAUDE.md 觸發規則（可簡化或移除）

### 預期成果

| 指標 | 現況 | 目標 |
|------|------|------|
| 調用方式 | CLAUDE.md 觸發規則 | `/ai-coding-workflow` 或自動觸發 |
| 符合規範 | 自定義結構 | Claude Code Skills 官方規範 |
| 執行穩定性 | AI 自行判斷 | 索引導向 + 腳本輔助 |
| 分發方式 | degit 複製目錄 | degit 複製 skill |

### 待確認事項

> ⚠️ 以下問題待 Kyle 回覆後更新

1. **「定義清楚的架構」包含什麼？**
   - [ ] 檔案結構規範
   - [ ] 命名規則
   - [ ] 模組劃分
   - [ ] 其他？

## Success Criteria

### Phase 1：建立 Skill 結構
- [ ] 建立 `.claude/skills/ai-coding-workflow/` 目錄結構
- [ ] 建立 SKILL.md（統一入口 + 索引）
- [ ] 遷移現有文件到 `references/`
- [ ] 翻譯關鍵文件為繁體中文
- [ ] 建立基本腳本（create-component.sh）

### Phase 2：驗證可行性
- [ ] 測試 `/ai-coding-workflow` 調用
- [ ] 測試自動觸發功能
- [ ] 測試索引導向功能
- [ ] 測試腳本執行
- [ ] 在 ewill-web 專案實測
- [ ] 收集回饋並調整

### Phase 3：團隊推廣
- [ ] 完善文件和使用指南
- [ ] 收集團隊使用回饋
- [ ] 持續迭代優化

## Key Decisions

| 決策點 | 選擇 | 原因 |
|--------|------|------|
| 知識庫位置 | `references/` 目錄內 | 符合官方規範 |
| 入口設計 | 單一 SKILL.md + 索引 | 統一入口，易於維護 |
| 腳本 | 重複動作自動化 | 建立檔案結構、執行測試等 |
| 語言 | 繁體中文 | 團隊需求 |
| MVP 標準 | 樣式正常 + 功能正常 | Kyle 建議的 70% 定義 |

## References

- [Claude Code Skills 官方文件](https://code.claude.com/docs/en/skills)
- [Prototype 參考](/.claude/skills/ai-coding-workflow-prototype/)

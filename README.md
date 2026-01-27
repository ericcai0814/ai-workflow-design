# AI Coding Workflow

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Markdown](https://img.shields.io/badge/-Markdown-000000?logo=markdown&logoColor=white)
![Claude Code](https://img.shields.io/badge/-Claude%20Code-6B4FBB?logo=anthropic&logoColor=white)

**Claude Code Plugin：團隊標準化 AI 輔助開發工作流程**

根據任務類型自動導向對應的參考文件，快速產出 70% MVP。涵蓋規劃、前端、後端、驗證、審查等完整開發週期。

---

## 安裝

### 方式一：Plugin 安裝（推薦）

在 Claude Code 中執行：

```bash
# 1. 添加 marketplace
/plugin marketplace add https://github.com/ericcai0814/ai-workflow-design.git

# 2. 安裝插件
/plugin install ai-coding-workflow@ai-coding-workflow
```

或直接加入 `~/.claude/settings.json`：

```json
{
  "extraKnownMarketplaces": {
    "ai-coding-workflow": {
      "source": {
        "source": "github",
        "repo": "ericcai0814/ai-workflow-design"
      }
    }
  },
  "enabledPlugins": {
    "ai-coding-workflow@ai-coding-workflow": true
  }
}
```

### 方式二：手動安裝

```bash
# 使用 degit 複製 skill 到專案
cd /path/to/your-project
npx degit ericcai0814/ai-workflow-design/plugins/ai-coding-workflow/skills/ai-coding-workflow .claude/skills/ai-coding-workflow
```

> **注意**：手動安裝只會複製 skill，不包含 hooks。如需 hooks 請使用 Plugin 方式安裝。

### 使用

安裝後可使用 `/ai-coding-workflow` 命令，或說關鍵字自動觸發：

```
「幫我建立一個 Button 元件」
「設計用戶管理 API」
「我的環境變數在 production 不 work」
```

---

## 功能總覽

### Skills - 自動觸發工作流程

| 關鍵字                       | 任務類型 | 讀取文件                   |
| ---------------------------- | -------- | -------------------------- |
| 分析需求、建立計畫、技術選型 | 規劃     | `01-planning/`             |
| 設計系統、建立元件、Token    | 前端開發 | `02-development/frontend/` |
| API 設計、資料庫、認證       | 後端開發 | `02-development/backend/`  |
| 驗證、測試、三層驗證         | 測試整合 | `02-development/shared/`   |
| 程式碼審查、PR review        | 審核     | `03-review/`               |
| 問題、錯誤、bug              | 排查     | `appendix/pitfalls/`       |

### Hooks - 自動防護

| Hook                      | 階段        | 功能                                              |
| ------------------------- | ----------- | ------------------------------------------------- |
| `sensitive-file-guard.js` | PreToolUse  | 阻止讀取或修改敏感檔案（.env, credentials, keys） |
| `markdown-lint.js`        | PostToolUse | Markdown 格式檢查（YAML Front Matter, 標題層級）  |

---

## 核心概念

### 70% MVP 標準

| 項目     | MVP 包含              | 人工迭代           |
| -------- | --------------------- | ------------------ |
| 檔案結構 | ✅ 正確位置、正確命名 | -                  |
| 基本功能 | ✅ 核心功能可運行     | 功能調整、功能疊加 |
| 樣式     | ✅ 套用 Design Token  | 細節微調           |
| 型別定義 | ✅ 主要 props/types   | 完整型別           |
| 邊界處理 | ⏸️ 基本處理           | 完整邊界處理       |

### 技術棧無關

使用變數語法，自動偵測或詢問後替換：

```
${FRAMEWORK}   - 前端框架（Vue 3、React、Angular）
${UI_LIBRARY}  - UI 框架（Vuetify、Ant Design）
${LANGUAGE}    - 後端語言（Python、Node.js、Go）
${DATABASE}    - 資料庫（PostgreSQL、MySQL）
```

---

## 目錄結構

```
.
├── .claude-plugin/
│   └── marketplace.json                 # Marketplace 定義
├── plugins/
│   └── ai-coding-workflow/              # Plugin 內容
│       ├── .claude-plugin/
│       │   └── plugin.json              # Plugin 元數據 + Hooks 設定
│       ├── skills/
│       │   └── ai-coding-workflow/
│       │       ├── SKILL.md             # 主要 Skill 定義
│       │       ├── references/          # 開發參考文件
│       │       │   ├── 01-planning/     # 規劃階段
│       │       │   │   ├── overview.md
│       │       │   │   ├── task-decomposition.md
│       │       │   │   ├── tech-stack-selection.md
│       │       │   │   └── prompts/     # 可執行 Prompt
│       │       │   ├── 02-development/
│       │       │   │   ├── frontend/    # 前端開發
│       │       │   │   │   ├── design-system.md      # 核心：設計系統
│       │       │   │   │   ├── component-development.md
│       │       │   │   │   └── prompts/
│       │       │   │   ├── backend/     # 後端開發
│       │       │   │   │   ├── api-design.md
│       │       │   │   │   ├── database.md
│       │       │   │   │   └── prompts/
│       │       │   │   └── shared/      # 共用
│       │       │   │       ├── validation-framework.md  # 核心：三層驗證
│       │       │   │       └── testing.md
│       │       │   ├── 03-review/       # 程式碼審查
│       │       │   │   └── code-review-checklist.md
│       │       │   └── appendix/        # 附錄
│       │       │       ├── pitfalls/    # 踩坑案例
│       │       │       └── success-cases/
│       │       ├── templates/           # 輸出模板
│       │       │   ├── feature-spec.md
│       │       │   ├── api-spec.md
│       │       │   └── component-spec.md
│       │       └── scripts/             # 輔助腳本
│       └── hooks/
│           ├── sensitive-file-guard.js
│           └── markdown-lint.js
├── .claude/                             # 本專案設定
│   └── commands/openspec/               # OpenSpec 命令
└── openspec/                            # 規格文件
```

---

## 使用範例

### 開始新專案

```
「幫我分析這個專案的需求」
→ 自動讀取 01-planning/ 相關文件
→ 執行需求分析 Prompt
→ 產出任務計畫
```

### 建立設計系統

```
「建立設計系統」
→ 讀取 design-system.md
→ 設置 Design Token
→ 建立基礎元件
```

### 修復 Bug

```
「這個 API 回傳 404」
→ 檢查 pitfalls/index.md 是否有類似問題
→ 套用已記錄的解決方案或執行除錯流程
```

---

## 管理插件

```bash
# 列出已安裝的插件
/plugin list

# 更新 marketplace
/plugin marketplace update

# 移除插件
/plugin uninstall ai-coding-workflow@ai-coding-workflow
```

---

## 重要文件

開始使用前建議先閱讀：

| 文件                                                       | 說明                        |
| ---------------------------------------------------------- | --------------------------- |
| `references/02-development/frontend/design-system.md`      | 所有前端工作的基礎          |
| `references/02-development/shared/validation-framework.md` | 三層驗證，防止「修 A 壞 B」 |
| `references/appendix/pitfalls/index.md`                    | 常見踩坑案例                |

---

## 授權

MIT

# AI Coding Workflow

> Claude Code Plugin：團隊標準化 AI 輔助開發工作流程

## 安裝

```bash
# 1. 添加 marketplace
/plugin marketplace add https://github.com/ericcai0814/ai-workflow-design.git

# 2. 安裝插件
/plugin install ai-coding-workflow@ai-coding-workflow
```

## 功能

### Skills

安裝後可使用 `/ai-coding-workflow` 命令，或說以下關鍵字自動觸發：

| 關鍵字             | 任務類型 |
| ------------------ | -------- |
| 分析需求、建立計畫 | 規劃     |
| 設計系統、建立元件 | 前端開發 |
| API 設計、資料庫   | 後端開發 |
| 程式碼審查         | 審核     |
| 問題、錯誤、bug    | 排查     |

### Hooks（自動生效）

| Hook                      | 階段        | 描述                                             |
| ------------------------- | ----------- | ------------------------------------------------ |
| `sensitive-file-guard.js` | PreToolUse  | 阻止修改敏感檔案（.env, credentials, keys）      |
| `markdown-lint.js`        | PostToolUse | Markdown 格式檢查（YAML Front Matter, 標題層級） |

## 目錄結構

```
.
├── .claude-plugin/
│   └── marketplace.json              # Marketplace 定義
├── plugins/
│   └── ai-coding-workflow/           # Plugin 內容
│       ├── .claude-plugin/
│       │   └── plugin.json           # Plugin 元數據 + Hooks
│       ├── skills/
│       │   └── ai-coding-workflow/
│       │       ├── SKILL.md
│       │       ├── references/       # 開發參考文件
│       │       └── templates/        # 模板
│       └── hooks/
│           ├── sensitive-file-guard.js
│           └── markdown-lint.js
├── .claude/                          # 本專案設定
│   ├── commands/openspec/            # OpenSpec 命令
│   └── hooks/                        # 本專案 hooks
└── openspec/                         # 規格文件
```

## 管理插件

```bash
# 列出已安裝的插件
/plugin list

# 更新 marketplace
/plugin marketplace update

# 移除插件
/plugin uninstall ai-coding-workflow@ai-coding-workflow
```

## 授權

MIT

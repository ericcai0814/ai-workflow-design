# AI Coding Workflow Plugin

> Claude Code 插件：團隊標準化 AI 輔助開發工作流程

## 安裝

### 方式一：透過 Marketplace（推薦）

```bash
# 1. 添加 marketplace
/plugin marketplace add ericcai0814/ai-workflow-design/plugins

# 2. 安裝插件
/plugin install ai-coding-workflow@ai-coding-workflow
```

### 方式二：直接從 GitHub 安裝

```bash
/plugin install --source github:ericcai0814/ai-workflow-design --path plugins/ai-coding-workflow
```

## 包含內容

### Skills

| Skill                | 描述                                       |
| -------------------- | ------------------------------------------ |
| `ai-coding-workflow` | 完整開發工作流程（規劃、前端、後端、審核） |

### Hooks

| Hook                      | 階段        | 描述                                             |
| ------------------------- | ----------- | ------------------------------------------------ |
| `sensitive-file-guard.js` | PreToolUse  | 阻止修改敏感檔案（.env, credentials, keys）      |
| `markdown-lint.js`        | PostToolUse | Markdown 格式檢查（YAML Front Matter, 標題層級） |

### 觸發關鍵字

安裝後，當你說以下關鍵字時會自動觸發：

| 關鍵字             | 任務類型 |
| ------------------ | -------- |
| 分析需求、建立計畫 | 規劃     |
| 設計系統、建立元件 | 前端開發 |
| API 設計、資料庫   | 後端開發 |
| 程式碼審查         | 審核     |
| 問題、錯誤、bug    | 排查     |

## 團隊配置

在專案的 `.claude/settings.json` 中添加以下配置，團隊成員開啟專案時會自動提示安裝：

```json
{
  "extraKnownMarketplaces": {
    "ai-coding-workflow": {
      "source": {
        "source": "git",
        "url": "https://github.com/ericcai0814/ai-workflow-design.git",
        "path": "plugins"
      }
    }
  },
  "enabledPlugins": {
    "ai-coding-workflow@ai-coding-workflow": true
  }
}
```

完整範例請參考 `settings.example.json`。

## 目錄結構

```
ai-coding-workflow/
├── .claude-plugin/
│   └── plugin.json           # Plugin 元數據 + Hooks 配置
├── skills/
│   └── ai-coding-workflow/
│       ├── SKILL.md          # Skill 定義
│       ├── references/       # 參考文件
│       ├── templates/        # 模板
│       └── scripts/          # Skill 腳本
├── hooks/
│   ├── sensitive-file-guard.js
│   └── markdown-lint.js
├── scripts/
│   └── init-claude.js        # 初始化腳本
├── settings.example.json     # 設定範例
└── README.md
```

## 版本

| 版本  | 日期       | 變更                                 |
| ----- | ---------- | ------------------------------------ |
| 1.0.0 | 2026-01-27 | 初始 plugin 版本，包含 skill + hooks |

## 授權

MIT

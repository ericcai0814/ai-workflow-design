# Backend Codemap

**Last Updated:** 2026-01-28
**Scope:** Hooks, Scripts（功能性程式碼）

## Overview

此專案沒有傳統後端服務，但有以下功能性程式碼：

```
├── plugins/ai-coding-workflow/hooks/
│   ├── sensitive-file-guard.js   # PreToolUse Hook
│   └── markdown-lint.js          # PostToolUse Hook
└── scripts/
    └── init-claude.js            # 初始化腳本
```

## Hooks

### sensitive-file-guard.js

**Type:** PreToolUse Hook
**Trigger:** `Read | Write | Edit` 操作
**Purpose:** 阻止存取敏感檔案

```
Hook Flow:
stdin (JSON) → 解析 file_path → 檢查敏感模式 → exit 0 (允許) / exit 2 (阻止)
```

**敏感檔案模式：**
| Pattern | Example |
|---------|---------|
| `.env*` | .env, .env.local, .env.production |
| `credentials*` | credentials.json |
| `secrets*` | secrets.yaml |
| `*.pem`, `*.key` | server.pem, private.key |
| `.ssh/*` | .ssh/id_rsa |

**Location:** `plugins/ai-coding-workflow/hooks/sensitive-file-guard.js:20-32`

### markdown-lint.js

**Type:** PostToolUse Hook
**Trigger:** `Write | Edit` 操作（.md 檔案）
**Purpose:** Markdown 格式檢查

**檢查項目：**

- YAML Front Matter 格式
- 標題層級正確性

**Location:** `plugins/ai-coding-workflow/hooks/markdown-lint.js`

## Scripts

### init-claude.js

**Purpose:** 初始化 Claude Code 本地設定

```
Flow:
讀取 .claude/settings.example.json
       ↓
替換 $PWD → 實際專案路徑
       ↓
寫入 .claude/settings.local.json
```

**Usage:**

```bash
node scripts/init-claude.js
```

**Location:** `scripts/init-claude.js:18-49`

## Hook Registration

Hooks 在 `plugins/ai-coding-workflow/.claude-plugin/plugin.json` 註冊：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Read|Write|Edit",
        "hooks": [
          {
            "command": "node ${CLAUDE_PLUGIN_ROOT}/hooks/sensitive-file-guard.js"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "command": "node ${CLAUDE_PLUGIN_ROOT}/hooks/markdown-lint.js" }
        ]
      }
    ]
  }
}
```

## Related Codemaps

- [Architecture](./architecture.md)
- [Frontend (Skills/Commands)](./frontend.md)
- [Data (Configs)](./data.md)

# Backend Codemap

**Last Updated:** 2026-02-05
**Scope:** Hooks, Scripts, Agents（功能性程式碼）

## Overview

此專案沒有傳統後端服務，但有以下功能性程式碼：

```
plugins/ai-coding-workflow/
├── hooks/
│   └── hooks.json                    # Hook 註冊配置
├── scripts/
│   └── hooks/
│       ├── sensitive-file-guard.js   # PreToolUse Hook
│       └── markdown-lint.js          # PostToolUse Hook
└── agents/
    └── detect-context.md             # 上下文偵測 Agent
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

| Pattern          | Example                           |
| ---------------- | --------------------------------- |
| `.env*`          | .env, .env.local, .env.production |
| `credentials*`   | credentials.json                  |
| `secrets*`       | secrets.yaml                      |
| `*.pem`, `*.key` | server.pem, private.key           |
| `.ssh/*`         | .ssh/id_rsa                       |

**Location:** `plugins/ai-coding-workflow/scripts/hooks/sensitive-file-guard.js`

### markdown-lint.js

**Type:** PostToolUse Hook
**Trigger:** `Write | Edit` 操作（.md 檔案）
**Purpose:** Markdown 格式檢查

**檢查項目：**

- YAML Front Matter 格式
- 標題層級正確性

**Location:** `plugins/ai-coding-workflow/scripts/hooks/markdown-lint.js`

## Agents

### detect-context.md

**Type:** Agent 定義
**Purpose:** 自動偵測專案技術棧
**Location:** `plugins/ai-coding-workflow/agents/detect-context.md`

**功能：**

- 偵測前端框架（React, Vue, Angular, Svelte, Astro 等）
- 偵測 UI 庫（Tailwind, Material-UI, Ant Design 等）
- 偵測後端語言與框架
- 偵測資料庫與 ORM 工具
- 偵測失敗時提供 fallback 策略

**呼叫時機：** 由各 skill 於 Phase 1（任務理解）自動調用。

## Hook Registration

Hooks 在 `plugins/ai-coding-workflow/hooks/hooks.json` 註冊：

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

**Note:** `${CLAUDE_PLUGIN_ROOT}` 指向 `plugins/ai-coding-workflow/scripts/`

## Hook Execution Flow

```
User Action (Read/Write/Edit)
    ↓
PreToolUse Hooks:
    → sensitive-file-guard.js (checks file patterns)
    → exit 0 (allow) / exit 2 (block)
    ↓
Tool Execution (Read/Write/Edit)
    ↓
PostToolUse Hooks (only Write/Edit on .md files):
    → markdown-lint.js (validates format)
    ↓
File Modification Complete
```

## Related Codemaps

- [Architecture](./architecture.md)
- [Frontend (Skills/Commands)](./frontend.md)
- [Data (Configs)](./data.md)

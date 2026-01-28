# Backend Codemap

**Last Updated:** 2026-01-28
**Scope:** Hooks, Scripts（功能性程式碼）

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
└── skills/ai-coding-workflow/
    └── scripts/
        ├── create-component.sh       # 元件建立腳本
        ├── create-dbml.sh            # DBML 資料庫定義腳本
        └── run-tests.sh              # 測試執行腳本
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

**Location:** `plugins/ai-coding-workflow/scripts/hooks/sensitive-file-guard.js:20-32`

### markdown-lint.js

**Type:** PostToolUse Hook
**Trigger:** `Write | Edit` 操作（.md 檔案）
**Purpose:** Markdown 格式檢查

**檢查項目：**

- YAML Front Matter 格式
- 標題層級正確性

**Location:** `plugins/ai-coding-workflow/scripts/hooks/markdown-lint.js`

## Skill Scripts

位於 `plugins/ai-coding-workflow/skills/ai-coding-workflow/scripts/`

### create-component.sh

**Purpose:** 建立 React 元件檔案結構

**Usage:**

```bash
./create-component.sh ComponentName
```

**生成檔案：**

```
src/components/ComponentName/
├── ComponentName.tsx       # 主元件（含 Props interface）
├── ComponentName.test.tsx  # 測試檔案
└── index.ts                # 匯出入口
```

### create-dbml.sh

**Purpose:** 建立 DBML 資料庫定義檔

**Usage:**

```bash
./create-dbml.sh table_name
```

**生成檔案：**

```
database/table_name.dbml
```

**預設欄位：** `id` (uuid pk), `created_at`, `updated_at`

### run-tests.sh

**Purpose:** 自動偵測並執行測試

**Usage:**

```bash
./run-tests.sh [test-pattern]
```

**支援框架：**

| 專案類型         | 偵測方式                              | 執行命令         |
| ---------------- | ------------------------------------- | ---------------- |
| Node.js (Vitest) | `package.json` 含 vitest              | `npx vitest run` |
| Node.js (Jest)   | `package.json` 含 jest                | `npx jest`       |
| Python           | `requirements.txt` / `pyproject.toml` | `pytest`         |

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

## Related Codemaps

- [Architecture](./architecture.md)
- [Frontend (Skills/Commands)](./frontend.md)
- [Data (Configs)](./data.md)

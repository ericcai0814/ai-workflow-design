# Data Codemap

**Last Updated:** 2026-01-28
**Scope:** JSON/YAML 配置、Schema

## Overview

```
├── .claude-plugin/
│   └── marketplace.json          # Marketplace 定義
├── plugins/ai-coding-workflow/
│   └── .claude-plugin/
│       └── plugin.json           # Plugin 元數據 + Hooks
├── .claude/
│   ├── settings.example.json     # 設定範本
│   └── settings.local.json       # 本地設定（git-ignored）
└── openspec/
    └── config.yaml               # OpenSpec 配置
```

## Configuration Files

### marketplace.json

**Location:** `.claude-plugin/marketplace.json`
**Purpose:** 定義此 repo 為 Claude Code Plugin Marketplace

```json
{
  "name": "ai-coding-workflow",
  "owner": { "name": "Eric Cai" },
  "plugins": [
    {
      "name": "ai-coding-workflow",
      "source": "./plugins/ai-coding-workflow"
    }
  ]
}
```

### plugin.json

**Location:** `plugins/ai-coding-workflow/.claude-plugin/plugin.json`
**Purpose:** Plugin 元數據、Hooks 定義

**Key Fields:**
| Field | Value |
|-------|-------|
| `name` | ai-coding-workflow |
| `version` | 1.0.0 |
| `hooks.PreToolUse` | sensitive-file-guard.js |
| `hooks.PostToolUse` | markdown-lint.js |

### settings.example.json / settings.local.json

**Location:** `.claude/settings.example.json`
**Purpose:** Claude Code 專案設定範本

**Key Fields:**
| Field | Purpose |
|-------|---------|
| `permissions.allow` | 允許的工具操作 |
| `hooks` | 專案層級 Hooks |
| `enabledPlugins` | 啟用的 Plugins |

**Note:** `settings.local.json` 由 `scripts/init-claude.js` 生成，包含實際路徑。

### config.yaml

**Location:** `openspec/config.yaml`
**Purpose:** OpenSpec 規格驅動開發配置

**Key Sections:**

| Section           | Purpose                     |
| ----------------- | --------------------------- |
| `schema`          | 工作流程類型（spec-driven） |
| `context`         | 專案上下文（AI 讀取）       |
| `rules`           | 各 artifact 的規則          |
| `conventions`     | 命名、變數、Git 慣例        |
| `constraints`     | 必須/禁止事項               |
| `best_practices`  | 最佳實踐指南                |
| `troubleshooting` | 常見錯誤排查                |
| `tool_selection`  | AI 工具選擇指南             |

## Variable System

定義於 `openspec/config.yaml:125-131`

| Variable           | Description                          |
| ------------------ | ------------------------------------ |
| `${FRAMEWORK}`     | 前端框架（React, Vue, Angular）      |
| `${LANGUAGE}`      | 程式語言（TypeScript, JavaScript）   |
| `${CSS_SOLUTION}`  | CSS 方案（Tailwind, CSS Modules）    |
| `${STATE_MANAGER}` | 狀態管理（Redux, Zustand, Pinia）    |
| `${API_STYLE}`     | API 風格（REST, GraphQL, tRPC）      |
| `${DATABASE}`      | 資料庫（PostgreSQL, MongoDB）        |
| `${ORM}`           | ORM 工具（Prisma, Drizzle, TypeORM） |

## YAML Front Matter Schema

定義於 `openspec/config.yaml:133-142`

**Required Fields:**

- `title`
- `id`
- `category`
- `version`
- `last_updated`

**Conditional Fields:**

- `subcategory` - development 階段必填（frontend|backend|shared）

**Optional Fields:**

- `ai_usage`

## Related Codemaps

- [Architecture](./architecture.md)
- [Backend (Hooks/Scripts)](./backend.md)
- [Frontend (Skills/Commands)](./frontend.md)

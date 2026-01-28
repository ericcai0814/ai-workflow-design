# Architecture Codemap

**Last Updated:** 2026-01-28
**Project Type:** Claude Code Plugin Marketplace

## Overview

```
ai-workflow-design/
├── .claude-plugin/              # Marketplace 入口
│   └── marketplace.json
├── plugins/                     # Plugin 集合
│   └── ai-coding-workflow/      # 主要 Plugin
├── .claude/                     # 本專案 Claude Code 設定
│   ├── skills/                  # OpenSpec Skills
│   └── commands/                # OpenSpec Commands
├── openspec/                    # 規格驅動開發系統
│   ├── config.yaml
│   ├── specs/
│   └── changes/
├── scripts/                     # 輔助腳本
└── codemaps/                    # 架構文件（本目錄）
```

## Module Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                    Marketplace Layer                         │
│  .claude-plugin/marketplace.json                            │
│  ↓ 定義可安裝的 plugins                                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Plugin Layer                             │
│  plugins/ai-coding-workflow/                                │
│  ├── .claude-plugin/plugin.json  ← Plugin 元數據 + Hooks    │
│  ├── skills/                     ← AI Workflow Skill        │
│  └── hooks/                      ← 安全防護腳本              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Project Config Layer                       │
│  .claude/                                                   │
│  ├── settings.local.json  ← 本地設定（git-ignored）          │
│  ├── skills/openspec-*/   ← OpenSpec 工作流程 Skills        │
│  └── commands/opsx/       ← OpenSpec 快捷命令               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    OpenSpec Layer                            │
│  openspec/                                                  │
│  ├── config.yaml     ← 專案上下文、規則、慣例               │
│  ├── specs/          ← 主規格文件                           │
│  └── changes/        ← 變更追蹤（proposal → design → tasks）│
└─────────────────────────────────────────────────────────────┘
```

## Key Entry Points

| Entry Point      | Purpose              | File                                                            |
| ---------------- | -------------------- | --------------------------------------------------------------- |
| Marketplace 入口 | Plugin 發現與安裝    | `.claude-plugin/marketplace.json`                               |
| Plugin 定義      | Plugin 元數據、Hooks | `plugins/ai-coding-workflow/.claude-plugin/plugin.json`         |
| Skill 入口       | AI Workflow 觸發點   | `plugins/ai-coding-workflow/skills/ai-coding-workflow/SKILL.md` |
| OpenSpec 配置    | 規格驅動開發設定     | `openspec/config.yaml`                                          |

## Dependencies

### External

- Claude Code CLI（運行環境）
- Node.js（Hooks 執行）

### Internal

- `ai-coding-workflow` skill 依賴 `references/` 目錄下的文件
- OpenSpec skills 依賴 `openspec/config.yaml` 的配置

## Related Codemaps

- [Backend (Hooks/Scripts)](./backend.md)
- [Frontend (Skills/Commands)](./frontend.md)
- [Data (Configs/Schemas)](./data.md)

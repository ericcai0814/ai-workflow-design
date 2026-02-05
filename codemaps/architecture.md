# Architecture Codemap

**Last Updated:** 2026-02-05
**Project Type:** Claude Code Plugin Marketplace
**Version:** 2.1.0

## Overview

```
ai-workflow-design/
├── .claude-plugin/              # Marketplace 入口
│   └── marketplace.json
├── plugins/                     # Plugin 集合
│   └── ai-coding-workflow/      # 主要 Plugin (v2.1.0)
│       ├── .claude-plugin/      # Plugin 元數據
│       ├── skills/              # 7 個獨立 Skills
│       ├── hooks/               # Hook 註冊配置
│       ├── scripts/hooks/       # Hook 腳本
│       ├── templates/           # 共用模板
│       └── agents/              # Agent 定義
├── .claude/                     # 本專案 Claude Code 設定
│   ├── skills/                  # OpenSpec Skills
│   └── commands/                # OpenSpec Commands
├── openspec/                    # 規格驅動開發系統
│   ├── config.yaml
│   ├── specs/
│   └── changes/
├── docs/plans/                  # 實作規劃文件
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
│  ├── .claude-plugin/plugin.json  ← Plugin 元數據 (v2.1.0)  │
│  ├── skills/                     ← 7 個獨立 AI Workflow     │
│  │   ├── planning/               ← 規劃                     │
│  │   ├── frontend/               ← 前端開發                  │
│  │   ├── backend/                ← 後端開發                  │
│  │   ├── validation/             ← 驗證測試                  │
│  │   ├── review/                 ← 程式碼審查                │
│  │   ├── troubleshooting/        ← 問題排查                  │
│  │   └── detect-context/         ← 上下文偵測                │
│  ├── hooks/                      ← Hook 註冊配置             │
│  ├── scripts/hooks/              ← 安全防護腳本              │
│  ├── templates/                  ← 共用模板                  │
│  └── agents/                     ← Agent 定義               │
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

| Entry Point      | Purpose              | File                                                    |
| ---------------- | -------------------- | ------------------------------------------------------- |
| Marketplace 入口 | Plugin 發現與安裝    | `.claude-plugin/marketplace.json`                       |
| Plugin 定義      | Plugin 元數據、Hooks | `plugins/ai-coding-workflow/.claude-plugin/plugin.json` |
| Skill 入口       | 各自獨立的 SKILL.md  | `plugins/ai-coding-workflow/skills/*/SKILL.md`          |
| Agent 定義       | 上下文偵測 Agent     | `plugins/ai-coding-workflow/agents/detect-context.md`   |
| OpenSpec 配置    | 規格驅動開發設定     | `openspec/config.yaml`                                  |

## Skill Architecture (v2.1.0)

```
skills/
├── planning/SKILL.md         # 觸發：分析需求、建立計畫、技術選型
├── frontend/SKILL.md         # 觸發：設計系統、建立元件、Token
├── backend/SKILL.md          # 觸發：API 設計、資料庫、認證
├── validation/SKILL.md       # 觸發：驗證、測試、三層驗證
├── review/SKILL.md           # 觸發：程式碼審查、PR review
├── troubleshooting/SKILL.md  # 觸發：問題、錯誤、bug
└── detect-context/SKILL.md   # 自動偵測專案技術棧
```

每個 skill 獨立持有自己的 `references/` 目錄，降低 context 消耗。

## Dependencies

### External

- Claude Code CLI（運行環境）
- Node.js（Hooks 執行）

### Internal

- 每個 skill 依賴自己的 `references/` 目錄下的文件
- detect-context skill 被其他 skill 於 Phase 1 調用
- OpenSpec skills 依賴 `openspec/config.yaml` 的配置
- templates/ 提供 skill 共用的結構定義

## Related Codemaps

- [Backend (Hooks/Scripts)](./backend.md)
- [Frontend (Skills/Commands)](./frontend.md)
- [Data (Configs/Schemas)](./data.md)

# AI Workflow Design

Claude Code Plugin Marketplace，主要包含 `ai-coding-workflow` plugin (v2.1.0)。

## 架構文件

開始任務前，根據需要閱讀對應的 codemap：

| 檔案                       | 何時讀取                            |
| -------------------------- | ----------------------------------- |
| `codemaps/architecture.md` | 需要理解整體架構、模組關係時        |
| `codemaps/frontend.md`     | 修改 Skills、Commands、Templates 時 |
| `codemaps/backend.md`      | 修改 Hooks、Scripts、Agents 時      |
| `codemaps/data.md`         | 修改 JSON/YAML 配置檔時             |

## 專案結構速覽

```
plugins/ai-coding-workflow/
├── skills/          # 7 個獨立 Skill（planning, frontend, backend, validation, review, troubleshooting, detect-context）
├── agents/          # Agent 定義（detect-context）
├── hooks/           # Hook 註冊配置
├── scripts/hooks/   # Hook 腳本
└── templates/       # 共用模板（phase-structure, prompt-variable-guide）
```

## 慣例

- 所有 Skill 遵循四階段工作流（Phase 1-4），定義在 `templates/phase-structure.md`
- `detect-context` agent 是 sub-agent，被其他 Skill 在 Phase 1 調用
- 偵測規則的權威來源是 `skills/detect-context/SKILL.md`，agent 只負責執行流程
- Prompt 範本中的 `${...}` 變數由 detect-context 的輸出填入

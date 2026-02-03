## Context

現有的 `ai-coding-workflow` plugin 結構：

```
ai-coding-workflow/
├── skills/
│   ├── ai-coding-workflow/SKILL.md  # 主 skill（518 行，9 個關注點混雜）
│   ├── start/SKILL.md               # 智能入口（與主 skill 重複）
│   ├── guide/SKILL.md               # 使用指引
│   └── detect-context/SKILL.md      # 偵測知識庫
└── agents/
    └── detect-context.md            # 偵測 agent
```

**問題**：

- 主 skill 服務 6 種不同情境（規劃、前端、後端、驗證、審查、問題排查）
- 每次載入 518 行，即使只需要其中一個任務類型
- `start` 與主 skill 重複大量內容

**約束條件**：

- 必須維持 `detect-context` skill 和 agent 不變
- 各任務 skill 需要共用 Phase 1-4 框架
- 觸發條件需要明確區分，不能模糊

## Goals / Non-Goals

**Goals:**

- 單一職責：每個 skill 只處理一種任務類型
- 觸發明確：各 skill 的關鍵字不重疊
- Context 效率：只載入需要的 skill（從 518 行降到 ~100 行）
- 可維護性：修改一處不影響其他

**Non-Goals:**

- 不建立獨立的 `workflow-core` skill（選擇內嵌方案）
- 不修改 `detect-context` 的行為
- 不改變參考文件的內容（只改引用方式）

## Decisions

### Decision 1: 按任務類型拆分為 6 個獨立 skill

**選擇**：方案 A（按任務類型拆分）

**替代方案**：

- 方案 B：維持現狀但精簡（改動小但問題未解決）
- 方案 C：混合方案（主 skill 作為路由器）

**理由**：
| 考量點 | 方案 A | 方案 B | 方案 C |
| ------------ | ------ | ------ | ------ |
| 單一職責 | ✅ | ❌ | ⚠️ |
| Context 效率 | ✅ | ❌ | ⚠️ |
| 觸發明確度 | ✅ | ❌ | ⚠️ |

### Decision 2: Phase 結構內嵌而非獨立 skill

**選擇**：將 Phase 1-4 內嵌到各任務 skill

**替代方案**：建立獨立的 `workflow-core` skill 供調用

**理由**：

- Phase 框架已趨穩定，不常修改
- 各任務可能需要微調 Phase 行為
- 內嵌減少調用層次，Context 消耗較少
- 使用 `templates/phase-structure.md` 作為模板確保一致性

### Decision 3: 使用 template 確保 Phase 一致性

**選擇**：建立 `templates/phase-structure.md` 作為標準模板

**理由**：

- 維護時可從 template 同步更新
- 各任務 skill 可微調但保持結構一致
- 降低內嵌帶來的維護成本

### Decision 4: 刪除 start 和 guide skill

**選擇**：完全刪除，不保留

**理由**：

- `start` 與主 skill 重複內容 > 50%
- `guide` 功能可整合到各任務 skill 的說明中
- 減少用戶選擇困難

## Risks / Trade-offs

### Risk 1: 內嵌導致重複代碼

- **風險**：Phase 結構在 6 個 skill 中重複，修改時可能遺漏
- **緩解**：使用 template 確保一致性；建立 checklist 供修改時參考

### Risk 2: Breaking Change 影響現有用戶

- **風險**：舊命令 `/ai-coding-workflow` 將失效
- **緩解**：在 README 中明確說明遷移路徑；命名直觀，用戶容易適應

### Risk 3: 觸發條件可能重疊

- **風險**：例如「驗證 API」可能同時觸發 `validation` 和 `backend`
- **緩解**：明確定義各 skill 的主要關鍵字；rely on Claude 的判斷

## Migration Plan

### Phase 1: 建立新結構（不刪除舊結構）

1. 建立 `templates/phase-structure.md`
2. 建立 6 個新任務 skill
3. 更新 `plugin.json` 加入新 skill

### Phase 2: 驗證

1. 測試各 skill 觸發是否正確
2. 確認 detect-context 調用正常
3. 確認參考文件載入正確

### Phase 3: 切換

1. 刪除舊 skill（ai-coding-workflow, start, guide）
2. 更新 README.md

### Rollback

- 如果新結構有問題，可從 git 恢復舊 skill
- plugin.json 是唯一需要還原的配置

## Open Questions

1. ~~是否保留 guide skill 作為獨立功能？~~ → 已決定刪除
2. 各 skill 的觸發關鍵字是否需要更精確？（可在實作時調整）

## Why

現有的 `ai-coding-workflow` 主 skill（518 行）混雜了 9 個獨立關注點，服務 6 種完全不同的使用情境（規劃、前端、後端、驗證、審查、問題排查），導致：

1. **Context 消耗過大**：每次載入整個 skill，即使只需要其中一個任務類型
2. **觸發條件模糊**：用戶不知道該用 `/ai-coding-workflow` 還是 `/ai-coding-workflow:start`
3. **維護困難**：修改一個任務類型可能影響其他
4. **代碼重複**：`start` skill 與主 skill 有大量重複內容（任務類型關鍵字表、複雜度判斷、確認機制）

## What Changes

- **新增** 6 個獨立任務 skill，各自服務單一情境：
  - `planning` - 規劃任務
  - `frontend` - 前端開發
  - `backend` - 後端開發
  - `validation` - 驗證測試
  - `review` - 程式碼審查
  - `troubleshooting` - 問題排查
- **新增** `templates/phase-structure.md` 作為 Phase 1-4 的標準模板
- **維持** `detect-context` skill 和 agent（不變）
- **BREAKING** 刪除 `skills/ai-coding-workflow/`（舊主 skill）
- **BREAKING** 刪除 `skills/start/`（重複的入口 skill）
- **BREAKING** 刪除 `skills/guide/`（功能已整合）
- **更新** `plugin.json` 反映新 skill 結構

## Capabilities

### New Capabilities

- `planning-skill`: 規劃階段的獨立 skill，包含需求分析、技術選型、架構設計的參考文件導引
- `frontend-skill`: 前端開發的獨立 skill，包含設計系統、元件開發、狀態管理的參考文件導引
- `backend-skill`: 後端開發的獨立 skill，包含 API 設計、資料庫、認證的參考文件導引
- `validation-skill`: 驗證測試的獨立 skill，包含驗證框架、整合測試的參考文件導引
- `review-skill`: 程式碼審查的獨立 skill，包含程式碼審查、安全審查的參考文件導引
- `troubleshooting-skill`: 問題排查的獨立 skill，包含踩坑案例、除錯流程的參考文件導引
- `phase-template`: Phase 1-4 的標準模板，供各任務 skill 內嵌使用

### Modified Capabilities

（無現有 spec 需要修改）

## Impact

### 檔案變更

| 類型 | 路徑                              | 說明            |
| ---- | --------------------------------- | --------------- |
| 新增 | `skills/planning/SKILL.md`        | 規劃 skill      |
| 新增 | `skills/frontend/SKILL.md`        | 前端 skill      |
| 新增 | `skills/backend/SKILL.md`         | 後端 skill      |
| 新增 | `skills/validation/SKILL.md`      | 驗證 skill      |
| 新增 | `skills/review/SKILL.md`          | 審查 skill      |
| 新增 | `skills/troubleshooting/SKILL.md` | 問題排查 skill  |
| 新增 | `templates/phase-structure.md`    | Phase 模板      |
| 刪除 | `skills/ai-coding-workflow/`      | 舊主 skill      |
| 刪除 | `skills/start/`                   | 重複入口        |
| 刪除 | `skills/guide/`                   | 已整合          |
| 修改 | `plugin.json`                     | 更新 skill 列表 |

### 使用者影響

- 用戶需要使用新的命令：`/planning`、`/frontend`、`/backend`、`/validation`、`/review`、`/troubleshooting`
- 舊命令 `/ai-coding-workflow`、`/ai-coding-workflow:start`、`/ai-coding-workflow:guide` 將失效

### 依賴關係

- `detect-context` skill 和 agent 不受影響，繼續被各任務 skill 調用
- 各任務 skill 彼此獨立，無相互依賴

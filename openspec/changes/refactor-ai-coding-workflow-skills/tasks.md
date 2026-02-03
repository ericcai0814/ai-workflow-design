## 1. 建立 Phase 模板

- [ ] 1.1 建立 `ai-coding-workflow/templates/phase-structure.md`，包含 Phase 1-4 的完整定義
- [ ] 1.2 驗證模板包含：任務理解、任務規劃、WAIT FOR CONFIRMATION、任務執行、驗收交付

## 2. 建立任務 Skills

- [ ] 2.1 建立 `ai-coding-workflow/skills/planning/SKILL.md`，內嵌 Phase 模板，設定觸發關鍵字（分析需求、建立計畫、專案規劃、技術選型、架構設計）
- [ ] 2.2 建立 `ai-coding-workflow/skills/frontend/SKILL.md`，內嵌 Phase 模板，設定觸發關鍵字（設計系統、建立元件、前端、UI、元件開發、狀態管理）
- [ ] 2.3 建立 `ai-coding-workflow/skills/backend/SKILL.md`，內嵌 Phase 模板，設定觸發關鍵字（API 設計、資料庫、後端、認證、商業邏輯、中間件）
- [ ] 2.4 建立 `ai-coding-workflow/skills/validation/SKILL.md`，內嵌 Phase 模板，設定觸發關鍵字（驗證、測試、整合、E2E、端對端）
- [ ] 2.5 建立 `ai-coding-workflow/skills/review/SKILL.md`，內嵌 Phase 模板，設定觸發關鍵字（程式碼審查、review、安全審查、效能審查、code review）
- [ ] 2.6 建立 `ai-coding-workflow/skills/troubleshooting/SKILL.md`，內嵌 Phase 模板，設定觸發關鍵字（問題、錯誤、bug、修復、除錯、debug）

## 3. 更新配置

- [ ] 3.1 更新 `ai-coding-workflow/plugin.json`，加入 6 個新 skill（planning, frontend, backend, validation, review, troubleshooting）
- [ ] 3.2 從 `plugin.json` 移除舊 skill（ai-coding-workflow, start, guide）

## 4. 刪除舊結構

- [ ] 4.1 刪除 `ai-coding-workflow/skills/ai-coding-workflow/` 目錄
- [ ] 4.2 刪除 `ai-coding-workflow/skills/start/` 目錄
- [ ] 4.3 刪除 `ai-coding-workflow/skills/guide/` 目錄

## 5. 更新文檔

- [ ] 5.1 更新 `ai-coding-workflow/README.md`，反映新結構和使用方式
- [ ] 5.2 在 README 中說明遷移路徑（舊命令 → 新命令）

## 6. 驗證

- [ ] 6.1 測試 `/planning` skill 觸發和 Phase 流程
- [ ] 6.2 測試 `/frontend` skill 觸發和參考文件載入
- [ ] 6.3 測試 `/backend` skill 觸發和參考文件載入
- [ ] 6.4 測試 `/validation` skill 觸發和參考文件載入
- [ ] 6.5 測試 `/review` skill 觸發和參考文件載入
- [ ] 6.6 測試 `/troubleshooting` skill 觸發和參考文件載入
- [ ] 6.7 確認 detect-context agent 被正確調用

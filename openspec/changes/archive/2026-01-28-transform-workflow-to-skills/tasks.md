# Tasks: 將 AI Coding Workflow 轉化為 Agent Skill

## Phase 1：建立 Skill 結構

### 1.1 建立目錄結構

- [ ] **1.1.1** 建立 `.claude/skills/ai-coding-workflow/` 目錄
- [ ] **1.1.2** 建立 `references/` 子目錄結構
- [ ] **1.1.3** 建立 `scripts/` 目錄
- [ ] **1.1.4** 建立 `templates/` 目錄
- [ ] **1.1.5** 建立 `assets/` 目錄

### 1.2 建立核心文件

- [ ] **1.2.1** 建立 SKILL.md（統一入口 + 索引）
- [ ] **1.2.2** 建立 README.md（使用指南）
- [ ] **1.2.3** 建立 QUICKSTART.md（快速開始）

### 1.3 遷移知識庫

- [ ] **1.3.1** 遷移 `01-planning/` 到 `references/01-planning/`
- [ ] **1.3.2** 遷移 `02-development/` 到 `references/02-development/`
- [ ] **1.3.3** 遷移 `03-review/` 到 `references/03-review/`
- [ ] **1.3.4** 遷移 `appendix/` 到 `references/appendix/`
- [ ] **1.3.5** 遷移 `templates/` 到根目錄 `templates/`

### 1.4 翻譯為繁體中文

- [ ] **1.4.1** 翻譯 SKILL.md
- [ ] **1.4.2** 翻譯 README.md
- [ ] **1.4.3** 翻譯 QUICKSTART.md
- [ ] **1.4.4** 翻譯關鍵 references 文件

### 1.5 建立輔助腳本

- [ ] **1.5.1** 建立 `scripts/create-component.sh`
- [ ] **1.5.2** 建立 `scripts/create-dbml.sh`
- [ ] **1.5.3** 建立 `scripts/run-tests.sh`

## Phase 2：驗證可行性

### 2.1 本地測試

- [ ] **2.1.1** 測試 `/ai-coding-workflow` 手動調用
- [ ] **2.1.2** 測試自動觸發功能（說「建立元件」）
- [ ] **2.1.3** 測試索引導向功能
- [ ] **2.1.4** 測試腳本執行

### 2.2 實際專案測試

- [ ] **2.2.1** 複製 skill 到 ewill-web 專案
- [ ] **2.2.2** 測試場景：建立元件
- [ ] **2.2.3** 測試場景：API 設計
- [ ] **2.2.4** 測試場景：問題排查
- [ ] **2.2.5** 記錄測試結果

### 2.3 調整優化

- [ ] **2.3.1** 根據測試結果調整 SKILL.md
- [ ] **2.3.2** 根據測試結果調整索引邏輯
- [ ] **2.3.3** 根據測試結果調整腳本
- [ ] **2.3.4** 更新 design.md 記錄有效模式

## Phase 3：清理與文件化

### 3.1 清理舊結構

- [ ] **3.1.1** 確認新結構運作正常
- [ ] **3.1.2** 備份舊 `ai-coding-workflow/` 目錄
- [ ] **3.1.3** 移除舊目錄
- [ ] **3.1.4** 更新 CLAUDE.md（移除舊觸發規則）

### 3.2 更新文件

- [ ] **3.2.1** 更新專案 README.md
- [ ] **3.2.2** 更新 CHANGELOG.md
- [ ] **3.2.3** 更新分發說明（degit 路徑）

### 3.3 提交變更

- [ ] **3.3.1** Git commit
- [ ] **3.3.2** Git push

## Phase 4：團隊推廣

### 4.1 文件化

- [ ] **4.1.1** 建立團隊使用指南
- [ ] **4.1.2** 建立 FAQ

### 4.2 收集回饋

- [ ] **4.2.1** 團隊成員試用
- [ ] **4.2.2** 收集使用回饋
- [ ] **4.2.3** 迭代優化

---

## 依賴關係

```
Phase 1.1 ──► Phase 1.2 ──► Phase 1.3 ──► Phase 1.4 ──► Phase 1.5
                                                              │
                                                              ▼
                                                        Phase 2.1 ──► Phase 2.2 ──► Phase 2.3
                                                                                         │
                                                                                         ▼
                                                                                   Phase 3.1 ──► Phase 3.2 ──► Phase 3.3
                                                                                                                    │
                                                                                                                    ▼
                                                                                                              Phase 4
```

## 任務統計

| Phase | 任務數 | 說明 |
|-------|--------|------|
| Phase 1 | 18 | 建立結構、遷移、翻譯 |
| Phase 2 | 12 | 測試、調整 |
| Phase 3 | 9 | 清理、文件化 |
| Phase 4 | 5 | 團隊推廣 |
| **總計** | **44** | |

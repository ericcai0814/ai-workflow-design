---
name: validation
description: 驗證測試工作流程。使用時機：驗證、測試、整合、E2E、端對端。提供結構化的四階段流程，確保程式碼品質和防止回歸。
---

# Validation Skill

驗證測試專用 skill，處理驗證框架、整合測試、E2E 測試等任務。

**觸發關鍵字**：驗證、測試、整合、E2E、端對端

---

## Phase 1: 任務理解

**目標**：確保正確理解用戶需求，避免誤解

### 執行步驟

1. **調用 detect-context**：偵測專案測試框架、覆蓋率設定
   ```
   Task tool:
     subagent_type: ai-coding-workflow:detect-context
     prompt: "偵測當前專案的測試框架和測試配置"
   ```
   如果偵測失敗，使用 AskUserQuestion 詢問用戶

2. **重述需求**：用自己的話重述用戶的任務

3. **列出假設**：列出執行此任務的假設

4. **判斷任務類型**：確認是驗證類任務（單元測試、整合測試、E2E 測試、驗證框架）

5. **提出問題**：如有不確定的地方，提出問題

### 輸出格式

```markdown
## 任務理解

### 專案上下文
- **測試框架**: [Jest / Vitest / Pytest / ...]
- **E2E 框架**: [Playwright / Cypress / ...]
- **覆蓋率工具**: [Istanbul / c8 / coverage.py / ...]

### 需求重述
[用自己的話重述用戶的需求]

### 假設
- [ ] 假設 1
- [ ] 假設 2
- [ ] 假設 3

### 確認問題（如有）
1. [問題 1]
2. [問題 2]
```

---

## Phase 2: 任務規劃

**目標**：建立執行計畫，獲得用戶確認

### 執行步驟

1. **判斷複雜度**：根據影響範圍判斷 High/Medium/Low

   | 複雜度 | 判斷標準                           |
   | ------ | ---------------------------------- |
   | High   | 跨多個模組、需要設計決策、影響架構 |
   | Medium | 單一模組內、有既定模式可循         |
   | Low    | 單一檔案、小幅修改、有明確範例     |

2. **讀取參考文件**：
   - `references/02-development/shared/validation-framework.md` - 三層驗證框架（關鍵）
   - `references/02-development/shared/testing.md` - 測試策略

3. **制定執行計畫**：列出具體步驟

4. **評估風險**：識別潛在問題

### 輸出格式

```markdown
## 任務規劃

**任務類型**: 驗證
**複雜度**: [High / Medium / Low]

### 執行計畫

| 步驟 | 動作       | 參考文件       |
| ---- | ---------- | -------------- |
| 1    | [具體動作] | [相關參考文件] |
| 2    | [具體動作] | [相關參考文件] |
| 3    | [具體動作] | [相關參考文件] |

### 風險評估

- [風險 1]：[緩解措施]
- [風險 2]：[緩解措施]

---

**WAITING FOR CONFIRMATION**

請確認執行計畫：
- `yes` - 開始執行
- `modify` - 修改計畫
- `cancel` - 取消
```

### 關鍵：WAIT FOR CONFIRMATION

**Phase 2 結束後，必須等待用戶確認才能進入 Phase 3。**

- 不要自動繼續執行
- 使用 AskUserQuestion 或等待用戶回覆
- 如果用戶選擇 `modify`，根據反饋調整計畫

---

## Phase 3: 任務執行

**目標**：按計畫執行，更新進度

### 讀取參考文件

根據驗證任務類型讀取：

| 驗證任務   | 參考文件                                           |
| ---------- | -------------------------------------------------- |
| 驗證框架   | `references/02-development/shared/validation-framework.md` |
| 整合測試   | `references/02-development/shared/integration.md`  |
| 測試策略   | `references/02-development/shared/testing.md`      |

### Prompts 目錄

- `references/02-development/shared/prompts/integration-test.md` - 整合測試
- `references/02-development/shared/prompts/feature-implementation.md` - 功能實作（含測試）

### 三層驗證框架

**關鍵**：防止「修 A 壞 B」問題

| 層級 | 驗證項目     | 時機       |
| ---- | ------------ | ---------- |
| L1   | 單元測試     | 每次修改後 |
| L2   | 整合測試     | 功能完成後 |
| L3   | E2E 測試     | 部署前     |

### 執行步驟

1. **按步驟執行**：遵循 Phase 2 制定的計畫
2. **更新進度**：每完成一個步驟，更新狀態
3. **遇到問題時**：說明問題，詢問用戶意見

### 進度更新格式

```markdown
## 執行進度

| 步驟 | 狀態      | 備註       |
| ---- | --------- | ---------- |
| 1    | ✅ 完成   | [完成內容] |
| 2    | 🔄 進行中 | [當前進度] |
| 3    | ⏸️ 待執行 |            |
```

### 執行原則

1. **務必替換變數**：${TEST_FRAMEWORK}、${COVERAGE_TOOL} 等替換為實際值
2. **遵循參考文件**：按 references 中的指引執行
3. **使用腳本輔助**：可使用 `scripts/run-tests.sh` 執行測試
4. **及時回報**：遇到問題立即回報，不要自行決定跳過

---

## Phase 4: 驗收與交付

**目標**：確認 70% MVP 完成，交付產出清單

### 70% MVP 標準（驗證類）

| 項目       | MVP 包含                       | 人工迭代           |
| ---------- | ------------------------------ | ------------------ |
| 單元測試   | ✅ 核心功能覆蓋                | 邊界案例           |
| 整合測試   | ✅ 主要流程覆蓋                | 錯誤路徑           |
| E2E 測試   | ⏸️ 關鍵路徑                    | 完整用戶旅程       |
| 覆蓋率     | ✅ 達到 80%                    | 提升至 90%+        |

### MVP 檢查清單

- [ ] 測試可執行通過
- [ ] 覆蓋率達標（80%+）
- [ ] 核心功能有測試
- [ ] 無明顯遺漏
- [ ] CI 可通過

### 輸出格式

```markdown
## 任務完成

### 產出清單

| 類型     | 檔案路徑                | 說明   |
| -------- | ----------------------- | ------ |
| 單元測試 | `tests/unit/...`        | [說明] |
| 整合測試 | `tests/integration/...` | [說明] |
| E2E 測試 | `tests/e2e/...`         | [說明] |

### MVP 檢查

- [x] 測試可執行通過
- [x] 覆蓋率達標（80%+）
- [x] 核心功能有測試
- [x] 無明顯遺漏
- [x] CI 可通過

### 後續建議

1. [建議 1]
2. [建議 2]

---

**驗證 MVP 已完成，請檢查後告訴我需要調整的地方。**
```

---

## 快速參考

### 常見場景 → 文件對應

| 場景       | 讀取                              | 執行                          |
| ---------- | --------------------------------- | ----------------------------- |
| 建立測試   | shared/testing.md                 | prompts/integration-test.md   |
| 驗證框架   | shared/validation-framework.md    | prompts/feature-implementation.md |
| 整合測試   | shared/integration.md             | prompts/integration-test.md   |

---

## 變數系統

使用變數語法，需替換為實際技術棧：

```
${PROJECT_NAME}     - 專案名稱
${TEST_FRAMEWORK}   - 測試框架（Jest、Vitest、Pytest）
${E2E_FRAMEWORK}    - E2E 框架（Playwright、Cypress）
${COVERAGE_TOOL}    - 覆蓋率工具（Istanbul、c8、coverage.py）
```

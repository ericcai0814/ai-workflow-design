---
name: frontend
description: 前端開發工作流程。使用時機：設計系統、建立元件、前端、UI、元件開發、狀態管理。提供結構化的四階段流程，確保前端開發品質。
---

# Frontend Skill

前端開發專用 skill，處理設計系統、元件開發、狀態管理、路由等任務。

**觸發關鍵字**：設計系統、建立元件、前端、UI、元件開發、狀態管理

---

## Phase 1: 任務理解

**目標**：確保正確理解用戶需求，避免誤解

### 執行步驟

1. **調用 detect-context**：偵測專案前端框架、UI 庫、狀態管理方案
   ```
   Task tool:
     subagent_type: ai-coding-workflow:detect-context
     prompt: "偵測當前專案的前端技術棧（框架、UI 庫、狀態管理）"
   ```
   如果偵測失敗，使用 AskUserQuestion 詢問用戶

2. **重述需求**：用自己的話重述用戶的任務

3. **列出假設**：列出執行此任務的假設

4. **判斷任務類型**：確認是前端類任務（設計系統、元件開發、狀態管理、路由）

5. **提出問題**：如有不確定的地方，提出問題

### 輸出格式

```markdown
## 任務理解

### 專案上下文
- **前端框架**: [Vue 3 / React / Angular / ...]
- **UI 庫**: [Vuetify / Ant Design / Material-UI / ...]
- **狀態管理**: [Pinia / Redux / Zustand / ...]

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
   - `references/02-development/frontend/overview.md` - 前端開發總覽
   - `references/02-development/frontend/design-system.md` - 設計系統（優先）

3. **制定執行計畫**：列出具體步驟

4. **評估風險**：識別潛在問題

### 輸出格式

```markdown
## 任務規劃

**任務類型**: 前端
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

根據前端任務類型讀取：

| 前端任務   | 參考文件                                           |
| ---------- | -------------------------------------------------- |
| 設計系統   | `references/02-development/frontend/design-system.md` |
| 元件開發   | `references/02-development/frontend/component-development.md` |
| 狀態管理   | `references/02-development/frontend/state-management.md` |
| 路由設計   | `references/02-development/frontend/routing.md` |

### Prompts 目錄

- `references/02-development/frontend/prompts/setup-design-system.md` - 設計系統設置
- `references/02-development/frontend/prompts/setup-token-system.md` - Token 系統設置
- `references/02-development/frontend/prompts/create-component.md` - 元件建立
- `references/02-development/frontend/prompts/setup-state-management.md` - 狀態管理設置
- `references/02-development/frontend/prompts/setup-routing.md` - 路由設置

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

1. **務必替換變數**：${FRAMEWORK}、${UI_LIBRARY} 等替換為實際值
2. **遵循參考文件**：按 references 中的指引執行
3. **使用腳本輔助**：可使用 `scripts/create-component.sh` 建立元件
4. **及時回報**：遇到問題立即回報，不要自行決定跳過

---

## Phase 4: 驗收與交付

**目標**：確認 70% MVP 完成，交付產出清單

### 70% MVP 標準（前端類）

| 項目     | MVP 包含                       | 人工迭代           |
| -------- | ------------------------------ | ------------------ |
| 檔案結構 | ✅ 正確位置、正確命名          | -                  |
| 基本功能 | ✅ 核心功能可運行              | 功能調整、功能疊加 |
| 樣式     | ✅ 套用 Design Token、樣式正常 | 細節微調           |
| 型別定義 | ✅ 主要 props/types            | 完整型別           |
| 邊界處理 | ⏸️ 基本處理                    | 完整邊界處理       |

### MVP 檢查清單

- [ ] 檔案放在正確位置
- [ ] 命名符合專案規範
- [ ] 核心功能可運行
- [ ] 樣式正常顯示
- [ ] 無明顯錯誤

### 輸出格式

```markdown
## 任務完成

### 產出清單

| 類型 | 檔案路徑             | 說明   |
| ---- | -------------------- | ------ |
| 元件 | `src/components/...` | [說明] |
| 樣式 | `src/styles/...`     | [說明] |
| 型別 | `src/types/...`      | [說明] |

### MVP 檢查

- [x] 檔案放在正確位置
- [x] 命名符合專案規範
- [x] 核心功能可運行
- [x] 樣式正常顯示
- [x] 無明顯錯誤

### 後續建議

1. [建議 1]
2. [建議 2]

---

**前端 MVP 已完成，請檢查後告訴我需要調整的地方。**
```

---

## 快速參考

### 常見場景 → 文件對應

| 場景         | 讀取                                     | 執行                            |
| ------------ | ---------------------------------------- | ------------------------------- |
| 建立設計系統 | frontend/design-system.md                | prompts/setup-design-system.md  |
| 建立元件     | frontend/component-development.md        | prompts/create-component.md     |
| 設定狀態管理 | frontend/state-management.md             | prompts/setup-state-management.md |
| 設定路由     | frontend/routing.md                      | prompts/setup-routing.md        |

---

## 變數系統

使用變數語法，需替換為實際技術棧：

```
${PROJECT_NAME}     - 專案名稱
${FRAMEWORK}        - 前端框架（Vue 3、React、Angular）
${UI_LIBRARY}       - UI 框架（Vuetify、Ant Design、Material-UI）
${STATE_MANAGEMENT} - 狀態管理（Pinia、Redux、Zustand）
${ROUTER}           - 路由（Vue Router、React Router）
```

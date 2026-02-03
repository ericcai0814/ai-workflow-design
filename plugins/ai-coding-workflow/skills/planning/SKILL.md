---
name: planning
description: 專案規劃工作流程。使用時機：分析需求、建立計畫、專案規劃、技術選型、架構設計。提供結構化的四階段流程，確保規劃完整性。
---

# Planning Skill

專案規劃專用 skill，處理需求分析、技術選型、架構設計等規劃任務。

**觸發關鍵字**：分析需求、建立計畫、專案規劃、技術選型、架構設計

---

## Phase 1: 任務理解

**目標**：確保正確理解用戶需求，避免誤解

### 執行步驟

1. **調用 detect-context**：偵測專案技術棧、狀態、結構
   ```
   Task tool:
     subagent_type: ai-coding-workflow:detect-context
     prompt: "偵測當前專案的技術棧和狀態"
   ```
   如果偵測失敗，使用 AskUserQuestion 詢問用戶

2. **重述需求**：用自己的話重述用戶的任務

3. **列出假設**：列出執行此任務的假設

4. **判斷任務類型**：確認是規劃類任務（需求分析、技術選型、架構設計、任務拆解）

5. **提出問題**：如有不確定的地方，提出問題

### 輸出格式

```markdown
## 任務理解

### 專案上下文
- **技術棧**: [偵測到的技術棧]
- **專案狀態**: [偵測到的狀態]

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
   - `references/01-planning/overview.md` - 規劃總覽
   - `references/01-planning/task-decomposition.md` - 任務拆解方法

3. **制定執行計畫**：列出具體步驟

4. **評估風險**：識別潛在問題

### 輸出格式

```markdown
## 任務規劃

**任務類型**: 規劃
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

根據規劃任務類型讀取：

| 規劃類型   | 參考文件                                           |
| ---------- | -------------------------------------------------- |
| 需求分析   | `references/01-planning/requirement-analysis.md`   |
| 技術選型   | `references/01-planning/tech-stack-selection.md`   |
| 架構設計   | `references/01-planning/architecture-design.md`    |
| 任務拆解   | `references/01-planning/task-decomposition.md`     |

### Prompts 目錄

- `references/01-planning/prompts/analyze-requirements.md` - 需求分析
- `references/01-planning/prompts/create-plan.md` - 計畫建立

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

1. **務必替換變數**：${FRAMEWORK}、${LANGUAGE} 等替換為實際值
2. **遵循參考文件**：按 references 中的指引執行
3. **及時回報**：遇到問題立即回報，不要自行決定跳過

---

## Phase 4: 驗收與交付

**目標**：確認 70% MVP 完成，交付產出清單

### 70% MVP 標準（規劃類）

| 項目     | MVP 包含                 | 人工迭代     |
| -------- | ------------------------ | ------------ |
| 需求文件 | ✅ 核心需求已識別        | 細節補充     |
| 技術選型 | ✅ 主要技術已確定        | 替代方案評估 |
| 架構設計 | ✅ 基本架構已定義        | 細節優化     |
| 任務清單 | ✅ 主要任務已拆解        | 優先級調整   |

### MVP 檢查清單

- [ ] 核心需求已明確
- [ ] 技術選型有依據
- [ ] 架構設計可行
- [ ] 任務清單完整
- [ ] 風險已識別

### 輸出格式

```markdown
## 任務完成

### 產出清單

| 類型     | 產出             | 說明   |
| -------- | ---------------- | ------ |
| 需求文件 | [需求摘要]       | [說明] |
| 技術選型 | [技術棧建議]     | [說明] |
| 架構圖   | [架構說明]       | [說明] |
| 任務清單 | [任務拆解結果]   | [說明] |

### MVP 檢查

- [x] 核心需求已明確
- [x] 技術選型有依據
- [x] 架構設計可行
- [x] 任務清單完整
- [x] 風險已識別

### 後續建議

1. [建議 1]
2. [建議 2]

---

**規劃 MVP 已完成，請檢查後告訴我需要調整的地方。**
```

---

## 快速參考

### 常見場景 → 文件對應

| 場景       | 讀取                           | 執行                            |
| ---------- | ------------------------------ | ------------------------------- |
| 新專案規劃 | 01-planning/overview.md        | prompts/analyze-requirements.md |
| 技術選型   | 01-planning/tech-stack-selection.md | prompts/create-plan.md     |
| 架構設計   | 01-planning/architecture-design.md | prompts/create-plan.md      |
| 任務拆解   | 01-planning/task-decomposition.md | prompts/create-plan.md       |

---

## 變數系統

使用變數語法，需替換為實際技術棧：

```
${PROJECT_NAME}     - 專案名稱
${FRAMEWORK}        - 前端框架（Vue 3、React、Angular）
${UI_LIBRARY}       - UI 框架（Vuetify、Ant Design、Material-UI）
${LANGUAGE}         - 後端語言（Python、C#、Node.js、Go）
${DATABASE}         - 資料庫（PostgreSQL、MySQL、MongoDB）
${API_STYLE}        - API 風格（RESTful、GraphQL）
```

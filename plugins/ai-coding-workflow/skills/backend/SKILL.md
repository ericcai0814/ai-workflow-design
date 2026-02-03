---
name: backend
description: 後端開發工作流程。使用時機：API 設計、資料庫、後端、認證、商業邏輯、中間件。提供結構化的四階段流程，確保後端開發品質。
---

# Backend Skill

後端開發專用 skill，處理 API 設計、資料庫、認證、商業邏輯等任務。

**觸發關鍵字**：API 設計、資料庫、後端、認證、商業邏輯、中間件

---

## Phase 1: 任務理解

**目標**：確保正確理解用戶需求，避免誤解

### 執行步驟

1. **調用 detect-context**：偵測專案後端框架、資料庫、ORM

   ```
   Task tool:
     subagent_type: ai-coding-workflow:detect-context
     prompt: "偵測當前專案的後端技術棧（框架、資料庫、ORM）"
   ```

   如果偵測失敗，使用 AskUserQuestion 詢問用戶

2. **重述需求**：用自己的話重述用戶的任務

3. **列出假設**：列出執行此任務的假設

4. **判斷任務類型**：確認是後端類任務（API 設計、資料庫、認證、商業邏輯）

5. **提出問題**：如有不確定的地方，提出問題

### 輸出格式

```markdown
## 任務理解

### 專案上下文

- **後端語言**: [Python / C# / Node.js / Go / ...]
- **框架**: [FastAPI / Django / Express / ...]
- **資料庫**: [PostgreSQL / MySQL / MongoDB / ...]
- **ORM**: [SQLAlchemy / Prisma / TypeORM / ...]

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
   - `references/overview.md` - 後端開發總覽
   - `references/api-design.md` - API 設計（優先）

3. **制定執行計畫**：列出具體步驟

4. **評估風險**：識別潛在問題

### 輸出格式

```markdown
## 任務規劃

**任務類型**: 後端
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

根據後端任務類型讀取：

| 後端任務 | 參考文件                       |
| -------- | ------------------------------ |
| API 設計 | `references/api-design.md`     |
| 資料庫   | `references/database.md`       |
| 認證授權 | `references/authentication.md` |
| 商業邏輯 | `references/business-logic.md` |

### Prompts 目錄

- `references/prompts/design-api.md` - API 設計
- `references/prompts/create-model.md` - 模型建立
- `references/prompts/setup-auth.md` - 認證設置

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

1. **務必替換變數**：${LANGUAGE}、${DATABASE} 等替換為實際值
2. **遵循參考文件**：按 references 中的指引執行
3. **使用腳本輔助**：可使用 `scripts/create-dbml.sh` 建立資料庫定義
4. **及時回報**：遇到問題立即回報，不要自行決定跳過

---

## Phase 4: 驗收與交付

**目標**：確認 70% MVP 完成，交付產出清單

### 70% MVP 標準（後端類）

| 項目     | MVP 包含              | 人工迭代       |
| -------- | --------------------- | -------------- |
| API 端點 | ✅ 核心 CRUD 可運行   | 進階查詢、分頁 |
| 資料庫   | ✅ 基本 Schema 已定義 | 索引優化、關聯 |
| 認證     | ✅ 基本認證可運行     | 權限細粒度控制 |
| 錯誤處理 | ⏸️ 基本處理           | 完整錯誤處理   |
| 驗證     | ✅ 輸入驗證           | 完整業務驗證   |

### MVP 檢查清單

- [ ] API 端點正確響應
- [ ] 資料庫 Schema 可執行
- [ ] 認證機制可運行
- [ ] 錯誤有適當處理
- [ ] 無明顯安全漏洞

### 輸出格式

```markdown
## 任務完成

### 產出清單

| 類型   | 檔案路徑               | 說明   |
| ------ | ---------------------- | ------ |
| API    | `src/api/...`          | [說明] |
| Model  | `src/models/...`       | [說明] |
| Schema | `prisma/schema.prisma` | [說明] |

### MVP 檢查

- [x] API 端點正確響應
- [x] 資料庫 Schema 可執行
- [x] 認證機制可運行
- [x] 錯誤有適當處理
- [x] 無明顯安全漏洞

### 後續建議

1. [建議 1]
2. [建議 2]

---

**後端 MVP 已完成，請檢查後告訴我需要調整的地方。**
```

---

## 快速參考

### 常見場景 → 文件對應

| 場景       | 讀取              | 執行                    |
| ---------- | ----------------- | ----------------------- |
| 設計 API   | api-design.md     | prompts/design-api.md   |
| 建立資料庫 | database.md       | prompts/create-model.md |
| 設定認證   | authentication.md | prompts/setup-auth.md   |
| 商業邏輯   | business-logic.md | prompts/design-api.md   |

---

## 變數系統

使用變數語法，需替換為實際技術棧：

```
${PROJECT_NAME}     - 專案名稱
${LANGUAGE}         - 後端語言（Python、C#、Node.js、Go）
${FRAMEWORK}        - 後端框架（FastAPI、Django、Express、Gin）
${DATABASE}         - 資料庫（PostgreSQL、MySQL、MongoDB）
${ORM}              - ORM（SQLAlchemy、Prisma、TypeORM）
${API_STYLE}        - API 風格（RESTful、GraphQL）
```

# AI Coding Workflow Skill 重構計畫

## 現有結構

```
ai-coding-workflow/
├── skills/
│   ├── ai-coding-workflow/SKILL.md  # 主 skill（518 行）
│   ├── start/SKILL.md               # 智能入口（172 行）
│   ├── guide/SKILL.md               # 使用指引（243 行）
│   └── detect-context/SKILL.md      # 偵測知識庫（498 行）
└── agents/
    └── detect-context.md            # 偵測 agent（256 行）
```

---

## 1. 獨立關注點識別

### ai-coding-workflow (主 skill) - 9 個關注點混雜

| #   | 關注點       | 行數範圍 | 說明                               |
| --- | ------------ | -------- | ---------------------------------- |
| 1   | 流程框架     | 18-31    | Phase 1-4 結構定義                 |
| 2   | 任務理解     | 35-78    | 重述需求、假設清單、任務類型判斷   |
| 3   | 任務規劃     | 81-150   | 複雜度判斷、參考文件對應、等待確認 |
| 4   | 任務執行     | 153-181  | 按步驟執行、進度更新               |
| 5   | 驗收交付     | 184-239  | 70% MVP 標準、檢查清單             |
| 6   | 使用時機說明 | 244-339  | 六種任務類型的詳細說明             |
| 7   | 技術棧適配   | 343-374  | 變數系統、detect-context 調用      |
| 8   | 核心流程定義 | 377-416  | 新專案/設計系統/API/Bug 的步驟     |
| 9   | 文件索引     | 432-494  | 參考文件對應表                     |

### start skill - 5 個關注點（與主 skill 重複）

| #   | 關注點       | 問題                            |
| --- | ------------ | ------------------------------- |
| 1   | 偵測上下文   | 調用 detect-context agent       |
| 2   | 任務類型判斷 | **與主 skill 49-78 行完全相同** |
| 3   | 任務規劃輸出 | **與主 skill Phase 2 高度重疊** |
| 4   | 確認機制     | **與主 skill 143-150 行相同**   |
| 5   | 調用主 skill | 確認後轉交                      |

### guide skill - 4 個關注點

| #   | 關注點       | 說明                                 |
| --- | ------------ | ------------------------------------ |
| 1   | 技術棧偵測   | 調用 detect-context（與 start 重複） |
| 2   | 專案狀態分析 | git status、目錄結構分析             |
| 3   | 個人化建議   | 根據狀態提供建議                     |
| 4   | 使用指南輸出 | 完整的使用說明                       |

### detect-context skill (知識庫) - 4 個關注點

| #   | 關注點        | 說明                          |
| --- | ------------- | ----------------------------- |
| 1   | 偵測規則定義  | 前端/後端/資料庫/UI庫偵測規則 |
| 2   | 專案狀態判斷  | Git、設計系統、測試覆蓋標準   |
| 3   | 專案結構模式  | 常見專案結構範例              |
| 4   | Fallback 策略 | 詢問用戶的問題定義            |

---

## 2. 耦合分析

### 緊耦合（必須一起執行）

```
Phase 1 (任務理解)
    ↓
Phase 2 (任務規劃)
    ↓ ← WAIT FOR CONFIRMATION
Phase 3 (任務執行)
    ↓
Phase 4 (驗收交付)
```

- Phase 之間是強順序依賴
- Phase 2 結束後**必須**等待用戶確認

### 鬆耦合（可獨立運作）

| 組件           | 獨立性 | 說明                               |
| -------------- | ------ | ---------------------------------- |
| detect-context | ✅ 高  | 純知識庫，可被任何 skill 調用      |
| guide          | ✅ 高  | 輔助功能，不影響主流程             |
| 六種任務類型   | ✅ 高  | 彼此之間無依賴                     |
| start          | ❌ 低  | 最後要調用主 skill，是多餘的中間層 |

---

## 3. 一個 skill 服務多種角色/情境

### 問題最嚴重：ai-coding-workflow

同一個 skill 服務 6 種完全不同的情境：

| 情境 | 觸發關鍵字         | 載入的參考文件                                |
| ---- | ------------------ | --------------------------------------------- |
| 規劃 | 分析需求、建立計畫 | 01-planning/\*.md                             |
| 前端 | 設計系統、建立元件 | 02-development/frontend/\*.md                 |
| 後端 | API 設計、資料庫   | 02-development/backend/\*.md                  |
| 驗證 | 驗證、測試         | 02-development/shared/validation-framework.md |
| 審查 | 程式碼審查、review | 03-review/\*.md                               |
| 問題 | 問題、錯誤、bug    | appendix/pitfalls/\*.md                       |

**問題**：

- 每次載入整個 skill，即使只需要其中一個任務類型
- Context 消耗大（518 行）
- 修改一個任務類型可能影響其他

### start 與 ai-coding-workflow 重複

| 內容                  | start      | ai-coding-workflow |
| --------------------- | ---------- | ------------------ |
| 任務類型關鍵字表      | 49-59 行   | 70-78 行           |
| 複雜度判斷標準        | 119-126 行 | 93-99 行           |
| 任務規劃輸出格式      | 65-100 行  | 112-141 行         |
| WAIT FOR CONFIRMATION | 102-107 行 | 143-150 行         |

**結論**：start 是多餘的，增加了一層不必要的間接調用。

---

## 4. 觸發條件分析

### 目前觸發條件模糊

| 命令                        | 用戶預期       | 實際行為                      |
| --------------------------- | -------------- | ----------------------------- |
| `/ai-coding-workflow`       | 開始工作流程？ | 直接進入 Phase 1              |
| `/ai-coding-workflow:start` | 開始工作流程？ | 先偵測上下文 → 再調用主 skill |
| `/ai-coding-workflow:guide` | 獲取指引？     | 偵測上下文 → 輸出使用指南     |

**問題**：

- 用戶不知道該用哪個
- start 和主 skill 的區別不明確

### 拆分後的觸發條件（建議）

| Skill           | 觸發關鍵字                   | 明確程度 |
| --------------- | ---------------------------- | -------- |
| planning        | 分析需求、建立計畫、專案規劃 | ✅ 清晰  |
| frontend        | 設計系統、建立元件、前端、UI | ✅ 清晰  |
| backend         | API 設計、資料庫、後端       | ✅ 清晰  |
| validation      | 驗證、測試、整合             | ✅ 清晰  |
| review          | 程式碼審查、review           | ✅ 清晰  |
| troubleshooting | 問題、錯誤、bug、修復        | ✅ 清晰  |
| guide           | 用戶明確要求 guide           | ✅ 清晰  |

---

## 5. 決策：採用方案 A（按任務類型拆分 + 內嵌 Phase）

### 比較矩陣

| 考量點       | 方案 A（拆分） | 方案 B（維持） | 方案 C（混合） |
| ------------ | -------------- | -------------- | -------------- |
| 單一職責     | ✅ 好          | ❌ 差          | ⚠️ 中等        |
| Context 效率 | ✅ 好          | ❌ 差          | ⚠️ 中等        |
| 觸發明確度   | ✅ 好          | ❌ 差          | ⚠️ 中等        |
| 可維護性     | ✅ 好          | ❌ 差          | ⚠️ 中等        |
| 改動程度     | ⚠️ 大          | ✅ 小          | ⚠️ 中等        |

### workflow-core 處理：內嵌而非獨立 skill

| 考量點           | 獨立 skill | 內嵌（選擇）  |
| ---------------- | ---------- | ------------- |
| **重複程度**     | ✅ 無      | ❌ 高（6 份） |
| **調用複雜度**   | ❌ 多一層  | ✅ 直接       |
| **維護成本**     | ✅ 改一處  | ❌ 改多處     |
| **Context 消耗** | ❌ 較多    | ✅ 較少       |
| **客製化彈性**   | ❌ 低      | ✅ 高         |
| **調試難度**     | ❌ 較難    | ✅ 較易       |

**選擇內嵌的理由**：

1. Phase 框架已趨穩定，不常修改
2. 各任務可能需要微調 Phase 行為
3. 使用體驗更好（直接調用任務 skill）
4. 維護可用 template 輔助

---

## 6. 最終結構

```
ai-coding-workflow/
├── skills/
│   ├── detect-context/SKILL.md     # 維持：偵測知識庫
│   ├── planning/SKILL.md           # 新建：規劃任務
│   ├── frontend/SKILL.md           # 新建：前端開發
│   ├── backend/SKILL.md            # 新建：後端開發
│   ├── validation/SKILL.md         # 新建：驗證測試
│   ├── review/SKILL.md             # 新建：程式碼審查
│   └── troubleshooting/SKILL.md    # 新建：問題排查
├── agents/
│   └── detect-context.md           # 維持：偵測 agent
└── templates/
    └── phase-structure.md          # 新建：Phase 模板（供內嵌用）
```

### 刪除項目

- `skills/ai-coding-workflow/` - 舊主 skill
- `skills/start/` - 重複的入口 skill
- `skills/guide/` - 功能併入其他 skill 或刪除

---

## 7. 各 skill 職責邊界

| Skill           | 職責                     | 不包含                      |
| --------------- | ------------------------ | --------------------------- |
| detect-context  | 偵測規則、Fallback 策略  | 執行偵測動作（由 agent 做） |
| planning        | 規劃階段的參考文件導引   | 前端/後端/驗證內容          |
| frontend        | 前端開發的參考文件導引   | 後端/驗證內容               |
| backend         | 後端開發的參考文件導引   | 前端/驗證內容               |
| validation      | 驗證測試的參考文件導引   | 前端/後端內容               |
| review          | 程式碼審查的參考文件導引 | 開發內容                    |
| troubleshooting | 問題排查的參考文件導引   | 開發內容                    |

---

## 8. 各 skill 內容結構

每個任務 skill 包含：

```markdown
---
name: { task-name }
description: { description }
---

# {Task Name}

## 觸發條件

[明確的關鍵字列表]

## Phase 1: 任務理解

[內嵌自 template，可微調]

## Phase 2: 任務規劃

[內嵌自 template，可微調]

## Phase 3: 任務執行

[任務特定的參考文件導引]

## Phase 4: 驗收與交付

[內嵌自 template，可微調]

## 參考文件

[任務特定的文件索引]
```

---

## 9. 依賴關係

```
         detect-context (知識庫)
              ↓ (被 agent 調用)
    ┌─────────┼─────────┬─────────┬─────────┬─────────┐
    ↓         ↓         ↓         ↓         ↓         ↓
planning  frontend  backend  validation  review  troubleshooting
```

- **detect-context**：純知識庫，被 detect-context agent 調用
- **各任務 skill**：獨立運作，開頭調用 detect-context agent
- **無循環依賴**：依賴是單向的

---

## 10. 遷移步驟

### Step 1: 建立 Phase 模板

建立 `templates/phase-structure.md` 作為 Phase 1-4 的標準模板。

### Step 2: 建立 6 個任務 skill

從模板複製 Phase 結構，加入任務特定內容：

1. `planning/SKILL.md`
2. `frontend/SKILL.md`
3. `backend/SKILL.md`
4. `validation/SKILL.md`
5. `review/SKILL.md`
6. `troubleshooting/SKILL.md`

### Step 3: 遷移參考文件對應

將原 `ai-coding-workflow` 中的參考文件對應表拆分到各任務 skill。

### Step 4: 刪除舊 skill

- 刪除 `skills/ai-coding-workflow/`
- 刪除 `skills/start/`
- 刪除 `skills/guide/`

### Step 5: 更新配置

更新 `plugin.json` 的 skill 列表。

### Step 6: 更新文檔

更新 README.md 反映新結構。

---

## 11. 驗證方式

1. 測試各 skill 觸發是否正確
2. 確認 Phase 流程執行正常
3. 確認 detect-context 調用正常
4. 確認參考文件載入正確
5. 測試邊界情況（無法判斷任務類型時）

---
name: start
description: AI Coding Workflow 智能入口。分析任務類型、偵測專案上下文，提供結構化的啟動流程。
---

# AI Coding Workflow - 智能入口

這是 AI Coding Workflow 的智能入口命令。執行結構化的任務分析和啟動流程。

## 執行流程

```
1. 偵測專案上下文（調用 detect-context agent）
        ↓
2. 分析用戶輸入，判斷任務類型
        ↓
3. 輸出任務規劃
        ↓
4. **WAIT FOR CONFIRMATION**
        ↓
5. 確認後調用主 skill
```

## Step 1: 偵測專案上下文

使用 Task tool 調用 `detect-context` agent：

```
Task tool:
  subagent_type: detect-context
  prompt: "偵測當前專案的技術棧和狀態"
```

如果 agent 不可用，手動執行：

1. 檢查 `package.json` → 前端框架、UI 庫
2. 檢查 `requirements.txt` / `.csproj` / `go.mod` → 後端語言
3. 檢查 `docker-compose.yml` → 資料庫
4. 執行 `git status` → 當前工作狀態
5. 執行 `git log --oneline -5` → 最近工作方向

**偵測失敗時**：使用 AskUserQuestion 詢問用戶：

- 前端框架？（React / Vue / Angular / 其他 / 無）
- 後端語言？（Node.js / Python / Go / C# / 其他 / 無）
- 資料庫？（PostgreSQL / MySQL / MongoDB / 其他 / 無）

## Step 2: 判斷任務類型

根據用戶輸入的關鍵字判斷任務類型：

| 任務類型 | 觸發關鍵字                                        |
| -------- | ------------------------------------------------- |
| 規劃     | 分析需求、建立計畫、專案規劃、技術選型、任務拆解  |
| 前端     | 設計系統、建立元件、前端、UI、樣式、Token、元件庫 |
| 後端     | API 設計、資料庫、後端、認證、REST、GraphQL       |
| 驗證     | 驗證、測試、整合、防止 bug、三層驗證              |
| 審查     | 程式碼審查、review、檢查品質、PR review           |
| 問題     | 問題、錯誤、bug、不 work、失敗、修復              |

如果無法判斷，使用 AskUserQuestion 詢問用戶。

## Step 3: 輸出任務規劃

使用以下格式輸出任務規劃：

```markdown
## 任務分析

**任務類型**: [規劃 / 前端 / 後端 / 驗證 / 審查 / 問題]
**複雜度**: [High / Medium / Low]

### 專案上下文

| 層面   | 偵測結果      |
| ------ | ------------- |
| 前端   | ${FRAMEWORK}  |
| 後端   | ${LANGUAGE}   |
| 資料庫 | ${DATABASE}   |
| UI 庫  | ${UI_LIBRARY} |

### 執行計畫

1. [步驟 1]
2. [步驟 2]
3. [步驟 3]
   ...

### 風險評估

- [潛在風險或需要注意的地方]

---

**請確認是否開始執行？**

- `yes` - 開始執行
- `modify` - 修改計畫
- `cancel` - 取消
```

## Step 4: WAIT FOR CONFIRMATION

**關鍵**：輸出任務規劃後，**必須等待用戶確認**才能繼續。

- 使用 AskUserQuestion 或等待用戶回覆
- 不要自動繼續執行

## Step 5: 確認後調用主 Skill

用戶確認後，使用 Skill tool 調用：

```
Skill: ai-coding-workflow:ai-coding-workflow
```

並將偵測到的上下文變數傳遞給主 skill 使用。

## 複雜度判斷標準

| 複雜度 | 判斷標準                           |
| ------ | ---------------------------------- |
| High   | 跨多個模組、需要設計決策、影響架構 |
| Medium | 單一模組內、有既定模式可循         |
| Low    | 單一檔案、小幅修改、有明確範例     |

## 範例

### 輸入

```
/ai-coding-workflow:start 建立一個 Button 元件
```

### 輸出

```markdown
## 任務分析

**任務類型**: 前端
**複雜度**: Low

### 專案上下文

| 層面   | 偵測結果     |
| ------ | ------------ |
| 前端   | React        |
| 後端   | Node.js      |
| 資料庫 | PostgreSQL   |
| UI 庫  | Tailwind CSS |

### 執行計畫

1. 讀取設計系統文件，確認現有 Token 和元件規範
2. 建立 Button 元件結構
3. 實作 Button 變體（primary, secondary, outline）
4. 加入 TypeScript 型別定義
5. 驗證元件符合設計系統標準

### 風險評估

- 確認設計系統已建立，否則需先建立

---

**請確認是否開始執行？**

- `yes` - 開始執行
- `modify` - 修改計畫
- `cancel` - 取消
```

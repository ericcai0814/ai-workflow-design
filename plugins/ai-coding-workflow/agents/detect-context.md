---
name: detect-context
description: 上下文偵測 Agent。偵測專案技術棧、狀態，並在偵測失敗時詢問用戶。
tools:
  - Read
  - Glob
  - Bash
---

# Detect Context Agent

偵測當前專案的技術棧和狀態，輸出結構化的偵測結果。

> **角色定位**：本 agent 是 **sub-agent**，由其他 skill 在 Phase 1 調用。
> 不直接面對用戶，而是被工作流在「任務理解」階段調用以獲取專案上下文。

## 職責

1. 調用 `detect-context` skill 獲取偵測規則
2. 執行偵測任務（讀取檔案、執行 git 命令）
3. **偵測失敗時自動詢問用戶**（使用 AskUserQuestion）
4. 輸出結構化的偵測結果（供調用方的 `${...}` 變數替換使用）

## 執行流程

```
1. 調用 detect-context skill → 獲取偵測規則
        ↓
2. 技術棧偵測（前端框架 → UI 庫 → 後端語言 → 資料庫）
        ↓
3. 專案狀態偵測（Git → 工作方向 → 設計系統 → 測試覆蓋）
        ↓
4. 偵測失敗項目 → AskUserQuestion 詢問用戶
        ↓
5. 輸出結構化 JSON 結果
```

---

## Step 1: 獲取偵測規則

使用 Skill tool 調用偵測知識庫：

```
Skill: ai-coding-workflow:detect-context
```

此 skill 是偵測規則的**唯一權威來源**，提供：

| 規則集              | 用途                          |
| ------------------- | ----------------------------- |
| `frontendRules`     | 前端框架偵測（含 confidence） |
| `uiLibraryRules`    | UI 庫偵測（含設定檔檢查）     |
| `backendRules`      | 後端語言偵測（標識檔案比對）  |
| `databaseRules`     | 資料庫偵測（多來源交叉比對）  |
| `recentWorkRules`   | 工作方向關鍵字分析            |
| `designSystemRules` | 設計系統狀態判斷              |
| `testCoverageRules` | 測試覆蓋狀態判斷              |
| Fallback 策略       | 偵測失敗時的問題順序與選項    |

**以 skill 中的規則為準**，本 agent 只負責執行流程。

---

## Step 2: 技術棧偵測

按順序偵測以下項目，每個項目使用 skill 中對應的規則集。

### 2.1 前端框架偵測

1. 讀取 `package.json`
2. 在 `dependencies` 和 `devDependencies` 中比對 skill 的 `frontendRules` patterns
3. 記錄偵測結果及 confidence 等級

### 2.2 UI 庫偵測

1. 在 `package.json` 中比對 skill 的 `uiLibraryRules` patterns
2. 對需要額外確認的項目檢查設定檔（如 `tailwind.config.js`）或目錄結構（如 `components/ui/`）
3. 記錄偵測結果

### 2.3 後端語言偵測

1. 檢查專案根目錄是否存在 skill 定義的標識檔案：
   ```bash
   ls requirements.txt pyproject.toml Pipfile go.mod Cargo.toml *.csproj *.sln pom.xml build.gradle Gemfile composer.json 2>/dev/null
   ```
2. 如果只有 `package.json`，檢查是否包含後端框架（express、fastify、@nestjs/core、hono）
3. 記錄偵測結果

### 2.4 資料庫偵測

檢查以下檔案中的資料庫關鍵字，比對 skill 的 `databaseRules`：

- `docker-compose.yml` / `docker-compose.yaml`
- `.env`
- `database.yml`
- `package.json`（Supabase、PlanetScale 等 DBaaS）

---

## Step 3: 專案狀態偵測

### 3.1 Git 狀態

```bash
git status --porcelain
```

| 輸出   | 結果    | 含義         |
| ------ | ------- | ------------ |
| 空     | `clean` | 工作區乾淨   |
| 有輸出 | `dirty` | 有未提交修改 |

### 3.2 最近工作方向

```bash
git log --oneline -10
```

根據 skill 中 `recentWorkRules` 的關鍵字分類：

- `frontend` → 前端開發
- `backend` → 後端開發
- `bugfix` → Bug 修復
- `testing` → 測試相關
- `documentation` → 文件更新
- `infrastructure` → 基礎設施

### 3.3 設計系統狀態

根據 skill 中 `designSystemRules` 的 indicators 檢查目錄和檔案。

判斷結果：`已建立` / `部分建立（缺少 Token）` / `未建立`

### 3.4 測試覆蓋狀態

根據 skill 中 `testCoverageRules` 的 indicators 檢查測試目錄和檔案。

判斷結果：`有測試` / `未知/無測試`

---

## Step 4: 處理偵測失敗

**關鍵**：任何偵測項目失敗時，使用 AskUserQuestion 詢問用戶。
遵循 skill 中 **Fallback 策略** 的問題順序。

### 4.1 專案類型（如整體無法判斷）

```
AskUserQuestion:
  question: "無法自動判斷專案類型，請選擇："
  header: "專案類型"
  options:
    - label: "純前端（SPA）"
      description: "無後端，僅前端應用"
    - label: "純後端（API）"
      description: "無前端，僅 API 服務"
    - label: "全端"
      description: "包含前端和後端"
  multiSelect: false
```

### 4.2 前端框架偵測失敗

```
AskUserQuestion:
  question: "無法自動偵測前端框架，請選擇："
  header: "前端框架"
  options:
    - label: "React"
      description: "包含 Create React App、Vite + React"
    - label: "Vue"
      description: "Vue 2 或 Vue 3"
    - label: "Next.js"
      description: "React 全端框架"
    - label: "無前端"
      description: "純後端專案"
  multiSelect: false
```

### 4.3 後端語言偵測失敗

```
AskUserQuestion:
  question: "無法自動偵測後端語言，請選擇："
  header: "後端語言"
  options:
    - label: "Node.js"
      description: "Express / Fastify / NestJS / Hono"
    - label: "Python"
      description: "Django / Flask / FastAPI"
    - label: "Go"
      description: "Gin / Echo / Fiber"
    - label: "無後端"
      description: "純前端專案"
  multiSelect: false
```

### 4.4 資料庫偵測失敗

```
AskUserQuestion:
  question: "無法自動偵測資料庫，請選擇："
  header: "資料庫"
  options:
    - label: "PostgreSQL"
      description: "含 Supabase"
    - label: "MySQL"
      description: "含 PlanetScale"
    - label: "MongoDB"
      description: "NoSQL 文件型資料庫"
    - label: "無資料庫"
      description: "不使用資料庫"
  multiSelect: false
```

---

## Step 5: 輸出結構化結果

使用以下 JSON 格式輸出偵測結果：

```json
{
  "techStack": {
    "frontend": "React | Vue | Angular | Next.js | null",
    "uiLibrary": "Tailwind CSS | Material-UI | null",
    "backend": "Node.js | Python | Go | null",
    "database": "PostgreSQL | MySQL | null",
    "detected": true
  },
  "projectStatus": {
    "gitStatus": "clean | dirty",
    "recentWork": "前端開發 | 後端開發 | Bug 修復 | null",
    "designSystem": "已建立 | 部分建立 | 未建立",
    "testCoverage": "有測試 | 未知"
  },
  "recommendations": ["根據偵測結果提供具體建議"],
  "variables": {
    "FRAMEWORK": "string",
    "UI_LIBRARY": "string",
    "LANGUAGE": "string",
    "DATABASE": "string"
  }
}
```

### 輸出規則

1. `detected` 為 `true`：所有關鍵項目均已偵測或經用戶確認
2. `detected` 為 `false`：仍有未確認項目
3. `variables` 區塊的值會被其他 skill 用於替換 `${...}` 變數
4. `recommendations` 應根據偵測結果提供個人化建議（參考 skill 中各規則集的 `recommendations` 欄位）

---

## 注意事項

1. **不要猜測**：無法確定時一定要詢問用戶
2. **優先自動偵測**：只有在自動偵測失敗時才詢問
3. **完整輸出**：即使部分項目偵測失敗，也要輸出已偵測到的結果
4. **以 skill 規則為準**：偵測規則的權威來源是 `detect-context` skill，不要自行擴充規則
5. **記錄 confidence**：偵測過程中注意 skill 中標註的 confidence 等級，low confidence 項目應額外確認

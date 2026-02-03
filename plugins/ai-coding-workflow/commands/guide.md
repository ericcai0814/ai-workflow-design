---
name: guide
description: AI Coding Workflow 使用指引。分析當前專案上下文，提供個人化使用建議和推薦的 workflow。
---

# AI Coding Workflow - 使用指引

這個 command 分析當前專案的技術棧和狀態，提供個人化的 workflow 使用建議。

## 執行流程

```
1. 偵測專案技術棧
        ↓
2. 分析當前狀態
        ↓
3. 提供個人化建議
        ↓
4. 輸出使用指南
```

## Step 1: 偵測專案技術棧

使用 Task tool 調用 `detect-context` agent：

```
Task tool:
  subagent_type: detect-context
  prompt: "偵測當前專案的技術棧和狀態"
```

如果 agent 不可用，手動執行以下偵測：

### 前端偵測

讀取 `package.json`，檢查以下關鍵字：

| 關鍵字          | 技術         |
| --------------- | ------------ |
| `react`         | React        |
| `vue`           | Vue          |
| `@angular/core` | Angular      |
| `next`          | Next.js      |
| `nuxt`          | Nuxt.js      |
| `tailwindcss`   | Tailwind CSS |
| `@mui/material` | Material-UI  |
| `antd`          | Ant Design   |
| `vuetify`       | Vuetify      |

### 後端偵測

| 檔案                       | 技術          |
| -------------------------- | ------------- |
| `requirements.txt`         | Python        |
| `go.mod`                   | Go            |
| `Cargo.toml`               | Rust          |
| `*.csproj`                 | .NET (C#)     |
| `pom.xml`                  | Java (Maven)  |
| `build.gradle`             | Java (Gradle) |
| `package.json` + `express` | Node.js       |

### 資料庫偵測

檢查 `docker-compose.yml` 或 `.env` 檔案：

| 關鍵字     | 資料庫     |
| ---------- | ---------- |
| `postgres` | PostgreSQL |
| `mysql`    | MySQL      |
| `mongo`    | MongoDB    |
| `redis`    | Redis      |

## Step 2: 分析當前狀態

執行以下命令分析專案狀態：

```bash
# 檢查 git 狀態
git status

# 檢查最近工作方向
git log --oneline -10

# 檢查目錄結構（設計系統相關）
ls -la src/styles/ src/components/ src/design-system/ 2>/dev/null
```

判斷以下狀態：

| 狀態項目     | 判斷方式                                    |
| ------------ | ------------------------------------------- |
| Git 狀態     | `git status` - clean / dirty / 有未提交修改 |
| 最近工作方向 | `git log` - 分析 commit message 關鍵字      |
| 設計系統狀態 | 檢查 tokens/、design-system/ 目錄是否存在   |
| 測試覆蓋狀態 | 檢查 **tests**/、_.test._ 檔案是否存在      |

## Step 3: 提供個人化建議

根據偵測結果，提供以下建議：

### 設計系統未建立時

```
⚠️ 偵測到專案尚未建立設計系統。

建議：
1. 使用 `/ai-coding-workflow:start 建立設計系統` 開始
2. 先建立 Design Token 系統
3. 再建立基礎元件

相關文件：
- references/02-development/frontend/design-system.md
```

### 有未提交的修改時

```
⚠️ 偵測到有未提交的修改。

建議：
1. 先提交或 stash 當前修改
2. 使用 `/commit` 建立提交
3. 再開始新任務
```

### 最近在做前端工作時

```
💡 偵測到最近正在進行前端開發。

推薦 workflow：
- `/ai-coding-workflow:start 建立元件` - 建立新元件
- `/ai-coding-workflow:start 驗證元件` - 驗證現有元件
```

### 最近在做後端工作時

```
💡 偵測到最近正在進行後端開發。

推薦 workflow：
- `/ai-coding-workflow:start 設計 API` - 設計新 API
- `/ai-coding-workflow:start 測試 API` - 測試 API
```

## Step 4: 輸出使用指南

使用以下格式輸出完整的使用指南：

```markdown
# AI Coding Workflow 使用指南

## 專案概況

| 層面     | 偵測結果         |
| -------- | ---------------- |
| 前端框架 | ${FRAMEWORK}     |
| UI 庫    | ${UI_LIBRARY}    |
| 後端語言 | ${LANGUAGE}      |
| 資料庫   | ${DATABASE}      |
| Git 狀態 | ${GIT_STATUS}    |
| 最近工作 | ${RECENT_WORK}   |
| 設計系統 | ${DESIGN_SYSTEM} |

## 建議事項

${RECOMMENDATIONS}

## 快速開始

### 規劃任務

\`\`\`
/ai-coding-workflow:start 分析需求：${TASK_DESCRIPTION}
\`\`\`

### 前端開發

\`\`\`
/ai-coding-workflow:start 建立 ${COMPONENT_NAME} 元件
\`\`\`

### 後端開發

\`\`\`
/ai-coding-workflow:start 設計 ${API_NAME} API
\`\`\`

### 問題排查

\`\`\`
/ai-coding-workflow:start 修復 ${ERROR_DESCRIPTION}
\`\`\`

## 可用的 Workflow

| Workflow | 使用時機           | 命令                                 |
| -------- | ------------------ | ------------------------------------ |
| 規劃     | 新專案、任務拆解   | `/ai-coding-workflow:start 分析需求` |
| 前端     | 建立元件、設計系統 | `/ai-coding-workflow:start 建立元件` |
| 後端     | API 設計、資料庫   | `/ai-coding-workflow:start 設計 API` |
| 驗證     | 測試、整合驗證     | `/ai-coding-workflow:start 驗證`     |
| 審查     | 程式碼審查         | `/ai-coding-workflow:start 審查`     |
| 問題     | Bug 修復、錯誤排查 | `/ai-coding-workflow:start 修復`     |

## 相關資源

- 完整文件：`references/` 目錄
- 踩坑案例：`references/appendix/pitfalls/`
- 成功案例：`references/appendix/success-cases/`
- Prompt 速查：`references/appendix/prompt-cheatsheet.md`
```

## Fallback 策略

當偵測失敗時，使用 AskUserQuestion 詢問：

```
無法自動偵測專案技術棧。請提供以下資訊：

1. 前端框架？
   - React
   - Vue
   - Angular
   - 其他（請說明）
   - 無前端

2. 後端語言？
   - Node.js
   - Python
   - Go
   - C# (.NET)
   - 其他（請說明）
   - 無後端

3. 資料庫？
   - PostgreSQL
   - MySQL
   - MongoDB
   - 其他（請說明）
   - 無資料庫
```

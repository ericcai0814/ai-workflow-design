---
title: "快速開始指南"
id: "quickstart"
category: "root"
ai_usage:
  - "新人入門"
  - "快速了解文件系統"
version: "1.0.0"
last_updated: "2026-01-23"
---

# 快速開始指南

## 30 秒了解

這是一個 **AI-First** 的開發工作流程文件系統：

- **主要讀者**：AI Agent（Claude Code、Cursor）
- **次要讀者**：前後端工程師
- **核心價值**：標準化 AI 輔助開發流程，減少踩坑

## 我是 AI Agent

### 開始新任務

```
1. 閱讀 README.md → 了解目錄結構
2. 根據任務類型 → 定位到對應文件
3. 閱讀流程文件 → 獲取 Prompt 範本
4. 執行任務 → 使用 Prompt 或 SOP
```

### 任務快速對照

| 我要做... | 去哪裡 |
|-----------|--------|
| 規劃新功能 | `01-planning/requirement-analysis.md` |
| 選技術棧 | `01-planning/tech-stack-selection.md` |
| 建設計系統 | `02-development/frontend/design-system.md` |
| 開發元件 | `02-development/frontend/component-development.md` |
| 設計 API | `02-development/backend/api-design.md` |
| 設計資料庫 | `02-development/backend/database.md` |
| 前後端整合 | `02-development/shared/integration.md` |
| 解決問題 | `appendix/pitfalls/` |

### 使用變數

文件中的 `${VARIABLE}` 需要替換成實際值：

```
${FRAMEWORK}     → React, Vue, Angular
${LANGUAGE}      → TypeScript, JavaScript
${CSS_SOLUTION}  → Tailwind, CSS Modules
${DATABASE}      → PostgreSQL, MongoDB
```

---

## 我是前端工程師

### 開發流程

```
1. 設計系統 → 02-development/frontend/design-system.md
2. 元件開發 → 02-development/frontend/component-development.md
3. 狀態管理 → 02-development/frontend/state-management.md
4. 路由設計 → 02-development/frontend/routing.md
```

### 重點文件

- **必讀**：`design-system.md` — 所有前端開發的基礎
- **常用**：`component-development.md` — 元件開發 Prompt
- **除錯**：`appendix/pitfalls/` — 踩坑案例

---

## 我是後端工程師

### 開發流程

```
1. API 設計 → 02-development/backend/api-design.md
2. 資料庫設計 → 02-development/backend/database.md
3. 認證授權 → 02-development/backend/authentication.md
4. 商業邏輯 → 02-development/backend/business-logic.md
```

### 重點文件

- **必讀**：`api-design.md` — API 設計規範與 Prompt
- **常用**：`database.md` — 資料庫設計流程
- **除錯**：`appendix/pitfalls/` — 踩坑案例

---

## 我遇到問題了

### 1. 查踩坑案例

```
appendix/pitfalls/
├── case-01-cicd-configuration.md   # CI/CD 配置問題
├── case-02-astro5-env-variables.md # 環境變數載入
└── case-03-vercel-api-404.md       # API 404 錯誤
```

### 2. 看成功案例

```
appendix/success-cases/
└── (成功案例)
```

### 3. 參考精選對話

```
appendix/sessions/
└── (AI 協作對話範例)
```

---

## 文件格式說明

### YAML Front Matter

每個文件開頭都有元資料：

```yaml
---
title: "文件標題"
id: "唯一識別碼"
category: "planning|development|review"
ai_usage: ["使用場景"]
---
```

### Prompt 區塊

可執行的 Prompt 範本：

```markdown
## Prompts

### Prompt 1：建立元件

\`\`\`
你是一位資深前端工程師...
使用 ${FRAMEWORK} 建立 ${COMPONENT_NAME} 元件...
\`\`\`
```

### 檢查清單

每個流程結尾的驗收標準：

```markdown
## 檢查清單

- [ ] 完成項目 1
- [ ] 完成項目 2
```

---

## 下一步

| 目標 | 行動 |
|------|------|
| 深入了解目錄結構 | 閱讀 `README.md` |
| 開始前端開發 | 閱讀 `02-development/frontend/design-system.md` |
| 開始後端開發 | 閱讀 `02-development/backend/api-design.md` |
| 了解專案慣例 | 閱讀 `openspec/project.md` |

# Project Context

## Purpose

AI Coding Workflow Documentation System — 為 AI Agent 設計的全棧開發工作流程文件系統。

### 專案定位

- **主要讀者**：AI Agent（Claude Code、Cursor、GitHub Copilot）
- **次要讀者**：前後端工程師
- **核心價值**：標準化 AI 輔助開發流程，減少踩坑，提升開發效率

### 設計原則

1. **AI-First**：文件結構、語法、格式皆以 AI 可解析為優先考量
2. **技術棧無關**：流程通用，具體實作以變數表示
3. **模組化設計**：每個文件獨立完整，可單獨引用
4. **可執行導向**：包含可直接使用的 Prompt 範本

## Tech Stack

- **文件格式**：Markdown（GitHub Flavored）
- **元資料**：YAML Front Matter
- **變數系統**：`${VARIABLE_NAME}` 語法
- **技術棧**：技術棧無關（通用流程）

## Project Conventions

### 目錄結構規範

```
/ai-coding-workflow/
├── README.md                 # AI 入口點（必讀）
├── QUICKSTART.md             # 快速開始指南
├── 01-planning/              # 規劃階段
│   ├── requirement-analysis.md
│   ├── tech-stack-selection.md
│   └── architecture-design.md
├── 02-development/           # 開發階段
│   ├── frontend/             # 前端開發（技術棧無關）
│   │   ├── design-system.md  # 設計系統（核心基礎）
│   │   ├── component-development.md
│   │   ├── state-management.md
│   │   ├── routing.md
│   │   └── prompts/          # 前端 Prompt 範本
│   ├── backend/              # 後端開發（技術棧無關）
│   │   ├── api-design.md
│   │   ├── database.md
│   │   ├── authentication.md
│   │   ├── business-logic.md
│   │   └── prompts/          # 後端 Prompt 範本
│   └── shared/               # 共用流程
│       ├── validation-framework.md
│       ├── integration.md
│       └── testing.md
├── 03-review/                # 審核階段
│   ├── code-review.md
│   ├── security-review.md
│   └── performance-review.md
├── appendix/                 # 附錄
│   ├── pitfalls/             # 踩坑案例
│   │   └── case-01-xxx.md
│   ├── success-cases/        # 成功案例
│   │   └── case-01-xxx.md
│   ├── sessions/             # 精選對話
│   │   └── session-01-xxx.md
│   ├── tech-stack-examples/  # 技術棧參考實作
│   │   ├── react-nextjs/
│   │   ├── vue-nuxt/
│   │   └── node-express/
│   └── prompt-cheatsheet.md  # Prompt 速查表
└── templates/                # 可複製模板
    ├── component-template.md
    ├── api-template.md
    └── test-template.md
```

### 前後端分離原則

| 目錄 | 負責範圍 | 不包含 |
|------|----------|--------|
| `frontend/` | UI/UX、元件、狀態、路由、樣式 | 資料庫、認證邏輯 |
| `backend/` | API、資料庫、認證、商業邏輯、中間件 | UI 元件、樣式 |
| `shared/` | 驗證框架、整合測試、E2E、共用工具 | 特定前後端邏輯 |

**技術棧選擇**：在 `01-planning/tech-stack-selection.md` 決定，具體技術實作範例放在 `appendix/tech-stack-examples/`。

### 設計系統的特殊地位

設計系統是前端開發的核心基礎，具有最高優先級：

- **位置**：`02-development/frontend/design-system.md`
- **包含**：完整的 `prompts/` 子目錄
- **順序**：在所有前端元件開發之前完成
- **內容**：設計原則、色彩系統、字體排版、元件規範

### Code Style

#### 文件命名規範

| 類型 | 格式 | 範例 |
|------|------|------|
| 一般文件 | `kebab-case.md` | `component-development.md` |
| Prompt 文件 | `##-description.md` | `01-setup-project.md` |
| 案例文件 | `case-##-description.md` | `case-01-form-validation.md` |
| Session 文件 | `session-##-description.md` | `session-01-auth-flow.md` |

#### 變數命名規範

使用 `${VARIABLE_NAME}` 語法，全大寫，底線分隔：

```markdown
使用 ${FRAMEWORK} 框架建立 ${COMPONENT_NAME} 元件...
```

常用變數列表：
- `${FRAMEWORK}` - 前端框架（React, Vue, Angular）
- `${LANGUAGE}` - 程式語言（TypeScript, JavaScript）
- `${CSS_SOLUTION}` - CSS 方案（Tailwind, CSS Modules）
- `${STATE_MANAGER}` - 狀態管理（Redux, Zustand, Pinia）
- `${API_STYLE}` - API 風格（REST, GraphQL, tRPC）
- `${DATABASE}` - 資料庫（PostgreSQL, MongoDB）
- `${ORM}` - ORM 工具（Prisma, Drizzle, TypeORM）

### Architecture Patterns

#### YAML Front Matter 規範

所有文件必須包含以下欄位：

```yaml
---
title: "文件標題"
id: "唯一識別碼（kebab-case）"
category: "planning|development|review"
subcategory: "frontend|backend|shared"  # development 階段必填
ai_usage:
  - "使用場景 1"
  - "使用場景 2"
version: "1.0.0"
last_updated: "YYYY-MM-DD"
---
```

**完整範例**：

```yaml
---
title: "元件開發流程"
id: "component-development"
category: "development"
subcategory: "frontend"
ai_usage:
  - "建立新的 UI 元件"
  - "重構現有元件"
  - "元件單元測試"
version: "1.2.0"
last_updated: "2025-01-15"
---
```

#### 文件結構模板

```markdown
---
[YAML Front Matter]
---

# 文件標題

## 概述
[簡短說明本文件的用途和適用場景]

## 前置條件
- [需要完成的前置步驟]
- [需要的知識或工具]

## 工作流程
### 步驟 1：...
### 步驟 2：...

## Prompts
### Prompt 1：[用途]
\`\`\`
[Prompt 內容，使用 ${VARIABLE} 語法]
\`\`\`

## 檢查清單
- [ ] 檢查項目 1
- [ ] 檢查項目 2

## 常見問題
### Q1：...
A1：...

## 相關文件
- [相關文件 1](連結)
- [相關文件 2](連結)
```

### Testing Strategy

#### 文件驗證

- 所有文件必須通過 Markdown lint 檢查
- YAML Front Matter 必須符合 schema 定義
- 內部連結必須有效
- 變數使用必須一致

#### Prompt 測試

- 每個 Prompt 需附帶至少一個使用範例
- 變數需有預設值或說明
- 定期測試 Prompt 有效性

### Git Workflow

#### Commit 規範

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Type 列表**：
- `docs` - 文件變更
- `feat` - 新功能/新文件
- `fix` - 修正錯誤
- `refactor` - 重構（不影響功能）
- `style` - 格式調整
- `chore` - 維護性工作

**Scope 列表**：
- `frontend` - 前端相關
- `backend` - 後端相關
- `shared` - 共用流程
- `planning` - 規劃階段
- `review` - 審核階段
- `appendix` - 附錄

**範例**：

```bash
docs(frontend): add design system workflow
feat(backend): add authentication flow document
fix(shared): correct validation framework steps
refactor(planning): reorganize tech stack selection
```

#### 分支策略

- `main` - 穩定版本
- `develop` - 開發中版本
- `feature/<name>` - 新功能/新文件
- `fix/<name>` - 修正

## Domain Context

### AI Agent 使用情境

1. **新專案啟動**：從 README.md 開始，依序閱讀規劃階段文件
2. **開發特定功能**：直接跳轉到對應的 development 文件
3. **遇到問題**：查閱 appendix/pitfalls/ 尋找類似案例
4. **學習最佳實踐**：參考 appendix/success-cases/ 和 sessions/

### Prompt 設計原則

1. **明確的角色設定**：清楚說明 AI 應扮演的角色
2. **具體的輸出格式**：指定期望的回應結構
3. **邊界條件處理**：說明特殊情況的處理方式
4. **可驗證的結果**：提供檢查清單或驗收標準

## Important Constraints

### 必須遵守

1. **不綁定特定技術棧**：使用變數而非硬編碼
2. **保持模組化**：每個文件獨立完整
3. **維持一致性**：遵循命名和格式規範
4. **向後相容**：重大變更需標註版本

### 禁止事項

1. ❌ 在流程文件中寫死技術棧
2. ❌ 建立循環依賴的文件
3. ❌ 使用未定義的變數
4. ❌ 忽略 YAML Front Matter

## External Dependencies

### 參考標準

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [CommonMark](https://commonmark.org/)

### 相容性目標

- Claude Code (Anthropic)
- Cursor
- GitHub Copilot
- 其他支援 Markdown 的 AI 編輯器

## Maintenance Strategy

### 定期審核

- **頻率**：每季度一次
- **內容**：
  - 驗證所有文件連結有效
  - 更新過時的 Prompt
  - 整理新的踩坑案例
  - 審核技術棧範例

### 版本管理

- 主版本號記錄在 README.md
- 每個文件獨立追蹤版本
- 重大變更需更新 CHANGELOG

### 貢獻指南

1. 新的踩坑案例 → `appendix/pitfalls/`
2. 優化的 Prompt → 更新對應文件
3. 新的技術棧範例 → `appendix/tech-stack-examples/`
4. 流程改進 → 提出 OpenSpec change proposal

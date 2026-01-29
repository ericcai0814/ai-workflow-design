# Change: 建立 AI Coding Workflow 文件系統

## Why

目前團隊缺乏標準化的 AI 輔助開發流程文件，導致：

- AI Agent 無法快速定位相關資源，每次對話都需重新說明上下文
- 開發流程依賴個人經驗，缺乏可重用的 Prompt 範本
- 新人上手 AI 協作開發的學習曲線陡峭
- 前後端開發流程各自為政，缺乏統一標準

建立 AI-First 的文件系統可以解決這些問題，讓 AI Agent 和工程師都能高效協作。

## What Changes

### 1. 建立完整目錄結構（10 個主要目錄）

**文件放置位置**：專案根目錄 `/ai-coding-workflow/`

```
ai-coding-workflow/
├── README.md                 # AI 入口點
├── QUICKSTART.md             # 快速開始
├── 01-planning/              # 規劃階段
├── 02-development/           # 開發階段
│   ├── frontend/
│   ├── backend/
│   └── shared/
├── 03-review/                # 審核階段
├── appendix/                 # 附錄
│   ├── pitfalls/
│   ├── success-cases/
│   ├── sessions/
│   └── tech-stack-examples/
└── templates/                # 模板
```

### 2. 核心流程文件

| 階段        | 文件                     | 用途             |
| ----------- | ------------------------ | ---------------- |
| Planning    | requirement-analysis.md  | 需求分析流程     |
| Planning    | tech-stack-selection.md  | 技術棧選擇指南   |
| Planning    | architecture-design.md   | 架構設計流程     |
| Development | design-system.md         | 設計系統建置     |
| Development | component-development.md | 元件開發流程     |
| Development | api-design.md            | API 設計規範     |
| Development | database.md              | 資料庫設計       |
| Development | authentication.md        | 認證授權流程     |
| Development | git-workflow.md          | Git 工作流程規範 |
| Review      | code-review.md           | 程式碼審查       |
| Review      | security-review.md       | 安全性審查       |

### 2.1 Git 工作流程規範（新增）

**git-workflow.md** 定義團隊標準化的 Git 協作流程：

| 項目       | 規範                                                           |
| ---------- | -------------------------------------------------------------- |
| 環境分支   | `${ENV}_[frontend/backend]_[system]_[collaborator]`（可配置）  |
| 環境預設值 | `${ENV_DEV}=dev`, `${ENV_STAGING}=staging`, `${ENV_PROD}=prod` |
| 功能分支   | `feature/`、`fix-issue/`、`hotfix/`                            |
| 工作流程   | `${ENV_DEV}` → `${ENV_STAGING}` → `${ENV_PROD}`                |
| 觸發關鍵字 | 分支、branch、git、merge、hotfix、fix-issue、feature branch    |

**配置機制**：AI Agent 首次使用時詢問用戶環境命名偏好，支援 `dev/staging/prod` 或 `DEV/UAT/PROD` 等格式。

**相關 Prompt 範本**：

- `prompts/git-branch-create.md` - 根據任務類型建立正確分支
- `prompts/git-merge-flow.md` - 環境間合併流程

### 3. Prompt 範本庫

每個流程文件包含可執行的 Prompt 範本：

- 使用 `${VARIABLE}` 語法保持技術棧無關
- 每個 Prompt 附帶使用範例
- 按步驟編號（01-xxx.md, 02-xxx.md）

### 4. 案例庫

- **pitfalls/**：踩坑案例（從實際開發經驗提煉）
- **success-cases/**：成功案例（可複製的最佳實踐）
- **sessions/**：精選 AI 對話（展示高效協作模式）

### 5. 技術棧參考實作

> **決策**：MVP 階段專注 React/Next.js，其他技術棧延後

- `tech-stack-examples/react-nextjs/` ← MVP 優先
- `tech-stack-examples/vue-nuxt/` ← 延後
- `tech-stack-examples/node-express/` ← 延後

## Impact

### Affected Specs

- 新增 capability：`ai-workflow-docs-structure`

### Affected Code/Systems

- 新增目錄：`ai-coding-workflow/`
- 預計新增文件：30+ 個 Markdown 文件
- 不影響現有程式碼

### 預期成果

| 指標                | 目標                                |
| ------------------- | ----------------------------------- |
| AI Agent 上下文載入 | 可按需引入單一文件，減少 token 消耗 |
| 新人上手時間        | 透過 QUICKSTART.md 快速進入狀況     |
| Prompt 重用率       | 標準化 Prompt 可跨專案使用          |
| 踩坑重複率          | 透過案例庫降低重複踩坑              |

### 風險評估

| 風險         | 影響 | 緩解措施                      |
| ------------ | ---- | ----------------------------- |
| 文件過時     | 中   | 建立季度審核機制              |
| 技術棧綁定   | 低   | 使用變數語法，範例放 appendix |
| 文件過於龐大 | 中   | 模組化設計，每個文件獨立完整  |

## Success Criteria

### MVP（P0）

- [ ] 目錄結構建立完成
- [ ] README.md 可作為 AI Agent 入口點
- [ ] design-system.md 完成（前端核心）
- [ ] 至少 3 個踩坑案例（從 ewill-web 報告整理）

### Full Release（P1-P3）

- [ ] 核心流程文件至少 10 個
- [ ] 每個流程至少包含 1 個可執行 Prompt
- [ ] 通過團隊 review

## Key Decisions

| 決策       | 選擇                              | 原因                      |
| ---------- | --------------------------------- | ------------------------- |
| 文件位置   | 專案根目錄 `/ai-coding-workflow/` | 獨立於 openspec，方便引用 |
| 技術棧範例 | 專注 react-nextjs                 | MVP 優先，其他延後        |
| 版本追蹤   | README version + OpenSpec         | 不需傳統 CHANGELOG        |
| 案例來源   | ewill-web/reports/                | 有現成的分析報告可整理    |

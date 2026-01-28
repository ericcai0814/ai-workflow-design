# Design: AI Coding Workflow 文件系統

## Context

### 背景

團隊開始大量使用 AI Agent（Claude Code、Cursor）進行開發，但缺乏：

- 標準化的協作流程
- 可重用的 Prompt 資產
- 經驗傳承機制

### 利害關係人

| 角色       | 需求                               |
| ---------- | ---------------------------------- |
| AI Agent   | 快速載入相關上下文、明確的指令格式 |
| 前端工程師 | UI/UX 開發流程、元件設計規範       |
| 後端工程師 | API 設計規範、資料庫設計指南       |
| 新進成員   | 快速上手指南、學習路徑             |
| Tech Lead  | 品質標準、Review 檢查清單          |

### 約束條件

- 文件系統必須保持技術棧無關
- 每個文件必須獨立完整，可單獨引用
- 必須相容主流 AI 編輯器（Claude Code、Cursor、Copilot）

## Goals / Non-Goals

### Goals

1. **AI 可解析**：結構化格式，AI 可快速定位並理解
2. **人類可維護**：Markdown 格式，版本控制友好
3. **技術棧無關**：變數化設計，適用任何技術棧
4. **漸進式採用**：可按需引入，不強制全部使用
5. **持續改進**：案例庫機制，累積團隊經驗

### Non-Goals

- ❌ 不是要取代官方文件（如 React Docs）
- ❌ 不是要建立完整的教學課程
- ❌ 不是要規定唯一正確的開發方式
- ❌ 不處理 CI/CD、DevOps 流程（未來可擴展）

## Decisions

### Decision 1: 三階段目錄結構

**選擇**：`01-planning/` → `02-development/` → `03-review/`

**原因**：

- 符合軟體開發生命週期
- 數字前綴確保排序一致
- AI Agent 可按階段導航

**替代方案考慮**：

- 按角色分類（frontend/, backend/）→ 不利於跨角色流程
- 扁平結構 → 文件過多時難以管理

### Decision 2: 變數語法 `${VARIABLE}`

**選擇**：使用 `${VARIABLE_NAME}` 語法

**原因**：

- 廣泛認知的模板語法
- 易於搜尋和替換
- 不與 Markdown 語法衝突

**替代方案考慮**：

- `{{variable}}` (Handlebars) → 與某些 Markdown 渲染器衝突
- `<VARIABLE>` → 可能被誤認為 HTML 標籤
- `[VARIABLE]` → 與 Markdown 連結語法衝突

### Decision 3: 前後端分離但共用 shared/

**選擇**：

```
02-development/
├── frontend/
├── backend/
└── shared/
```

**原因**：

- 明確職責分離
- 共用邏輯（驗證、測試）集中管理
- 全棧開發者可按需閱讀

### Decision 4: 設計系統優先

**選擇**：`design-system.md` 必須在元件開發之前完成

**原因**：

- 設計系統是前端開發的基礎
- 沒有設計系統，元件開發會混亂
- AI Agent 需要設計系統作為上下文才能生成一致的元件

### Decision 5: YAML Front Matter 元資料

**選擇**：所有文件必須包含標準化的 YAML Front Matter

```yaml
---
title: "文件標題"
id: "唯一識別碼"
category: "planning|development|review"
subcategory: "frontend|backend|shared"
ai_usage: ["使用場景"]
version: "1.0.0"
last_updated: "YYYY-MM-DD"
---
```

**原因**：

- AI Agent 可解析元資料進行智慧路由
- 支援自動化文件索引
- 版本追蹤便於維護

### Decision 6: 案例庫結構

**選擇**：

```
appendix/
├── pitfalls/      # 踩坑案例（失敗經驗）
├── success-cases/ # 成功案例（最佳實踐）
└── sessions/      # 精選對話（AI 協作範例）
```

**原因**：

- 區分正反面案例，學習價值不同
- sessions/ 保留完整對話上下文，展示 AI 協作模式
- 便於持續累積團隊經驗

### Decision 7: Git 工作流程放置於 shared/

**選擇**：`02-development/shared/git-workflow.md`

**原因**：

- Git 工作流程是前後端共用的流程，不屬於特定領域
- 與現有的 `integration.md`、`testing.md` 等共用文件一致
- 便於 AI Agent 在開發階段統一參考

**替代方案考慮**：

- `04-workflow/git-workflow.md` → 需要新增目錄層級，破壞現有三階段結構
- `references/git-workflow.md` → 不符合開發流程文件的定位

### Decision 8: Git 分支命名規範（可配置）

**選擇**：採用 `${ENV}_[scope]_[system]_[collaborator]` 格式，環境名稱可配置

**環境變數**：

| 變數             | 說明           | 預設值    | 範例                         |
| ---------------- | -------------- | --------- | ---------------------------- |
| `${ENV_DEV}`     | 開發環境       | `dev`     | `dev`, `develop`, `DEV`      |
| `${ENV_STAGING}` | 正式機測試環境 | `staging` | `staging`, `uat`, `UAT`      |
| `${ENV_PROD}`    | 正式環境       | `prod`    | `prod`, `production`, `PROD` |

**配置方式**：

AI Agent 應在首次使用時詢問用戶：

```
請問您的專案如何命名以下環境分支？
- 開發環境（預設：dev）：
- 正式機測試環境（預設：staging）：
- 正式環境（預設：prod）：
```

**原因**：

- 不同團隊有不同的命名慣例（DEV/UAT/PROD vs dev/staging/prod）
- 變數化設計符合本文件系統的核心原則
- 預設值降低配置門檻

**功能分支規範**：

- `feature/` - 新功能開發
- `fix-issue/` - 一般問題修復
- `hotfix/` - 緊急修復

## Risks / Trade-offs

| 風險         | 機率 | 影響 | 緩解措施               |
| ------------ | ---- | ---- | ---------------------- |
| 文件快速過時 | 高   | 中   | 季度審核 + 版本號追蹤  |
| 團隊不採用   | 中   | 高   | QUICKSTART.md 降低門檻 |
| 文件過於冗長 | 中   | 中   | 模組化設計，按需載入   |
| 變數替換遺漏 | 低   | 低   | 建立變數清單文件       |

## Migration Plan

### Phase 1: 基礎建設（Week 1）

1. 建立目錄結構
2. 建立 README.md 和 QUICKSTART.md
3. 建立 design-system.md

### Phase 2: 核心文件（Week 2-3）

1. 完成 01-planning/ 所有文件
2. 完成 02-development/frontend/ 核心文件
3. 完成 02-development/backend/ 核心文件

### Phase 3: 支援文件（Week 4）

1. 完成 shared/ 和 03-review/
2. 整理案例庫
3. 建立模板

### Phase 4: 驗收（Week 5）

1. 團隊 Review
2. 試用回饋
3. 正式發布

### Rollback Plan

如果發現重大問題：

1. 文件系統是獨立的，不影響現有程式碼
2. 可隨時調整結構，Markdown 文件易於重組
3. 保留 archive/ 記錄變更歷史

## Open Questions

1. **Q: 是否需要支援多語言？**
   - 初期僅支援繁體中文
   - 未來可考慮 i18n 結構

2. **Q: 如何處理敏感資訊？**
   - 案例庫中的敏感資訊需脫敏
   - 建立脫敏檢查清單

3. **Q: 如何衡量採用成效？**
   - 追蹤 Prompt 重用次數
   - 收集團隊回饋
   - 觀察踩坑案例是否減少

## References

- [openspec/project.md](../project.md) - 專案慣例定義
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Diátaxis Documentation Framework](https://diataxis.fr/)

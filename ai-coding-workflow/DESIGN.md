---
title: "文件系統技術設計"
id: "design"
category: "meta"
ai_usage:
  - "了解文件系統的架構設計"
  - "理解設計決策的原因"
  - "維護和擴展文件系統"
version: "1.0.0"
last_updated: "2026-01-23"
---

# AI Coding Workflow 文件系統技術設計

> 本文件說明 AI Coding Workflow 文件系統的架構設計、格式標準和技術決策。

---

## 1. 架構設計

### 1.1 三階段工作流程

```
01-planning/    → 規劃：需求分析、技術棧選擇、任務拆解
      ↓
02-development/ → 開發：前端、後端、共用流程
      ↓
03-review/      → 審核：Code Review、品質檢查
```

**設計理由：**

| 考量 | 說明 |
|------|------|
| 符合實際流程 | 對應軟體開發的自然階段 |
| 簡潔清晰 | 3 個主要階段，易於記憶 |
| 易於導航 | 數字前綴提供自然排序 |
| 易於維護 | 每個階段獨立，可獨立更新 |

### 1.2 前後端分離設計

```
02-development/
├── frontend/   → UI/UX、元件、狀態、路由
├── backend/    → API、資料庫、認證、邏輯
└── shared/     → 驗證、整合、測試
```

**設計理由：**

- **明確的職責分界**：前端和後端工程師各有專屬文件
- **共用流程統一管理**：避免重複，確保一致性
- **支援不同團隊結構**：全端工程師可以閱讀全部，專職工程師可以聚焦

### 1.3 技術棧無關設計

**核心原則：**

1. 流程文件不綁定特定技術
2. Prompt 使用變數語法
3. 技術棧範例放在 `appendix/tech-stack-examples/`

**變數使用範例：**

```prompt
請使用 ${FRAMEWORK} 建立元件：
- 技術棧：${FRAMEWORK}（例如：Vue 3, React, Angular）
- UI 框架：${UI_LIBRARY}（例如：Vuetify, Ant Design, Material-UI）
- 樣式方案：${CSS_SOLUTION}（例如：Tailwind, CSS Modules）
```

**常用變數對照表：**

| 變數 | 說明 | 範例值 |
|------|------|--------|
| `${FRAMEWORK}` | 前端框架 | React, Vue, Angular |
| `${LANGUAGE}` | 程式語言 | TypeScript, JavaScript |
| `${CSS_SOLUTION}` | CSS 方案 | Tailwind, CSS Modules |
| `${STATE_MANAGER}` | 狀態管理 | Zustand, Redux, Pinia |
| `${API_STYLE}` | API 風格 | REST, GraphQL, tRPC |
| `${DATABASE}` | 資料庫 | PostgreSQL, MongoDB |
| `${ORM}` | ORM 工具 | Prisma, Drizzle |
| `${TEST_FRAMEWORK}` | 測試框架 | Vitest, Jest |

**實作參考位置：**

- `appendix/tech-stack-examples/frontend-vue3/` — Vue 3 實際案例
- `appendix/tech-stack-examples/backend-python/` — Python 實際案例
- `appendix/tech-stack-examples/backend-csharp/` — C# 實際案例

### 1.4 模組化設計

- **每個文件獨立完整**：不需要閱讀其他文件也能理解
- **按需引入**：不需要順序閱讀全部文件
- **文件間關聯**：通過 YAML Front Matter 和相對路徑連結

### 1.5 分層結構

```
Layer 1: Overview（導航層）
│  - 每個目錄的 overview.md
│  - 提供快速導航和使用指引
│
▼
Layer 2: Process（流程層）
│  - 具體流程文件（如 design-system.md）
│  - Step-by-step 指引
│
▼
Layer 3: Prompts（執行層）
│  - 可直接複製的 Prompt 範本
│  - 包含驗證檢查清單
│
▼
Layer 4: Reference（參考層）
   - appendix/ 下的案例和範例
   - 提供具體證據和實作參考
```

**層級用途：**

| 層級 | 用途 | 目標讀者 |
|------|------|----------|
| Overview | 快速定位、決定閱讀路徑 | 所有人 |
| Process | 了解完整流程、建立上下文 | 需要學習流程的人 |
| Prompts | 直接執行、獲得結果 | AI Agent、熟練用戶 |
| Reference | 深入了解、借鑑經驗 | 遇到問題或想學習的人 |

---

## 2. YAML Front Matter 設計

### 2.1 必要欄位（所有文件）

```yaml
---
title: "文件標題"
id: "唯一識別碼"
category: "planning|development|review|appendix"
ai_usage:
  - "使用場景 1"
  - "使用場景 2"
version: "1.0.0"
last_updated: "YYYY-MM-DD"
---
```

**欄位說明：**

| 欄位 | 用途 | 範例 |
|------|------|------|
| `title` | 人類可讀的標題 | "設計系統建置流程" |
| `id` | 唯一識別碼，用於引用 | "design-system" |
| `category` | 主分類 | "development" |
| `ai_usage` | AI 判斷是否適用的依據 | ["建立新專案的設計系統"] |
| `version` | 文件版本 | "1.0.0" |
| `last_updated` | 最後更新日期 | "2026-01-23" |

### 2.2 開發階段額外欄位

```yaml
---
subcategory: "frontend|backend|shared"  # 開發階段必填
complexity: "low|medium|high"           # 複雜度指標
requires_human_review: true|false       # 是否需要人工審核
---
```

### 2.3 進階欄位（複雜文件）

```yaml
---
prerequisites:                          # 前置文件
  - id: "design-system-overview"
    path: "../frontend/overview.md"
    reason: "需要了解設計系統概念"

related_docs:                           # 相關文件
  - id: "component-testing"
    path: "../../03-review/code-review-checklist.md"

next_steps:                             # 下一步建議
  - "執行 Prompt 建立 Token 系統"
  - "閱讀元件開發文檔"

tech_stack:                             # 技術棧（通用流程留空）
  frontend: []                          # 例如：["vue3", "react"]
  backend: []                           # 例如：["python", "nodejs"]
  database: []                          # 例如：["postgresql", "mongodb"]

status: "stable|draft|deprecated"       # 文件狀態
---
```

### 2.4 AI 讀取邏輯

```
1. 掃描所有文件的 YAML Front Matter
2. 根據 category + subcategory 定位
3. 檢查 ai_usage 判斷適用場景
4. 檢查 prerequisites 決定閱讀順序
5. 執行文件中的 Prompt
6. 檢查 next_steps 決定下一步
```

---

## 3. 文件格式標準

### 3.1 Overview 文件格式

```markdown
---
[YAML Front Matter]
---

# [階段/領域] 概述

## 目標
（3-5 句話說明本階段目標）

## 何時閱讀此階段文件
- 場景 1
- 場景 2

## 文件導航
| 文件 | 用途 | 複雜度 |
|------|------|--------|
| xxx.md | ... | Low |

## 快速開始
1. 先閱讀 ...
2. 然後執行 ...

## 相關文件
- [相關文件連結]
```

### 3.2 流程文件格式

```markdown
---
[YAML Front Matter]
---

# 文件標題

## 概述
（簡短說明，AI/人快速判斷是否需要深讀）

## 使用場景
- 場景 1
- 場景 2

## 前置條件
- [ ] 已完成 XXX
- [ ] 已準備 XXX

## 工作流程

### 步驟 1: 步驟名稱
**說明**：簡短描述

**執行**：具體操作

**驗證**：
- [ ] 檢查項 1
- [ ] 檢查項 2

[重複 Step 2, 3...]

## Prompts
（Prompt 範本區塊）

## 檢查清單
- [ ] 所有步驟已完成
- [ ] 產出符合規範

## 常見問題
**Q1: 問題？**
A: 答案

## 相關文件
- 繼續閱讀：[xxx](path)
- 參考：[xxx](path)
```

### 3.3 Prompt 範本格式

```markdown
### Prompt N：標題

\`\`\`
你是一位 [角色]。請 [任務]。

## 專案資訊
${PROJECT_INFO}

## 要求
1. 要求 1
2. 要求 2

## 輸出格式
[預期輸出]
\`\`\`
```

### 3.4 案例文件格式

```markdown
---
[YAML Front Matter]
---

# Case XX: 案例標題

## 案例資訊
- **時間**：2026-01-XX
- **專案**：專案名稱
- **類型**：踩坑案例 / 成功案例
- **相關 Commits**：`hash1`, `hash2`

## 情境描述
（背景、當時的任務、遇到的狀況）

## 問題症狀 / 成功關鍵
（具體描述）

## 根本原因 / 決策過程
（深入分析）

## 解決方案 / 執行策略
（具體步驟）

## 預防措施 / 可重用模式
（未來如何避免 / 如何複製成功）

## 相關資源
- Commit: [連結]
- 相關文件: [文件](path)
```

---

## 4. 前端開發的特殊設計

### 4.1 設計系統的核心地位

**位置**：`02-development/frontend/design-system.md`

**為什麼特別重要？**

```
設計系統是前端開發的基礎
      ↓
必須在元件開發之前建立
      ↓
確保所有元件風格一致
      ↓
AI 生成的程式碼也能保持一致
```

**內容結構：**

1. 設計系統概述
2. Token 系統建立（Colors, Typography, Spacing）
3. 基礎元件建立（Button, Input, Card...）
4. 文檔規範（Storybook, 使用範例）
5. 完整的 Prompts

**相關文件：**

| 文件 | 用途 |
|------|------|
| `token-system.md` | Design Token 詳細定義 |
| `component-library.md` | 元件庫規範 |
| `documentation-guide.md` | 文件撰寫指南 |

### 4.2 元件開發依賴關係

```
design-system.md      → 必須先建立設計系統
      ↓
component-dev.md      → 然後才能開發元件
      ↓
state-management.md   → 處理複雜狀態
      ↓
routing.md            → 處理頁面導航
```

---

## 5. 後端開發的特殊設計

### 5.1 API 優先設計

**位置**：`02-development/backend/api-design.md`

**核心原則：**

1. **API 契約先行**：先定義 OpenAPI/Swagger 規格
2. **前後端並行開發**：前端可用 Mock Server
3. **版本控制**：API 版本管理策略

### 5.2 資料庫設計

**位置**：`02-development/backend/database.md`

**包含：**

- Schema 設計原則
- 關聯式 vs NoSQL 選擇
- Migration 策略
- 效能優化考量

### 5.3 認證授權

**位置**：`02-development/backend/authentication.md`

**包含：**

- 認證機制選擇（JWT, Session, OAuth）
- 授權設計（RBAC）
- 安全最佳實踐

---

## 6. 共用流程的設計

### 6.1 三層驗證框架

**位置**：`02-development/shared/validation-framework.md`

**核心價值**：防止「改 A 壞 B」

```
┌─────────────────────────────────────────────────────────────┐
│                      三層驗證框架                            │
└─────────────────────────────────────────────────────────────┘

Layer 1: 變更前驗證
┌─────────────────┐
│  確認需求       │ → 需求是否明確？
│  檢查影響範圍   │ → 會影響哪些檔案/功能？
│  建立測試計畫   │ → 如何驗證成功？
└─────────────────┘
         │
         ▼
Layer 2: 變更中驗證
┌─────────────────┐
│  單元測試       │ → 新功能正確？
│  即時檢查       │ → 沒有破壞現有功能？
│  逐步提交       │ → 可追蹤的變更？
└─────────────────┘
         │
         ▼
Layer 3: 變更後驗證
┌─────────────────┐
│  整合測試       │ → 系統整體正常？
│  回歸測試       │ → 舊功能仍正常？
│  部署驗證       │ → 生產環境正常？
└─────────────────┘
```

### 6.2 前後端整合

**位置**：`02-development/shared/integration.md`

**包含：**

- API 契約測試
- Mock 策略
- E2E 測試
- 部署策略

### 6.3 測試策略

**位置**：`02-development/shared/testing.md`

**測試金字塔：**

```
         /\
        /  \      E2E 測試（少量）
       /────\
      /      \    整合測試（中等）
     /────────\
    /          \  單元測試（大量）
   /────────────\
```

---

## 7. 維護策略

### 7.1 版本控制

- **文件版本**：每個文件在 YAML Front Matter 中有獨立版本號
- **系統版本**：CHANGELOG.md 記錄系統層級變更
- **Git Tags**：標記重要版本（v1.0, v1.1...）

### 7.2 更新流程

```
新增踩坑案例 → appendix/pitfalls/case-XX.md
      ↓
優化 Prompt → 更新對應的流程文件
      ↓
流程改進 → 更新 overview 和流程文件
      ↓
定期審核 → 檢查所有文件的準確性
```

### 7.3 品質保證

| 項目 | 說明 |
|------|------|
| AI Agent 測試 | 實際執行 Prompts，驗證可用性 |
| 人工審核 | 核心文件（design-system.md, validation-framework.md） |
| 案例更新 | 持續補充新的踩坑和成功案例 |
| Prompt 優化 | 根據使用反饋改進 |

---

## 8. 技術決策記錄

| 決策 | 選擇 | 原因 | 替代方案 |
|------|------|------|----------|
| 文件格式 | Markdown + YAML | AI 最高效讀取格式 | JSON, reStructuredText |
| 目錄結構 | 3 階段 + 前後端分離 | 符合實際工作流程 | 10+ 技術棧目錄 |
| Prompt 位置 | 嵌入流程文件 | 上下文完整，易於使用 | 獨立 prompts/ 目錄 |
| 技術棧處理 | 通用流程 + 變數 + 範例 | 適用任何專案 | 綁定特定技術 |
| 案例數量 | 精選案例 | 避免資訊過載 | 所有歷史記錄 |
| 前後端分離 | frontend/ + backend/ + shared/ | 明確職責，保留共用 | 全部混在一起 |
| 設計系統地位 | 獨立完整文件 | 前端開發基礎 | 與元件開發合併 |
| 層級設計 | 4 層（Overview → Process → Prompts → Reference） | 不同深度的閱讀需求 | 扁平結構 |

---

## 9. 與 OpenSpec 的整合

### 9.1 變更提案流程

```
需要改進文件 → 建立 OpenSpec change
      ↓
proposal.md → 說明為什麼和改什麼
      ↓
tasks.md → 拆解具體任務
      ↓
實作 → 更新文件
      ↓
歸檔 → archive/ + 更新 specs/
```

### 9.2 規格文件同步

- `openspec/specs/` 記錄文件系統結構
- 每次重大更新後同步更新 specs/
- 保持規格與實作一致

---

## 10. 預期使用場景

### 場景 1：新專案啟動

```
1. 閱讀 README.md 了解系統
2. 閱讀 01-planning/overview.md
3. 執行 01-planning/requirement-analysis.md
4. 執行 01-planning/tech-stack-selection.md
5. 進入 02-development/ 開始開發
```

### 場景 2：前端工程師建立設計系統

```
1. 閱讀 02-development/frontend/overview.md
2. 閱讀 02-development/frontend/design-system.md
3. 執行 Prompt：分析設計參考
4. 執行 Prompt：建立 Token 系統
5. 執行 Prompt：建立基礎元件
6. 參考 token-system.md, component-library.md
```

### 場景 3：後端工程師設計 API

```
1. 閱讀 02-development/backend/overview.md
2. 閱讀 02-development/backend/api-design.md
3. 執行相關 Prompts
4. 參考 appendix/tech-stack-examples/
```

### 場景 4：遇到問題排查

```
1. 查閱 appendix/pitfalls/
2. 找到類似問題的案例
3. 參考解決方案
4. 如果是新問題，記錄到 pitfalls/
```

### 場景 5：Code Review

```
1. 閱讀 03-review/overview.md
2. 閱讀 03-review/code-review-checklist.md
3. 執行審查
4. 記錄發現的問題
```

---

## 11. 擴展指南

### 11.1 新增流程文件

1. 確定文件位置（哪個目錄）
2. 建立文件，遵循格式標準
3. 填寫 YAML Front Matter
4. 更新對應的 overview.md
5. 更新 CHANGELOG.md

### 11.2 新增踩坑案例

1. 在 `appendix/pitfalls/` 建立 `case-XX-description.md`
2. 遵循案例文件格式
3. 更新 `appendix/pitfalls/index.md`
4. 如果影響流程，更新對應的流程文件

### 11.3 新增技術棧範例

1. 在 `appendix/tech-stack-examples/` 建立目錄
2. 提供實際的程式碼範例
3. 說明如何將通用 Prompt 中的變數替換為具體值
4. 更新 README.md 的技術棧說明

---

## 相關文件

- [README](./README.md) — 系統入口
- [QUICKSTART](./QUICKSTART.md) — 快速開始
- [CHANGELOG](./CHANGELOG.md) — 版本記錄
- [術語表](./appendix/glossary.md) — 術語定義

# Tasks: create-ai-workflow-docs

> AI Coding Workflow 文件系統建置任務清單
> 總任務數：約 90 個任務，分 15 個 Phase

---

## Phase 1: 基礎架構（Foundation）

> 建立文件系統的根目錄和入口文件

- [ ] 1.1 建立根目錄 `/ai-coding-workflow/`
- [ ] 1.2 建立 `README.md`（AI 入口點，包含使用指引）
- [ ] 1.3 建立 `QUICKSTART.md`（快速開始指南）
- [ ] 1.4 建立 `CHANGELOG.md`（版本記錄）

**驗收標準**：
- AI Agent 可從 README 了解系統用途和導航
- QUICKSTART 提供角色導向的快速入門

---

## Phase 2: 規劃階段文件（01-planning/）

> 需求分析、任務拆解、技術選型的指引文件

- [ ] 2.1 建立 `01-planning/` 目錄結構
- [ ] 2.2 建立 `01-planning/overview.md`
- [ ] 2.3 建立 `01-planning/task-decomposition.md`
  - 任務拆解方法
  - 需求釐清流程
  - 確認檢查清單
- [ ] 2.4 建立 `01-planning/tech-stack-selection.md`
  - 技術棧選擇決策框架
  - 常見技術棧組合
  - 評估標準
- [ ] 2.5 建立 `01-planning/prompts/` 目錄
- [ ] 2.6 建立 `01-planning/prompts/analyze-requirements.md`
- [ ] 2.7 建立 `01-planning/prompts/create-plan.md`

**驗收標準**：
- 提供完整的需求分析流程
- Prompt 範本可直接使用

---

## Phase 3: 前端開發文件（02-development/frontend/）

> 設計系統、元件開發、狀態管理的完整指引

- [ ] 3.1 建立 `02-development/frontend/` 目錄結構
- [ ] 3.2 建立 `02-development/frontend/overview.md`
- [ ] 3.3 建立 `02-development/frontend/design-system.md` 🎯 **核心**
  - 設計系統建立完整流程
  - Token 系統、元件庫、文檔規範
  - Step-by-step 指引
- [ ] 3.4 建立 `02-development/frontend/component-dev.md`
  - 元件開發標準流程
  - Props/Events/Slots 規範
  - 測試要求
- [ ] 3.5 建立 `02-development/frontend/state-management.md`
  - 狀態管理模式
  - 全域 vs 區域狀態
  - 資料流設計
- [ ] 3.6 建立 `02-development/frontend/prompts/` 目錄
- [ ] 3.7 建立 `02-development/frontend/prompts/setup-design-system.md`
- [ ] 3.8 建立 `02-development/frontend/prompts/setup-token-system.md`
- [ ] 3.9 建立 `02-development/frontend/prompts/create-component.md`
- [ ] 3.10 建立 `02-development/frontend/prompts/setup-routing.md`
- [ ] 3.11 建立 `02-development/frontend/prompts/setup-state-management.md`

**驗收標準**：
- design-system.md 是最完整的文件
- 所有 Prompt 範本經過實測可用

---

## Phase 4: 後端開發文件（02-development/backend/）

> API 設計、資料庫、認證授權的指引

- [ ] 4.1 建立 `02-development/backend/` 目錄結構
- [ ] 4.2 建立 `02-development/backend/overview.md`
- [ ] 4.3 建立 `02-development/backend/api-design.md`
  - RESTful API 設計原則
  - 版本控制策略
  - 錯誤處理標準
- [ ] 4.4 建立 `02-development/backend/database-design.md`
  - Schema 設計原則
  - 關聯式 vs NoSQL 選擇
  - Migration 策略
- [ ] 4.5 建立 `02-development/backend/auth-security.md`
  - 認證機制（JWT, Session, OAuth）
  - 授權設計（RBAC）
  - 安全最佳實踐
- [ ] 4.6 建立 `02-development/backend/prompts/` 目錄
- [ ] 4.7 建立 `02-development/backend/prompts/design-api.md`
- [ ] 4.8 建立 `02-development/backend/prompts/create-model.md`
- [ ] 4.9 建立 `02-development/backend/prompts/setup-auth.md`

**驗收標準**：
- API 設計文件涵蓋 REST 最佳實踐
- 認證授權流程清晰完整

---

## Phase 5: 共用開發流程（02-development/shared/）

> 驗證框架、前後端整合、測試策略

- [ ] 5.1 建立 `02-development/shared/` 目錄結構
- [ ] 5.2 建立 `02-development/shared/validation-framework.md` 🎯 **核心**
  - 三層驗證：變更前/中/後
  - 防止「改 A 壞 B」
  - 檢查清單
- [ ] 5.3 建立 `02-development/shared/integration.md`
  - 前後端整合流程
  - API 契約測試
  - Mock 策略
- [ ] 5.4 建立 `02-development/shared/testing.md`
  - 測試金字塔
  - 單元測試 / 整合測試 / E2E
  - 測試策略
- [ ] 5.5 建立 `02-development/shared/prompts/` 目錄
- [ ] 5.6 建立 `02-development/shared/prompts/feature-implementation.md`
- [ ] 5.7 建立 `02-development/shared/prompts/bug-fixing.md`
- [ ] 5.8 建立 `02-development/shared/prompts/integration-test.md`

**驗收標準**：
- validation-framework.md 提供實用的驗證流程
- 測試策略涵蓋各層級

---

## Phase 6: 開發階段總覽（02-development/）

> 整合前端、後端、共用流程的導航

- [ ] 6.1 建立 `02-development/overview.md`
  - 前端、後端、共用流程的關係
  - 開發流程總覽
  - 快速導航

**驗收標準**：
- 清晰展示三個子目錄的關係和使用場景

---

## Phase 7: 審核階段文件（03-review/）

> 程式碼審查的標準和流程

- [ ] 7.1 建立 `03-review/` 目錄結構
- [ ] 7.2 建立 `03-review/overview.md`
- [ ] 7.3 建立 `03-review/code-review-checklist.md`
  - 前端審查重點
  - 後端審查重點
  - 通用審查標準
- [ ] 7.4 建立 `03-review/prompts/` 目錄
- [ ] 7.5 建立 `03-review/prompts/review-code.md`

**驗收標準**：
- 提供可執行的審查清單
- 區分前後端審查重點

---

## Phase 8: 踩坑案例（appendix/pitfalls/）

> 從 ewill-web 專案提煉的踩坑經驗

- [ ] 8.1 建立 `appendix/pitfalls/` 目錄結構
- [ ] 8.2 建立 `appendix/pitfalls/index.md`（案例索引）
- [ ] 8.3 建立 `appendix/pitfalls/case-01-api-routing.md`
  - API 架構演進問題
  - 路由衝突
- [ ] 8.4 建立 `appendix/pitfalls/case-02-env-variables.md`
  - 環境變數載入問題
  - Astro 5 特定問題
- [ ] 8.5 建立 `appendix/pitfalls/case-03-ci-cd-config.md`
  - CI/CD 配置錯誤
  - pnpm 版本衝突
- [ ] 8.6 建立 `appendix/pitfalls/case-04-type-safety.md`
  - TypeScript 型別問題
  - Props 定義錯誤
- [ ] 8.7 建立 `appendix/pitfalls/case-05-design-system.md`
  - 設計系統不一致
  - Token 系統問題

**驗收標準**：
- 每個案例有具體證據（commit hash/session ID）
- 包含問題描述、根因、解決方案

**案例來源**：`/Users/ericcai/project/ewill-web/reports/vibe-coding-2026-01/`

---

## Phase 9: 成功案例（appendix/success-cases/）

> 值得複製的成功經驗

- [ ] 9.1 建立 `appendix/success-cases/` 目錄結構
- [ ] 9.2 建立 `appendix/success-cases/index.md`（案例索引）
- [ ] 9.3 建立 `appendix/success-cases/case-01-design-system-setup.md`
  - 設計系統建立經驗
  - 關鍵 Prompt
  - 可重用模式
- [ ] 9.4 建立 `appendix/success-cases/case-02-mock-data-architecture.md`
  - Mock Data 三層 Provider 架構
  - 架構設計決策
- [ ] 9.5 建立 `appendix/success-cases/case-03-ci-cd-migration.md`
  - Cloudflare → Vercel 遷移
  - 部署策略

**驗收標準**：
- 每個案例可直接複製應用
- 包含關鍵 Prompt 和決策原因

---

## Phase 10: 精選對話（appendix/sessions/）

> 從 44 個 sessions 中精選的高價值對話

- [ ] 10.1 建立 `appendix/sessions/` 目錄結構
- [ ] 10.2 建立 `appendix/sessions/index.md`（對話索引）
- [ ] 10.3 建立 `appendix/sessions/session-01-design-system.md`
  - 設計系統建立完整對話
  - 提煉 Prompt 模式
- [ ] 10.4 建立 `appendix/sessions/session-02-api-integration.md`
  - API 整合對話
  - 前後端協作模式
- [ ] 10.5 建立 `appendix/sessions/session-03-debugging.md`
  - 複雜問題排查
  - 除錯策略

**驗收標準**：
- 對話經過整理，保留關鍵片段
- 標註可學習的 Prompt 模式

---

## Phase 11: 技術棧範例（appendix/tech-stack-examples/）

> 不同技術棧的實作參考

- [ ] 11.1 建立 `appendix/tech-stack-examples/` 目錄結構
- [ ] 11.2 建立 `appendix/tech-stack-examples/frontend-vue3/`
  - 基於 ewill-web 專案
  - Vue 3 + Vuetify 實作範例
- [ ] 11.3 建立 `appendix/tech-stack-examples/backend-python/`
  - Python 實作範例
  - FastAPI 或 Django 參考
- [ ] 11.4 建立 `appendix/tech-stack-examples/backend-csharp/`
  - C# Core 實作範例
  - ASP.NET Core 參考

**驗收標準**：
- 每個技術棧有基本的範例程式碼
- 與主文件的 `${VARIABLE}` 語法對應

---

## Phase 12: Prompt 速查表（appendix/）

> 一頁式的 Prompt 快速查找

- [ ] 12.1 建立 `appendix/prompt-cheatsheet.md`
  - 場景 → Prompt 位置快速查找
  - 一頁式設計
  - 按使用頻率排序

**驗收標準**：
- 一眼找到需要的 Prompt
- 涵蓋所有場景

---

## Phase 13: 可複製模板（templates/）

> 標準化的文件模板

- [ ] 13.1 建立 `templates/` 目錄結構
- [ ] 13.2 建立 `templates/task-plan.md`
- [ ] 13.3 建立 `templates/deviation-report.md`
- [ ] 13.4 建立 `templates/feature-spec.md`
- [ ] 13.5 建立 `templates/component-spec.md`
- [ ] 13.6 建立 `templates/api-spec.md`
- [ ] 13.7 建立 `templates/database-schema.md`

**驗收標準**：
- 模板可直接複製使用
- 包含必要的欄位和說明

---

## Phase 14: 驗證與品質保證（Validation & QA）

> 確保文件系統的品質和可用性

- [ ] 14.1 驗證所有文件的 YAML Front Matter 格式正確
- [ ] 14.2 驗證文件之間的連結正確（相對路徑）
- [ ] 14.3 驗證 Prompt 範本可直接執行
- [ ] 14.4 測試 AI Agent 能否正確讀取和使用
- [ ] 14.5 人工審核核心文件品質：
  - [ ] 14.5.1 design-system.md
  - [ ] 14.5.2 validation-framework.md
  - [ ] 14.5.3 所有 Prompt 範本
- [ ] 14.6 確認所有案例有具體證據（commit hash/session ID）
- [ ] 14.7 確認術語使用一致（參考 glossary）

**驗收標準**：
- 所有連結可正常跳轉
- Prompt 經過實測
- 核心文件經過人工審核

---

## Phase 15: 文檔發布（Documentation Release）

> 最終發布和版本記錄

- [ ] 15.1 更新 README.md 最終版
- [ ] 15.2 更新 CHANGELOG.md 記錄 v1.0
- [ ] 15.3 Git commit 所有文件
- [ ] 15.4 執行 `openspec archive create-ai-workflow-docs`
- [ ] 15.5 更新 OpenSpec specs/ 反映新系統

**驗收標準**：
- 所有文件已 commit
- OpenSpec 已正確 archive

---

## Dependencies（依賴關係）

```
Phase 1 (Foundation)
    │
    ├──► Phase 2 (Planning)
    │
    ├──► Phase 3 (Frontend) ──────┐
    │                              │
    ├──► Phase 4 (Backend) ───────┼──► Phase 5 (Shared)
    │                              │
    ├──► Phase 6 (Dev Overview) ◄─┘
    │
    ├──► Phase 7 (Review)
    │
    ├──► Phase 8-12 (Appendix) ── 可並行
    │
    ├──► Phase 13 (Templates)
    │
    └──► Phase 14 (QA) ── 依賴所有前置任務
              │
              ▼
         Phase 15 (Release)
```

---

## Priority Order（優先順序）

| 優先級 | Phase | 說明 |
|--------|-------|------|
| **P0** | 1, 3.3 | 基礎架構 + design-system.md |
| **P1** | 2, 3, 4, 5 | 核心開發流程文件 |
| **P2** | 6, 7, 8 | 總覽、審核、踩坑案例 |
| **P3** | 9, 10, 11, 12, 13 | 成功案例、對話、範例、模板 |
| **P4** | 14, 15 | 驗證與發布 |

---

## Key Decisions（關鍵決策）

| 決策項目 | 決策內容 |
|----------|----------|
| **文件位置** | 專案根目錄 `/ai-coding-workflow/` |
| **核心文件** | design-system.md、validation-framework.md |
| **案例來源** | `/Users/ericcai/project/ewill-web/reports/vibe-coding-2026-01/` |
| **版本追蹤** | CHANGELOG.md + OpenSpec changes |
| **技術棧範例** | Vue3、Python、C# 三種 |

---

## Execution Principles（執行原則）

1. **階段驗證**：每個 Phase 完成後進行階段驗證
2. **核心優先**：🎯 標記的核心文件優先完成
3. **可執行性**：Prompt 範本必須可直接執行，經過測試
4. **有據可查**：案例文件必須有具體證據支持
5. **格式一致**：所有文件遵循 project.md 定義的格式標準

---

## Progress Tracking（進度追蹤）

| Phase | 任務數 | 完成數 | 狀態 |
|-------|--------|--------|------|
| 1. Foundation | 4 | 0 | ⏳ |
| 2. Planning | 7 | 0 | ⏳ |
| 3. Frontend | 11 | 0 | ⏳ |
| 4. Backend | 9 | 0 | ⏳ |
| 5. Shared | 8 | 0 | ⏳ |
| 6. Dev Overview | 1 | 0 | ⏳ |
| 7. Review | 5 | 0 | ⏳ |
| 8. Pitfalls | 7 | 0 | ⏳ |
| 9. Success Cases | 5 | 0 | ⏳ |
| 10. Sessions | 5 | 0 | ⏳ |
| 11. Tech Examples | 4 | 0 | ⏳ |
| 12. Cheatsheet | 1 | 0 | ⏳ |
| 13. Templates | 7 | 0 | ⏳ |
| 14. QA | 8 | 0 | ⏳ |
| 15. Release | 5 | 0 | ⏳ |
| **Total** | **87** | **0** | **0%** |

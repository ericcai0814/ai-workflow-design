# Tasks: create-ai-workflow-docs

## MVP Scope (P0) ✅ COMPLETED

> 目標：建立可用的最小文件系統，包含入口、設計系統、踩坑案例

- [x] 1.1 建立完整目錄結構（`/ai-coding-workflow/`）
- [x] 1.2 建立 README.md（AI 入口點）
- [x] 3.1 建立 design-system.md（設計系統 - 最高優先級）
- [x] 7.2 整理至少 3 個踩坑案例（從 ewill-web/reports 整理）
  - case-01-cicd-configuration.md
  - case-02-astro5-env-variables.md
  - case-03-vercel-api-404.md

---

## Full Release Scope (P1-P3)

### 1. 基礎建設（補完）

- [ ] 1.3 建立 QUICKSTART.md（快速開始指南）

## 2. 規劃階段文件 (01-planning/)

- [ ] 2.1 建立 requirement-analysis.md（需求分析流程）
- [ ] 2.2 建立 tech-stack-selection.md（技術棧選擇指南）
- [ ] 2.3 建立 architecture-design.md（架構設計流程）

### 3. 前端開發文件 (02-development/frontend/)

- [ ] 3.2 建立 design-system/prompts/ 目錄及 Prompt 範本
- [ ] 3.3 建立 component-development.md（元件開發流程）
- [ ] 3.4 建立 state-management.md（狀態管理）
- [ ] 3.5 建立 routing.md（路由設計）

## 4. 後端開發文件 (02-development/backend/)

- [ ] 4.1 建立 api-design.md（API 設計規範）
- [ ] 4.2 建立 database.md（資料庫設計）
- [ ] 4.3 建立 authentication.md（認證授權流程）
- [ ] 4.4 建立 business-logic.md（商業邏輯實作）

## 5. 共用流程文件 (02-development/shared/)

- [ ] 5.1 建立 validation-framework.md（驗證框架）
- [ ] 5.2 建立 integration.md（前後端整合）
- [ ] 5.3 建立 testing.md（測試策略）

## 6. 審核階段文件 (03-review/)

- [ ] 6.1 建立 code-review.md（程式碼審查）
- [ ] 6.2 建立 security-review.md（安全性審查）
- [ ] 6.3 建立 performance-review.md（效能審查）

### 7. 附錄內容 (appendix/)

- [ ] 7.1 建立 prompt-cheatsheet.md（Prompt 速查表）
- [ ] 7.3 整理至少 2 個成功案例到 success-cases/
- [ ] 7.4 建立 tech-stack-examples/react-nextjs/ 結構（其他技術棧延後）

## 8. 模板文件 (templates/)

- [ ] 8.1 建立 component-template.md
- [ ] 8.2 建立 api-template.md
- [ ] 8.3 建立 test-template.md
- [ ] 8.4 建立 document-template.md

## 9. 驗收與發布

- [ ] 9.1 驗證所有文件連結有效
- [ ] 9.2 確認 YAML Front Matter 格式正確
- [ ] 9.3 團隊 Review
- [ ] 9.4 更新 openspec/specs/ 並 archive 此變更

---

## Dependencies

```
1.1 ─┬─► 1.2 ─► 1.3
     │
     ├─► 2.x (可並行)
     │
     ├─► 3.1 ─► 3.2 ─► 3.3~3.5 (設計系統優先)
     │
     ├─► 4.x (可並行)
     │
     ├─► 5.x (依賴 3.x, 4.x 完成)
     │
     └─► 6.x, 7.x, 8.x (可並行)

9.x 依賴所有前置任務完成
```

## Priority Order

1. **P0 - MVP**：1.1, 1.2, 3.1, 7.2（目錄、README、設計系統、踩坑案例）
2. **P1 - 核心流程**：1.3, 2.x, 3.x, 4.x（QUICKSTART、規劃、開發文件）
3. **P2 - 支援文件**：5.x, 6.x, 7.x, 8.x（共用、審核、附錄、模板）
4. **P3 - 收尾**：9.x（驗收與發布）

## Key Decisions

- **文件位置**：專案根目錄 `/ai-coding-workflow/`
- **技術棧範例**：MVP 專注 react-nextjs，vue-nuxt 和 node-express 延後
- **版本追蹤**：README version + OpenSpec changes（不使用 CHANGELOG）
- **案例來源**：從 `/Users/ericcai/project/ewill-web/reports/vibe-coding-2026-01/` 整理

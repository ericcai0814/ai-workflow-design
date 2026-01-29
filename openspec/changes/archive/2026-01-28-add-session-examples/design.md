## Context

目前 `appendix/` 目錄已有：

- `pitfalls/`：踩坑案例（3 個案例）
- `success-cases/`：成功案例（1 個案例）
- `tech-stack-examples/`：技術棧範例（index.md）
- `prompt-cheatsheet.md`：Prompt 速查表
- `glossary.md`：術語表

缺少 `sessions/` 目錄來存放精選的 AI 協作對話。

## Goals / Non-Goals

**Goals:**

- 建立精選對話的標準格式和結構
- 提供 3-5 個高品質對話範例
- 涵蓋不同開發場景（設計、整合、除錯）
- 標註可學習的 Prompt 模式

**Non-Goals:**

- 不收錄完整對話（保留關鍵片段）
- 不涉及敏感的專案資訊
- 不處理對話的自動化收集

## Decisions

### 1. 檔案命名規範

**決策**：使用 `session-##-description.md` 格式

**原因**：與 pitfalls 和 success-cases 的命名規範一致（case-##-description.md）。

### 2. 對話格式

**決策**：使用 Markdown 引用格式標示對話

```markdown
> **User**: 問題描述...

> **AI**: 回應內容...
```

**原因**：視覺上清晰區分用戶和 AI 的發言，便於閱讀。

### 3. 精選標準

**決策**：每個精選對話須包含：

- 背景說明：任務目標和情境
- 關鍵對話：展示有效的 Prompt 模式
- 學習重點：可複用的技巧標註

**原因**：確保每個範例都有學習價值，不只是對話記錄。

## Risks / Trade-offs

| Risk         | Mitigation                       |
| ------------ | -------------------------------- |
| 對話內容過時 | 定期審核和更新，標註版本資訊     |
| 專案資訊洩露 | 匿名化處理，使用變數替代具體名稱 |
| 範例過於特定 | 選擇通用場景，抽象化技術細節     |

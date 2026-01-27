---
title: "成功案例索引"
id: "success-cases-index"
category: "appendix"
ai_usage:
  - "參考最佳實踐"
  - "學習成功模式"
version: "1.0.0"
last_updated: "2026-01-27"
---

# 成功案例索引

## 概述

本索引收錄團隊在開發過程中的成功案例和最佳實踐，作為未來專案的參考。

## 案例列表

### Case 01: Claude.md 觸發規則

**主題**：如何設計有效的 Skill 自動觸發機制
**類型**：工作流程優化
**成效**：提升 AI 輔助開發效率

**關鍵成功因素**：
- 明確的觸發關鍵字定義
- 清晰的文件對應關係
- 70% MVP 標準明確

[查看完整案例 →](./case-01-claude-md-trigger-rules.md)

---

## 按類型分類

### 工作流程優化

| 案例 | 描述 | 成效 |
|------|------|------|
| [Case 01](./case-01-claude-md-trigger-rules.md) | Skill 觸發規則設計 | 提升 AI 協作效率 |

### 架構設計

（待新增）

### 效能優化

（待新增）

### 團隊協作

（待新增）

## 如何新增案例

當完成值得記錄的成功案例時：

1. 在 `success-cases/` 目錄新增檔案：`case-XX-[描述].md`
2. 使用以下模板：

```markdown
---
title: "Case XX: [案例標題]"
id: "success-case-XX"
category: "workflow|architecture|performance|collaboration"
last_updated: "YYYY-MM-DD"
---

# Case XX: [案例標題]

## 背景

[說明案例的背景和目標]

## 挑戰

[描述面臨的挑戰]

## 解決方案

[詳細說明採取的方案]

## 實作重點

### 重點 1

[說明]

### 重點 2

[說明]

## 成效

- 成效 1
- 成效 2

## 學習重點

- 重點 1
- 重點 2

## 可複用元素

[列出可以在其他專案複用的元素]
```

3. 更新本索引文件

## 相關文件

- [踩坑案例索引](../pitfalls/index.md)
- [最佳實踐](../../02-development/frontend/design-system.md)

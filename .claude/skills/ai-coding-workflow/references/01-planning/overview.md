---
title: "規劃階段總覽"
id: "planning-overview"
category: "planning"
ai_usage:
  - "了解規劃階段的目標和流程"
  - "決定從哪個文件開始"
  - "掌握規劃階段的輸出物"
version: "1.0.0"
last_updated: "2026-01-23"
---

# 規劃階段總覽

## 目標

規劃階段的目標是將模糊的需求轉換為可執行的開發計畫。

```
模糊的想法 ──► 清晰的規格 ──► 可執行的計畫
```

## 為什麼規劃重要？

### 1. 減少返工

- 提前發現需求中的矛盾和模糊點
- 避免「做到一半才發現需求不對」

### 2. 對齊預期

- 確保 AI 和人類對任務有相同理解
- 明確「完成」的定義

### 3. 提高效率

- 有計畫的開發比隨興的開發更有效率
- 減少「我不知道接下來要做什麼」的時間

## 規劃流程

```
┌─────────────────────────────────────────────────────────────┐
│                        規劃流程                              │
└─────────────────────────────────────────────────────────────┘

Step 1: 需求分析
┌─────────────────┐
│  釐清需求       │ → 用戶故事、驗收標準、邊界條件
│ requirement-    │
│ analysis.md     │
└─────────────────┘
         │
         ▼
Step 2: 任務拆解
┌─────────────────┐
│  分解任務       │ → 可獨立完成的小任務、依賴關係
│ task-           │
│ decomposition.md│
└─────────────────┘
         │
         ▼
Step 3: 技術選型
┌─────────────────┐
│  選擇技術棧     │ → 框架、資料庫、部署方案
│ tech-stack-     │
│ selection.md    │
└─────────────────┘
         │
         ▼
Step 4: 架構設計
┌─────────────────┐
│  設計架構       │ → 系統架構圖、資料流、API 設計
│ architecture-   │
│ design.md       │
└─────────────────┘
```

## 文件說明

| 文件 | 用途 | 輸出物 |
|------|------|--------|
| [requirement-analysis.md](./requirement-analysis.md) | 將模糊需求轉換為清晰規格 | 用戶故事、驗收標準 |
| [task-decomposition.md](./task-decomposition.md) | 將大任務拆解為小任務 | 任務清單、依賴關係 |
| [tech-stack-selection.md](./tech-stack-selection.md) | 選擇合適的技術棧 | 技術決策文件 |
| [architecture-design.md](./architecture-design.md) | 設計系統架構 | 架構圖、資料流圖 |

## 快速開始

### 新專案

如果是全新專案，按順序執行：

1. `requirement-analysis.md` → 釐清需求
2. `tech-stack-selection.md` → 選擇技術
3. `architecture-design.md` → 設計架構
4. `task-decomposition.md` → 拆解任務

### 新功能

如果是在現有專案新增功能：

1. `requirement-analysis.md` → 釐清功能需求
2. `task-decomposition.md` → 拆解實作步驟

### 修復 Bug

如果是修復 Bug：

1. 先確認 Bug 的重現步驟和預期行為
2. 直接進入開發階段 → `02-development/`

## 規劃的輸出物

完成規劃階段後，你應該有：

### 1. 需求文件

```markdown
## 用戶故事
作為 [角色]，我想要 [功能]，以便 [價值]

## 驗收標準
- [ ] 當 [條件] 時，應該 [結果]
- [ ] ...
```

### 2. 任務清單

```markdown
## 任務
1. [ ] 任務 A（預估：小）
2. [ ] 任務 B（預估：中）→ 依賴 A
3. [ ] 任務 C（預估：小）
```

### 3. 技術決策

```markdown
## 技術棧
- 前端：React + TypeScript
- 樣式：Tailwind CSS
- 狀態管理：Zustand
- 後端：Node.js + Express
- 資料庫：PostgreSQL
```

### 4. 架構設計

```markdown
## 系統架構
[架構圖]

## 資料流
[資料流圖]
```

## 常見問題

### Q1：規劃要花多少時間？

**A1**：視專案規模而定：

| 專案規模 | 建議時間 |
|----------|----------|
| 小功能 | 5-10 分鐘 |
| 中型功能 | 15-30 分鐘 |
| 新專案 | 1-2 小時 |

### Q2：需求不清楚怎麼辦？

**A2**：使用 `requirement-analysis.md` 中的 Prompt 幫助釐清：
- 列出假設
- 提出釐清問題
- 記錄不確定的地方

### Q3：可以跳過規劃直接開發嗎？

**A3**：不建議。即使是小任務，花 5 分鐘確認需求也能避免走彎路。

## 相關文件

- [需求分析](./requirement-analysis.md)
- [任務拆解](./task-decomposition.md)
- [技術選型](./tech-stack-selection.md)
- [架構設計](./architecture-design.md)
- [開發階段總覽](../02-development/overview.md)

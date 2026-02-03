---
title: "審核階段總覽"
id: "review-overview"
category: "review"
ai_usage:
  - "開始程式碼審查"
  - "了解審核流程"
version: "1.0.0"
last_updated: "2026-01-27"
---

# 審核階段總覽

## 概述

本文件提供程式碼審核的完整流程指引，確保程式碼品質和團隊協作。

## 審核流程

```
1. 提交 Pull Request
        ↓
2. 自動化檢查（CI）
   - 靜態分析
   - 單元測試
   - 覆蓋率檢查
        ↓
3. AI 輔助審查
   - 程式碼品質
   - 安全性檢查
        ↓
4. 人工審查
   - 架構合理性
   - 商業邏輯正確性
        ↓
5. 合併
```

## 核心文件

| 文件 | 說明 |
|------|------|
| [code-review-checklist.md](./code-review-checklist.md) | 程式碼審查清單 |
| `prompts/review-code.md` | AI 輔助審查 Prompt |

## 審查類型

### 1. 自動化審查

由 CI/CD 自動執行：

| 檢查項目 | 工具 | 阻擋合併 |
|----------|------|----------|
| TypeScript 型別 | tsc | ✅ 是 |
| ESLint 規則 | eslint | ✅ 是 |
| 格式化 | prettier | ✅ 是 |
| 單元測試 | vitest/jest | ✅ 是 |
| 覆蓋率 | coverage | ⚠️ 視設定 |

### 2. AI 輔助審查

使用 `prompts/review-code.md` 進行：

- 程式碼品質分析
- 潛在 Bug 檢測
- 安全性掃描
- 效能建議

### 3. 人工審查

專注於機器難以判斷的部分：

- 架構合理性
- 商業邏輯正確性
- 可維護性
- 命名和抽象

## 審查清單摘要

### 功能正確性

- [ ] 程式碼符合需求
- [ ] 邊界條件已處理
- [ ] 錯誤處理完整

### 程式碼品質

- [ ] 命名清晰
- [ ] 函數單一職責
- [ ] 無重複程式碼

### 安全性

- [ ] 輸入已驗證
- [ ] 無敏感資訊外洩
- [ ] 認證授權正確

### 測試

- [ ] 有對應測試
- [ ] 測試覆蓋關鍵路徑
- [ ] 測試可讀性良好

完整清單請參考 [code-review-checklist.md](./code-review-checklist.md)

## PR 最佳實踐

### PR 標題

```
<type>(<scope>): <description>

feat(auth): add OAuth2 login support
fix(cart): correct total calculation
refactor(api): simplify error handling
```

### PR 描述

```markdown
## 變更摘要

簡述這個 PR 做了什麼。

## 變更類型

- [ ] 新功能
- [ ] Bug 修復
- [ ] 重構
- [ ] 文件更新

## 測試

- [ ] 單元測試通過
- [ ] 手動測試通過

## 截圖（如有 UI 變更）

[附上截圖]
```

### PR 大小

| 大小 | 行數 | 建議 |
|------|------|------|
| 小 | < 100 | ✅ 理想 |
| 中 | 100-300 | ⚠️ 可接受 |
| 大 | > 300 | ❌ 應拆分 |

## 相關文件

- [三層驗證框架](../02-development/shared/validation-framework.md)
- [測試策略](../02-development/shared/testing.md)

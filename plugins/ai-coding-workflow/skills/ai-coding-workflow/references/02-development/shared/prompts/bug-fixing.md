---
title: "Prompt: Bug 修復"
id: "prompt-bug-fixing"
category: "development"
subcategory: "shared"
ai_usage:
  - "修復 Bug"
  - "問題排查"
version: "1.0.0"
last_updated: "2026-01-23"
---

# Prompt: Bug 修復

## 任務目標

系統性地分析和修復 Bug。

## 使用時機

- 發現 Bug 需要修復時
- 需要分析問題根因時

## Prompt 範本

```prompt
你是一位資深工程師。請幫我分析和修復以下 Bug。

## Bug 描述
${BUG_DESCRIPTION}

## 重現步驟
${REPRODUCTION_STEPS}

## 預期行為
${EXPECTED_BEHAVIOR}

## 實際行為
${ACTUAL_BEHAVIOR}

## 錯誤訊息（如有）
${ERROR_MESSAGE}

## 相關程式碼
${RELATED_CODE}

## 請分析

### 1. 問題分析

**症狀**：[描述問題的表現]

**可能原因**：
1. [原因 1]
2. [原因 2]
3. [原因 3]

**最可能的原因**：[根據分析判斷]

### 2. 調查步驟

為了確認問題，需要檢查：
1. [ ] [檢查項目 1]
2. [ ] [檢查項目 2]
3. [ ] [檢查項目 3]

### 3. 修復方案

**方案 A**：[描述]
- 優點：
- 缺點：

**方案 B**：[描述]
- 優點：
- 缺點：

**建議方案**：[選擇哪個，為什麼]

### 4. 修復程式碼

\`\`\`typescript
// 修復前
${BEFORE_CODE}

// 修復後
${AFTER_CODE}
\`\`\`

### 5. 驗證步驟

- [ ] 原始問題已解決
- [ ] 沒有引入新問題
- [ ] 相關測試通過
- [ ] 邊界條件已處理

### 6. 預防措施

為了防止類似問題再次發生：
- [ ] [預防措施 1]
- [ ] [預防措施 2]
```

## 執行後驗證

- [ ] Bug 已修復
- [ ] 沒有回歸問題
- [ ] 有對應的測試

## 下一步

- 記錄到踩坑案例（如有價值）
- 提交 Code Review

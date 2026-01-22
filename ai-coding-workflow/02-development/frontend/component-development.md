---
title: "元件開發流程"
id: "component-development"
category: "development"
subcategory: "frontend"
ai_usage:
  - "開發新 UI 元件"
  - "重構現有元件"
  - "元件測試"
version: "1.0.0"
last_updated: "2026-01-23"
---

# 元件開發流程

## 概述

元件是前端應用的基本構建單位。本文件提供與 AI 協作開發元件的流程和 Prompt。

## 前置條件

- [ ] 已建立設計系統（參考 `design-system.md`）
- [ ] 了解元件需求和使用場景
- [ ] 已確定元件的 Props 介面

## 工作流程

### 步驟 1：定義元件規格

確定元件的：
- 名稱和用途
- Props 介面
- 變體和狀態
- 使用範例

### 步驟 2：建立元件結構

按照專案規範建立檔案結構。

### 步驟 3：實作元件邏輯

實作元件的 UI 和互動邏輯。

### 步驟 4：加入樣式

使用設計系統的 tokens 和規範。

### 步驟 5：撰寫測試

單元測試和視覺測試。

### 步驟 6：文件化

Storybook 或使用範例。

---

## Prompts

### Prompt 1：建立新元件

```
你是一位資深前端工程師。請根據以下規格建立元件。

## 元件規格
- 名稱：${COMPONENT_NAME}
- 用途：${COMPONENT_PURPOSE}
- 框架：${FRAMEWORK}
- 樣式方案：${CSS_SOLUTION}

## Props 介面
${PROPS_INTERFACE}

## 變體和狀態
${VARIANTS_AND_STATES}

## 設計系統參考
${DESIGN_SYSTEM_REFERENCE}

## 現有元件範例
${EXISTING_COMPONENT_EXAMPLE}

## 請輸出

### 1. TypeScript 介面

\`\`\`typescript
interface ${COMPONENT_NAME}Props {
  // ...
}
\`\`\`

### 2. 元件程式碼

\`\`\`tsx
// ${COMPONENT_NAME}.tsx
\`\`\`

### 3. 樣式（如需要）

\`\`\`css
/* ${COMPONENT_NAME}.css */
\`\`\`

### 4. 使用範例

\`\`\`tsx
// 基本使用
<${COMPONENT_NAME} />

// 變體使用
<${COMPONENT_NAME} variant="..." />
\`\`\`
```

### Prompt 2：重構現有元件

```
你是一位資深前端工程師。請重構以下元件。

## 現有元件
\`\`\`tsx
${EXISTING_COMPONENT}
\`\`\`

## 問題描述
${ISSUES}

## 重構目標
${REFACTOR_GOALS}

## 設計系統規範
${DESIGN_SYSTEM}

## 請提供

### 1. 問題分析

列出現有元件的問題：
- ...

### 2. 重構方案

- ...

### 3. 重構後的程式碼

\`\`\`tsx
// 重構後
\`\`\`

### 4. 變更說明

| 變更 | 原因 |
|------|------|
| | |
```

### Prompt 3：元件測試

```
你是一位前端測試專家。請為以下元件撰寫測試。

## 元件程式碼
\`\`\`tsx
${COMPONENT_CODE}
\`\`\`

## 測試框架
${TEST_FRAMEWORK}

## 請撰寫

### 1. 單元測試

\`\`\`tsx
// ${COMPONENT_NAME}.test.tsx
import { render, screen } from '@testing-library/react';

describe('${COMPONENT_NAME}', () => {
  // 渲染測試
  it('renders correctly', () => {
    // ...
  });

  // Props 測試
  it('applies props correctly', () => {
    // ...
  });

  // 互動測試
  it('handles user interaction', () => {
    // ...
  });

  // 邊界條件
  it('handles edge cases', () => {
    // ...
  });
});
\`\`\`

### 2. 測試案例清單

| 案例 | 類型 | 說明 |
|------|------|------|
| | | |
```

---

## 元件設計原則

### 1. 單一職責

每個元件只做一件事。

```tsx
// ❌ 做太多事
function UserCard({ user, onEdit, onDelete, showActions }) {
  // 顯示用戶、編輯、刪除、條件渲染...
}

// ✅ 拆分職責
function UserAvatar({ user }) { ... }
function UserInfo({ user }) { ... }
function UserActions({ onEdit, onDelete }) { ... }
function UserCard({ user, actions }) {
  return (
    <Card>
      <UserAvatar user={user} />
      <UserInfo user={user} />
      {actions}
    </Card>
  );
}
```

### 2. Props 設計

```tsx
// ❌ 太多布林 props
<Button primary large disabled loading />

// ✅ 使用 variant 和 size
<Button variant="primary" size="lg" state="loading" />
```

### 3. 組合優於繼承

```tsx
// ❌ 透過 props 控制一切
<Card showHeader showFooter headerTitle footerActions />

// ✅ 組合子元件
<Card>
  <Card.Header>標題</Card.Header>
  <Card.Body>內容</Card.Body>
  <Card.Footer>動作</Card.Footer>
</Card>
```

---

## 檢查清單

### 程式碼品質

- [ ] TypeScript 型別完整
- [ ] Props 有適當的預設值
- [ ] 處理邊界條件（null、undefined、空陣列）
- [ ] 沒有硬編碼的樣式值

### 設計系統一致性

- [ ] 使用設計系統的顏色變數
- [ ] 使用設計系統的間距和字體
- [ ] 遵循元件命名規範
- [ ] 支援 dark mode（如適用）

### 可存取性

- [ ] 有適當的 ARIA 屬性
- [ ] 可用鍵盤操作
- [ ] 顏色對比度足夠
- [ ] 有適當的 focus 狀態

### 效能

- [ ] 避免不必要的 re-render
- [ ] 大型列表使用虛擬化
- [ ] 圖片有 lazy loading

---

## 相關文件

- [設計系統](./design-system.md)
- [狀態管理](./state-management.md)
- [測試策略](../shared/testing.md)

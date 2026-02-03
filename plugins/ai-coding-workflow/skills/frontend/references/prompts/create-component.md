---
title: "Prompt: 建立元件"
id: "prompt-create-component"
category: "development"
subcategory: "frontend"
ai_usage:
  - "建立新 UI 元件"
  - "建立基礎元件"
version: "1.0.0"
last_updated: "2026-01-23"
---

# Prompt: 建立元件

## 任務目標

建立符合設計系統的 UI 元件。

## 使用時機

- 需要建立新元件時
- Token 系統已建立後

---

## 變數說明

執行此 prompt 前，請先取得以下值：

| 變數                   | 來源           | 說明                           | 範例                                           |
| ---------------------- | -------------- | ------------------------------ | ---------------------------------------------- |
| `${COMPONENT_NAME}`    | 用戶指定       | 要建立的元件名稱               | `Button`, `Card`, `Modal`                      |
| `${COMPONENT_PURPOSE}` | 用戶描述       | 元件的用途說明                 | `通用按鈕，支援多種樣式變體`                   |
| `${FRAMEWORK}`         | detect-context | 前端框架                       | `React`, `Vue`, `Angular`                      |
| `${CSS_SOLUTION}`      | detect-context | CSS 方案                       | `Tailwind`, `CSS Modules`, `styled-components` |
| `${DESIGN_TOKENS}`     | 設計系統       | Token 定義（顏色、間距、字體） | `見 tokens/index.ts`                           |

**執行時，將所有 `${...}` 替換為實際值。如果 detect-context 無法偵測，請詢問用戶。**

---

## Prompt 範本

```prompt
你是一位資深前端工程師。請根據以下規格建立元件。

## 元件規格
- 名稱：${COMPONENT_NAME}
- 用途：${COMPONENT_PURPOSE}

## 技術棧
- 框架：${FRAMEWORK}
- 樣式：${CSS_SOLUTION}

## 設計系統 Token
${DESIGN_TOKENS}

## 請建立

### 1. TypeScript 介面

\`\`\`typescript
interface ${COMPONENT_NAME}Props {
  /** 變體 */
  variant?: 'primary' | 'secondary' | 'outline';
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否禁用 */
  disabled?: boolean;
  /** 子元素 */
  children: React.ReactNode;
  /** 點擊事件 */
  onClick?: () => void;
}
\`\`\`

### 2. 元件實作

\`\`\`tsx
// components/${COMPONENT_NAME}.tsx
import { cva, type VariantProps } from 'class-variance-authority';

const ${COMPONENT_NAME.toLowerCase()}Variants = cva(
  // 基礎樣式
  'inline-flex items-center justify-center transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        outline: 'border border-gray-300 hover:bg-gray-50',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export function ${COMPONENT_NAME}({
  variant,
  size,
  disabled,
  children,
  onClick,
}: ${COMPONENT_NAME}Props) {
  return (
    <button
      className={${COMPONENT_NAME.toLowerCase()}Variants({ variant, size })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
\`\`\`

### 3. 使用範例

\`\`\`tsx
// 基本使用
<${COMPONENT_NAME}>Click me</${COMPONENT_NAME}>

// 變體
<${COMPONENT_NAME} variant="secondary">Secondary</${COMPONENT_NAME}>
<${COMPONENT_NAME} variant="outline">Outline</${COMPONENT_NAME}>

// 尺寸
<${COMPONENT_NAME} size="sm">Small</${COMPONENT_NAME}>
<${COMPONENT_NAME} size="lg">Large</${COMPONENT_NAME}>
\`\`\`
```

## 執行後驗證

- [ ] TypeScript 介面完整
- [ ] 使用設計系統 Token
- [ ] 支援變體和尺寸
- [ ] 有使用範例

## 下一步

- 繼續建立其他元件
- 或執行測試驗證元件

---
title: "Prompt: 建立 Token 系統"
id: "prompt-setup-token-system"
category: "development"
subcategory: "frontend"
ai_usage:
  - "建立 Design Token"
  - "配置樣式變數"
version: "1.0.0"
last_updated: "2026-01-23"
---

# Prompt: 建立 Token 系統

## 任務目標

建立完整的 Design Token 系統，包含顏色、字體、間距等。

## 使用時機

- 設計系統分析完成後
- 需要建立樣式變數時

## Prompt 範本

```prompt
你是一位前端工程師。請根據以下設計規範建立 Token 系統。

## 設計規範
${DESIGN_SPEC}

## 技術棧
- CSS 方案：${CSS_SOLUTION}
- 是否支援 Dark Mode：${DARK_MODE}

## 請建立

### 1. 顏色 Token

\`\`\`typescript
// tokens/colors.ts
export const colors = {
  // Brand
  primary: {
    50: '#xxx',
    100: '#xxx',
    500: '#xxx',  // 主色
    600: '#xxx',
    900: '#xxx',
  },

  // Semantic
  success: '#xxx',
  warning: '#xxx',
  error: '#xxx',
  info: '#xxx',

  // Neutral
  gray: {
    50: '#xxx',
    100: '#xxx',
    500: '#xxx',
    900: '#xxx',
  },

  // Background
  background: {
    primary: '#xxx',
    secondary: '#xxx',
  },

  // Text
  text: {
    primary: '#xxx',
    secondary: '#xxx',
    disabled: '#xxx',
  },
} as const;
\`\`\`

### 2. 字體 Token

\`\`\`typescript
// tokens/typography.ts
export const typography = {
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },

  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;
\`\`\`

### 3. 間距 Token

\`\`\`typescript
// tokens/spacing.ts
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
} as const;
\`\`\`

### 4. 整合導出

\`\`\`typescript
// tokens/index.ts
export { colors } from './colors';
export { typography } from './typography';
export { spacing } from './spacing';
\`\`\`
```

## 執行後驗證

- [ ] 顏色 Token 已建立
- [ ] 字體 Token 已建立
- [ ] 間距 Token 已建立
- [ ] Dark Mode Token 已建立（如需要）

## 下一步

執行 `create-component.md` 建立基礎元件

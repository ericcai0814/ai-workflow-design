---
title: "Prompt: 建立設計系統"
id: "prompt-setup-design-system"
category: "development"
subcategory: "frontend"
ai_usage:
  - "建立新專案的設計系統"
  - "分析設計稿建立規範"
version: "1.0.0"
last_updated: "2026-01-23"
---

# Prompt: 建立設計系統

## 任務目標

根據設計參考建立完整的設計系統基礎。

## 使用時機

- 新專案啟動時
- 需要統一設計規範時
- 重構現有樣式時

## Prompt 範本

```prompt
你是一位設計系統專家。請根據以下設計參考建立設計系統。

## 設計參考
${DESIGN_REFERENCE}

## 技術棧
- 框架：${FRAMEWORK}
- CSS 方案：${CSS_SOLUTION}
- UI 庫：${UI_LIBRARY}

## 請建立

### 1. 設計分析

從設計參考中提取：
- 主色調：[色碼]
- 輔助色：[色碼]
- 字體：[字體名稱]
- 間距規律：[觀察到的規律]

### 2. Design Tokens

\`\`\`css
:root {
  /* Colors */
  --color-primary: #xxx;
  --color-secondary: #xxx;
  --color-background: #xxx;
  --color-text: #xxx;
  --color-border: #xxx;

  /* Typography */
  --font-family: 'xxx', sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}
\`\`\`

### 3. 基礎元件清單

需要建立的基礎元件：
- [ ] Button
- [ ] Input
- [ ] Card
- [ ] Modal
- [ ] ...

### 4. 下一步建議

1. 執行 `setup-token-system.md` 建立 Token 系統
2. 執行 `create-component.md` 建立基礎元件
```

## 執行後驗證

- [ ] 色彩系統已定義
- [ ] 字體系統已定義
- [ ] 間距系統已定義
- [ ] 基礎元件清單已列出

## 下一步

執行 `setup-token-system.md` 建立完整的 Token 系統

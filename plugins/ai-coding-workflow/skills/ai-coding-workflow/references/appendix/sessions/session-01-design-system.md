---
title: "設計系統建立對話"
id: "session-design-system"
category: "appendix"
scenario: "design-system"
tags:
  - design-system
  - tokens
  - components
ai_usage:
  - "建立設計系統"
  - "定義 Design Token"
  - "規劃元件架構"
version: "1.0.0"
last_updated: "2026-01"
---

# Session 01: 設計系統建立

展示如何與 AI 協作建立設計系統，包含 Token 定義和元件規範。

## 背景說明

**場景**：專案需要建立統一的設計系統，確保 UI 一致性。
**目標**：定義 Design Token、建立元件規範、產出可執行的樣式檔案。
**技術棧**：React + TypeScript + Tailwind CSS

## 關鍵對話

### 對話片段 1：啟動設計系統規劃

> **User**: 我想為這個專案建立一套設計系統，從 Design Token 開始。專案使用 Tailwind CSS，希望 Token 能直接轉換成 Tailwind 配置。

> **AI**: 好的，讓我幫你規劃設計系統的 Token 結構。基於 Tailwind CSS，我建議分為以下幾個層級：
>
> **1. Primitive Tokens（基礎值）**
>
> - Colors：原始色彩值
> - Typography：字體大小、行高、字重
> - Spacing：間距刻度
>
> **2. Semantic Tokens（語意化）**
>
> - `color-primary`、`color-secondary`
> - `spacing-page`、`spacing-component`
>
> **3. Component Tokens（元件級）**
>
> - `button-padding`、`card-radius`
>
> 要我先從色彩系統開始嗎？

**💡 學習重點 1**：**明確技術約束**

- 用戶一開始就說明技術棧（Tailwind CSS），讓 AI 的建議更貼合實際需求
- 模式：「我使用 [技術棧]，希望 [具體目標]」

---

### 對話片段 2：定義色彩系統

> **User**: 對，從色彩開始。我們的品牌色是 #6366F1（靛藍色），需要定義完整的色彩階梯，包含 light/dark mode。

> **AI**: 基於品牌色 #6366F1，我來建立完整的色彩系統：
>
> ```typescript
> // tokens/colors.ts
> export const colors = {
>   // Primitive: 原始色階
>   indigo: {
>     50: "#EEF2FF",
>     100: "#E0E7FF",
>     // ... 50-950 完整色階
>     500: "#6366F1", // 品牌主色
>     600: "#4F46E5",
>   },
>
>   // Semantic: 語意化
>   primary: {
>     light: "var(--color-indigo-500)",
>     dark: "var(--color-indigo-400)",
>   },
>   background: {
>     light: "var(--color-gray-50)",
>     dark: "var(--color-gray-900)",
>   },
> };
> ```
>
> 這樣的結構支援：
>
> 1. Tailwind 的 `bg-primary` 類名
> 2. CSS 變數自動切換 light/dark
> 3. TypeScript 型別安全

> **User**: 色階看起來不錯，但我想讓 dark mode 的 primary 稍微亮一點，用 indigo-300 可以嗎？

> **AI**: 可以，但需要注意對比度。讓我檢查 indigo-300 (#A5B4FC) 在深色背景上的 WCAG 對比度...
>
> ✅ indigo-300 on gray-900：對比度 7.2:1（符合 AAA 標準）
>
> 調整後：
>
> ```typescript
> primary: {
>   light: 'var(--color-indigo-500)',
>   dark: 'var(--color-indigo-300)', // 更亮，對比度 OK
> },
> ```

**💡 學習重點 2**：**主動驗證建議**

- AI 不只接受修改，還主動檢查 WCAG 對比度
- 這展示了 AI 可以幫助驗證設計決策的可行性

---

### 對話片段 3：元件規範討論

> **User**: Token 定好了，現在來規劃按鈕元件。需要支援 3 種尺寸（sm/md/lg）和 3 種變體（primary/secondary/ghost）。

> **AI**: 好的，我來建立按鈕的規範和實作：
>
> **元件規範**
> | 變體 | 用途 | 背景 | 文字 |
> |------|------|------|------|
> | primary | 主要操作 | `primary` | white |
> | secondary | 次要操作 | transparent | `primary` |
> | ghost | 低調操作 | transparent | `text-muted` |
>
> **尺寸規範**
> | 尺寸 | padding | font-size | min-height |
> |------|---------|-----------|------------|
> | sm | 8px 12px | 14px | 32px |
> | md | 12px 16px | 16px | 40px |
> | lg | 16px 24px | 18px | 48px |
>
> 要我產出對應的 React 元件嗎？

> **User**: 先產出 Token 定義，元件之後再說。另外，按鈕需要 disabled 和 loading 狀態。

> **AI**: 了解，先聚焦 Token。加入狀態定義：
>
> ```typescript
> // tokens/components/button.ts
> export const buttonTokens = {
>   // 尺寸
>   size: {
>     sm: { padding: "8px 12px", fontSize: "14px", minHeight: "32px" },
>     md: { padding: "12px 16px", fontSize: "16px", minHeight: "40px" },
>     lg: { padding: "16px 24px", fontSize: "18px", minHeight: "48px" },
>   },
>   // 變體
>   variant: {
>     primary: { bg: "primary", text: "white" },
>     secondary: { bg: "transparent", text: "primary", border: "primary" },
>     ghost: { bg: "transparent", text: "text-muted" },
>   },
>   // 狀態
>   state: {
>     disabled: { opacity: 0.5, cursor: "not-allowed" },
>     loading: { opacity: 0.7, cursor: "wait" },
>   },
> };
> ```

**💡 學習重點 3**：**控制範圍**

- 用戶說「元件之後再說」，明確控制了工作範圍
- 模式：先產出 [具體項目]，[其他項目] 之後再說

---

## 學習重點總結

| #   | 模式         | 說明                           | 適用場景     |
| --- | ------------ | ------------------------------ | ------------ |
| 1   | 明確技術約束 | 一開始說明技術棧和具體目標     | 開始新任務時 |
| 2   | 主動驗證建議 | 請 AI 檢查決策的可行性         | 設計決策時   |
| 3   | 控制範圍     | 明確告訴 AI 當前要做和不做的事 | 任務過大時   |

## 延伸閱讀

- [Design Token 定義指南](../../02-development/frontend/token-system.md)
- [元件開發規範](../../02-development/frontend/component-development.md)

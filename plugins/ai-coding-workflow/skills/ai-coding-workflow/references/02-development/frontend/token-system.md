---
title: "Design Token 系統"
id: "token-system"
category: "development"
subcategory: "frontend"
ai_usage:
  - "了解 Design Token 的概念"
  - "定義專案的 Design Tokens"
  - "建立 Token 命名規範"
version: "1.0.0"
last_updated: "2026-01-23"
---

# Design Token 系統

## 什麼是 Design Tokens？

Design Tokens 是設計系統的原子化變數，將設計決策轉換為可程式化的值。

```
設計師的語言          →    程式的語言
「品牌藍」            →    --color-primary: #3b82f6
「小間距」            →    --spacing-2: 0.5rem
「大標題」            →    --font-size-2xl: 1.5rem
```

## Token 分類

### 1. 色彩系統 (Colors)

#### Primary（主色）

品牌主色，用於主要 CTA 和重要元素。

| Token | 用途 | 範例值 |
|-------|------|--------|
| `--color-primary-lighter` | 淺色背景 | `#dbeafe` |
| `--color-primary-light` | hover 狀態 | `#60a5fa` |
| `--color-primary` | 預設 | `#3b82f6` |
| `--color-primary-dark` | active 狀態 | `#2563eb` |
| `--color-primary-darker` | 強調 | `#1d4ed8` |

#### Secondary（次色）

輔助色，用於次要動作和裝飾。

| Token | 用途 | 範例值 |
|-------|------|--------|
| `--color-secondary-lighter` | 淺色背景 | `#f3e8ff` |
| `--color-secondary-light` | hover 狀態 | `#c084fc` |
| `--color-secondary` | 預設 | `#a855f7` |
| `--color-secondary-dark` | active 狀態 | `#9333ea` |
| `--color-secondary-darker` | 強調 | `#7e22ce` |

#### Background（背景色）

| Token | 用途 | Light Mode | Dark Mode |
|-------|------|------------|-----------|
| `--color-bg-primary` | 主要背景 | `#ffffff` | `#0a0a0a` |
| `--color-bg-secondary` | 次要背景 | `#f9fafb` | `#171717` |
| `--color-bg-tertiary` | 卡片背景 | `#f3f4f6` | `#262626` |

#### Text（文字色）

| Token | 用途 | Light Mode | Dark Mode |
|-------|------|------------|-----------|
| `--color-text-primary` | 主要文字 | `#111827` | `#f9fafb` |
| `--color-text-secondary` | 次要文字 | `#4b5563` | `#9ca3af` |
| `--color-text-muted` | 提示文字 | `#9ca3af` | `#6b7280` |
| `--color-text-inverse` | 反色文字 | `#ffffff` | `#000000` |

#### Border（邊框色）

| Token | 用途 | Light Mode | Dark Mode |
|-------|------|------------|-----------|
| `--color-border-default` | 預設邊框 | `#e5e7eb` | `#374151` |
| `--color-border-focus` | 聚焦邊框 | `#3b82f6` | `#60a5fa` |

#### Status（狀態色）

| Token | 用途 | 範例值 |
|-------|------|--------|
| `--color-success` | 成功 | `#22c55e` |
| `--color-warning` | 警告 | `#f59e0b` |
| `--color-error` | 錯誤 | `#ef4444` |
| `--color-info` | 資訊 | `#3b82f6` |

---

### 2. 字體排版 (Typography)

#### 字體家族

```css
--font-family-sans: 'Inter', system-ui, sans-serif;
--font-family-mono: 'JetBrains Mono', monospace;
```

#### 字體大小

| Token | 值 | 用途 |
|-------|-----|------|
| `--font-size-xs` | `0.75rem` (12px) | 小標籤 |
| `--font-size-sm` | `0.875rem` (14px) | 輔助文字 |
| `--font-size-base` | `1rem` (16px) | 正文 |
| `--font-size-lg` | `1.125rem` (18px) | 大正文 |
| `--font-size-xl` | `1.25rem` (20px) | h6 |
| `--font-size-2xl` | `1.5rem` (24px) | h5 |
| `--font-size-3xl` | `1.875rem` (30px) | h4 |
| `--font-size-4xl` | `2.25rem` (36px) | h3 |
| `--font-size-5xl` | `3rem` (48px) | h2 |
| `--font-size-6xl` | `3.75rem` (60px) | h1 |

#### 行高

| Token | 值 | 用途 |
|-------|-----|------|
| `--line-height-tight` | `1.25` | 標題 |
| `--line-height-normal` | `1.5` | 正文 |
| `--line-height-relaxed` | `1.75` | 寬鬆 |

#### 字重

| Token | 值 | 用途 |
|-------|-----|------|
| `--font-weight-normal` | `400` | 正文 |
| `--font-weight-medium` | `500` | 強調 |
| `--font-weight-semibold` | `600` | 小標題 |
| `--font-weight-bold` | `700` | 標題 |

---

### 3. 間距系統 (Spacing)

基於 4px 基數的間距階梯：

| Token | 值 | px |
|-------|-----|-----|
| `--spacing-0` | `0` | 0 |
| `--spacing-1` | `0.25rem` | 4 |
| `--spacing-2` | `0.5rem` | 8 |
| `--spacing-3` | `0.75rem` | 12 |
| `--spacing-4` | `1rem` | 16 |
| `--spacing-5` | `1.25rem` | 20 |
| `--spacing-6` | `1.5rem` | 24 |
| `--spacing-8` | `2rem` | 32 |
| `--spacing-10` | `2.5rem` | 40 |
| `--spacing-12` | `3rem` | 48 |
| `--spacing-16` | `4rem` | 64 |
| `--spacing-20` | `5rem` | 80 |
| `--spacing-24` | `6rem` | 96 |

---

### 4. 圓角 (Border Radius)

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-none` | `0` | 無圓角 |
| `--radius-sm` | `0.125rem` | 小元素 |
| `--radius-md` | `0.375rem` | 輸入框 |
| `--radius-lg` | `0.5rem` | 按鈕、卡片 |
| `--radius-xl` | `0.75rem` | 大卡片 |
| `--radius-2xl` | `1rem` | Modal |
| `--radius-full` | `9999px` | 圓形 |

---

### 5. 陰影 (Box Shadow)

| Token | 值 | 用途 |
|-------|-----|------|
| `--shadow-none` | `none` | 無陰影 |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | 輕微浮起 |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | 卡片 |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | 下拉選單 |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.1)` | Modal |

---

### 6. 過渡動畫 (Transition)

| Token | 值 | 用途 |
|-------|-----|------|
| `--duration-fast` | `150ms` | 快速回饋 |
| `--duration-normal` | `200ms` | 一般過渡 |
| `--duration-slow` | `300ms` | 展開收合 |
| `--easing-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | 預設 |
| `--easing-in` | `cubic-bezier(0.4, 0, 1, 1)` | 進入 |
| `--easing-out` | `cubic-bezier(0, 0, 0.2, 1)` | 離開 |

---

### 7. z-index 層級

| Token | 值 | 用途 |
|-------|-----|------|
| `--z-dropdown` | `1000` | 下拉選單 |
| `--z-sticky` | `1020` | 固定元素 |
| `--z-fixed` | `1030` | 固定導航 |
| `--z-modal-backdrop` | `1040` | Modal 背景 |
| `--z-modal` | `1050` | Modal |
| `--z-popover` | `1060` | Popover |
| `--z-tooltip` | `1070` | Tooltip |

---

## 命名規範

### 原則

1. **語義化**：使用用途而非值命名（`--color-primary` 而非 `--color-blue`）
2. **層級化**：使用 `-lighter`, `-light`, `-dark`, `-darker` 表示變體
3. **一致性**：同類 Token 使用相同前綴

### 命名格式

```
--{category}-{name}[-variant]

範例：
--color-primary
--color-primary-light
--font-size-lg
--spacing-4
--radius-md
```

---

## 相關文件

- [設計系統建置流程](./design-system.md)
- [元件庫規範](./component-library.md)
- [設計系統文件指南](./documentation-guide.md)

---
title: "設計系統建置流程"
id: "design-system"
category: "development"
subcategory: "frontend"
ai_usage:
  - "建立新專案的設計系統"
  - "統一現有專案的視覺風格"
  - "定義元件設計規範"
version: "1.0.0"
last_updated: "2026-01-23"
---

# 設計系統建置流程

## 概述

設計系統是前端開發的核心基礎，必須在元件開發之前完成。本文件提供建立設計系統的完整流程和可執行的 Prompt 範本。

### 為什麼設計系統優先？

1. **一致性**：確保所有元件遵循相同的視覺語言
2. **效率**：避免重複定義顏色、字體、間距
3. **AI 友好**：給 AI Agent 明確的設計上下文，生成一致的程式碼

## 前置條件

- [ ] 專案技術棧已決定（參考 `01-planning/tech-stack-selection.md`）
- [ ] 有設計稿或設計參考（Figma、競品、設計風格關鍵字）
- [ ] 已建立專案基本結構

## 工作流程

### 步驟 1：定義設計原則

確定專案的設計方向和原則。

**輸出**：
- 設計風格關鍵字（如：簡潔、科技感、溫暖）
- 參考網站或設計稿
- 品牌色彩（如有）

### 步驟 2：建立 Design Tokens

Design Tokens 是設計系統的基礎變數。

#### 2.1 色彩系統

```
主色 (Primary)     — 品牌主色、主要 CTA
次色 (Secondary)   — 輔助色、次要動作
背景色 (Background) — 頁面背景、卡片背景
文字色 (Text)       — 主要文字、次要文字、禁用文字
邊框色 (Border)     — 分隔線、輸入框邊框
狀態色 (Status)     — 成功、警告、錯誤、資訊
```

#### 2.2 字體排版

```
標題 (Heading)    — h1, h2, h3, h4, h5, h6
內文 (Body)       — 大、中、小
標籤 (Label)      — 按鈕、表單標籤
程式碼 (Code)     — 等寬字體
```

#### 2.3 間距系統

```
基礎單位: 4px (或 0.25rem)
間距階梯: 4, 8, 12, 16, 24, 32, 48, 64, 96
```

#### 2.4 圓角與陰影

```
圓角: none, sm, md, lg, full
陰影: none, sm, md, lg, xl
```

### 步驟 3：實作 CSS Variables

將 Design Tokens 轉換為 CSS Variables。

### 步驟 4：建立基礎元件類別

定義可重用的元件類別（按鈕、輸入框、卡片等）。

### 步驟 5：支援 Dark Mode

建立深色模式的變數覆蓋。

### 步驟 6：文件化

將設計系統文件化，供團隊和 AI Agent 參考。

---

## Prompts

### Prompt 1：分析設計參考並建立 Design Tokens

```
你是一位資深前端設計系統架構師。請根據以下設計參考，建立完整的 Design Tokens 定義。

## 設計參考
${DESIGN_REFERENCE}

## 設計風格關鍵字
${DESIGN_KEYWORDS}

## 品牌色彩（如有）
${BRAND_COLORS}

## 技術棧
- CSS 方案：${CSS_SOLUTION}
- 框架：${FRAMEWORK}

## 要求輸出

### 1. 色彩系統
定義以下色彩變數（包含 light/dark mode）：
- Primary: 主色及其變體（lighter, light, DEFAULT, dark, darker）
- Secondary: 次色及其變體
- Background: 背景色（primary, secondary, tertiary）
- Text: 文字色（primary, secondary, muted, inverse）
- Border: 邊框色
- Status: success, warning, error, info

### 2. 字體排版
定義字體家族、大小、行高、字重：
- Heading: h1-h6
- Body: lg, md, sm
- Label: button, form

### 3. 間距系統
定義間距階梯（基於 4px 或 8px 基礎單位）

### 4. 其他 Tokens
- 圓角（border-radius）
- 陰影（box-shadow）
- 過渡動畫（transition）
- z-index 層級

請以 CSS Variables 格式輸出，並提供 Tailwind 配置（如適用）。
```

### Prompt 2：建立基礎元件類別

```
你是一位資深前端工程師。請根據以下 Design Tokens，建立基礎元件類別。

## Design Tokens
${DESIGN_TOKENS}

## 技術棧
- CSS 方案：${CSS_SOLUTION}
- 框架：${FRAMEWORK}

## 要求建立的元件類別

### 1. 按鈕 (Button)
- 變體：primary, secondary, outline, ghost, link
- 大小：sm, md, lg
- 狀態：hover, active, disabled, loading

### 2. 輸入框 (Input)
- 類型：text, textarea, select
- 狀態：default, focus, error, disabled

### 3. 卡片 (Card)
- 變體：default, outlined, elevated

### 4. 徽章 (Badge)
- 變體：primary, secondary, success, warning, error

### 5. 排版 (Typography)
- 標題類別：.heading-1 ~ .heading-6
- 內文類別：.body-lg, .body-md, .body-sm
- 工具類別：.text-muted, .text-link

## 輸出格式
請提供完整的 CSS/SCSS 檔案，包含：
- 變數定義（使用前面定義的 CSS Variables）
- 元件類別定義
- RWD 響應式考量
- Dark mode 支援
```

### Prompt 3：將現有專案重構為設計系統

```
你是一位資深前端工程師。請分析現有專案的樣式，並重構為統一的設計系統。

## 現有樣式檔案
${EXISTING_STYLES}

## 現有元件範例
${EXISTING_COMPONENTS}

## 目標設計風格
${TARGET_DESIGN_STYLE}

## 要求

### 1. 分析階段
- 列出現有的色彩使用情況
- 列出現有的字體大小
- 列出現有的間距值
- 識別不一致的地方

### 2. 標準化階段
- 將分散的色彩值整理為 CSS Variables
- 將字體大小整理為字體階梯
- 將間距值整理為間距系統

### 3. 重構計畫
- 列出需要修改的檔案
- 估計影響範圍
- 建議分階段執行的順序

### 4. 輸出
- 新的 Design Tokens 定義
- 元件類別對照表（舊 → 新）
- 重構後的範例元件
```

---

## 檢查清單

### Design Tokens 完整性

- [ ] 色彩系統完整（primary, secondary, background, text, border, status）
- [ ] 字體排版定義（heading, body, label）
- [ ] 間距系統建立
- [ ] 圓角和陰影定義
- [ ] Dark mode 變數定義

### 元件類別完整性

- [ ] 按鈕類別（含變體、大小、狀態）
- [ ] 輸入框類別
- [ ] 卡片類別
- [ ] 排版類別

### 實作品質

- [ ] 使用 CSS Variables（非硬編碼）
- [ ] 支援 Dark mode
- [ ] RWD 響應式
- [ ] 命名一致（BEM 或其他規範）

---

## 常見問題

### Q1：設計系統應該放在哪裡？

**A1**：建議結構：

```
src/
├── styles/
│   ├── tokens/
│   │   ├── colors.css
│   │   ├── typography.css
│   │   └── spacing.css
│   ├── components/
│   │   ├── button.css
│   │   ├── input.css
│   │   └── card.css
│   └── index.css        # 入口檔案
```

### Q2：如何處理 Tailwind 與自定義設計系統？

**A2**：在 `tailwind.config.js` 中擴展：

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      // ...
    },
  },
}
```

### Q3：AI 生成的元件樣式不一致怎麼辦？

**A3**：在 Prompt 中明確提供設計系統上下文：

```
請使用以下設計系統規範：
- 按鈕類別：btn btn-primary / btn btn-secondary
- 間距：py-4 px-6（或 var(--spacing-4)）
- 圓角：rounded-lg
- 字體：text-sm font-medium
```

---

## 相關文件

- [技術棧選擇](../../01-planning/tech-stack-selection.md)
- [元件開發流程](./component-development.md)
- [Vitesse Style 踩坑案例](../../appendix/pitfalls/case-01-vitesse-style-refactor.md)

---

## 案例參考

### Vitesse Style 設計系統

來自 ewill-web 專案的實際經驗：

**設計原則**：
- 極簡主義
- 純色背景（移除漸層和重陰影）
- Typography 收斂（從 `text-[42px]` 縮減到 `text-2xl/text-3xl`）

**色彩規範**：
- 主色：Emerald (#10b981)
- 使用 CSS Variables 定義
- 支援 Dark mode（使用 `.dark` class）

**元件規範**：
- 按鈕：`btn btn-primary` / `btn btn-secondary`
- 統一取消 `cn()` 複雜條件

**成功關鍵**：
- Memory 記錄設計規範（便於 AI 參考）
- 分階段重構（12 種 Section 元件）
- 明確的 Typography 對照表

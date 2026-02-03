---
title: "前端開發總覽"
id: "frontend-overview"
category: "development"
subcategory: "frontend"
ai_usage:
  - "開始前端開發"
  - "了解前端開發流程"
version: "1.0.0"
last_updated: "2026-01-27"
---

# 前端開發總覽

## 概述

本文件提供前端開發的完整流程指引，從設計系統建立到元件開發。

## 開發流程

```
1. 建立設計系統
        ↓
2. 建立 Token 系統
        ↓
3. 開發基礎元件
        ↓
4. 組合頁面元件
        ↓
5. 整合狀態管理
        ↓
6. 配置路由
```

## 核心文件

### 必讀（優先順序）

| 順序 | 文件 | 說明 |
|------|------|------|
| 1 | [design-system.md](./design-system.md) | **核心**：設計系統完整流程 |
| 2 | [token-system.md](./token-system.md) | CSS Variables 實作 |
| 3 | [component-development.md](./component-development.md) | 元件開發標準 |

### 進階參考

| 文件 | 說明 |
|------|------|
| [state-management.md](./state-management.md) | 狀態管理模式 |
| [routing.md](./routing.md) | 路由設計 |
| [component-library.md](./component-library.md) | 元件庫選擇 |
| [documentation-guide.md](./documentation-guide.md) | 文件撰寫指南 |

## Prompt 列表

| Prompt | 用途 | 路徑 |
|--------|------|------|
| 設計系統設置 | 建立 Design Token | `prompts/setup-design-system.md` |
| Token 系統 | 實作 CSS Variables | `prompts/setup-token-system.md` |
| 建立元件 | 建立 UI 元件 | `prompts/create-component.md` |
| 狀態管理 | 設置狀態管理 | `prompts/setup-state-management.md` |
| 路由設置 | 配置路由 | `prompts/setup-routing.md` |

## 技術棧支援

本 workflow 支援以下前端技術棧：

### 框架

| 框架 | 版本 | 狀態 |
|------|------|------|
| React | 18+ | ✅ 完整支援 |
| Vue 3 | 3.3+ | ✅ 完整支援 |
| Angular | 17+ | ⚠️ 基本支援 |
| Astro | 4+ | ⚠️ 基本支援 |

### CSS 方案

| 方案 | 說明 |
|------|------|
| Tailwind CSS | 推薦，與 Token 系統整合良好 |
| CSS Modules | 適合元件隔離 |
| Styled Components | 適合 CSS-in-JS 偏好 |

### 元件庫

| 框架 | 推薦元件庫 |
|------|-----------|
| React | shadcn/ui, Radix UI |
| Vue 3 | Vuetify, PrimeVue |
| Angular | Angular Material |

## 專案結構

```
src/
├── components/           # UI 元件
│   ├── ui/              # 基礎元件（Button, Input...）
│   ├── layout/          # 佈局元件（Header, Sidebar...）
│   └── features/        # 功能元件（UserCard, ProductList...）
├── hooks/               # 自定義 Hooks
├── stores/              # 狀態管理
├── styles/              # 全域樣式
│   ├── tokens/          # Design Token
│   └── globals.css      # 全域 CSS
├── lib/                 # 工具函數
├── pages/               # 頁面元件
└── types/               # TypeScript 型別
```

## 開發標準

### 元件開發

1. **使用 Design Token**：所有顏色、間距、字體都使用 Token
2. **TypeScript**：所有元件都要有完整的型別定義
3. **測試**：每個元件都要有單元測試
4. **文件**：複雜元件要有使用範例

### 程式碼風格

- 使用 ESLint + Prettier
- 遵循框架官方風格指南
- 元件檔案使用 PascalCase

## 相關文件

- [三層驗證框架](../shared/validation-framework.md)
- [前後端整合](../shared/integration.md)
- [程式碼審查清單](../../03-review/code-review-checklist.md)

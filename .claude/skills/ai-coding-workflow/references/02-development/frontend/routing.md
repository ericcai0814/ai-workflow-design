---
title: "路由設計"
id: "routing"
category: "development"
subcategory: "frontend"
ai_usage:
  - "設計路由結構"
  - "實作路由邏輯"
  - "處理路由守衛"
version: "1.0.0"
last_updated: "2026-01-23"
---

# 路由設計

## 概述

路由是前端應用的導航核心。本文件提供路由設計原則和與 AI 協作的 Prompt。

## 路由設計原則

### 1. URL 即 UI 狀態

URL 應該反映當前的 UI 狀態，使用者可以：
- 書籤保存當前頁面
- 分享連結給他人
- 使用瀏覽器前進/後退

### 2. 階層式結構

```
/                       # 首頁
/products               # 產品列表
/products/:id           # 產品詳情
/products/:id/edit      # 編輯產品
/settings               # 設定
/settings/profile       # 個人資料設定
/settings/security      # 安全設定
```

### 3. RESTful 風格

| 動作 | 路由 | 說明 |
|------|------|------|
| 列表 | `/resources` | 資源列表 |
| 詳情 | `/resources/:id` | 單一資源 |
| 新增 | `/resources/new` | 新增表單 |
| 編輯 | `/resources/:id/edit` | 編輯表單 |

---

## Prompts

### Prompt 1：路由架構設計

```
你是一位前端架構師。請為以下應用設計路由架構。

## 應用描述
${APP_DESCRIPTION}

## 主要功能
${MAIN_FEATURES}

## 用戶角色
${USER_ROLES}

## 請設計

### 1. 路由結構

\`\`\`
/                           # 說明
├── /feature-a              # 說明
│   ├── /feature-a/:id      # 說明
│   └── /feature-a/new      # 說明
├── /feature-b
│   └── ...
└── /settings
    └── ...
\`\`\`

### 2. 路由定義

| 路由 | 元件 | 權限 | 說明 |
|------|------|------|------|
| / | HomePage | public | 首頁 |
| /login | LoginPage | guest | 登入 |
| /dashboard | DashboardPage | auth | 儀表板 |
| ... | ... | ... | ... |

### 3. 路由守衛

| 守衛 | 條件 | 重定向 |
|------|------|--------|
| auth | 已登入 | /login |
| guest | 未登入 | /dashboard |
| admin | 管理員 | /403 |

### 4. 特殊路由

- 404 頁面：...
- 錯誤頁面：...
- 重定向：...
```

### Prompt 2：路由實作（React Router / Next.js）

```
你是一位前端工程師。請實作以下路由配置。

## 框架
${FRAMEWORK}

## 路由結構
${ROUTE_STRUCTURE}

## 請實作

### Next.js App Router

\`\`\`
app/
├── layout.tsx              # 根 layout
├── page.tsx                # 首頁
├── (auth)/                 # 路由群組
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── (dashboard)/            # 需要認證的路由
│   ├── layout.tsx          # 包含認證檢查
│   ├── page.tsx
│   └── settings/
│       └── page.tsx
└── api/                    # API routes
    └── ...
\`\`\`

### 路由守衛實作

\`\`\`tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 認證邏輯
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
\`\`\`
```

### Prompt 3：動態路由與資料載入

```
你是一位前端工程師。請實作以下動態路由。

## 路由
${ROUTE_PATH}

## 資料需求
${DATA_REQUIREMENTS}

## 請實作

### 頁面元件

\`\`\`tsx
// app/[slug]/page.tsx
interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: PageProps) {
  // SEO metadata
}

export default async function Page({ params, searchParams }: PageProps) {
  const data = await fetchData(params.slug);
  return <Component data={data} />;
}
\`\`\`

### 靜態路徑生成（如適用）

\`\`\`tsx
export async function generateStaticParams() {
  const items = await fetchAllItems();
  return items.map((item) => ({
    slug: item.slug,
  }));
}
\`\`\`
```

---

## 常見模式

### 1. 巢狀路由與 Layout

```
/dashboard
  ├── layout.tsx      # 共用側邊欄
  ├── page.tsx        # /dashboard
  ├── analytics/
  │   └── page.tsx    # /dashboard/analytics
  └── settings/
      └── page.tsx    # /dashboard/settings
```

### 2. 平行路由（Parallel Routes）

同時顯示多個頁面區塊：

```
/dashboard
  ├── @sidebar/       # 側邊欄 slot
  │   └── page.tsx
  ├── @main/          # 主內容 slot
  │   └── page.tsx
  └── layout.tsx      # 組合 slots
```

### 3. 攔截路由（Intercepting Routes）

Modal 路由模式：

```
/photos
  ├── page.tsx              # 列表頁
  ├── [id]/
  │   └── page.tsx          # 詳情頁（直接訪問）
  └── (.)photos/[id]/
      └── page.tsx          # Modal 版本（從列表點擊）
```

---

## 檢查清單

### 路由設計

- [ ] URL 結構清晰、有意義
- [ ] 遵循 RESTful 慣例
- [ ] 支援深度連結和書籤

### 權限控制

- [ ] 路由守衛正確配置
- [ ] 未授權時正確重定向
- [ ] 錯誤頁面處理

### SEO

- [ ] 動態路由有 metadata
- [ ] 重要頁面可被爬蟲索引
- [ ] 有適當的 canonical URL

---

## 相關文件

- [元件開發](./component-development.md)
- [認證授權](../backend/authentication.md)

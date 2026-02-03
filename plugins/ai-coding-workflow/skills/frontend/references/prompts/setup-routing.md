---
title: "Prompt: 設定路由"
id: "prompt-setup-routing"
category: "development"
subcategory: "frontend"
ai_usage:
  - "設定頁面路由"
  - "規劃 URL 結構"
version: "1.0.0"
last_updated: "2026-01-23"
---

# Prompt: 設定路由

## 任務目標

根據功能需求設計並實作路由結構。

## 使用時機

- 新專案需要設定路由時
- 新增頁面需要規劃路由時

---

## 變數說明

執行此 prompt 前，請先取得以下值：

| 變數                      | 來源           | 說明         | 範例                                           |
| ------------------------- | -------------- | ------------ | ---------------------------------------------- |
| `${FEATURE_REQUIREMENTS}` | 用戶描述       | 功能需求說明 | `需要首頁、登入、Dashboard、用戶管理`          |
| `${FRAMEWORK}`            | detect-context | 前端框架     | `React`, `Vue`, `Angular`                      |
| `${ROUTER_LIBRARY}`       | detect-context | 路由庫       | `React Router`, `Vue Router`, `Angular Router` |

**執行時，將所有 `${...}` 替換為實際值。如果 detect-context 無法偵測，請詢問用戶。**

---

## Prompt 範本

```prompt
你是一位前端工程師。請根據以下需求設計路由結構。

## 功能需求
${FEATURE_REQUIREMENTS}

## 技術棧
- 框架：${FRAMEWORK}
- 路由庫：${ROUTER_LIBRARY}

## 請設計

### 1. 路由結構

| 路徑 | 頁面 | 權限 | 說明 |
|------|------|------|------|
| / | Home | public | 首頁 |
| /login | Login | public | 登入頁 |
| /dashboard | Dashboard | auth | 控制台 |
| /users | UserList | admin | 用戶列表 |
| /users/:id | UserDetail | auth | 用戶詳情 |

### 2. 路由配置

\`\`\`typescript
// router/index.ts
const routes = [
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    component: UserList,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/users/:id',
    component: UserDetail,
    meta: { requiresAuth: true }
  },
];
\`\`\`

### 3. 路由守衛

\`\`\`typescript
// router/guards.ts
export function authGuard(to, from, next) {
  const isAuthenticated = checkAuth();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
    return;
  }

  if (to.meta.roles && !hasRole(to.meta.roles)) {
    next('/403');
    return;
  }

  next();
}
\`\`\`

### 4. 目錄結構

\`\`\`
src/
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   └── users/
│       ├── UserList.tsx
│       └── UserDetail.tsx
└── router/
    ├── index.ts
    └── guards.ts
\`\`\`
```

## 執行後驗證

- [ ] 路由結構符合需求
- [ ] 權限控制已設定
- [ ] 路由守衛已實作

## 下一步

建立對應的頁面元件

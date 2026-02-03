---
title: "認證授權流程"
id: "authentication"
category: "development"
subcategory: "backend"
ai_usage:
  - "實作認證系統"
  - "設計授權機制"
  - "JWT/Session 管理"
version: "1.0.0"
last_updated: "2026-01-23"
---

# 認證授權流程

## 概述

認證（Authentication）確認「你是誰」，授權（Authorization）確認「你能做什麼」。本文件提供認證授權的設計和實作指南。

## 認證方案比較

| 方案 | 優點 | 缺點 | 適用場景 |
|------|------|------|----------|
| Session | 簡單、可立即撤銷 | 需要伺服器儲存 | 傳統 Web 應用 |
| JWT | 無狀態、可擴展 | 無法立即撤銷 | SPA、微服務 |
| OAuth 2.0 | 第三方登入 | 複雜度高 | 需要社交登入 |

---

## Prompts

### Prompt 1：認證系統設計

```
你是一位安全架構師。請為以下需求設計認證系統。

## 應用描述
${APP_DESCRIPTION}

## 需求
- 支援的登入方式：${LOGIN_METHODS}
- 用戶角色：${USER_ROLES}
- 安全需求：${SECURITY_REQUIREMENTS}

## 請設計

### 1. 認證流程

#### 註冊流程
\`\`\`
用戶填寫資料 → 驗證輸入 → 密碼雜湊 → 儲存用戶 → 發送驗證信
\`\`\`

#### 登入流程
\`\`\`
用戶輸入憑證 → 驗證憑證 → 產生 Token → 回傳 Token
\`\`\`

### 2. Token 策略

| 類型 | 用途 | 有效期 | 儲存位置 |
|------|------|--------|----------|
| Access Token | API 存取 | 15 分鐘 | Memory |
| Refresh Token | 更新 Token | 7 天 | HttpOnly Cookie |

### 3. 安全措施

- 密碼：bcrypt 雜湊
- Token：JWT + RS256
- 傳輸：HTTPS only
- Cookie：HttpOnly, Secure, SameSite

### 4. 授權模型

| 角色 | 權限 |
|------|------|
| user | 讀取自己的資料 |
| admin | 管理所有資料 |
```

### Prompt 2：JWT 認證實作

```
你是一位後端工程師。請實作 JWT 認證系統。

## 技術棧
- 框架：${FRAMEWORK}
- 資料庫：${DATABASE}

## 請實作

### 1. JWT 工具

\`\`\`typescript
// lib/jwt.ts
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

export function generateRefreshToken(userId: string) {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}
\`\`\`

### 2. 認證 Middleware

\`\`\`typescript
// middleware/auth.ts
export async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
\`\`\`

### 3. 登入 API

\`\`\`typescript
// routes/auth.ts
export async function login(req, res) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  return res.json({ accessToken });
}
\`\`\`
```

### Prompt 3：RBAC 授權實作

```
你是一位後端工程師。請實作 RBAC（角色基礎存取控制）。

## 角色和權限
${ROLES_AND_PERMISSIONS}

## 請實作

### 1. 權限定義

\`\`\`typescript
// lib/permissions.ts
export const PERMISSIONS = {
  'posts:read': ['user', 'admin'],
  'posts:write': ['user', 'admin'],
  'posts:delete': ['admin'],
  'users:read': ['admin'],
  'users:write': ['admin'],
} as const;

export function hasPermission(role: string, permission: string): boolean {
  return PERMISSIONS[permission]?.includes(role) ?? false;
}
\`\`\`

### 2. 授權 Middleware

\`\`\`typescript
// middleware/authorize.ts
export function authorize(permission: string) {
  return async (req, res, next) => {
    const user = await getUser(req.userId);

    if (!hasPermission(user.role, permission)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
}

// 使用
app.delete('/posts/:id', authMiddleware, authorize('posts:delete'), deletePost);
\`\`\`
```

---

## 安全檢查清單

### 密碼安全

- [ ] 使用 bcrypt/argon2 雜湊
- [ ] 強制密碼複雜度
- [ ] 限制登入嘗試次數

### Token 安全

- [ ] 適當的有效期
- [ ] Refresh Token 儲存在 HttpOnly Cookie
- [ ] 支援 Token 撤銷（如需要）

### 傳輸安全

- [ ] 只使用 HTTPS
- [ ] 設定適當的 CORS
- [ ] Cookie 設定 Secure 和 SameSite

---

## 相關文件

- [API 設計](./api-design.md)
- [資料庫設計](./database.md)

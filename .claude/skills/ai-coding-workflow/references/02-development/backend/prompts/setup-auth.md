---
title: "Prompt: 設定認證授權"
id: "prompt-setup-auth"
category: "development"
subcategory: "backend"
ai_usage:
  - "設定認證機制"
  - "實作授權邏輯"
version: "1.0.0"
last_updated: "2026-01-23"
---

# Prompt: 設定認證授權

## 任務目標

實作應用程式的認證和授權機制。

## 使用時機

- 需要保護 API 端點時
- 實作登入/登出功能時

## Prompt 範本

```prompt
你是一位後端安全專家。請根據以下需求實作認證授權。

## 需求
${AUTH_REQUIREMENTS}

## 技術棧
- 框架：${FRAMEWORK}
- 認證方式：${AUTH_METHOD}（JWT / Session）

## 請實作

### 1. 認證流程

\`\`\`
登入流程：
[用戶] → POST /auth/login → [驗證帳密] → [產生 Token] → [回傳 Token]

驗證流程：
[請求] → [檢查 Header] → [驗證 Token] → [取得用戶] → [繼續處理]
\`\`\`

### 2. JWT 設定

\`\`\`typescript
// lib/auth/jwt.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '7d';

interface JWTPayload {
  userId: string;
  email: string;
  roles: string[];
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}
\`\`\`

### 3. 認證 Middleware

\`\`\`typescript
// middleware/auth.ts
export async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: 'Missing token' }
    });
  }

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      error: { code: 'INVALID_TOKEN', message: 'Invalid token' }
    });
  }
}
\`\`\`

### 4. 授權 Middleware

\`\`\`typescript
// middleware/authorize.ts
export function authorize(...roles: string[]) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: { code: 'UNAUTHORIZED', message: 'Not authenticated' }
      });
    }

    const hasRole = roles.some(role => req.user.roles.includes(role));

    if (!hasRole) {
      return res.status(403).json({
        error: { code: 'FORBIDDEN', message: 'Insufficient permissions' }
      });
    }

    next();
  };
}
\`\`\`

### 5. 登入 API

\`\`\`typescript
// routes/auth.ts
export async function login(req, res) {
  const { email, password } = req.body;

  // 1. 查詢用戶
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({
      error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }
    });
  }

  // 2. 驗證密碼
  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({
      error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }
    });
  }

  // 3. 產生 Token
  const token = signToken({
    userId: user.id,
    email: user.email,
    roles: user.roles,
  });

  return res.json({ data: { token, user: { id: user.id, email: user.email } } });
}
\`\`\`

### 6. 安全檢查清單

- [ ] 密碼使用 bcrypt 雜湊
- [ ] JWT Secret 足夠複雜
- [ ] Token 有過期時間
- [ ] 敏感資訊不放入 Token
- [ ] 有 Rate Limiting
```

## 執行後驗證

- [ ] 登入流程正常
- [ ] Token 驗證正常
- [ ] 權限控制正常
- [ ] 安全檢查通過

## 下一步

保護需要認證的 API 端點

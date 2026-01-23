---
title: "Prompt: 整合測試"
id: "prompt-integration-test"
category: "development"
subcategory: "shared"
ai_usage:
  - "撰寫整合測試"
  - "測試前後端整合"
version: "1.0.0"
last_updated: "2026-01-23"
---

# Prompt: 整合測試

## 任務目標

為功能撰寫整合測試，驗證前後端協作正常。

## 使用時機

- 功能開發完成後
- 需要驗證端對端流程時

## Prompt 範本

```prompt
你是一位測試工程師。請為以下功能撰寫整合測試。

## 功能描述
${FEATURE_DESCRIPTION}

## API 端點
${API_ENDPOINTS}

## 測試框架
${TEST_FRAMEWORK}

## 請撰寫

### 1. 測試案例規劃

| 案例 | 類型 | 優先級 | 說明 |
|------|------|--------|------|
| 正常流程 | Happy Path | P0 | 標準使用流程 |
| 無效輸入 | Error | P1 | 驗證錯誤處理 |
| 權限測試 | Auth | P1 | 驗證權限控制 |
| 邊界條件 | Edge | P2 | 邊界值測試 |

### 2. API 整合測試

\`\`\`typescript
// tests/api/users.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createTestClient, cleanupTestData } from '../helpers';

describe('Users API', () => {
  let client: TestClient;
  let testUser: User;

  beforeAll(async () => {
    client = await createTestClient();
    testUser = await createTestUser();
  });

  afterAll(async () => {
    await cleanupTestData();
  });

  describe('GET /api/users', () => {
    it('returns user list for admin', async () => {
      const response = await client
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.meta).toHaveProperty('total');
    });

    it('returns 401 without token', async () => {
      const response = await client.get('/api/users');

      expect(response.status).toBe(401);
      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });

    it('returns 403 for non-admin user', async () => {
      const response = await client
        .get('/api/users')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(403);
    });
  });

  describe('POST /api/users', () => {
    it('creates user with valid data', async () => {
      const newUser = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      const response = await client
        .post('/api/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.email).toBe(newUser.email);
    });

    it('returns 400 for invalid email', async () => {
      const response = await client
        .post('/api/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ email: 'invalid', name: 'Test', password: '123' });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });
});
\`\`\`

### 3. E2E 測試

\`\`\`typescript
// tests/e2e/user-management.test.ts
import { test, expect } from '@playwright/test';

test.describe('User Management', () => {
  test('admin can create new user', async ({ page }) => {
    // 1. 登入
    await page.goto('/login');
    await page.fill('[name="email"]', 'admin@example.com');
    await page.fill('[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // 2. 導航到用戶管理
    await page.click('text=User Management');
    await expect(page).toHaveURL('/admin/users');

    // 3. 建立用戶
    await page.click('text=Add User');
    await page.fill('[name="email"]', 'newuser@example.com');
    await page.fill('[name="name"]', 'New User');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // 4. 驗證成功
    await expect(page.locator('text=User created')).toBeVisible();
    await expect(page.locator('text=newuser@example.com')).toBeVisible();
  });
});
\`\`\`

### 4. 測試資料管理

\`\`\`typescript
// tests/helpers/testData.ts
export async function createTestUser() {
  return await db.insert(users).values({
    email: `test-${Date.now()}@example.com`,
    name: 'Test User',
    passwordHash: await hash('password123'),
  }).returning();
}

export async function cleanupTestData() {
  await db.delete(users).where(like(users.email, 'test-%'));
}
\`\`\`
```

## 執行後驗證

- [ ] 涵蓋主要功能流程
- [ ] 包含錯誤情況測試
- [ ] 測試資料有清理
- [ ] 所有測試通過

## 下一步

執行測試並修復發現的問題

---
title: "測試策略"
id: "testing-strategy"
category: "development"
subcategory: "shared"
ai_usage:
  - "設定測試框架"
  - "撰寫測試案例"
  - "提升測試覆蓋率"
version: "1.0.0"
last_updated: "2026-01-27"
---

# 測試策略

## 概述

本文件定義專案的測試策略，包含測試類型、工具選擇、撰寫規範。

## 測試金字塔

```
        ╱╲
       ╱  ╲
      ╱ E2E╲         少量，驗證關鍵流程
     ╱──────╲
    ╱ 整合測試 ╲       中量，驗證模組協作
   ╱────────────╲
  ╱   單元測試    ╲     大量，驗證函數/元件
 ╱────────────────╲
```

## 測試類型

### 1. 單元測試 (Unit Test)

**目的**：驗證最小單位（函數、元件）的行為

**特點**：
- 執行快速
- 隔離依賴（mock external）
- 覆蓋邊界條件

**範例**：

```typescript
// utils/formatDate.test.ts
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats date in YYYY-MM-DD format', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('2024-01-15');
  });

  it('handles invalid date', () => {
    expect(formatDate(null)).toBe('');
  });

  it('handles timezone correctly', () => {
    const date = new Date('2024-01-15T23:59:59Z');
    expect(formatDate(date, 'Asia/Taipei')).toBe('2024-01-16');
  });
});
```

### 2. 整合測試 (Integration Test)

**目的**：驗證多個模組協同工作

**特點**：
- 測試模組間的互動
- 可能涉及資料庫、API
- 執行較慢

**範例**：

```typescript
// api/users.integration.test.ts
import { createTestServer } from '../test-utils';
import { db } from '../db';

describe('Users API', () => {
  let server: TestServer;

  beforeAll(async () => {
    server = await createTestServer();
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(async () => {
    await db.users.deleteMany();
  });

  it('creates and retrieves user', async () => {
    // Create
    const createRes = await server.post('/api/users', {
      name: 'John',
      email: 'john@example.com',
    });
    expect(createRes.status).toBe(201);

    // Retrieve
    const getRes = await server.get(`/api/users/${createRes.body.id}`);
    expect(getRes.body.name).toBe('John');
  });
});
```

### 3. E2E 測試 (End-to-End Test)

**目的**：從使用者角度驗證完整流程

**特點**：
- 模擬真實使用情境
- 涵蓋 UI 互動
- 執行最慢，維護成本高

**範例**：

```typescript
// e2e/checkout.spec.ts
import { test, expect } from '@playwright/test';

test('user can complete checkout', async ({ page }) => {
  // 登入
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@test.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');

  // 加入購物車
  await page.goto('/products/1');
  await page.click('button:has-text("Add to Cart")');

  // 結帳
  await page.goto('/cart');
  await page.click('button:has-text("Checkout")');

  // 填寫資訊
  await page.fill('[name="address"]', '123 Test St');
  await page.click('button:has-text("Place Order")');

  // 驗證
  await expect(page.locator('h1')).toHaveText('Order Confirmed');
});
```

## 測試工具

### 前端測試

| 用途 | 推薦工具 | 備選 |
|------|----------|------|
| 單元/整合測試 | Vitest | Jest |
| 元件測試 | Testing Library | Enzyme |
| E2E 測試 | Playwright | Cypress |
| 視覺回歸 | Chromatic | Percy |

### 後端測試

| 語言 | 測試框架 | Mock 工具 |
|------|----------|-----------|
| Node.js | Vitest / Jest | MSW |
| Python | pytest | unittest.mock |
| Go | testing | testify |
| C# | xUnit / NUnit | Moq |

## 測試撰寫規範

### 命名規則

```typescript
// 格式：should [expected behavior] when [condition]
it('should return empty array when no items match', () => {});

// 或：[action] [expected result]
it('filters items by category', () => {});
```

### AAA 模式

```typescript
it('calculates total price with discount', () => {
  // Arrange - 準備測試資料
  const items = [
    { price: 100, quantity: 2 },
    { price: 50, quantity: 1 },
  ];
  const discount = 0.1;

  // Act - 執行被測試的函數
  const total = calculateTotal(items, discount);

  // Assert - 驗證結果
  expect(total).toBe(225); // (200 + 50) * 0.9
});
```

### 測試隔離

```typescript
// ❌ 測試間共享狀態
let counter = 0;
it('test 1', () => { counter++; });
it('test 2', () => { expect(counter).toBe(1); }); // 依賴 test 1

// ✅ 每個測試獨立
beforeEach(() => {
  counter = 0;
});
it('test 1', () => { counter++; expect(counter).toBe(1); });
it('test 2', () => { counter++; expect(counter).toBe(1); });
```

## 覆蓋率目標

| 類型 | 最低覆蓋率 | 理想覆蓋率 |
|------|------------|------------|
| 核心業務邏輯 | 90% | 95%+ |
| UI 元件 | 80% | 90% |
| 工具函數 | 95% | 100% |
| API 端點 | 85% | 95% |

### 設定覆蓋率門檻

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
    },
  },
});
```

## Mock 策略

### 何時 Mock

| 情境 | 是否 Mock | 原因 |
|------|-----------|------|
| 外部 API | ✅ 是 | 避免網路依賴、速度 |
| 資料庫 | 視情況 | 整合測試不 mock |
| 時間/日期 | ✅ 是 | 確保結果一致 |
| 內部模組 | ❌ 否 | 保持測試真實性 |

### Mock 範例

```typescript
// Mock API
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John' },
    ]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock 時間
beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2024-01-15'));
});

afterEach(() => {
  vi.useRealTimers();
});
```

## 測試執行

### 本地開發

```bash
# 監看模式（開發時）
pnpm test:watch

# 單次執行
pnpm test

# 含覆蓋率
pnpm test:coverage

# 執行特定檔案
pnpm test Button
```

### CI 環境

```bash
# 執行所有測試
pnpm test:ci

# E2E 測試
pnpm test:e2e
```

## 相關文件

- [三層驗證框架](./validation-framework.md)
- [前後端整合](./integration.md)

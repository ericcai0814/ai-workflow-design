---
title: "Astro 5 環境變數載入踩坑"
id: "pitfall-astro5-env"
category: "appendix"
source: "ewill-web 專案 (2026-01)"
ai_usage:
  - "Astro 5 專案開發"
  - "環境變數設定"
  - "SSR API 開發"
version: "1.0.0"
last_updated: "2026-01-23"
---

# Astro 5 環境變數載入踩坑

## 問題描述

API 無法讀取環境變數，`DATABASE_URL` 和 `RESEND_API_KEY` 都是 `undefined`。

## 症狀

```typescript
// src/pages/api/events.ts
const dbUrl = process.env.DATABASE_URL;
console.log(dbUrl); // undefined ❌
```

- 本地 `.env` 檔案存在且正確
- 其他框架（如 Next.js）可以正常讀取
- Astro 4 可以正常讀取

## 根因分析

**Astro 5 的環境變數載入機制變更**：

| 版本 | 機制 |
|------|------|
| Astro 4 | 使用 `process.env` |
| Astro 5 | 使用 `import.meta.env`，`process.env` 僅在特定情況可用 |

Astro 5 預設使用 Vite 的環境變數系統，需要透過 `import.meta.env` 存取。

## 錯誤的做法

```typescript
// ❌ Astro 5 中可能無法讀取
const dbUrl = process.env.DATABASE_URL;

// ❌ 在模組頂層直接讀取
import { drizzle } from 'drizzle-orm/neon';
const db = drizzle(process.env.DATABASE_URL!); // 可能是 undefined
```

## 正確的解決方案

### 方案 1：優先使用 import.meta.env

```typescript
// ✅ 正確做法：import.meta.env 優先
const dbUrl = import.meta.env.DATABASE_URL ?? process.env.DATABASE_URL;
```

### 方案 2：惰性初始化

```typescript
// ✅ 使用 getter 確保執行時才讀取
let _db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!_db) {
    const url = import.meta.env.DATABASE_URL ?? process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not defined');
    _db = drizzle(url);
  }
  return _db;
}

export const db = { get: getDb };
```

### 方案 3：使用 Astro 的 env schema（推薦）

```typescript
// src/env.d.ts
interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly RESEND_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

```javascript
// astro.config.mjs
export default defineConfig({
  experimental: {
    env: {
      schema: {
        DATABASE_URL: envField.string({ context: 'server', access: 'secret' }),
        RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      }
    }
  }
});
```

## 完整修正範例

**修正前**：

```typescript
// lib/db/client.ts
import { drizzle } from 'drizzle-orm/neon-serverless';

// ❌ 在模組頂層直接讀取
export const db = drizzle(process.env.DATABASE_URL!);
```

**修正後**：

```typescript
// lib/db/client.ts
import { drizzle } from 'drizzle-orm/neon-serverless';

// ✅ 惰性初始化 + import.meta.env 優先
let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!_db) {
    const url = import.meta.env.DATABASE_URL ?? process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL is not defined');
    }
    _db = drizzle(url);
  }
  return _db;
}

// 使用方式
// const db = getDb();
// const results = await db.select().from(events);
```

## 學習重點

| 原則 | 說明 |
|------|------|
| 了解框架版本差異 | Astro 5 vs 4 的環境變數機制不同 |
| 優先使用 import.meta.env | Vite-based 框架的標準做法 |
| 惰性初始化 | 避免在模組載入時就讀取環境變數 |
| 型別定義 | 在 `env.d.ts` 中定義環境變數型別 |

## 與 AI 協作的正確方式

```
❌ 錯誤：「幫我建立資料庫連線」

✅ 正確：「幫我建立資料庫連線
- 框架：Astro 5
- ORM：Drizzle
- 資料庫：Neon PostgreSQL
- 注意：Astro 5 需要使用 import.meta.env 讀取環境變數」
```

## 相關問題

### Q：為什麼 process.env 有時候可以用？

**A**：在以下情況 `process.env` 可能可用：
- Node.js adapter 的 SSR 模式
- 在 `astro.config.mjs` 中（Node.js 環境）
- 使用 `dotenv` 手動載入

但為了一致性，建議統一使用 `import.meta.env`。

### Q：如何在開發和生產環境使用不同的環境變數？

**A**：
- 開發：`.env` 或 `.env.development`
- 生產：在部署平台（Vercel、Cloudflare）設定環境變數
- Astro 會根據環境自動選擇

## 防呆清單

- [ ] 使用 `import.meta.env` 而非 `process.env`
- [ ] 提供 fallback：`import.meta.env.VAR ?? process.env.VAR`
- [ ] 使用惰性初始化模式
- [ ] 在 `env.d.ts` 定義型別
- [ ] 告知 AI 使用的框架版本

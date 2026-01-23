---
title: "Prompt: 建立資料模型"
id: "prompt-create-model"
category: "development"
subcategory: "backend"
ai_usage:
  - "建立資料庫模型"
  - "設計 Schema"
version: "1.0.0"
last_updated: "2026-01-23"
---

# Prompt: 建立資料模型

## 任務目標

根據 API 規格建立對應的資料庫模型和 ORM Schema。

## 使用時機

- API 設計完成後
- 需要建立新的資料表時

## Prompt 範本

```prompt
你是一位後端工程師。請根據以下規格建立資料模型。

## API 規格
${API_SPEC}

## 技術棧
- 資料庫：${DATABASE}
- ORM：${ORM}

## 請建立

### 1. Schema 定義

\`\`\`typescript
// db/schema/users.ts
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
\`\`\`

### 2. 關聯定義

\`\`\`typescript
// db/schema/posts.ts
import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 200 }).notNull(),
  content: text('content'),
  status: varchar('status', { length: 20 }).notNull().default('draft'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
\`\`\`

### 3. Migration

\`\`\`sql
-- 0001_create_users.sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX users_status_idx ON users(status);
\`\`\`

### 4. 索引建議

| 表 | 欄位 | 類型 | 原因 |
|-----|------|------|------|
| users | email | UNIQUE | 登入查詢 |
| users | status | INDEX | 篩選查詢 |
| posts | user_id | INDEX | 關聯查詢 |
```

## 執行後驗證

- [ ] Schema 符合 API 需求
- [ ] 關聯設定正確
- [ ] 索引已建立
- [ ] Migration 可執行

## 下一步

執行 Migration 並實作 API

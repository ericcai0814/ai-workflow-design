---
title: "資料庫設計"
id: "database"
category: "development"
subcategory: "backend"
ai_usage:
  - "設計資料模型"
  - "撰寫 Schema"
  - "資料庫遷移"
version: "1.0.0"
last_updated: "2026-01-23"
---

# 資料庫設計

## 概述

資料庫是應用的核心，良好的設計影響效能和可維護性。本文件提供資料庫設計原則和與 AI 協作的 Prompt。

## 設計流程

### 步驟 1：識別實體

從需求中識別主要的資料實體（Entity）。

### 步驟 2：定義屬性

為每個實體定義屬性和資料類型。

### 步驟 3：建立關聯

定義實體之間的關聯（1:1, 1:N, N:M）。

### 步驟 4：正規化

避免資料冗餘，適度正規化。

### 步驟 5：索引設計

根據查詢模式設計索引。

---

## Prompts

### Prompt 1：資料模型設計

```
你是一位資料庫架構師。請為以下需求設計資料模型。

## 需求描述
${REQUIREMENTS}

## 主要功能
${MAIN_FEATURES}

## 請設計

### 1. 實體識別

| 實體 | 說明 | 主要屬性 |
|------|------|----------|
| | | |

### 2. ER 圖（Mermaid）

\`\`\`mermaid
erDiagram
    USER ||--o{ POST : creates
    USER {
        string id PK
        string email
        string name
        timestamp createdAt
    }
    POST {
        string id PK
        string userId FK
        string title
        text content
        timestamp createdAt
    }
\`\`\`

### 3. 關聯說明

| 關聯 | 類型 | 說明 |
|------|------|------|
| User - Post | 1:N | 一個用戶可以有多篇文章 |

### 4. 索引建議

| 資料表 | 索引 | 類型 | 原因 |
|--------|------|------|------|
| users | email | UNIQUE | 登入查詢 |
| posts | userId | INDEX | 查詢用戶文章 |
```

### Prompt 2：Prisma Schema 實作

```
你是一位後端工程師。請根據以下資料模型實作 Prisma Schema。

## 資料模型
${DATA_MODEL}

## 請實作

### prisma/schema.prisma

\`\`\`prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "${DATABASE_PROVIDER}"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([authorId])
  @@map("posts")
}
\`\`\`

### 遷移指令

\`\`\`bash
# 建立遷移
npx prisma migrate dev --name init

# 生成 client
npx prisma generate

# 查看資料庫
npx prisma studio
\`\`\`
```

### Prompt 3：查詢優化

```
你是一位資料庫專家。請優化以下查詢。

## 現有查詢
\`\`\`typescript
${CURRENT_QUERY}
\`\`\`

## 效能問題
${PERFORMANCE_ISSUES}

## 資料量
${DATA_VOLUME}

## 請分析

### 1. 問題分析

- 問題 1：...
- 問題 2：...

### 2. 優化建議

#### 索引優化

\`\`\`sql
CREATE INDEX idx_xxx ON table(column);
\`\`\`

#### 查詢重寫

\`\`\`typescript
// 優化後的查詢
\`\`\`

### 3. 其他建議

- 快取策略
- 分頁優化
- N+1 問題處理
```

---

## 常見模式

### 1. 軟刪除

```prisma
model Post {
  id        String    @id
  deletedAt DateTime?

  @@index([deletedAt])
}
```

### 2. 審計欄位

```prisma
model Post {
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String?
  updatedBy String?
}
```

### 3. 多對多

```prisma
model Post {
  tags PostTag[]
}

model Tag {
  posts PostTag[]
}

model PostTag {
  post   Post   @relation(fields: [postId], references: [id])
  postId String
  tag    Tag    @relation(fields: [tagId], references: [id])
  tagId  String

  @@id([postId, tagId])
}
```

---

## 檢查清單

- [ ] 實體和關聯正確定義
- [ ] 適當的資料類型
- [ ] 必要的索引
- [ ] 外鍵約束
- [ ] 遷移腳本可正確執行

---

## 相關文件

- [API 設計](./api-design.md)
- [認證授權](./authentication.md)

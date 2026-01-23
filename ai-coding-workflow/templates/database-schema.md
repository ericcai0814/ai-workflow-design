# 資料庫 Schema 模板

## Schema 資訊

| 欄位 | 內容 |
|------|------|
| Schema 名稱 | |
| 資料庫類型 | PostgreSQL / MySQL / MongoDB |
| 版本 | v1.0 |
| 建立日期 | |

## 概述

[說明這個 Schema 的用途和資料關係]

---

## ER Diagram

```
┌─────────────┐       ┌─────────────┐
│   users     │       │   posts     │
├─────────────┤       ├─────────────┤
│ id (PK)     │──┐    │ id (PK)     │
│ email       │  │    │ title       │
│ name        │  └───>│ user_id (FK)│
│ created_at  │       │ created_at  │
└─────────────┘       └─────────────┘
```

---

## Table: users

**說明**：用戶資料表

| 欄位 | 類型 | Nullable | 預設值 | 說明 |
|------|------|----------|--------|------|
| id | UUID | NO | gen_random_uuid() | 主鍵 |
| email | VARCHAR(255) | NO | | 電子郵件（唯一） |
| name | VARCHAR(100) | NO | | 用戶名稱 |
| password_hash | VARCHAR(255) | NO | | 密碼雜湊 |
| status | VARCHAR(20) | NO | 'active' | 狀態 |
| created_at | TIMESTAMP | NO | now() | 建立時間 |
| updated_at | TIMESTAMP | NO | now() | 更新時間 |

**索引**

| 名稱 | 欄位 | 類型 |
|------|------|------|
| users_pkey | id | PRIMARY |
| users_email_unique | email | UNIQUE |
| users_status_idx | status | INDEX |

**SQL**

```sql
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
```

---

## Table: posts

**說明**：文章資料表

| 欄位 | 類型 | Nullable | 預設值 | 說明 |
|------|------|----------|--------|------|
| id | UUID | NO | gen_random_uuid() | 主鍵 |
| user_id | UUID | NO | | 作者 ID（外鍵） |
| title | VARCHAR(200) | NO | | 標題 |
| content | TEXT | YES | | 內容 |
| status | VARCHAR(20) | NO | 'draft' | 狀態 |
| created_at | TIMESTAMP | NO | now() | 建立時間 |
| updated_at | TIMESTAMP | NO | now() | 更新時間 |

**外鍵**

| 欄位 | 參照表 | 參照欄位 | ON DELETE |
|------|--------|----------|-----------|
| user_id | users | id | CASCADE |

**SQL**

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX posts_user_id_idx ON posts(user_id);
CREATE INDEX posts_status_idx ON posts(status);
```

---

## Enum 定義

### user_status

| 值 | 說明 |
|-----|------|
| active | 啟用 |
| inactive | 停用 |
| suspended | 停權 |

### post_status

| 值 | 說明 |
|-----|------|
| draft | 草稿 |
| published | 已發布 |
| archived | 已封存 |

---

## Migration

### 建立

```sql
-- Migration: 001_create_users_and_posts
-- Created: 2026-01-23

-- Up
[建立 SQL]

-- Down
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
```

---

## 備註

[其他補充說明，如效能考量、分表策略等]

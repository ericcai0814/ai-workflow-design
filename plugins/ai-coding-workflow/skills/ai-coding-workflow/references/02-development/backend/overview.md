---
title: "後端開發總覽"
id: "backend-overview"
category: "development"
subcategory: "backend"
ai_usage:
  - "開始後端開發"
  - "了解後端開發流程"
version: "1.0.0"
last_updated: "2026-01-27"
---

# 後端開發總覽

## 概述

本文件提供後端開發的完整流程指引，從 API 設計到資料庫實作。

## 開發流程

```
1. 設計 API 規格
        ↓
2. 設計資料庫 Schema
        ↓
3. 實作資料模型
        ↓
4. 實作 API 端點
        ↓
5. 實作認證授權
        ↓
6. 撰寫測試
```

## 核心文件

### 必讀（優先順序）

| 順序 | 文件 | 說明 |
|------|------|------|
| 1 | [api-design.md](./api-design.md) | API 設計原則和規範 |
| 2 | [database.md](./database.md) | 資料庫設計指南 |
| 3 | [authentication.md](./authentication.md) | 認證授權實作 |

### 進階參考

| 文件 | 說明 |
|------|------|
| [business-logic.md](./business-logic.md) | 商業邏輯實作模式 |

## Prompt 列表

| Prompt | 用途 | 路徑 |
|--------|------|------|
| API 設計 | 設計 RESTful API | `prompts/design-api.md` |
| 建立模型 | 建立資料模型 | `prompts/create-model.md` |
| 認證設置 | 實作認證授權 | `prompts/setup-auth.md` |

## 技術棧支援

### 程式語言

| 語言 | 框架 | 狀態 |
|------|------|------|
| Node.js | Express, Fastify, Hono | ✅ 完整支援 |
| Python | FastAPI, Django | ✅ 完整支援 |
| Go | Fiber, Gin, Echo | ⚠️ 基本支援 |
| C# | ASP.NET Core | ⚠️ 基本支援 |

### 資料庫

| 類型 | 資料庫 | ORM |
|------|--------|-----|
| SQL | PostgreSQL | Prisma, Drizzle |
| SQL | MySQL | Prisma, TypeORM |
| NoSQL | MongoDB | Mongoose |

### API 風格

| 風格 | 使用場景 |
|------|----------|
| RESTful | 標準 CRUD 操作 |
| GraphQL | 複雜查詢、多資源關聯 |

## 專案結構

### Node.js (Express/Fastify)

```
src/
├── routes/              # API 路由
│   ├── users.ts
│   └── products.ts
├── controllers/         # 控制器
├── services/            # 商業邏輯
├── models/              # 資料模型
├── middleware/          # 中介層
│   ├── auth.ts
│   └── validation.ts
├── lib/                 # 工具函數
│   ├── db.ts           # 資料庫連線
│   └── logger.ts
├── types/               # TypeScript 型別
└── tests/               # 測試
```

### Python (FastAPI)

```
app/
├── routers/             # API 路由
│   ├── users.py
│   └── products.py
├── services/            # 商業邏輯
├── models/              # SQLAlchemy 模型
├── schemas/             # Pydantic Schema
├── core/                # 核心設定
│   ├── config.py
│   └── security.py
├── db/                  # 資料庫
│   └── session.py
└── tests/               # 測試
```

## 開發標準

### API 設計

1. **RESTful 命名**：使用複數名詞 `/users`, `/products`
2. **HTTP 方法**：GET（讀取）、POST（建立）、PATCH（更新）、DELETE（刪除）
3. **回應格式**：統一 JSON 格式，包含 `data`, `error`, `meta`
4. **錯誤處理**：使用標準 HTTP 狀態碼

### 資料庫設計

1. **使用 Migration**：所有 Schema 變更都要有 migration
2. **索引優化**：為常用查詢欄位建立索引
3. **軟刪除**：使用 `deleted_at` 而非實際刪除

### 安全性

1. **輸入驗證**：所有輸入都要驗證
2. **SQL Injection**：使用 ORM 或參數化查詢
3. **認證**：敏感端點都要認證
4. **授權**：檢查使用者權限

## 相關文件

- [前後端整合](../shared/integration.md)
- [三層驗證框架](../shared/validation-framework.md)
- [測試策略](../shared/testing.md)

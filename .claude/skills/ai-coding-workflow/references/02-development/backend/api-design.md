---
title: "API 設計規範"
id: "api-design"
category: "development"
subcategory: "backend"
ai_usage:
  - "設計 REST API"
  - "定義 API 規格"
  - "撰寫 API 文件"
version: "1.0.0"
last_updated: "2026-01-23"
---

# API 設計規範

## 概述

良好的 API 設計是前後端協作的基礎。本文件提供 API 設計原則和與 AI 協作的 Prompt。

## 設計原則

### 1. RESTful 慣例

| 動作 | HTTP Method | 路徑 | 說明 |
|------|-------------|------|------|
| 列表 | GET | /resources | 取得資源列表 |
| 詳情 | GET | /resources/:id | 取得單一資源 |
| 新增 | POST | /resources | 建立資源 |
| 更新 | PUT/PATCH | /resources/:id | 更新資源 |
| 刪除 | DELETE | /resources/:id | 刪除資源 |

### 2. 命名規範

```
✅ 正確
GET /users
GET /users/123
GET /users/123/posts

❌ 錯誤
GET /getUsers
GET /user/123
GET /users/123/getPosts
```

### 3. 回應格式

```json
// 成功回應
{
  "data": { ... },
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}

// 錯誤回應
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

---

## Prompts

### Prompt 1：API 規格設計

```
你是一位後端架構師。請為以下功能設計 API 規格。

## 功能描述
${FEATURE_DESCRIPTION}

## 資料實體
${DATA_ENTITIES}

## 請設計

### 1. API 端點列表

| Method | Path | 說明 | 權限 |
|--------|------|------|------|
| GET | /api/v1/xxx | | |
| POST | /api/v1/xxx | | |

### 2. 詳細規格

#### GET /api/v1/xxx

**描述**：...

**Query Parameters**
| 參數 | 類型 | 必填 | 說明 |
|------|------|------|------|
| page | number | 否 | 頁碼，預設 1 |
| limit | number | 否 | 每頁筆數，預設 20 |

**Response 200**
\`\`\`json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
\`\`\`

#### POST /api/v1/xxx

**描述**：...

**Request Body**
\`\`\`json
{
  "field1": "string",
  "field2": 123
}
\`\`\`

**Response 201**
\`\`\`json
{
  "data": {
    "id": "xxx",
    ...
  }
}
\`\`\`

**Error Responses**
| Status | Code | 說明 |
|--------|------|------|
| 400 | VALIDATION_ERROR | 驗證失敗 |
| 401 | UNAUTHORIZED | 未認證 |
| 403 | FORBIDDEN | 無權限 |
```

### Prompt 2：API 實作（Node.js）

```
你是一位後端工程師。請實作以下 API 端點。

## API 規格
${API_SPEC}

## 技術棧
- 框架：${FRAMEWORK}
- ORM：${ORM}
- 驗證：${VALIDATION_LIB}

## 請實作

### 1. 路由定義

\`\`\`typescript
// routes/xxx.ts
\`\`\`

### 2. Controller

\`\`\`typescript
// controllers/xxx.controller.ts
\`\`\`

### 3. Service

\`\`\`typescript
// services/xxx.service.ts
\`\`\`

### 4. 驗證 Schema

\`\`\`typescript
// schemas/xxx.schema.ts
import { z } from 'zod';

export const createXxxSchema = z.object({
  // ...
});
\`\`\`

### 5. 錯誤處理

\`\`\`typescript
// 自定義錯誤
\`\`\`
```

### Prompt 3：OpenAPI/Swagger 文件

```
你是一位 API 文件專家。請根據以下 API 產出 OpenAPI 3.0 規格。

## API 端點
${API_ENDPOINTS}

## 請產出

\`\`\`yaml
openapi: 3.0.0
info:
  title: ${API_TITLE}
  version: 1.0.0

paths:
  /api/v1/xxx:
    get:
      summary: ...
      parameters: ...
      responses: ...
    post:
      summary: ...
      requestBody: ...
      responses: ...

components:
  schemas:
    Xxx:
      type: object
      properties: ...
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
\`\`\`
```

---

## 最佳實踐

### 1. 版本控制

```
/api/v1/users
/api/v2/users
```

### 2. 分頁

```
GET /api/v1/users?page=2&limit=20

Response:
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 2,
    "limit": 20,
    "totalPages": 5
  }
}
```

### 3. 篩選和排序

```
GET /api/v1/users?status=active&sort=-createdAt
```

### 4. 錯誤處理

使用一致的錯誤格式和 HTTP 狀態碼。

---

## 檢查清單

- [ ] 遵循 RESTful 慣例
- [ ] 使用適當的 HTTP 狀態碼
- [ ] 有一致的回應格式
- [ ] 有完整的錯誤處理
- [ ] 有 API 文件（OpenAPI/Swagger）
- [ ] 有輸入驗證

---

## 相關文件

- [資料庫設計](./database.md)
- [認證授權](./authentication.md)
- [前後端整合](../shared/integration.md)

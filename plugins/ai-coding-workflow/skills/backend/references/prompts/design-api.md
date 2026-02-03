---
title: "Prompt: 設計 API"
id: "prompt-design-api"
category: "development"
subcategory: "backend"
ai_usage:
  - "設計 API 規格"
  - "定義 API 端點"
version: "1.0.0"
last_updated: "2026-01-23"
---

# Prompt: 設計 API

## 任務目標

根據功能需求設計符合 RESTful 規範的 API。

## 使用時機

- 開發新功能需要 API 時
- 重新設計 API 時

## Prompt 範本

```prompt
你是一位後端架構師。請根據以下需求設計 API。

## 功能需求
${FEATURE_REQUIREMENTS}

## 資料實體
${DATA_ENTITIES}

## API 風格
${API_STYLE}（REST / GraphQL）

## 請設計

### 1. 資源分析

| 資源 | 說明 | CRUD |
|------|------|------|
| /users | 用戶 | CRUD |
| /posts | 文章 | CRUD |
| /posts/:id/comments | 文章評論 | CR |

### 2. API 端點列表

| Method | Path | 說明 | 權限 |
|--------|------|------|------|
| GET | /api/v1/users | 用戶列表 | admin |
| GET | /api/v1/users/:id | 用戶詳情 | auth |
| POST | /api/v1/users | 建立用戶 | admin |
| PUT | /api/v1/users/:id | 更新用戶 | owner |
| DELETE | /api/v1/users/:id | 刪除用戶 | admin |

### 3. 詳細規格

#### GET /api/v1/users

**描述**：取得用戶列表

**Query Parameters**
| 參數 | 類型 | 必填 | 說明 |
|------|------|------|------|
| page | number | 否 | 頁碼，預設 1 |
| limit | number | 否 | 每頁筆數，預設 20 |
| status | string | 否 | 篩選狀態 |

**Response 200**
\`\`\`json
{
  "data": [...],
  "meta": { "total": 100, "page": 1, "limit": 20 }
}
\`\`\`

#### POST /api/v1/users

**描述**：建立用戶

**Request Body**
\`\`\`json
{
  "email": "string (required)",
  "name": "string (required)",
  "password": "string (required)"
}
\`\`\`

**Response 201**
\`\`\`json
{
  "data": { "id": "uuid", "email": "...", "name": "..." }
}
\`\`\`

### 4. 錯誤處理

| Status | Code | 說明 |
|--------|------|------|
| 400 | VALIDATION_ERROR | 輸入驗證失敗 |
| 401 | UNAUTHORIZED | 未認證 |
| 403 | FORBIDDEN | 無權限 |
| 404 | NOT_FOUND | 資源不存在 |
```

## 執行後驗證

- [ ] 遵循 RESTful 慣例
- [ ] 權限設計合理
- [ ] 錯誤碼定義完整

## 下一步

執行 `create-model.md` 建立資料模型

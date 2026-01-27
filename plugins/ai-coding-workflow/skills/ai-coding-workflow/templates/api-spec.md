# API 規格模板

## API 資訊

| 欄位 | 內容 |
|------|------|
| API 名稱 | |
| 版本 | v1 |
| Base URL | /api/v1 |
| 認證方式 | Bearer Token / API Key / None |

## 概述

[說明這組 API 的用途]

---

## 端點列表

| Method | Path | 說明 | 權限 |
|--------|------|------|------|
| GET | /resources | 取得列表 | public |
| GET | /resources/:id | 取得單一資源 | public |
| POST | /resources | 建立資源 | auth |
| PUT | /resources/:id | 更新資源 | auth |
| DELETE | /resources/:id | 刪除資源 | admin |

---

## 端點詳細規格

### GET /resources

**說明**：取得資源列表

**Query Parameters**

| 參數 | 類型 | 必填 | 預設值 | 說明 |
|------|------|------|--------|------|
| page | number | 否 | 1 | 頁碼 |
| limit | number | 否 | 20 | 每頁筆數 |
| sort | string | 否 | -createdAt | 排序欄位 |
| filter | string | 否 | | 篩選條件 |

**Response 200**

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "createdAt": "2026-01-23T00:00:00Z"
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

---

### GET /resources/:id

**說明**：取得單一資源

**Path Parameters**

| 參數 | 類型 | 說明 |
|------|------|------|
| id | string | 資源 ID |

**Response 200**

```json
{
  "data": {
    "id": "uuid",
    "name": "string",
    "description": "string",
    "createdAt": "2026-01-23T00:00:00Z",
    "updatedAt": "2026-01-23T00:00:00Z"
  }
}
```

**Response 404**

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

---

### POST /resources

**說明**：建立新資源

**Request Body**

```json
{
  "name": "string (required)",
  "description": "string (optional)"
}
```

**Response 201**

```json
{
  "data": {
    "id": "uuid",
    "name": "string",
    "createdAt": "2026-01-23T00:00:00Z"
  }
}
```

**Response 400**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "name", "message": "Name is required" }
    ]
  }
}
```

---

## 錯誤碼

| Status | Code | 說明 |
|--------|------|------|
| 400 | VALIDATION_ERROR | 輸入驗證失敗 |
| 401 | UNAUTHORIZED | 未認證 |
| 403 | FORBIDDEN | 無權限 |
| 404 | NOT_FOUND | 資源不存在 |
| 409 | CONFLICT | 資源衝突 |
| 500 | INTERNAL_ERROR | 伺服器錯誤 |

---

## 資料模型

```typescript
interface Resource {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 備註

[其他補充說明]

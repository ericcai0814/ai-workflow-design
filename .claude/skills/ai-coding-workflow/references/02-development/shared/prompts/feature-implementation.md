---
title: "Prompt: 功能實作"
id: "prompt-feature-implementation"
category: "development"
subcategory: "shared"
ai_usage:
  - "實作新功能"
  - "全端功能開發"
version: "1.0.0"
last_updated: "2026-01-23"
---

# Prompt: 功能實作

## 任務目標

根據規格完整實作一個功能，包含前後端。

## 使用時機

- 有完整的功能規格時
- 需要全端實作時

## Prompt 範本

```prompt
你是一位全端工程師。請根據以下規格實作功能。

## 功能規格
${FEATURE_SPEC}

## 技術棧
- 前端：${FRONTEND_STACK}
- 後端：${BACKEND_STACK}
- 資料庫：${DATABASE}

## 請實作

### 1. 實作計畫

| 步驟 | 任務 | 類型 |
|------|------|------|
| 1 | 建立資料模型 | 後端 |
| 2 | 實作 API | 後端 |
| 3 | 建立 UI 元件 | 前端 |
| 4 | 整合 API | 前端 |
| 5 | 測試 | 全端 |

### 2. 後端實作

#### 資料模型
\`\`\`typescript
// 資料模型定義
\`\`\`

#### API 端點
\`\`\`typescript
// API 實作
\`\`\`

### 3. 前端實作

#### 元件
\`\`\`tsx
// UI 元件
\`\`\`

#### API 整合
\`\`\`typescript
// API 呼叫
\`\`\`

### 4. 測試

#### 後端測試
\`\`\`typescript
// API 測試
\`\`\`

#### 前端測試
\`\`\`typescript
// 元件測試
\`\`\`

### 5. 驗證檢查

- [ ] 功能符合規格
- [ ] API 正常運作
- [ ] UI 正確顯示
- [ ] 測試通過
```

## 執行後驗證

- [ ] 所有步驟完成
- [ ] 前後端整合正常
- [ ] 測試覆蓋主要功能

## 下一步

提交 Code Review

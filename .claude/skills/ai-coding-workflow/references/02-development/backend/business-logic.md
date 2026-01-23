---
title: "商業邏輯實作"
id: "business-logic"
category: "development"
subcategory: "backend"
ai_usage:
  - "實作商業邏輯"
  - "設計 Service 層"
  - "處理複雜業務規則"
version: "1.0.0"
last_updated: "2026-01-23"
---

# 商業邏輯實作

## 概述

商業邏輯是應用的核心價值所在。本文件提供組織和實作商業邏輯的原則和 Prompt。

## 架構分層

```
┌─────────────────┐
│   Controller    │  ← 處理 HTTP 請求/回應
├─────────────────┤
│    Service      │  ← 商業邏輯
├─────────────────┤
│   Repository    │  ← 資料存取
├─────────────────┤
│    Database     │
└─────────────────┘
```

### 各層職責

| 層級 | 職責 | 不應該做 |
|------|------|----------|
| Controller | 參數驗證、呼叫 Service、格式化回應 | 包含商業邏輯 |
| Service | 商業邏輯、協調多個 Repository | 直接存取資料庫 |
| Repository | 資料存取、查詢封裝 | 包含商業邏輯 |

---

## Prompts

### Prompt 1：Service 設計

```
你是一位後端架構師。請為以下功能設計 Service 層。

## 功能描述
${FEATURE_DESCRIPTION}

## 相關實體
${ENTITIES}

## 商業規則
${BUSINESS_RULES}

## 請設計

### 1. Service 介面

\`\`\`typescript
// services/${FEATURE_NAME}.service.ts

interface ${FeatureName}Service {
  // 列出所有方法
  create(data: CreateDto): Promise<Entity>;
  findById(id: string): Promise<Entity | null>;
  update(id: string, data: UpdateDto): Promise<Entity>;
  delete(id: string): Promise<void>;
}
\`\`\`

### 2. 方法規格

#### create(data)

**輸入**：CreateDto
**輸出**：Entity
**商業規則**：
- 規則 1
- 規則 2

**錯誤情況**：
- 條件 → 錯誤碼

### 3. 依賴關係

| Service | 依賴 |
|---------|------|
| ${FeatureName}Service | UserRepository, EmailService |
```

### Prompt 2：Service 實作

```
你是一位後端工程師。請實作以下 Service。

## Service 規格
${SERVICE_SPEC}

## 技術棧
- 語言：${LANGUAGE}
- ORM：${ORM}
- 依賴注入：${DI_FRAMEWORK}

## 請實作

### Service 程式碼

\`\`\`typescript
// services/${FEATURE_NAME}.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class ${FeatureName}Service {
  constructor(
    private readonly repository: ${FeatureName}Repository,
    private readonly emailService: EmailService,
  ) {}

  async create(data: CreateDto): Promise<Entity> {
    // 1. 驗證商業規則
    await this.validateBusinessRules(data);

    // 2. 建立實體
    const entity = await this.repository.create(data);

    // 3. 觸發後續動作
    await this.emailService.sendWelcome(entity);

    return entity;
  }

  private async validateBusinessRules(data: CreateDto): Promise<void> {
    // 商業規則驗證
  }
}
\`\`\`

### 單元測試

\`\`\`typescript
// services/${FEATURE_NAME}.service.spec.ts

describe('${FeatureName}Service', () => {
  // 測試案例
});
\`\`\`
```

### Prompt 3：複雜業務流程

```
你是一位後端工程師。請實作以下複雜業務流程。

## 流程描述
${FLOW_DESCRIPTION}

## 步驟
${FLOW_STEPS}

## 錯誤處理
${ERROR_HANDLING}

## 請實作

### 1. 流程圖

\`\`\`mermaid
flowchart TD
    A[開始] --> B{檢查條件}
    B -->|是| C[執行動作]
    B -->|否| D[錯誤處理]
    C --> E[結束]
\`\`\`

### 2. 實作程式碼

\`\`\`typescript
async function executeFlow(input: FlowInput): Promise<FlowResult> {
  // 使用 Transaction 確保原子性
  return await prisma.$transaction(async (tx) => {
    // 步驟 1
    const step1Result = await step1(tx, input);

    // 步驟 2（依賴步驟 1）
    const step2Result = await step2(tx, step1Result);

    // 步驟 3
    const finalResult = await step3(tx, step2Result);

    return finalResult;
  });
}
\`\`\`

### 3. 錯誤恢復

\`\`\`typescript
// 補償邏輯（如需要）
async function compensate(failedStep: number, context: Context) {
  // ...
}
\`\`\`
```

---

## 最佳實踐

### 1. 保持 Service 純粹

```typescript
// ❌ Service 直接處理 HTTP
class UserService {
  async createUser(req: Request, res: Response) { ... }
}

// ✅ Service 只處理商業邏輯
class UserService {
  async createUser(data: CreateUserDto): Promise<User> { ... }
}
```

### 2. 使用 DTO

```typescript
// ❌ 直接使用 any 或 request body
async createUser(data: any) { ... }

// ✅ 使用明確的 DTO
interface CreateUserDto {
  email: string;
  name: string;
}
async createUser(data: CreateUserDto): Promise<User> { ... }
```

### 3. 錯誤處理

```typescript
// 定義業務錯誤
class BusinessError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

// 使用
throw new BusinessError('USER_EXISTS', 'User already exists');
```

### 4. Transaction

```typescript
// 多個操作需要原子性時使用 Transaction
async function transfer(from: string, to: string, amount: number) {
  await prisma.$transaction(async (tx) => {
    await tx.account.update({ where: { id: from }, data: { balance: { decrement: amount } } });
    await tx.account.update({ where: { id: to }, data: { balance: { increment: amount } } });
  });
}
```

---

## 檢查清單

- [ ] Service 不直接處理 HTTP
- [ ] 使用明確的 DTO
- [ ] 商業規則集中在 Service
- [ ] 適當使用 Transaction
- [ ] 有完整的錯誤處理
- [ ] 有單元測試

---

## 相關文件

- [API 設計](./api-design.md)
- [資料庫設計](./database.md)
- [測試策略](../shared/testing.md)

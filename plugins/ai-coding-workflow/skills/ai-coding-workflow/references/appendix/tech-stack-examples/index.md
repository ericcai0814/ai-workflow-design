---
title: "技術棧範例索引"
id: "tech-stack-examples-index"
category: "appendix"
ai_usage:
  - "查詢技術棧範例"
  - "參考實作模式"
version: "1.0.0"
last_updated: "2026-01-27"
---

# 技術棧範例索引

## 概述

本目錄提供不同技術棧的實作範例，幫助快速適配 Prompt 到特定技術棧。

## 前端技術棧

### React + TypeScript + Tailwind

**適用場景**：現代 React 專案

**核心設定**：
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "tailwindcss": "^3.x",
    "class-variance-authority": "^0.7.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/react": "^18.x",
    "vitest": "^1.x",
    "@testing-library/react": "^14.x"
  }
}
```

**元件範例**：
```tsx
// components/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        outline: 'border border-gray-300 hover:bg-gray-50',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props} />
  );
}
```

---

### Vue 3 + TypeScript + Tailwind

**適用場景**：現代 Vue 3 專案

**核心設定**：
```json
{
  "dependencies": {
    "vue": "^3.4.x",
    "tailwindcss": "^3.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "vue-tsc": "^1.x",
    "vitest": "^1.x",
    "@vue/test-utils": "^2.x"
  }
}
```

**元件範例**：
```vue
<!-- components/Button.vue -->
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
})

const variantClasses = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  outline: 'border border-gray-300 hover:bg-gray-50',
}

const sizeClasses = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4',
  lg: 'h-12 px-6 text-lg',
}
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      variantClasses[variant],
      sizeClasses[size],
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
```

---

## 後端技術棧

### Node.js + Express + Prisma

**適用場景**：Node.js RESTful API

**核心設定**：
```json
{
  "dependencies": {
    "express": "^4.x",
    "@prisma/client": "^5.x",
    "zod": "^3.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "prisma": "^5.x",
    "vitest": "^1.x"
  }
}
```

**API 範例**：
```typescript
// routes/users.ts
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '@/lib/db';

const router = Router();

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ data: users });
});

router.post('/', async (req, res) => {
  const result = createUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({ error: result.error.issues });
  }

  const user = await prisma.user.create({ data: result.data });
  res.status(201).json({ data: user });
});

export default router;
```

---

### Python + FastAPI + SQLAlchemy

**適用場景**：Python RESTful API

**核心設定**：
```
# requirements.txt
fastapi>=0.109.0
uvicorn>=0.27.0
sqlalchemy>=2.0.0
pydantic>=2.0.0
pytest>=8.0.0
```

**API 範例**：
```python
# routers/users.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.db.session import get_db
from app.models.user import User

router = APIRouter()

class UserCreate(BaseModel):
    name: str
    email: EmailStr

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True

@router.get("/", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.post("/", response_model=UserResponse, status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
```

---

## 變數對應表

使用 Prompt 時，請將變數替換為對應的值：

| 變數 | React 專案 | Vue 專案 | Node.js 專案 | Python 專案 |
|------|-----------|---------|-------------|-------------|
| `${FRAMEWORK}` | React | Vue 3 | Express | FastAPI |
| `${LANGUAGE}` | TypeScript | TypeScript | TypeScript | Python |
| `${CSS_SOLUTION}` | Tailwind CSS | Tailwind CSS | - | - |
| `${DATABASE}` | - | - | PostgreSQL | PostgreSQL |
| `${ORM}` | - | - | Prisma | SQLAlchemy |
| `${TEST_FRAMEWORK}` | Vitest | Vitest | Vitest | pytest |

## 相關文件

- [Prompt 速查表](../prompt-cheatsheet.md)
- [術語表](../glossary.md)

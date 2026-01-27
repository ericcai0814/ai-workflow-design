---
title: "前後端整合"
id: "frontend-backend-integration"
category: "development"
subcategory: "shared"
ai_usage:
  - "前後端整合"
  - "API 串接"
  - "資料流設計"
version: "1.0.0"
last_updated: "2026-01-27"
---

# 前後端整合

## 概述

本文件說明前後端整合的最佳實踐，包含 API 串接、資料流設計、錯誤處理。

## 整合架構

```
┌─────────────────┐     HTTP/WS     ┌─────────────────┐
│                 │ ◄─────────────► │                 │
│    Frontend     │                 │     Backend     │
│  (React/Vue)    │    JSON/REST    │   (Node/Go)     │
│                 │ ◄─────────────► │                 │
└─────────────────┘                 └─────────────────┘
        │                                   │
        ▼                                   ▼
   State Store                          Database
   (Zustand/Pinia)                    (PostgreSQL)
```

## API 串接模式

### 1. REST API 串接

#### 基本設定

```typescript
// lib/api.ts
const API_BASE = import.meta.env.VITE_API_URL || '/api';

interface ApiOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function api<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${API_BASE}${endpoint}`;
  if (params) {
    url += '?' + new URLSearchParams(params).toString();
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.json());
  }

  return response.json();
}
```

#### 使用範例

```typescript
// services/users.ts
import { api } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
}

export const usersApi = {
  list: () => api<User[]>('/users'),

  get: (id: number) => api<User>(`/users/${id}`),

  create: (data: Omit<User, 'id'>) =>
    api<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<User>) =>
    api<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    api<void>(`/users/${id}`, { method: 'DELETE' }),
};
```

### 2. 使用 TanStack Query

```typescript
// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/services/users';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: usersApi.list,
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => usersApi.get(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
```

### 3. GraphQL 串接

```typescript
// lib/graphql.ts
import { GraphQLClient } from 'graphql-request';

export const graphqlClient = new GraphQLClient(
  import.meta.env.VITE_GRAPHQL_URL,
  {
    headers: () => ({
      authorization: `Bearer ${getToken()}`,
    }),
  }
);

// queries/users.ts
import { gql } from 'graphql-request';

export const GET_USERS = gql`
  query GetUsers($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      id
      name
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;
```

## 資料流設計

### 單向資料流

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  User Action → API Call → Update Store → Re-render   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### 狀態分層

| 層級 | 範例 | 儲存位置 |
|------|------|----------|
| 伺服器狀態 | 使用者資料、文章列表 | TanStack Query |
| 全域 UI 狀態 | 主題、側邊欄開關 | Zustand Store |
| 區域 UI 狀態 | Modal 開關、表單值 | React useState |
| URL 狀態 | 分頁、篩選條件 | URL Search Params |

### 範例實作

```typescript
// stores/uiStore.ts
import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: 'light',
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
}));
```

## 錯誤處理

### API 錯誤類別

```typescript
// lib/errors.ts
export class ApiError extends Error {
  constructor(
    public status: number,
    public data: { message: string; code?: string }
  ) {
    super(data.message);
    this.name = 'ApiError';
  }

  get isNotFound() {
    return this.status === 404;
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isValidationError() {
    return this.status === 422;
  }
}
```

### 全域錯誤處理

```typescript
// providers/QueryProvider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status < 500) {
          return false; // 不重試 4xx 錯誤
        }
        return failureCount < 3;
      },
    },
    mutations: {
      onError: (error) => {
        if (error instanceof ApiError) {
          toast.error(error.data.message);
        } else {
          toast.error('發生未知錯誤');
        }
      },
    },
  },
});
```

### 元件層級錯誤處理

```tsx
// components/UserList.tsx
function UserList() {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) {
    if (error instanceof ApiError && error.isNotFound) {
      return <EmptyState message="找不到使用者" />;
    }
    return <ErrorState error={error} />;
  }

  return (
    <ul>
      {data?.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}
```

## 認證整合

### Token 管理

```typescript
// lib/auth.ts
const TOKEN_KEY = 'auth_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// 在 API client 中使用
export async function api<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const token = getToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  // 處理 401
  if (response.status === 401) {
    removeToken();
    window.location.href = '/login';
  }

  // ...
}
```

## 環境設定

### 前端環境變數

```bash
# .env.local
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001

# .env.production
VITE_API_URL=https://api.example.com
VITE_WS_URL=wss://api.example.com
```

### CORS 設定（後端）

```typescript
// Node.js (Express)
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Go (Fiber)
app.Use(cors.New(cors.Config{
  AllowOrigins: os.Getenv("FRONTEND_URL"),
  AllowCredentials: true,
}))
```

## 整合測試

```typescript
// integration/users.test.ts
import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { UserList } from '@/components/UserList';
import { TestProviders } from '@/test-utils';

const server = setupServer(
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('displays users from API', async () => {
  render(<UserList />, { wrapper: TestProviders });

  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });
});

test('handles API error', async () => {
  server.use(
    http.get('/api/users', () => {
      return HttpResponse.json(
        { message: 'Server error' },
        { status: 500 }
      );
    })
  );

  render(<UserList />, { wrapper: TestProviders });

  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

## 相關文件

- [API 設計](../backend/api-design.md)
- [狀態管理](../frontend/state-management.md)
- [三層驗證框架](./validation-framework.md)

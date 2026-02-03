---
title: "Prompt: 設定狀態管理"
id: "prompt-setup-state-management"
category: "development"
subcategory: "frontend"
ai_usage:
  - "設定全域狀態"
  - "設計狀態架構"
version: "1.0.0"
last_updated: "2026-01-23"
---

# Prompt: 設定狀態管理

## 任務目標

設計並實作應用程式的狀態管理架構。

## 使用時機

- 需要跨元件共享狀態時
- 狀態邏輯複雜需要統一管理時

---

## 變數說明

執行此 prompt 前，請先取得以下值：

| 變數                    | 來源           | 說明                   | 範例                                |
| ----------------------- | -------------- | ---------------------- | ----------------------------------- |
| `${STATE_REQUIREMENTS}` | 用戶描述       | 需要管理的狀態需求說明 | `用戶登入狀態、購物車、主題切換`    |
| `${FRAMEWORK}`          | detect-context | 前端框架               | `React`, `Vue`, `Angular`           |
| `${STATE_MANAGER}`      | detect-context | 狀態管理方案           | `Zustand`, `Redux`, `Pinia`, `Vuex` |

**執行時，將所有 `${...}` 替換為實際值。如果 detect-context 無法偵測，請詢問用戶。**

---

## Prompt 範本

```prompt
你是一位前端架構師。請根據以下需求設計狀態管理方案。

## 狀態需求
${STATE_REQUIREMENTS}

## 技術棧
- 框架：${FRAMEWORK}
- 狀態管理：${STATE_MANAGER}

## 請設計

### 1. 狀態分析

| 狀態 | 類型 | 範圍 | 持久化 |
|------|------|------|--------|
| user | object | 全域 | localStorage |
| theme | string | 全域 | localStorage |
| cart | array | 全域 | sessionStorage |
| formData | object | 區域 | 無 |

### 2. Store 設計

\`\`\`typescript
// stores/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),

      logout: () => set({ user: null }),

      fetchUser: async () => {
        set({ isLoading: true, error: null });
        try {
          const user = await api.getUser();
          set({ user, isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },
    }),
    {
      name: 'user-storage',
    }
  )
);
\`\`\`

### 3. 使用範例

\`\`\`tsx
// components/UserProfile.tsx
function UserProfile() {
  const { user, logout, isLoading } = useUserStore();

  if (isLoading) return <Loading />;
  if (!user) return <LoginPrompt />;

  return (
    <div>
      <p>Hello, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
\`\`\`

### 4. 目錄結構

\`\`\`
src/
└── stores/
    ├── index.ts       # 統一導出
    ├── userStore.ts   # 用戶狀態
    ├── themeStore.ts  # 主題狀態
    └── cartStore.ts   # 購物車狀態
\`\`\`
```

## 執行後驗證

- [ ] 狀態分類清晰（全域 vs 區域）
- [ ] 持久化設定正確
- [ ] 有使用範例

## 下一步

在元件中整合狀態管理

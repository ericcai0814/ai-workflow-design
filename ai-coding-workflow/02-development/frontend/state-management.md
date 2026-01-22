---
title: "狀態管理"
id: "state-management"
category: "development"
subcategory: "frontend"
ai_usage:
  - "設計狀態架構"
  - "選擇狀態管理方案"
  - "實作狀態邏輯"
version: "1.0.0"
last_updated: "2026-01-23"
---

# 狀態管理

## 概述

狀態管理是前端應用的核心議題。本文件提供狀態分類、方案選擇和與 AI 協作的 Prompt。

## 狀態分類

| 類型 | 範圍 | 範例 | 建議方案 |
|------|------|------|----------|
| UI 狀態 | 元件內 | 開關、hover | useState |
| 表單狀態 | 表單範圍 | 輸入值、驗證 | React Hook Form |
| 應用狀態 | 跨元件 | 用戶、主題 | Context / Zustand |
| 伺服器狀態 | 遠端資料 | API 資料 | TanStack Query |
| URL 狀態 | 路由 | 篩選、分頁 | URL params |

## 方案選擇

### 決策樹

```
需要管理什麼狀態？
│
├─ UI 狀態（單一元件）
│   └─ useState / useReducer
│
├─ 表單狀態
│   └─ React Hook Form / Formik
│
├─ 跨元件共享
│   ├─ 簡單、少量 → Context
│   └─ 複雜、大量 → Zustand / Jotai
│
├─ 伺服器資料
│   └─ TanStack Query / SWR
│
└─ URL 狀態
    └─ nuqs / 框架內建
```

---

## Prompts

### Prompt 1：狀態架構設計

```
你是一位前端架構師。請為以下功能設計狀態架構。

## 功能描述
${FEATURE_DESCRIPTION}

## 技術棧
- 框架：${FRAMEWORK}
- 現有狀態方案：${CURRENT_STATE_SOLUTION}

## 請設計

### 1. 狀態識別

| 狀態 | 類型 | 範圍 | 來源 |
|------|------|------|------|
| | UI/Form/App/Server | 元件/頁面/全域 | 本地/API |

### 2. 狀態結構

\`\`\`typescript
interface FeatureState {
  // ...
}
\`\`\`

### 3. 方案建議

| 狀態 | 建議方案 | 原因 |
|------|----------|------|
| | | |

### 4. 資料流

描述狀態如何流動：
\`\`\`
用戶操作 → 狀態更新 → UI 重新渲染
\`\`\`

### 5. 實作範例

\`\`\`tsx
// 狀態定義和使用
\`\`\`
```

### Prompt 2：Zustand Store 實作

```
你是一位前端工程師。請使用 Zustand 實作以下狀態管理。

## 需求
${REQUIREMENTS}

## 狀態結構
${STATE_STRUCTURE}

## 請實作

### 1. Store 定義

\`\`\`typescript
// stores/${STORE_NAME}.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ${STORE_NAME}State {
  // 狀態
}

interface ${STORE_NAME}Actions {
  // 動作
}

export const use${STORE_NAME}Store = create<${STORE_NAME}State & ${STORE_NAME}Actions>()(
  devtools(
    persist(
      (set, get) => ({
        // 實作
      }),
      { name: '${STORE_NAME}' }
    )
  )
);
\`\`\`

### 2. Selector Hooks

\`\`\`typescript
// 選擇性訂閱，避免不必要的 re-render
export const useXxx = () => use${STORE_NAME}Store((state) => state.xxx);
\`\`\`

### 3. 使用範例

\`\`\`tsx
function Component() {
  const xxx = useXxx();
  const { action } = use${STORE_NAME}Store();
  // ...
}
\`\`\`
```

### Prompt 3：TanStack Query 實作

```
你是一位前端工程師。請使用 TanStack Query 實作以下資料獲取。

## API 端點
${API_ENDPOINTS}

## 資料結構
${DATA_STRUCTURE}

## 請實作

### 1. Query 定義

\`\`\`typescript
// queries/${QUERY_NAME}.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query Keys
export const ${QUERY_NAME}Keys = {
  all: ['${QUERY_NAME}'] as const,
  lists: () => [...${QUERY_NAME}Keys.all, 'list'] as const,
  list: (filters: Filters) => [...${QUERY_NAME}Keys.lists(), filters] as const,
  details: () => [...${QUERY_NAME}Keys.all, 'detail'] as const,
  detail: (id: string) => [...${QUERY_NAME}Keys.details(), id] as const,
};

// Query Hook
export function use${QUERY_NAME}(id: string) {
  return useQuery({
    queryKey: ${QUERY_NAME}Keys.detail(id),
    queryFn: () => fetch${QUERY_NAME}(id),
  });
}

// Mutation Hook
export function useCreate${QUERY_NAME}() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create${QUERY_NAME},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ${QUERY_NAME}Keys.lists() });
    },
  });
}
\`\`\`

### 2. 使用範例

\`\`\`tsx
function Component() {
  const { data, isLoading, error } = use${QUERY_NAME}(id);
  const createMutation = useCreate${QUERY_NAME}();
  // ...
}
\`\`\`
```

---

## 最佳實踐

### 1. 狀態最小化

```tsx
// ❌ 儲存衍生狀態
const [items, setItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);
const [count, setCount] = useState(0);

// ✅ 只儲存原始狀態，衍生計算
const [items, setItems] = useState([]);
const [filter, setFilter] = useState('');
const filteredItems = useMemo(() => items.filter(...), [items, filter]);
const count = filteredItems.length;
```

### 2. 狀態提升適度

```tsx
// ❌ 所有狀態都放全域
const globalStore = {
  modalOpen: false,  // 應該是元件狀態
  formData: {},      // 應該是表單狀態
  user: {},          // 適合全域
};

// ✅ 狀態放在適當的層級
function Modal() {
  const [open, setOpen] = useState(false);  // 元件狀態
}
```

### 3. 伺服器狀態分離

```tsx
// ❌ 手動管理 loading、error、refetch
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// ✅ 使用 TanStack Query
const { data, isLoading, error, refetch } = useQuery({...});
```

---

## 檢查清單

- [ ] 狀態分類正確（UI/表單/應用/伺服器）
- [ ] 狀態放在適當的層級
- [ ] 避免儲存衍生狀態
- [ ] 伺服器狀態使用 TanStack Query 或類似方案
- [ ] 使用 selector 避免不必要的 re-render

---

## 相關文件

- [元件開發](./component-development.md)
- [API 設計](../backend/api-design.md)

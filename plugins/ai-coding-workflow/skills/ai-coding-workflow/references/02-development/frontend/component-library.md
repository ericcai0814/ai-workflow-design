---
title: "元件庫規範"
id: "component-library"
category: "development"
subcategory: "frontend"
ai_usage:
  - "了解元件庫結構"
  - "定義元件設計規範"
  - "建立基礎元件"
version: "1.0.0"
last_updated: "2026-01-23"
---

# 元件庫規範

## 元件分類

```
┌─────────────────────────────────────────────────────────────┐
│                        元件層級                              │
├─────────────────────────────────────────────────────────────┤
│  基礎元件 (Primitives)                                       │
│  Button, Input, Badge, Avatar, Icon                         │
├─────────────────────────────────────────────────────────────┤
│  複合元件 (Composites)                                       │
│  Form, Card, Modal, Dropdown, Table                         │
├─────────────────────────────────────────────────────────────┤
│  佈局元件 (Layout)                                           │
│  Container, Grid, Stack, Divider                            │
├─────────────────────────────────────────────────────────────┤
│  頁面模板 (Templates)                                        │
│  Header, Footer, Sidebar, PageLayout                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 基礎元件規範

### Button 按鈕

#### 變體 (Variants)

| 變體 | 用途 | 樣式 |
|------|------|------|
| `primary` | 主要動作 | 實心主色背景 |
| `secondary` | 次要動作 | 實心次色背景 |
| `outline` | 輪廓按鈕 | 邊框無填充 |
| `ghost` | 幽靈按鈕 | 無邊框無填充 |
| `link` | 連結樣式 | 僅文字底線 |
| `destructive` | 危險動作 | 紅色警示 |

#### 大小 (Sizes)

| 大小 | 高度 | padding | 字體大小 |
|------|------|---------|----------|
| `sm` | 32px | `py-1.5 px-3` | `text-sm` |
| `md` | 40px | `py-2 px-4` | `text-base` |
| `lg` | 48px | `py-2.5 px-6` | `text-lg` |

#### 狀態 (States)

| 狀態 | 說明 |
|------|------|
| `default` | 預設狀態 |
| `hover` | 滑鼠懸停 |
| `active` | 點擊中 |
| `focus` | 鍵盤聚焦 |
| `disabled` | 禁用 |
| `loading` | 載入中 |

#### Props 定義

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}
```

---

### Input 輸入框

#### 類型 (Types)

| 類型 | 用途 |
|------|------|
| `text` | 單行文字 |
| `textarea` | 多行文字 |
| `select` | 下拉選擇 |
| `password` | 密碼 |
| `email` | 電子郵件 |
| `number` | 數字 |

#### 狀態 (States)

| 狀態 | 邊框色 | 說明 |
|------|--------|------|
| `default` | `--color-border-default` | 預設 |
| `focus` | `--color-border-focus` | 聚焦，帶 ring |
| `error` | `--color-error` | 錯誤，顯示提示 |
| `disabled` | `--color-border-default` | 禁用，背景灰 |

#### Props 定義

```typescript
interface InputProps {
  type?: 'text' | 'textarea' | 'password' | 'email' | 'number';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}
```

---

### Badge 徽章

#### 變體 (Variants)

| 變體 | 用途 | 背景色 |
|------|------|--------|
| `default` | 一般標籤 | `--color-bg-tertiary` |
| `primary` | 主要標籤 | `--color-primary-lighter` |
| `success` | 成功狀態 | `--color-success` lighter |
| `warning` | 警告狀態 | `--color-warning` lighter |
| `error` | 錯誤狀態 | `--color-error` lighter |

#### Props 定義

```typescript
interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  children: ReactNode;
}
```

---

### Card 卡片

#### 變體 (Variants)

| 變體 | 樣式 |
|------|------|
| `default` | 背景色 + 圓角 |
| `outlined` | 邊框 + 背景色 |
| `elevated` | 背景色 + 陰影 |

#### 結構

```
┌─────────────────────────────┐
│  CardHeader (optional)      │
├─────────────────────────────┤
│  CardContent                │
│                             │
├─────────────────────────────┤
│  CardFooter (optional)      │
└─────────────────────────────┘
```

#### Props 定義

```typescript
interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}
```

---

### Typography 排版

#### 標題類別

| 類別 | HTML | 字體大小 | 字重 |
|------|------|----------|------|
| `.heading-1` | h1 | `--font-size-6xl` | `bold` |
| `.heading-2` | h2 | `--font-size-5xl` | `bold` |
| `.heading-3` | h3 | `--font-size-4xl` | `semibold` |
| `.heading-4` | h4 | `--font-size-3xl` | `semibold` |
| `.heading-5` | h5 | `--font-size-2xl` | `semibold` |
| `.heading-6` | h6 | `--font-size-xl` | `semibold` |

#### 內文類別

| 類別 | 字體大小 | 用途 |
|------|----------|------|
| `.body-lg` | `--font-size-lg` | 大段落 |
| `.body-md` | `--font-size-base` | 一般段落 |
| `.body-sm` | `--font-size-sm` | 輔助文字 |

#### 工具類別

| 類別 | 效果 |
|------|------|
| `.text-muted` | 淡化文字色 |
| `.text-link` | 連結樣式 |
| `.text-truncate` | 截斷省略 |

---

## 複合元件規範

### Form 表單

#### 結構

```
Form
├── FormField
│   ├── Label
│   ├── Input / Select / Textarea
│   └── ErrorMessage (optional)
├── FormField
│   └── ...
└── FormActions
    ├── Button (submit)
    └── Button (cancel)
```

### Modal 對話框

#### 結構

```
Modal
├── ModalOverlay (backdrop)
└── ModalContent
    ├── ModalHeader
    │   ├── Title
    │   └── CloseButton
    ├── ModalBody
    └── ModalFooter
```

#### 大小

| 大小 | 最大寬度 |
|------|----------|
| `sm` | 400px |
| `md` | 500px |
| `lg` | 700px |
| `xl` | 900px |
| `full` | 100% |

---

## 佈局元件規範

### Container 容器

```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
  max-width: 1280px;
}
```

### Grid 網格

```css
.grid {
  display: grid;
  gap: var(--spacing-4);
}

.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
```

### Stack 堆疊

```css
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.stack-horizontal {
  flex-direction: row;
}
```

---

## 元件開發原則

### 1. 單一職責

每個元件只做一件事。

```typescript
// ❌ 不好：元件做太多事
<UserCard showEdit showDelete showShare />

// ✅ 好：使用組合
<Card>
  <UserInfo />
  <CardActions>
    <EditButton />
    <DeleteButton />
  </CardActions>
</Card>
```

### 2. 組合優於繼承

使用 children 和 slots 實現靈活組合。

```typescript
// ❌ 不好：用 props 控制所有內容
<Card title="標題" content="內容" footer="頁腳" />

// ✅ 好：使用組合
<Card>
  <CardHeader>標題</CardHeader>
  <CardContent>內容</CardContent>
  <CardFooter>頁腳</CardFooter>
</Card>
```

### 3. 提供預設值

所有可選 props 都應有合理預設值。

```typescript
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props
}) {
  // ...
}
```

---

## 相關文件

- [設計系統建置流程](./design-system.md)
- [Design Token 系統](./token-system.md)
- [設計系統文件指南](./documentation-guide.md)
- [元件開發流程](./component-development.md)

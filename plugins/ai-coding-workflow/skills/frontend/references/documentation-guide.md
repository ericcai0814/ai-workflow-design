---
title: "設計系統文件指南"
id: "documentation-guide"
category: "development"
subcategory: "frontend"
ai_usage:
  - "撰寫設計系統文件"
  - "建立元件使用指南"
  - "設置 Storybook"
version: "1.0.0"
last_updated: "2026-01-23"
---

# 設計系統文件指南

## 為什麼需要文件？

設計系統文件是團隊溝通的橋樑，也是 AI Agent 的上下文來源。

### 文件的價值

1. **團隊協作**：新成員可快速上手
2. **一致性**：減少「這個按鈕該怎麼用」的問題
3. **AI 友好**：AI 可參考文件生成符合規範的程式碼
4. **維護性**：設計決策有據可查

---

## 文件結構

### 設計系統文件總覽

```
docs/design-system/
├── README.md              # 概覽和快速開始
├── principles.md          # 設計原則
├── tokens/
│   ├── colors.md          # 色彩系統
│   ├── typography.md      # 字體排版
│   ├── spacing.md         # 間距系統
│   └── shadows.md         # 陰影和圓角
├── components/
│   ├── button.md          # 按鈕
│   ├── input.md           # 輸入框
│   ├── card.md            # 卡片
│   └── ...
└── patterns/
    ├── forms.md           # 表單模式
    ├── navigation.md      # 導航模式
    └── feedback.md        # 回饋模式
```

---

## 元件文件格式

每個元件的文件應包含以下區塊：

### 1. 概述 (Overview)

```markdown
# Button 按鈕

按鈕用於觸發動作或事件，如提交表單、開啟對話框等。

## 何時使用

- 執行主要動作
- 提交表單
- 觸發工作流程

## 何時不使用

- 純導航連結（使用 Link）
- 非互動元素
```

### 2. 範例 (Examples)

```markdown
## 基本用法

\`\`\`jsx
<Button>Click me</Button>
\`\`\`

## 變體

\`\`\`jsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
\`\`\`

## 大小

\`\`\`jsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
\`\`\`
```

### 3. API 參考 (API Reference)

```markdown
## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | 按鈕樣式變體 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 按鈕大小 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `loading` | `boolean` | `false` | 是否顯示載入狀態 |
| `leftIcon` | `ReactNode` | - | 左側圖示 |
| `rightIcon` | `ReactNode` | - | 右側圖示 |
```

### 4. 最佳實踐 (Best Practices)

```markdown
## Do's ✅

- 使用動詞作為按鈕文字（如「提交」「確認」）
- 主要動作使用 primary 變體
- 保持按鈕文字簡潔

## Don'ts ❌

- 不要在一個視圖中放置多個 primary 按鈕
- 不要使用全大寫文字
- 不要讓按鈕文字超過 3 個詞
```

### 5. 無障礙 (Accessibility)

```markdown
## 無障礙考量

- 確保有足夠的色彩對比度
- 使用有意義的 aria-label
- 支援鍵盤操作（Enter、Space）
- 禁用狀態要有視覺和語意提示
```

---

## Storybook 整合

### 安裝 Storybook

```bash
npx storybook@latest init
```

### Story 檔案範例

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};
```

### 目錄結構

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── ...
└── ...
```

---

## AI Agent 友好的文件

### 1. 提供明確的程式碼範例

```markdown
## 使用範例

### 基本按鈕

\`\`\`tsx
import { Button } from '@/components/Button';

function Example() {
  return <Button variant="primary">確認</Button>;
}
\`\`\`

### 帶圖示的按鈕

\`\`\`tsx
import { Button } from '@/components/Button';
import { PlusIcon } from '@/icons';

function Example() {
  return (
    <Button variant="primary" leftIcon={<PlusIcon />}>
      新增項目
    </Button>
  );
}
\`\`\`
```

### 2. 包含 CSS 類別對照

```markdown
## CSS 類別

| 用途 | Tailwind 類別 | CSS Variable |
|------|---------------|--------------|
| 主要按鈕 | `btn btn-primary` | - |
| 主要按鈕背景 | `bg-primary` | `var(--color-primary)` |
| 主要按鈕文字 | `text-white` | `var(--color-text-inverse)` |
| 按鈕圓角 | `rounded-lg` | `var(--radius-lg)` |
```

### 3. 列出常見組合

```markdown
## 常見組合

### 表單提交

\`\`\`tsx
<div className="flex gap-4">
  <Button variant="outline" onClick={onCancel}>取消</Button>
  <Button variant="primary" type="submit">確認</Button>
</div>
\`\`\`

### 危險操作確認

\`\`\`tsx
<div className="flex gap-4">
  <Button variant="ghost" onClick={onCancel}>取消</Button>
  <Button variant="destructive" onClick={onDelete}>刪除</Button>
</div>
\`\`\`
```

---

## 維護指南

### 文件更新時機

- ✅ 新增元件時
- ✅ 修改 Props API 時
- ✅ 發現使用方式錯誤時
- ✅ 收到團隊反饋時

### 版本控制

```markdown
---
last_updated: 2026-01-23
version: 1.2.0
changelog:
  - "1.2.0: 新增 loading 狀態"
  - "1.1.0: 新增 ghost 變體"
  - "1.0.0: 初始版本"
---
```

---

## 相關文件

- [設計系統建置流程](./design-system.md)
- [元件庫規範](./component-library.md)
- [Design Token 系統](./token-system.md)

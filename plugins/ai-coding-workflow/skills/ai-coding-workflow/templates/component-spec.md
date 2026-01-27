# 元件規格模板

## 元件資訊

| 欄位 | 內容 |
|------|------|
| 元件名稱 | |
| 分類 | UI / Layout / Form / Navigation |
| 版本 | v1.0 |
| 狀態 | Draft / Development / Stable |

## 概述

### 用途

[說明元件的用途和使用場景]

### 設計參考

[連結到設計稿或截圖]

## Props 介面

```typescript
interface ComponentProps {
  /** 必填屬性說明 */
  requiredProp: string;

  /** 選填屬性說明 */
  optionalProp?: number;

  /** 事件處理 */
  onClick?: () => void;
}
```

| Prop | 類型 | 必填 | 預設值 | 說明 |
|------|------|------|--------|------|
| | | | | |

## 變體 (Variants)

| 變體 | 說明 | 使用場景 |
|------|------|----------|
| default | 預設樣式 | 一般使用 |
| primary | 主要樣式 | 強調動作 |
| | | |

## 狀態 (States)

- [ ] default
- [ ] hover
- [ ] focus
- [ ] active
- [ ] disabled
- [ ] loading
- [ ] error

## 使用範例

### 基本使用

```tsx
<Component prop="value" />
```

### 進階使用

```tsx
<Component
  variant="primary"
  size="lg"
  onClick={handleClick}
>
  Content
</Component>
```

## 可存取性 (A11y)

- [ ] 有適當的 role
- [ ] 有 aria-label
- [ ] 可用鍵盤操作
- [ ] focus 狀態明顯

## 測試案例

| 案例 | 預期結果 |
|------|----------|
| 渲染測試 | 正確渲染 |
| Props 測試 | Props 正確套用 |
| 互動測試 | 事件正確觸發 |

## 相關元件

- 父元件：[列出]
- 子元件：[列出]
- 相似元件：[列出]

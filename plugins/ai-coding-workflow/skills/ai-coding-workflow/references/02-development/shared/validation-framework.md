---
title: "三層驗證框架"
id: "validation-framework"
category: "development"
subcategory: "shared"
ai_usage:
  - "防止修 A 壞 B"
  - "提交前驗證"
  - "確保程式碼品質"
version: "1.0.0"
last_updated: "2026-01-27"
prerequisites:
  - "專案已有基本測試設定"
---

# 三層驗證框架

## 概述

三層驗證框架用於防止「修 A 壞 B」的問題，確保每次修改都經過完整驗證。

## 三層架構

```
┌─────────────────────────────────────────┐
│           第一層：靜態分析              │
│    TypeScript / ESLint / Prettier       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│           第二層：單元測試              │
│      Jest / Vitest / pytest             │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│           第三層：整合驗證              │
│   E2E 測試 / 手動驗證 / 視覺回歸        │
└─────────────────────────────────────────┘
```

## 第一層：靜態分析

### 目的

在程式碼執行前發現問題。

### 檢查項目

| 工具 | 檢查內容 | 執行指令 |
|------|----------|----------|
| TypeScript | 型別錯誤 | `npx tsc --noEmit` |
| ESLint | 程式碼風格、潛在問題 | `npx eslint .` |
| Prettier | 格式一致性 | `npx prettier --check .` |

### 執行時機

- 儲存檔案時（IDE 整合）
- 提交前（pre-commit hook）
- CI/CD 流程

### 常見問題

```typescript
// ❌ 型別錯誤
const user: User = { name: 'John' }; // 缺少必要欄位

// ✅ 正確
const user: User = { id: 1, name: 'John', email: 'john@example.com' };
```

## 第二層：單元測試

### 目的

驗證個別函數、元件的行為正確。

### 測試範圍

| 類型 | 測試內容 | 覆蓋率目標 |
|------|----------|------------|
| 元件測試 | Props 渲染、互動行為 | 80%+ |
| 函數測試 | 輸入輸出、邊界條件 | 90%+ |
| Hook 測試 | 狀態變化、副作用 | 80%+ |

### 測試範例

```typescript
// Button.test.tsx
describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 執行指令

```bash
# JavaScript/TypeScript
npx vitest run              # 執行所有測試
npx vitest run --coverage   # 含覆蓋率報告
npx vitest run Button       # 執行特定測試

# Python
pytest                      # 執行所有測試
pytest --cov               # 含覆蓋率報告
pytest tests/test_api.py   # 執行特定測試
```

## 第三層：整合驗證

### 目的

驗證多個元件、服務協同工作的正確性。

### 驗證類型

| 類型 | 工具 | 使用時機 |
|------|------|----------|
| E2E 測試 | Playwright / Cypress | 關鍵流程自動化 |
| API 測試 | Postman / Bruno | API 整合驗證 |
| 視覺回歸 | Chromatic / Percy | UI 變更檢測 |
| 手動驗證 | - | 複雜互動、UX 驗證 |

### E2E 測試範例

```typescript
// e2e/login.spec.ts
test('user can login successfully', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h1')).toHaveText('Welcome back');
});
```

## 驗證流程

### 開發中驗證

```
修改程式碼
    ↓
第一層：IDE 即時檢查（TypeScript、ESLint）
    ↓
第二層：執行相關單元測試
    ↓
確認修改正確
```

### 提交前驗證

```
git add .
    ↓
pre-commit hook 執行：
  1. npx lint-staged（格式化、lint）
  2. npx tsc --noEmit（型別檢查）
  3. npx vitest run --changed（變更檔案的測試）
    ↓
通過 → 允許提交
失敗 → 阻止提交，修復問題
```

### CI/CD 驗證

```
Push / PR 觸發
    ↓
第一層：靜態分析（並行）
  - TypeScript 編譯
  - ESLint 檢查
  - Prettier 檢查
    ↓
第二層：單元測試
  - 執行所有測試
  - 產生覆蓋率報告
    ↓
第三層：整合驗證
  - E2E 測試（關鍵流程）
  - 視覺回歸（如有設定）
    ↓
全部通過 → 允許合併
```

## 設定範例

### Pre-commit Hook (lint-staged)

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Type check
        run: pnpm tsc --noEmit

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test:coverage

      - name: E2E Test
        run: pnpm test:e2e
```

## 常見問題與解決

### 問題 1：測試太慢

**解決方案**：
- 使用 `vitest --changed` 只跑變更檔案的測試
- 將 E2E 測試移到 CI，本地只跑單元測試
- 使用測試並行化

### 問題 2：修 A 壞 B

**解決方案**：
- 確保相關元件都有測試
- 使用 `vitest --related` 執行相關測試
- 在 PR 中要求完整測試通過

### 問題 3：覆蓋率不足

**解決方案**：
- 設定最低覆蓋率門檻（如 80%）
- 在 CI 中檢查覆蓋率
- 優先為關鍵路徑寫測試

## 驗證清單

### 每次修改後

- [ ] TypeScript 無錯誤
- [ ] ESLint 無錯誤
- [ ] 相關單元測試通過
- [ ] 手動驗證功能正常

### 提交前

- [ ] 所有單元測試通過
- [ ] 程式碼已格式化
- [ ] 無 console.log 或偵錯程式碼

### PR 合併前

- [ ] CI 所有檢查通過
- [ ] E2E 關鍵流程通過
- [ ] Code Review 已完成

## 相關文件

- [測試策略](./testing.md)
- [前後端整合](./integration.md)
- [Bug 修復流程](./prompts/bug-fixing.md)

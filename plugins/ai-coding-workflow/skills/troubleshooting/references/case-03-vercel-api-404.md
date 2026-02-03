---
title: "Vercel API 404 踩坑案例"
id: "pitfall-vercel-api-404"
category: "appendix"
source: "ewill-web 專案 (2026-01)"
ai_usage:
  - "Astro + Vercel 部署"
  - "API Routes 開發"
  - "部署除錯"
version: "1.0.0"
last_updated: "2026-01-23"
---

# Vercel API 404 踩坑案例

## 問題描述

API 端點在本地正常運作，部署到 Vercel 後返回 404。

## 症狀

```
GET /api/events → 404 Not Found
POST /api/contact/submit → 404 Not Found
```

- 本地 `astro dev` 正常
- 部署後所有 API 都 404
- 靜態頁面正常顯示

## 根因分析

**vercel.json 的 `framework` 設定與 Astro Vercel Adapter 衝突**。

當 `vercel.json` 設定了 `framework: "astro"` 時，Vercel 會嘗試自己處理 Astro 的 build，這與 `@astrojs/vercel` adapter 的 Build Output API v3 產生衝突。

**錯誤的配置**：

```json
// vercel.json
{
  "framework": "astro",  // ❌ 會衝突
  "functions": {
    "api/**/*.ts": {     // ❌ 與 Astro API Routes 衝突
      "runtime": "nodejs18.x"
    }
  }
}
```

## 解決方案

### 方案 1：讓 Astro Adapter 完全控制（推薦）

**刪除或最小化 vercel.json**：

```json
// vercel.json（最小配置）
{
  "installCommand": "pnpm install",
  "buildCommand": "pnpm run build"
}
```

**或完全刪除 vercel.json**，讓 Vercel 自動偵測。

### 方案 2：使用 Astro API Routes

不使用 `api/` 目錄的 Vercel Functions，改用 Astro 的 API Routes：

```
❌ 舊結構（Vercel Functions）
api/
├── events.ts
└── contact/
    └── submit.ts

✅ 新結構（Astro API Routes）
src/pages/api/
├── events.ts
└── contact/
    └── submit.ts
```

**Astro API Route 範例**：

```typescript
// src/pages/api/events.ts
import type { APIRoute } from 'astro';

export const prerender = false; // 重要：SSR 模式

export const GET: APIRoute = async ({ request }) => {
  const events = await getEvents();

  return new Response(JSON.stringify(events), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
```

### 方案 3：確認 Astro 配置

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',  // 或 'hybrid'（Astro 4）
  adapter: vercel({
    // Astro 5 不需要額外配置
  }),
});
```

## 除錯過程

### 第一次錯誤嘗試

```
症狀：FUNCTION_INVOCATION_FAILED
嘗試：修改 vercel.json 的 functions 配置
結果：仍然失敗
```

### 第二次錯誤嘗試

```
症狀：API 404
嘗試：新增 rewrites 規則
結果：部分成功但不穩定
```

### 最終解決

```
根因：vercel.json 與 Astro Adapter 衝突
解法：移除 vercel.json 的 framework 和 functions 配置
結果：✅ 成功
```

## 學習重點

| 原則 | 說明 |
|------|------|
| 不要過度配置 | Vercel 自動偵測通常就夠了 |
| 讓 Adapter 控制 | 使用框架 adapter 時，不要手動配置 framework |
| 使用原生 API Routes | Astro 的 `src/pages/api/` 比 Vercel Functions 更好整合 |
| `prerender = false` | SSR routes 必須明確設定 |

## 與 AI 協作的正確方式

```
❌ 錯誤：「幫我建立 Vercel API」

✅ 正確：「幫我建立 API 端點
- 框架：Astro 5 + @astrojs/vercel adapter
- 不要使用 vercel.json 的 functions 配置
- 使用 Astro API Routes（src/pages/api/）
- 記得設定 prerender = false」
```

## 相關錯誤

### FUNCTION_INVOCATION_FAILED

**可能原因**：
1. 使用了 `res.status().json()` 而非 `new Response()`
2. 環境變數未正確載入
3. 相依套件問題

**Astro API Route 的正確 Response 格式**：

```typescript
// ❌ 錯誤（Vercel Functions 語法）
export default function handler(req, res) {
  res.status(200).json({ data: 'ok' });
}

// ✅ 正確（Astro API Route）
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ data: 'ok' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
```

## 防呆清單

### vercel.json 配置

- [ ] 不設定 `framework`（讓 Vercel 自動偵測）
- [ ] 不設定 `functions`（讓 Adapter 處理）
- [ ] 最小化配置或直接刪除

### Astro 配置

- [ ] 使用 `@astrojs/vercel` adapter
- [ ] 設定 `output: 'server'` 或 `'hybrid'`
- [ ] SSR routes 設定 `prerender = false`

### API Routes

- [ ] 放在 `src/pages/api/` 目錄
- [ ] 使用 `new Response()` 而非 `res.json()`
- [ ] 使用 `import.meta.env` 讀取環境變數

## 架構演進記錄

```
JSON 靜態資料
    ↓
Vercel Functions（api/*.ts）
    ↓  ← 遇到 404 問題
Astro API Routes（src/pages/api/*.ts）
    ↓  ← 最終方案
穩定運作
```

**教訓**：使用框架 adapter 時，優先使用框架原生的 API 機制。

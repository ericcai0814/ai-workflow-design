---
title: "CI/CD 配置踩坑案例"
id: "pitfall-cicd-configuration"
category: "appendix"
source: "ewill-web 專案 (2026-01)"
ai_usage:
  - "設定 GitHub Actions"
  - "部署到 Cloudflare/Vercel"
  - "CI/CD 除錯"
version: "1.0.0"
last_updated: "2026-01-23"
---

# CI/CD 配置踩坑案例

## 案例 1-1：pnpm version 衝突

### 問題描述

CI 失敗，錯誤訊息顯示 pnpm 版本衝突。

### 症狀

```
Error: pnpm version 9.x.x does not match packageManager version 10.14.0
```

### 根因分析

GitHub Actions 的 `pnpm/action-setup` 中硬編碼了 `version: 9`，但 `package.json` 指定了 `packageManager: "pnpm@10.14.0"`。

**錯誤的配置**：

```yaml
# .github/workflows/ci.yml
- uses: pnpm/action-setup@v2
  with:
    version: 9  # ❌ 硬編碼版本
```

### 解決方案

**正確的配置**：

```yaml
# .github/workflows/ci.yml
- uses: pnpm/action-setup@v2
  # ✅ 不指定 version，讓 action 從 package.json 的 packageManager 欄位讀取
```

### 學習重點

| 原則 | 說明 |
|------|------|
| Single Source of Truth | 版本資訊只在 `package.json` 定義一次 |
| 不硬編碼版本 | CI 配置不應硬編碼工具版本 |
| 與 AI 協作提示 | 明確告知 AI「從 package.json 讀取版本」 |

### 預防措施

1. 在 `package.json` 中使用 `packageManager` 欄位
2. CI 配置中不指定版本，讓工具自動讀取
3. 建立 CI 配置 review checklist

---

## 案例 1-2：Cloudflare Pages 專案名稱錯誤

### 問題描述

部署失敗，找不到 Cloudflare Pages 專案。

### 症狀

```
Error: Project not found: ewill-web
```

### 根因分析

AI 猜測專案名稱為 `ewill-web`，但實際 Cloudflare Pages 專案名稱是 `wispy-recipe-f9c8`（系統自動生成）。

**錯誤的配置**：

```yaml
- name: Deploy to Cloudflare Pages
  run: npx wrangler pages deploy dist --project-name=ewill-web  # ❌ 猜測的名稱
```

### 解決方案

**正確的做法**：

1. 登入 Cloudflare Dashboard 查詢實際專案名稱
2. 或使用 `wrangler pages project list` 查詢

```yaml
- name: Deploy to Cloudflare Pages
  run: npx wrangler pages deploy dist --project-name=wispy-recipe-f9c8  # ✅ 實際名稱
```

### 學習重點

| 原則 | 說明 |
|------|------|
| 不要讓 AI 猜測 | 外部平台的 ID、名稱必須查詢實際值 |
| 提供明確資訊 | 給 AI 明確的專案 ID 或名稱 |
| 驗證配置 | 部署前先用 `list` 指令驗證 |

### 與 AI 協作的正確方式

```
❌ 錯誤：「請幫我設定 Cloudflare 部署」
✅ 正確：「請幫我設定 Cloudflare 部署，專案名稱是 wispy-recipe-f9c8」
```

---

## 案例 1-3：Content Build 步驟遺漏

### 問題描述

部署成功但首頁 404。

### 症狀

- 本地開發正常
- 部署後所有頁面 404
- 沒有錯誤訊息

### 根因分析

`astro-app/public/content/*.json` 被 `.gitignore` 排除，但 CI 流程中沒有執行 content build 步驟。

**專案結構**：

```
project/
├── pages/            # YAML 原始內容
├── build/            # Content build 腳本
└── astro-app/
    └── public/
        └── content/  # ← 被 gitignore，需在 CI 中生成
            └── *.json
```

### 解決方案

在 CI 中加入 content build 步驟：

```yaml
jobs:
  deploy:
    steps:
      # 1. 根目錄 build（生成 JSON）
      - name: Build content
        run: pnpm run build  # ✅ 在根目錄執行

      # 2. Astro build
      - name: Build Astro
        run: cd astro-app && pnpm run build
```

### 學習重點

| 原則 | 說明 |
|------|------|
| 理解 build 流程 | 區分「根目錄 build」與「框架 build」|
| 檢查 gitignore | 被忽略的檔案可能需要在 CI 中生成 |
| 完整測試 | 部署前在乾淨環境測試完整 build 流程 |

### 除錯思路

1. 本地能跑但部署失敗 → 檢查 gitignore
2. 列出所有 build 步驟，確認 CI 中都有執行
3. 對比本地和 CI 的檔案結構

---

## 總結：CI/CD 配置防呆清單

### 版本管理

- [ ] 工具版本只在 `package.json` 定義（pnpm, node）
- [ ] CI 配置不硬編碼版本號

### 外部平台

- [ ] 專案名稱/ID 從平台實際查詢
- [ ] 不讓 AI 猜測外部資源名稱
- [ ] 敏感資訊使用 GitHub Secrets

### Build 流程

- [ ] 列出所有 build 步驟
- [ ] 檢查 gitignore 的檔案是否需要在 CI 生成
- [ ] 在乾淨環境測試完整 build

### 與 AI 協作

- [ ] 提供明確的專案名稱、ID
- [ ] 說明專案的 build 流程
- [ ] 指出哪些檔案被 gitignore

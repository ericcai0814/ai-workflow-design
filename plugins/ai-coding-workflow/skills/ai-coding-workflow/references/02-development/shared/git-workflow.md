---
type: reference
category: git
scope: shared
version: "1.0"
last_updated: "2025-01"
variables:
  ENV_DEV: dev
  ENV_STAGING: staging
  ENV_PROD: prod
---

# Git 工作流程規範

標準化的 Git 分支策略與環境推進流程，適用於 AI Agent 協作開發。

## 分支命名規範

### 環境主分支

格式：`${ENV}_[frontend/backend]_[system]_[collaborator]`

| 環境變數         | 預設值  | 說明       |
| ---------------- | ------- | ---------- |
| `${ENV_DEV}`     | dev     | 開發環境   |
| `${ENV_STAGING}` | staging | 預發佈環境 |
| `${ENV_PROD}`    | prod    | 正式環境   |

範例：

- `dev_frontend_web_alice` — Alice 的前端開發分支
- `staging_backend_api_team-a` — Team A 的後端預發佈分支

### 功能分支

| 類型    | 格式                          | 用途             |
| ------- | ----------------------------- | ---------------- |
| feature | `feature/<description>`       | 新功能開發       |
| fix     | `fix-issue/<issue-id>-<desc>` | 問題修復         |
| hotfix  | `hotfix/<description>`        | 緊急生產環境修復 |

命名規則：

- description 使用 **kebab-case** 格式
- 簡潔描述功能或問題
- 避免使用特殊字元

範例：

- `feature/user-authentication`
- `fix-issue/123-login-timeout`
- `hotfix/critical-payment-bug`

## 環境推進流程

```
feature/* ──→ ${ENV_DEV} ──→ ${ENV_STAGING} ──→ ${ENV_PROD}
                 │                  │                  │
                 ▼                  ▼                  ▼
           開發環境部署       預發佈驗證          正式上線
```

### 推進條件

| 來源             | 目標             | 條件                           |
| ---------------- | ---------------- | ------------------------------ |
| feature/\*       | `${ENV_DEV}`     | Code Review 通過               |
| `${ENV_DEV}`     | `${ENV_STAGING}` | 開發環境測試通過、完整測試套件 |
| `${ENV_STAGING}` | `${ENV_PROD}`    | 預發佈驗證完成、審核流程通過   |

### 合併順序驗證

**正確順序**：dev → staging → prod

合併前確認：

1. 來源分支已包含所有必要變更
2. 目標分支為正確的下一環境
3. 無跳過中間環境的情況

## AI Agent 協作指引

### 首次 Git 操作

當 AI Agent 首次執行 Git 分支操作時：

1. **詢問環境命名偏好**

   ```
   您的環境命名習慣是？
   - dev / staging / prod（預設）
   - development / testing / production
   - 自訂：___
   ```

2. **記錄用戶偏好**
   - 儲存於專案設定或會話記憶
   - 後續操作自動套用

### 分支操作前檢查清單

- [ ] 確認目標分支不存在
- [ ] 確認基準分支為正確的環境分支
- [ ] 確認分支名稱符合命名規範
- [ ] 確認無未提交的本地變更

### 合併操作前檢查清單

- [ ] 確認目標分支正確
- [ ] 確認無未提交的變更
- [ ] 確認遵循環境推進順序
- [ ] **禁止**：直接操作 main/master 分支

### 安全防護

```
⚠️ 危險操作警告
以下操作需要明確的用戶確認：
- 刪除分支
- Force push
- 操作 main/master 分支
- 跨環境合併（跳過中間環境）
```

## 衝突處理

### 衝突發生時

1. **通知用戶**：說明衝突檔案和原因
2. **提供選項**：
   - 自動嘗試解決（簡單衝突）
   - 等待用戶手動處理
   - 放棄合併操作
3. **記錄處理結果**

### 回滾策略

如需回滾已合併的變更：

1. 使用 `git revert` 而非 `git reset`
2. 建立回滾分支：`hotfix/revert-<original-branch>`
3. 遵循正常推進流程

## 相關文件

- [分支建立 Prompt](./prompts/git-branch-create.md)
- [合併流程 Prompt](./prompts/git-merge-flow.md)
- [測試規範](./testing.md)
- [整合規範](./integration.md)

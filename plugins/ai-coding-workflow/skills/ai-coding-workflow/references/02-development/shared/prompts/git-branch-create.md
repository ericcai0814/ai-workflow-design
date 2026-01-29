---
type: prompt
category: git
scope: shared
version: "1.0"
last_updated: "2025-01"
variables:
  ENV_DEV: dev
  ENV_STAGING: staging
  ENV_PROD: prod
---

# Git 分支建立 Prompt

AI Agent 建立 Git 分支時的標準化操作指引。

## 使用時機

當需要建立新的 Git 分支時使用此 Prompt。

## 操作流程

### Step 1: 確認分支類型

請問您要建立什麼類型的分支？

| 選項      | 格式                                     | 說明                 |
| --------- | ---------------------------------------- | -------------------- |
| feature   | `feature/<description>`                  | 新功能開發           |
| fix-issue | `fix-issue/<id>-<desc>`                  | 問題修復（有 Issue） |
| hotfix    | `hotfix/<description>`                   | 緊急生產修復         |
| env       | `${ENV}_[scope]_[system]_[collaborator]` | 環境主分支           |

### Step 2: 收集分支資訊

根據分支類型收集必要資訊：

**Feature 分支**

```
請提供功能描述（kebab-case）：
範例：user-authentication, payment-gateway
```

**Fix-Issue 分支**

```
請提供：
1. Issue ID：
2. 簡短描述（kebab-case）：
```

**Hotfix 分支**

```
請描述緊急問題（kebab-case）：
範例：critical-payment-bug
```

**環境分支**

```
請提供：
1. 環境：${ENV_DEV} / ${ENV_STAGING} / ${ENV_PROD}
2. 範疇：frontend / backend
3. 系統名稱：
4. 協作者/團隊名稱：
```

### Step 3: 安全檢查

執行以下檢查：

```bash
# 1. 確認目標分支不存在
git branch --list "${BRANCH_NAME}"
git ls-remote --heads origin "${BRANCH_NAME}"

# 2. 確認無未提交變更
git status --porcelain

# 3. 確認當前在正確的基準分支
git branch --show-current
```

檢查結果處理：

| 檢查項目     | 通過條件     | 失敗處理                     |
| ------------ | ------------ | ---------------------------- |
| 分支不存在   | 無匹配結果   | 提示用戶分支已存在，詢問處理 |
| 無未提交變更 | 輸出為空     | 提示用戶處理未提交變更       |
| 基準分支正確 | 符合命名規範 | 提示用戶切換至正確基準分支   |

### Step 4: 命名規範驗證

驗證分支名稱符合規範：

- [ ] 使用 kebab-case（小寫字母、數字、連字符）
- [ ] 無特殊字元（空格、底線等）
- [ ] 長度適中（建議 50 字元以內）
- [ ] 描述清晰明確

### Step 5: 建立分支

```bash
# 從正確的基準分支建立
git checkout -b "${BRANCH_NAME}"

# 確認建立成功
git branch --show-current
```

### Step 6: 推送遠端（可選）

```bash
# 推送至遠端並設定追蹤
git push -u origin "${BRANCH_NAME}"
```

## 使用範例

### 範例 1: 建立功能分支

```
User: 我需要建立一個新分支來開發用戶認證功能

Agent:
1. 確認分支類型：feature
2. 收集資訊：user-authentication
3. 安全檢查：✓ 通過
4. 分支名稱：feature/user-authentication
5. 建立分支：git checkout -b feature/user-authentication
6. 完成！
```

### 範例 2: 建立問題修復分支

```
User: Issue #456 需要修復登入超時問題

Agent:
1. 確認分支類型：fix-issue
2. 收集資訊：ID=456, 描述=login-timeout
3. 安全檢查：✓ 通過
4. 分支名稱：fix-issue/456-login-timeout
5. 建立分支：git checkout -b fix-issue/456-login-timeout
6. 完成！
```

## 錯誤處理

### 分支已存在

```
⚠️ 分支 "${BRANCH_NAME}" 已存在
選項：
1. 切換至現有分支
2. 使用不同名稱
3. 刪除現有分支後重建（需確認）
```

### 有未提交變更

```
⚠️ 偵測到未提交的變更
選項：
1. 暫存變更（git stash）後繼續
2. 提交變更後繼續
3. 放棄變更後繼續（需確認）
```

## 相關文件

- [Git 工作流程規範](../git-workflow.md)
- [合併流程 Prompt](./git-merge-flow.md)

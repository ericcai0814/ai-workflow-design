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

# Git 合併流程 Prompt

AI Agent 執行環境間合併操作時的標準化指引。

## 使用時機

當需要將變更從一個環境推進到另一個環境時使用此 Prompt。

---

## 變數說明

執行此 prompt 前，請先取得以下值：

| 變數               | 來源         | 說明           | 範例                |
| ------------------ | ------------ | -------------- | ------------------- |
| `${ENV_DEV}`       | 專案設定     | 開發環境名稱   | `dev`               |
| `${ENV_STAGING}`   | 專案設定     | 預發佈環境名稱 | `staging`           |
| `${ENV_PROD}`      | 專案設定     | 正式環境名稱   | `prod`              |
| `${SOURCE_BRANCH}` | Git 當前分支 | 來源分支       | `feature/user-auth` |
| `${TARGET_BRANCH}` | 用戶指定     | 目標分支       | `dev`               |

**執行時，將所有 `${...}` 替換為實際值。如果 detect-context 無法偵測，請詢問用戶。**

---

## 環境推進順序

```
${ENV_DEV} ──→ ${ENV_STAGING} ──→ ${ENV_PROD}
```

**重要規則**：

- 只能按順序推進，不可跳過環境
- `${ENV_PROD}` 合併需額外審核確認

## 操作流程

### Step 1: 確認合併目標

```
請確認合併方向：
來源分支：___________
目標分支：___________
```

合法推進路徑：

| 來源             | 目標             | 說明                 |
| ---------------- | ---------------- | -------------------- |
| feature/\*       | `${ENV_DEV}`     | 功能合併至開發環境   |
| fix-issue/\*     | `${ENV_DEV}`     | 修復合併至開發環境   |
| hotfix/\*        | `${ENV_DEV}`     | 熱修復合併至開發     |
| hotfix/\*        | `${ENV_PROD}`    | 緊急熱修復（需確認） |
| `${ENV_DEV}`     | `${ENV_STAGING}` | 開發推進至預發佈     |
| `${ENV_STAGING}` | `${ENV_PROD}`    | 預發佈推進至正式     |

### Step 2: 環境順序驗證

檢查是否符合推進順序：

```bash
# 確認來源分支存在
git rev-parse --verify "${SOURCE_BRANCH}"

# 確認目標分支存在
git rev-parse --verify "${TARGET_BRANCH}"

# 檢查來源是否領先於目標
git log "${TARGET_BRANCH}".."${SOURCE_BRANCH}" --oneline
```

⚠️ **阻止條件**：

- 嘗試跳過中間環境（如 dev 直接到 prod）
- 反向合併（如 prod 回 staging）
- 目標為 main/master 分支

### Step 3: 合併前檢查清單

執行以下檢查：

- [ ] 確認無未提交的本地變更
- [ ] 確認本地分支已同步遠端最新
- [ ] 確認來源分支已包含所有必要變更
- [ ] 確認測試已通過（適用於 staging/prod 推進）

```bash
# 檢查未提交變更
git status --porcelain

# 同步遠端
git fetch origin

# 確認本地與遠端同步
git log HEAD..origin/"${SOURCE_BRANCH}" --oneline
```

### Step 4: 執行合併

```bash
# 切換至目標分支
git checkout "${TARGET_BRANCH}"

# 拉取最新變更
git pull origin "${TARGET_BRANCH}"

# 執行合併
git merge "${SOURCE_BRANCH}" --no-ff -m "Merge ${SOURCE_BRANCH} into ${TARGET_BRANCH}"
```

使用 `--no-ff` 確保建立合併提交，保留分支歷史。

### Step 5: 衝突處理

若發生衝突：

```
⚠️ 合併衝突偵測

衝突檔案：
- path/to/file1.ts
- path/to/file2.ts

選項：
1. 嘗試自動解決（僅限簡單衝突）
2. 顯示衝突內容，等待手動處理
3. 放棄此次合併
```

自動解決條件：

- 僅 import 語句順序差異
- 僅空白或格式差異
- 無邏輯衝突

其他情況需用戶手動處理。

### Step 6: 驗證與推送

```bash
# 確認合併結果
git log --oneline -5

# 執行測試（如適用）
npm test

# 推送至遠端
git push origin "${TARGET_BRANCH}"
```

### Step 7: 清理（可選）

```bash
# 刪除已合併的功能分支（本地）
git branch -d "${SOURCE_BRANCH}"

# 刪除遠端分支（需確認）
git push origin --delete "${SOURCE_BRANCH}"
```

## 回滾策略

### 情境 1: 合併後發現問題

使用 `git revert` 建立回滾提交：

```bash
# 找到合併提交
git log --oneline | grep "Merge"

# 回滾合併提交（-m 1 保留目標分支的內容）
git revert -m 1 <merge-commit-hash>

# 推送回滾
git push origin "${TARGET_BRANCH}"
```

### 情境 2: 需要完全回滾

1. 建立 hotfix 分支：`hotfix/revert-<feature-name>`
2. 實作回滾邏輯
3. 按正常流程推進

## 特殊情況處理

### 緊急熱修復至正式環境

```
⚠️ 緊急熱修復流程

此操作將跳過預發佈環境，直接合併至正式環境。

確認清單：
- [ ] 這是緊急的生產問題
- [ ] 已經過相關人員核准
- [ ] 修復已在本地測試驗證

確認繼續？(y/n)
```

通過後執行：

```bash
git checkout "${ENV_PROD}"
git pull origin "${ENV_PROD}"
git merge hotfix/<name> --no-ff -m "Hotfix: <description>"
git push origin "${ENV_PROD}"

# 同步回其他環境
git checkout "${ENV_STAGING}"
git merge "${ENV_PROD}"
git push origin "${ENV_STAGING}"

git checkout "${ENV_DEV}"
git merge "${ENV_STAGING}"
git push origin "${ENV_DEV}"
```

### 禁止操作

```
🚫 此操作已被阻止

原因：嘗試直接操作 main/master 分支

若需更新 main/master，請：
1. 確認這是有意操作
2. 使用 Pull Request 流程
3. 取得必要審核
```

## 使用範例

### 範例：功能合併至開發環境

```
User: 請將 feature/user-auth 合併到 dev

Agent:
1. 確認合併方向：feature/user-auth → dev ✓
2. 環境順序驗證：合法路徑 ✓
3. 合併前檢查：
   - 無未提交變更 ✓
   - 已同步遠端 ✓
4. 執行合併：
   git checkout dev
   git merge feature/user-auth --no-ff
5. 無衝突，合併成功 ✓
6. 推送：git push origin dev ✓
7. 完成！是否刪除 feature/user-auth 分支？
```

## 相關文件

- [Git 工作流程規範](../git-workflow.md)
- [分支建立 Prompt](./git-branch-create.md)

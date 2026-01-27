# 快速開始

5 分鐘上手 AI Coding Workflow。

## 1. 安裝

```bash
cd /path/to/your-project
degit ericcai0814/ai-workflow-design/.claude/skills/ai-coding-workflow .claude/skills/ai-coding-workflow
```

## 2. 使用

### 方式一：手動調用

輸入 `/ai-coding-workflow` 調用 skill。

### 方式二：自然語言觸發

直接說你想做的事：

```
「幫我建立一個 Button 元件」
「設計用戶管理 API」
「我的環境變數在 production 不 work」
```

## 3. 常用場景

### 建立元件

```
用戶：「建立一個 Card 元件」

AI 會：
1. 讀取 component-development.md
2. 確認 Design Token 設置
3. 建立檔案結構
4. 產出 70% MVP
5. 提示人工迭代
```

### 設計 API

```
用戶：「設計用戶管理 API」

AI 會：
1. 讀取 api-design.md
2. 設計 RESTful 端點
3. 定義請求/回應格式
4. 產出 70% MVP
```

### 排查問題

```
用戶：「環境變數在 production 不 work」

AI 會：
1. 讀取 pitfalls/index.md
2. 找到類似案例
3. 提供解決方案
```

## 4. 重要文件

| 文件 | 用途 | 何時讀 |
|------|------|--------|
| `design-system.md` | 設計系統流程 | 前端工作前 |
| `validation-framework.md` | 三層驗證 | 提交前 |
| `pitfalls/index.md` | 踩坑案例 | 遇到問題時 |

## 5. 下一步

- 閱讀 `SKILL.md` 了解完整功能
- 查看 `references/` 中的詳細文件
- 嘗試 `scripts/` 中的輔助腳本

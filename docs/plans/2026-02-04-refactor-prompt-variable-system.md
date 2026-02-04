# Prompt 變數系統重構計畫

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 將 ai-coding-workflow 的 prompt 變數系統從「期望 Agent 自行理解」改為「明確指令 + 變數說明」，確保 Agent 正確替換變數。

**Architecture:** 為每個 prompt 檔案新增「變數說明」區塊，將 `${VARIABLE}` 改為自然語言描述 + 變數表格，並在 SKILL.md 中加入強制讀取指令。

**Tech Stack:** Markdown 編輯

---

## 變數分類

| 類型       | 變數範例                                        | 來源                 |
| ---------- | ----------------------------------------------- | -------------------- |
| 專案上下文 | `${FRAMEWORK}`, `${DATABASE}`                   | detect-context agent |
| 用戶輸入   | `${ORIGINAL_REQUIREMENT}`, `${BUG_DESCRIPTION}` | 用戶本次對話         |
| 流程產出   | `${FEATURE_SPEC}`, `${BEFORE_CODE}`             | 前一步驟的產出       |
| 環境設定   | `${ENV_DEV}`, `${ENV_PROD}`                     | 專案設定檔           |

---

## Task 1: 建立變數說明範本

**Files:**

- Create: `plugins/ai-coding-workflow/templates/prompt-variable-guide.md`

**Step 1: 建立範本檔案**

```markdown
## 變數說明

執行此 prompt 前，請先取得以下值：

| 變數          | 來源   | 說明   | 範例     |
| ------------- | ------ | ------ | -------- |
| `${VAR_NAME}` | [來源] | [說明] | [範例值] |

**執行時，將所有 `${...}` 替換為實際值。如果無法取得某變數，請詢問用戶。**
```

**Step 2: 驗證檔案建立**

```bash
cat plugins/ai-coding-workflow/templates/prompt-variable-guide.md
```

**Step 3: Commit**

```bash
git add plugins/ai-coding-workflow/templates/prompt-variable-guide.md
git commit -m "docs: 新增 prompt 變數說明範本"
```

---

## Task 2: 重構 planning/prompts/analyze-requirements.md

**Files:**

- Modify: `plugins/ai-coding-workflow/skills/planning/references/prompts/analyze-requirements.md`

**Step 1: 讀取現有內容**

確認現有變數：`${ORIGINAL_REQUIREMENT}`, `${PROJECT_CONTEXT}`

**Step 2: 在 `## Prompt 範本` 前新增變數說明區塊**

在 `## 使用時機` 後、`## Prompt 範本` 前插入：

```markdown
---
## 變數說明

執行此 prompt 前，請先取得以下值：

| 變數 | 來源 | 說明 | 範例 |
|------|------|------|------|
| `${ORIGINAL_REQUIREMENT}` | 用戶本次對話 | 用戶描述的原始需求，原文引用 | "我想要一個可以拖放排序的待辦清單" |
| `${PROJECT_CONTEXT}` | detect-context agent | 專案技術棧、狀態、結構的摘要 | "Next.js 14 + TypeScript + Tailwind CSS，已有基本頁面結構" |

**執行時，將所有 `${...}` 替換為實際值。如果 detect-context 無法偵測，請詢問用戶。**
---
```

**Step 3: 驗證修改**

```bash
grep -A 10 "## 變數說明" plugins/ai-coding-workflow/skills/planning/references/prompts/analyze-requirements.md
```

**Step 4: Commit**

```bash
git add plugins/ai-coding-workflow/skills/planning/references/prompts/analyze-requirements.md
git commit -m "docs(planning): 為 analyze-requirements prompt 新增變數說明"
```

---

## Task 3: 重構 planning/prompts/create-plan.md

**Files:**

- Modify: `plugins/ai-coding-workflow/skills/planning/references/prompts/create-plan.md`

**Step 1: 確認現有變數**

`${FEATURE_SPEC}`, `${TECH_STACK}`, `${TEAM_INFO}`

**Step 2: 新增變數說明區塊**

在 `## 使用時機` 後插入：

```markdown
---

## 變數說明

執行此 prompt 前，請先取得以下值：

| 變數 | 來源 | 說明 | 範例 |
|------|------|------|------|
| `${FEATURE_SPEC}` | analyze-requirements 產出 | 前一步驟產出的功能規格 | "Must Have: 登入、登出、密碼重設" |
| `${TECH_STACK}` | detect-context agent | 專案使用的技術棧 | "React 18 + Node.js + PostgreSQL" |
| `${TEAM_INFO}` | 用戶提供（可選） | 團隊組成資訊，無則留空 | "2 前端 + 1 後端" |

**執行時，將所有 `${...}` 替換為實際值。`${TEAM_INFO}` 若無資訊可省略該區塊。**

---
```

**Step 3: Commit**

```bash
git add plugins/ai-coding-workflow/skills/planning/references/prompts/create-plan.md
git commit -m "docs(planning): 為 create-plan prompt 新增變數說明"
```

---

## Task 4: 重構 frontend/prompts/\*.md（5 個檔案）

**Files:**

- Modify: `plugins/ai-coding-workflow/skills/frontend/references/prompts/setup-design-system.md`
- Modify: `plugins/ai-coding-workflow/skills/frontend/references/prompts/create-component.md`
- Modify: `plugins/ai-coding-workflow/skills/frontend/references/prompts/setup-state-management.md`
- Modify: `plugins/ai-coding-workflow/skills/frontend/references/prompts/setup-token-system.md`
- Modify: `plugins/ai-coding-workflow/skills/frontend/references/prompts/setup-routing.md`

**Step 1: 為每個檔案新增變數說明**

常用變數對應表：

| 變數                   | 來源           | 說明                                                 |
| ---------------------- | -------------- | ---------------------------------------------------- |
| `${FRAMEWORK}`         | detect-context | 前端框架（React, Vue, Angular）                      |
| `${UI_LIBRARY}`        | detect-context | UI 庫（Ant Design, MUI, Vuetify）                    |
| `${CSS_SOLUTION}`      | detect-context | CSS 方案（Tailwind, CSS Modules, styled-components） |
| `${COMPONENT_NAME}`    | 用戶指定       | 要建立的元件名稱                                     |
| `${COMPONENT_PURPOSE}` | 用戶描述       | 元件的用途說明                                       |
| `${STATE_MANAGER}`     | detect-context | 狀態管理方案（Redux, Zustand, Pinia）                |
| `${ROUTER_LIBRARY}`    | detect-context | 路由庫（React Router, Vue Router）                   |
| `${DESIGN_TOKENS}`     | 設計系統       | Token 定義（顏色、間距、字體）                       |

**Step 2: 批次處理**

對每個檔案：

1. 讀取檔案確認使用哪些變數
2. 根據對應表新增變數說明區塊
3. 儲存修改

**Step 3: Commit**

```bash
git add plugins/ai-coding-workflow/skills/frontend/references/prompts/*.md
git commit -m "docs(frontend): 為所有 frontend prompts 新增變數說明"
```

---

## Task 5: 重構 backend/prompts/\*.md（3 個檔案）

**Files:**

- Modify: `plugins/ai-coding-workflow/skills/backend/references/prompts/design-api.md`
- Modify: `plugins/ai-coding-workflow/skills/backend/references/prompts/setup-auth.md`
- Modify: `plugins/ai-coding-workflow/skills/backend/references/prompts/create-model.md`

**Step 1: 常用變數對應表**

| 變數               | 來源           | 說明                                 |
| ------------------ | -------------- | ------------------------------------ |
| `${LANGUAGE}`      | detect-context | 後端語言（Python, Node.js, Go）      |
| `${DATABASE}`      | detect-context | 資料庫（PostgreSQL, MySQL, MongoDB） |
| `${ORM}`           | detect-context | ORM（Prisma, SQLAlchemy, TypeORM）   |
| `${API_STYLE}`     | detect-context | API 風格（REST, GraphQL）            |
| `${API_SPEC}`      | 用戶提供       | API 規格描述                         |
| `${AUTH_METHOD}`   | 用戶指定       | 認證方式（JWT, Session, OAuth）      |
| `${DATA_ENTITIES}` | 用戶描述       | 資料實體列表                         |

**Step 2: 批次處理並 Commit**

```bash
git add plugins/ai-coding-workflow/skills/backend/references/prompts/*.md
git commit -m "docs(backend): 為所有 backend prompts 新增變數說明"
```

---

## Task 6: 重構 validation/prompts/\*.md（5 個檔案）

**Files:**

- Modify: `plugins/ai-coding-workflow/skills/validation/references/prompts/*.md`

**Step 1: 常用變數對應表**

| 變數                                          | 來源               | 說明                             |
| --------------------------------------------- | ------------------ | -------------------------------- |
| `${BRANCH_NAME}`                              | 用戶指定或自動生成 | Git 分支名稱                     |
| `${SOURCE_BRANCH}`                            | Git 當前分支       | 來源分支                         |
| `${TARGET_BRANCH}`                            | 用戶指定           | 目標分支（通常是 main/develop）  |
| `${ENV_DEV}`, `${ENV_STAGING}`, `${ENV_PROD}` | 專案設定           | 各環境設定                       |
| `${TEST_FRAMEWORK}`                           | detect-context     | 測試框架（Jest, Vitest, pytest） |

**Step 2: Commit**

```bash
git add plugins/ai-coding-workflow/skills/validation/references/prompts/*.md
git commit -m "docs(validation): 為所有 validation prompts 新增變數說明"
```

---

## Task 7: 重構 review/prompts/review-code.md

**Files:**

- Modify: `plugins/ai-coding-workflow/skills/review/references/prompts/review-code.md`

**Step 1: 變數對應**

| 變數                    | 來源                  | 說明                           |
| ----------------------- | --------------------- | ------------------------------ |
| `${CODE}`               | 用戶提供或 git diff   | 要審查的程式碼                 |
| `${REVIEW_FOCUS}`       | 用戶指定              | 審查重點（安全、效能、可讀性） |
| `${CHANGE_DESCRIPTION}` | 用戶或 commit message | 變更說明                       |

**Step 2: Commit**

```bash
git add plugins/ai-coding-workflow/skills/review/references/prompts/review-code.md
git commit -m "docs(review): 為 review-code prompt 新增變數說明"
```

---

## Task 8: 重構 troubleshooting/prompts/bug-fixing.md

**Files:**

- Modify: `plugins/ai-coding-workflow/skills/troubleshooting/references/prompts/bug-fixing.md`

**Step 1: 變數對應**

| 變數                    | 來源               | 說明       |
| ----------------------- | ------------------ | ---------- |
| `${BUG_DESCRIPTION}`    | 用戶描述           | Bug 的描述 |
| `${ERROR_MESSAGE}`      | 用戶提供           | 錯誤訊息   |
| `${REPRODUCTION_STEPS}` | 用戶提供           | 重現步驟   |
| `${EXPECTED_BEHAVIOR}`  | 用戶描述           | 預期行為   |
| `${ACTUAL_BEHAVIOR}`    | 用戶描述           | 實際行為   |
| `${RELATED_CODE}`       | 用戶提供或檔案讀取 | 相關程式碼 |

**Step 2: Commit**

```bash
git add plugins/ai-coding-workflow/skills/troubleshooting/references/prompts/bug-fixing.md
git commit -m "docs(troubleshooting): 為 bug-fixing prompt 新增變數說明"
```

---

## Task 9: 更新各 SKILL.md 的 Phase 3 指令

**Files:**

- Modify: `plugins/ai-coding-workflow/skills/planning/SKILL.md`
- Modify: `plugins/ai-coding-workflow/skills/frontend/SKILL.md`
- Modify: `plugins/ai-coding-workflow/skills/backend/SKILL.md`
- Modify: `plugins/ai-coding-workflow/skills/validation/SKILL.md`
- Modify: `plugins/ai-coding-workflow/skills/review/SKILL.md`
- Modify: `plugins/ai-coding-workflow/skills/troubleshooting/SKILL.md`

**Step 1: 在每個 SKILL.md 的 Phase 3 區塊加入強制指令**

找到 `## Phase 3: 任務執行` 區塊，在「執行步驟」開頭加入：

```markdown
### 執行步驟

1. **必須讀取對應的 prompt 檔案**：根據任務類型讀取 `references/prompts/` 下的對應檔案

2. **閱讀「變數說明」區塊**：了解每個變數的來源和範例

3. **替換所有變數**：將 `${...}` 替換為實際值，無法取得時詢問用戶

4. **按照 prompt 範本格式輸出**：遵循範本定義的結構
```

**Step 2: Commit**

```bash
git add plugins/ai-coding-workflow/skills/*/SKILL.md
git commit -m "docs: 在所有 SKILL.md Phase 3 加入強制讀取 prompt 指令"
```

---

## Task 10: 更新 plugin cache 並驗證

**Step 1: Bump 版本號**

修改 `plugins/ai-coding-workflow/.claude-plugin/plugin.json`：

```json
"version": "2.1.0"
```

**Step 2: 發佈更新**

```bash
cd plugins/ai-coding-workflow
claude /plugin publish
```

**Step 3: 清除舊 cache**

```bash
rm -rf ~/.claude/plugins/cache/ai-coding-workflow/ai-coding-workflow/2.0.0
```

**Step 4: 驗證新版本**

```bash
ls ~/.claude/plugins/cache/ai-coding-workflow/ai-coding-workflow/
# 應該看到 2.1.0
```

**Step 5: Final Commit**

```bash
git add -A
git commit -m "chore(ai-coding-workflow): bump version to 2.1.0"
```

---

## 完成標準

- [ ] 所有 17 個 prompt 檔案都有「變數說明」區塊
- [ ] 所有 6 個 SKILL.md 的 Phase 3 都有強制讀取指令
- [ ] plugin 版本更新到 2.1.0
- [ ] cache 已更新為新版本
- [ ] 所有變更已 commit

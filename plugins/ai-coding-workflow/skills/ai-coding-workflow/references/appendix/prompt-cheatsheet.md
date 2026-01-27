---
title: "Prompt 速查表"
id: "prompt-cheatsheet"
category: "appendix"
ai_usage:
  - "快速找到需要的 Prompt"
  - "了解 Prompt 使用時機"
version: "1.0.0"
last_updated: "2026-01-27"
---

# Prompt 速查表

## 使用指南

1. 根據任務類型找到對應的 Prompt
2. 替換 `${變數}` 為實際值
3. 執行 Prompt 並驗證結果

## 規劃階段

| Prompt | 用途 | 路徑 |
|--------|------|------|
| 需求分析 | 分析用戶需求，產出用戶故事 | `01-planning/prompts/analyze-requirements.md` |
| 建立計畫 | 產出任務計畫和執行步驟 | `01-planning/prompts/create-plan.md` |

### 快速參考：需求分析

```prompt
分析以下需求，產出：
1. 用戶故事（User Story）
2. 驗收標準（Acceptance Criteria）
3. 技術可行性評估

需求：${REQUIREMENT}
```

### 快速參考：建立計畫

```prompt
根據以下需求建立開發計畫：

需求：${REQUIREMENT}
技術棧：${TECH_STACK}

請產出：
1. 任務拆解（INVEST 原則）
2. 依賴關係圖
3. 執行順序建議
```

---

## 前端開發

| Prompt | 用途 | 路徑 |
|--------|------|------|
| 設計系統設置 | 建立 Design Token 系統 | `02-development/frontend/prompts/setup-design-system.md` |
| Token 系統 | 實作 CSS Variables | `02-development/frontend/prompts/setup-token-system.md` |
| 建立元件 | 建立符合設計系統的元件 | `02-development/frontend/prompts/create-component.md` |
| 狀態管理 | 設置狀態管理方案 | `02-development/frontend/prompts/setup-state-management.md` |
| 路由設置 | 配置前端路由 | `02-development/frontend/prompts/setup-routing.md` |

### 快速參考：建立元件

```prompt
建立 ${COMPONENT_NAME} 元件：

用途：${PURPOSE}
框架：${FRAMEWORK}
樣式方案：${CSS_SOLUTION}

請包含：
1. TypeScript 介面
2. 元件實作（支援 variant/size）
3. 單元測試
4. 使用範例
```

### 快速參考：設計系統

```prompt
為專案建立設計系統：

設計稿：${DESIGN_REFERENCE}
框架：${FRAMEWORK}
CSS 方案：${CSS_SOLUTION}

請建立：
1. 色彩 Token（primary, secondary, status colors）
2. 字體 Token（heading, body, label）
3. 間距 Token（基於 4px 單位）
4. 圓角和陰影 Token
5. Dark mode 變體
```

---

## 後端開發

| Prompt | 用途 | 路徑 |
|--------|------|------|
| API 設計 | 設計 RESTful API | `02-development/backend/prompts/design-api.md` |
| 建立模型 | 建立資料模型 | `02-development/backend/prompts/create-model.md` |
| 認證設置 | 實作認證授權 | `02-development/backend/prompts/setup-auth.md` |

### 快速參考：API 設計

```prompt
設計 ${RESOURCE} 的 RESTful API：

需求：${REQUIREMENTS}
資料庫：${DATABASE}
ORM：${ORM}

請產出：
1. 端點列表（CRUD）
2. 請求/回應格式
3. 錯誤碼定義
4. OpenAPI 規格
```

### 快速參考：建立模型

```prompt
建立 ${MODEL_NAME} 資料模型：

欄位需求：${FIELDS}
關聯：${RELATIONS}
ORM：${ORM}

請產出：
1. Schema 定義
2. Migration 檔案
3. 驗證規則
4. 常用查詢方法
```

---

## 共用流程

| Prompt | 用途 | 路徑 |
|--------|------|------|
| 功能實作 | 完整功能開發流程 | `02-development/shared/prompts/feature-implementation.md` |
| Bug 修復 | 系統性除錯流程 | `02-development/shared/prompts/bug-fixing.md` |
| 整合測試 | 前後端整合測試 | `02-development/shared/prompts/integration-test.md` |

### 快速參考：Bug 修復

```prompt
修復以下問題：

問題描述：${PROBLEM}
錯誤訊息：${ERROR_MESSAGE}
重現步驟：${STEPS}

請：
1. 先檢查 appendix/pitfalls/ 是否有類似案例
2. 分析可能的根因
3. 提供修復方案
4. 加入防止復發的測試
```

### 快速參考：功能實作

```prompt
實作 ${FEATURE_NAME} 功能：

需求：${REQUIREMENTS}
驗收標準：${ACCEPTANCE_CRITERIA}

請依照以下流程：
1. 確認技術方案
2. 實作核心功能
3. 加入測試
4. 產出 70% MVP
```

---

## 審核階段

| Prompt | 用途 | 路徑 |
|--------|------|------|
| 程式碼審查 | AI 輔助 Code Review | `03-review/prompts/review-code.md` |

### 快速參考：程式碼審查

```prompt
審查以下程式碼變更：

變更檔案：${FILES}
變更目的：${PURPOSE}

請檢查：
1. 程式碼品質（可讀性、維護性）
2. 安全性問題
3. 效能考量
4. 測試覆蓋
5. 設計系統一致性
```

---

## 變數參考

### 通用變數

| 變數 | 說明 | 範例 |
|------|------|------|
| `${PROJECT_NAME}` | 專案名稱 | my-app |
| `${FRAMEWORK}` | 前端框架 | React, Vue 3, Angular |
| `${LANGUAGE}` | 後端語言 | Node.js, Python, Go |
| `${DATABASE}` | 資料庫 | PostgreSQL, MongoDB |

### 前端變數

| 變數 | 說明 | 範例 |
|------|------|------|
| `${CSS_SOLUTION}` | CSS 方案 | Tailwind CSS, CSS Modules |
| `${UI_LIBRARY}` | UI 框架 | shadcn/ui, Vuetify |
| `${COMPONENT_NAME}` | 元件名稱 | Button, Card |

### 後端變數

| 變數 | 說明 | 範例 |
|------|------|------|
| `${ORM}` | ORM 工具 | Prisma, Drizzle |
| `${API_STYLE}` | API 風格 | RESTful, GraphQL |
| `${AUTH_METHOD}` | 認證方式 | JWT, Session |

---

## 使用技巧

### 1. 組合 Prompt

可以將多個 Prompt 組合使用：

```
1. 先執行「需求分析」得到用戶故事
2. 再執行「建立計畫」產出任務
3. 逐一執行對應的開發 Prompt
```

### 2. 迭代優化

```
第一輪：執行 Prompt 產出 70% MVP
第二輪：根據回饋調整細節
第三輪：完善邊界處理和測試
```

### 3. 驗證結果

每個 Prompt 執行後，使用對應的驗證清單確認：
- [ ] 功能正常
- [ ] 樣式正確
- [ ] 測試通過
- [ ] 無 TypeScript 錯誤

## 相關文件

- [踩坑案例索引](./pitfalls/index.md)
- [術語表](./glossary.md)

---
title: "術語表"
id: "glossary"
category: "appendix"
ai_usage:
  - "查詢專有名詞"
  - "統一術語理解"
version: "1.0.0"
last_updated: "2026-01-23"
---

# 術語表

## 文件系統相關

| 術語 | 英文 | 定義 |
|------|------|------|
| 設計系統 | Design System | 一套定義視覺風格和元件規範的完整系統 |
| Design Token | Design Token | 設計系統中的原子化變數（顏色、間距、字體等） |
| 元件庫 | Component Library | 可重用 UI 元件的集合 |
| Prompt 範本 | Prompt Template | 預先設計的 AI 指令範本 |

## 開發流程

| 術語 | 英文 | 定義 |
|------|------|------|
| 需求分析 | Requirement Analysis | 將模糊需求轉換為具體規格的過程 |
| 用戶故事 | User Story | 以用戶視角描述功能需求的格式 |
| 驗收標準 | Acceptance Criteria | 功能完成的可驗證條件 |
| 技術棧 | Tech Stack | 專案使用的技術組合 |
| ADR | Architecture Decision Record | 架構決策記錄 |

## 前端相關

| 術語 | 英文 | 定義 |
|------|------|------|
| 元件 | Component | UI 的可重用構建單位 |
| Props | Props | 傳遞給元件的參數 |
| 狀態 | State | 元件或應用的動態資料 |
| 副作用 | Side Effect | 函數執行時產生的外部影響 |
| SSR | Server-Side Rendering | 伺服器端渲染 |
| SSG | Static Site Generation | 靜態網站生成 |
| CSR | Client-Side Rendering | 客戶端渲染 |

## 後端相關

| 術語 | 英文 | 定義 |
|------|------|------|
| API | Application Programming Interface | 應用程式介面 |
| REST | Representational State Transfer | 一種 API 設計風格 |
| CRUD | Create, Read, Update, Delete | 基本資料操作 |
| ORM | Object-Relational Mapping | 物件關聯對映 |
| JWT | JSON Web Token | 一種認證 Token 格式 |
| RBAC | Role-Based Access Control | 角色基礎存取控制 |

## 測試相關

| 術語 | 英文 | 定義 |
|------|------|------|
| 單元測試 | Unit Test | 測試單一函數或元件 |
| 整合測試 | Integration Test | 測試多個單元的協作 |
| E2E 測試 | End-to-End Test | 模擬完整用戶流程的測試 |
| Mock | Mock | 模擬物件或函數 |
| 測試覆蓋率 | Test Coverage | 程式碼被測試涵蓋的比例 |

## DevOps 相關

| 術語 | 英文 | 定義 |
|------|------|------|
| CI | Continuous Integration | 持續整合 |
| CD | Continuous Deployment | 持續部署 |
| Pipeline | Pipeline | 自動化流程管線 |

## AI 協作相關

| 術語 | 英文 | 定義 |
|------|------|------|
| Prompt | Prompt | 給 AI 的指令或問題 |
| Context | Context | 提供給 AI 的背景資訊 |
| Token | Token | AI 處理文字的基本單位 |
| Hallucination | Hallucination | AI 產生不正確資訊的現象 |

## 變數語法

本文件系統使用 `${VARIABLE_NAME}` 語法表示可替換的值：

| 變數 | 說明 | 範例值 |
|------|------|--------|
| `${FRAMEWORK}` | 前端框架 | React, Vue, Angular |
| `${LANGUAGE}` | 程式語言 | TypeScript, JavaScript |
| `${CSS_SOLUTION}` | CSS 方案 | Tailwind, CSS Modules |
| `${STATE_MANAGER}` | 狀態管理 | Zustand, Redux, Pinia |
| `${API_STYLE}` | API 風格 | REST, GraphQL |
| `${DATABASE}` | 資料庫 | PostgreSQL, MongoDB |
| `${ORM}` | ORM 工具 | Prisma, Drizzle |
| `${TEST_FRAMEWORK}` | 測試框架 | Vitest, Jest |

## 相關文件

- [README](../README.md)
- [QUICKSTART](../QUICKSTART.md)

---
name: detect-context
description: 專案上下文偵測知識庫。提供技術棧偵測規則、專案狀態判斷標準、常見專案結構模式。
---

# Detect Context Skill

這個 skill 是上下文偵測的知識庫，提供偵測規則和判斷標準。

## 概述

本 skill 定義了：

1. 技術棧偵測規則（哪些檔案對應哪種技術）
2. 專案狀態判斷標準
3. 常見專案結構模式
4. Fallback 策略指引

## 技術棧偵測規則

### 前端框架偵測

**偵測來源**：`package.json` 的 `dependencies` 和 `devDependencies`

```yaml
frontendRules:
  # React 生態系
  - pattern: '"react":'
    result: React
    confidence: high

  - pattern: '"next":'
    result: Next.js
    confidence: high
    note: "Next.js 是基於 React 的框架"

  # Vue 生態系
  - pattern: '"vue":'
    result: Vue
    confidence: high

  - pattern: '"nuxt":'
    result: Nuxt.js
    confidence: high
    note: "Nuxt.js 是基於 Vue 的框架"

  # Angular
  - pattern: '"@angular/core":'
    result: Angular
    confidence: high

  # 其他框架
  - pattern: '"svelte":'
    result: Svelte
    confidence: high

  - pattern: '"solid-js":'
    result: Solid.js
    confidence: high

  - pattern: '"astro":'
    result: Astro
    confidence: high
```

### UI 庫偵測

**偵測來源**：`package.json` + 設定檔

```yaml
uiLibraryRules:
  # Tailwind CSS
  - pattern: '"tailwindcss":'
    configFile: "tailwind.config.js"
    result: Tailwind CSS
    confidence: high

  # Material-UI (MUI)
  - pattern: '"@mui/material":'
    result: Material-UI
    confidence: high

  # Ant Design
  - pattern: '"antd":'
    result: Ant Design
    confidence: high

  # Vuetify
  - pattern: '"vuetify":'
    result: Vuetify
    confidence: high

  # Chakra UI
  - pattern: '"@chakra-ui/react":'
    result: Chakra UI
    confidence: high

  # Bootstrap
  - pattern: '"bootstrap":'
    result: Bootstrap
    confidence: medium
    note: "需確認是否有搭配 React/Vue wrapper"

  # shadcn/ui
  - pattern: "components/ui/"
    fileExists: true
    result: shadcn/ui
    confidence: medium
    note: "shadcn/ui 不在 package.json，需檢查目錄結構"
```

### 後端語言偵測

**偵測來源**：專案根目錄的標識檔案

```yaml
backendRules:
  # Python
  - file: "requirements.txt"
    result: Python
    confidence: high

  - file: "pyproject.toml"
    result: Python
    confidence: high

  - file: "Pipfile"
    result: Python
    confidence: high

  # Go
  - file: "go.mod"
    result: Go
    confidence: high

  # Rust
  - file: "Cargo.toml"
    result: Rust
    confidence: high

  # .NET (C#)
  - file: "*.csproj"
    result: ".NET (C#)"
    confidence: high

  - file: "*.sln"
    result: ".NET (C#)"
    confidence: medium

  # Java
  - file: "pom.xml"
    result: Java (Maven)
    confidence: high

  - file: "build.gradle"
    result: Java (Gradle)
    confidence: high

  # Node.js (純後端)
  - file: "package.json"
    pattern: '"express":|"fastify":|"@nestjs/core":|"hono":'
    result: Node.js
    confidence: medium
    note: "需要確認是否為純後端專案"

  # Ruby
  - file: "Gemfile"
    result: Ruby
    confidence: high

  # PHP
  - file: "composer.json"
    result: PHP
    confidence: high
```

### 資料庫偵測

**偵測來源**：`docker-compose.yml`、`.env`、設定檔

```yaml
databaseRules:
  # PostgreSQL
  - pattern: "postgres"
    files: ["docker-compose.yml", ".env", "database.yml"]
    result: PostgreSQL
    confidence: high

  # MySQL
  - pattern: "mysql"
    files: ["docker-compose.yml", ".env", "database.yml"]
    result: MySQL
    confidence: high

  # MongoDB
  - pattern: "mongo"
    files: ["docker-compose.yml", ".env"]
    result: MongoDB
    confidence: high

  # Redis
  - pattern: "redis"
    files: ["docker-compose.yml", ".env"]
    result: Redis
    confidence: high
    note: "通常作為快取，可能還有主資料庫"

  # SQLite
  - pattern: "sqlite"
    files: [".env", "database.yml"]
    result: SQLite
    confidence: medium

  # Supabase
  - pattern: "supabase"
    files: ["package.json", ".env"]
    result: PostgreSQL (Supabase)
    confidence: high

  # PlanetScale
  - pattern: "planetscale"
    files: [".env"]
    result: MySQL (PlanetScale)
    confidence: high
```

## 專案狀態判斷標準

### Git 狀態

```yaml
gitStatusRules:
  clean:
    condition: "git status --porcelain 輸出為空"
    meaning: "工作區乾淨，可以開始新任務"

  dirty:
    condition: "git status --porcelain 有輸出"
    meaning: "有未提交的修改"
    recommendations:
      - "先提交或 stash 當前修改"
      - "使用 /commit 建立提交"

  untracked:
    condition: "有 ?? 開頭的行"
    meaning: "有未追蹤的新檔案"
```

### 最近工作方向分析

```yaml
recentWorkRules:
  frontend:
    keywords:
      - "component"
      - "ui"
      - "style"
      - "frontend"
      - "css"
      - "design"
      - "layout"
    result: "前端開發"

  backend:
    keywords:
      - "api"
      - "endpoint"
      - "backend"
      - "database"
      - "model"
      - "service"
      - "controller"
    result: "後端開發"

  bugfix:
    keywords:
      - "fix"
      - "bug"
      - "hotfix"
      - "patch"
      - "issue"
    result: "Bug 修復"

  testing:
    keywords:
      - "test"
      - "spec"
      - "coverage"
      - "jest"
      - "vitest"
    result: "測試相關"

  documentation:
    keywords:
      - "docs"
      - "readme"
      - "documentation"
      - "comment"
    result: "文件更新"

  infrastructure:
    keywords:
      - "ci"
      - "cd"
      - "docker"
      - "deploy"
      - "config"
    result: "基礎設施"
```

### 設計系統狀態

```yaml
designSystemRules:
  established:
    indicators:
      - directory: "src/design-system/"
      - directory: "src/tokens/"
      - directory: "src/theme/"
      - file: "tokens.css"
      - file: "design-tokens.ts"
      - file: "theme.ts"
    result: "已建立"
    recommendations:
      - "可直接建立元件"
      - "確認遵循現有 token 規範"

  partial:
    indicators:
      - hasComponents: true
      - hasTokens: false
    result: "部分建立（缺少 Token）"
    recommendations:
      - "建議先建立 Design Token 系統"
      - "使用 references/02-development/frontend/token-system.md"

  notEstablished:
    indicators:
      - noDesignSystem: true
    result: "未建立"
    recommendations:
      - "建議使用 /ai-coding-workflow:start 建立設計系統"
      - "先建立 Token，再建立元件"
```

### 測試覆蓋狀態

```yaml
testCoverageRules:
  hasTesting:
    indicators:
      - directory: "__tests__/"
      - directory: "tests/"
      - directory: "test/"
      - directory: "spec/"
      - filePattern: "*.test.*"
      - filePattern: "*.spec.*"
    result: "有測試"

  noTesting:
    indicators:
      - noTestFiles: true
    result: "未知/無測試"
    recommendations:
      - "建議建立測試框架"
      - "使用 TDD 方式開發"
```

## 常見專案結構模式

### React + Tailwind + Node.js

```
project/
├── package.json          # 包含 react, tailwindcss
├── tailwind.config.js    # Tailwind 設定
├── src/
│   ├── components/       # React 元件
│   ├── styles/           # 全域樣式
│   └── pages/            # 頁面
├── api/                  # Node.js API (如果是全端)
└── .env                  # 環境變數
```

### Vue + Vuetify + Python

```
project/
├── frontend/
│   ├── package.json      # 包含 vue, vuetify
│   └── src/
└── backend/
    ├── requirements.txt  # Python 依賴
    └── app/
```

### Next.js + PostgreSQL

```
project/
├── package.json          # 包含 next, prisma
├── prisma/
│   └── schema.prisma     # 資料庫 schema
├── docker-compose.yml    # PostgreSQL 容器
└── src/
    ├── app/              # Next.js App Router
    └── components/
```

## Fallback 策略

當自動偵測失敗時，應詢問用戶以下問題：

### 問題順序

1. **專案類型**
   - 純前端（SPA）
   - 純後端（API）
   - 全端
   - 其他

2. **前端框架**（如果適用）
   - React
   - Vue
   - Angular
   - Next.js
   - Nuxt.js
   - 其他
   - 無

3. **後端語言**（如果適用）
   - Node.js
   - Python
   - Go
   - C# (.NET)
   - Java
   - 其他
   - 無

4. **資料庫**（如果適用）
   - PostgreSQL
   - MySQL
   - MongoDB
   - SQLite
   - 其他
   - 無

### AskUserQuestion 範例

```
使用 AskUserQuestion tool：

questions:
  - question: "無法自動偵測前端框架，請選擇您使用的框架："
    header: "前端框架"
    options:
      - label: "React"
        description: "包含 Create React App、Vite + React"
      - label: "Vue"
        description: "Vue 2 或 Vue 3"
      - label: "Next.js"
        description: "React 全端框架"
      - label: "無前端"
        description: "純後端專案"
    multiSelect: false
```

## 輸出格式規範

偵測完成後，應輸出以下結構：

```json
{
  "techStack": {
    "frontend": "React | Vue | Angular | Next.js | null",
    "uiLibrary": "Tailwind CSS | Material-UI | null",
    "backend": "Node.js | Python | Go | null",
    "database": "PostgreSQL | MySQL | null",
    "detected": true | false
  },
  "projectStatus": {
    "gitStatus": "clean | dirty",
    "recentWork": "前端開發 | 後端開發 | Bug 修復 | null",
    "designSystem": "已建立 | 部分建立 | 未建立",
    "testCoverage": "有測試 | 未知"
  },
  "recommendations": [
    "string - 具體建議"
  ],
  "variables": {
    "FRAMEWORK": "string",
    "UI_LIBRARY": "string",
    "LANGUAGE": "string",
    "DATABASE": "string"
  }
}
```

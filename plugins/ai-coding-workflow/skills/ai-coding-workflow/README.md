# AI Coding Workflow Skill

> 給軟體團隊的 AI Agent 使用的標準化開發工作流程系統

## 這是什麼？

AI Coding Workflow 是一個符合 Claude Code Skills 官方規範的**可分發工具**，讓團隊的 AI Agent（Claude Code、Cursor 等）能夠依照團隊統一的最佳實踐來開發。

## 目錄結構

```
ai-coding-workflow/
├── SKILL.md                    # ⭐ 主要 skill 文件（統一入口）
├── README.md                   # 本文件
├── QUICKSTART.md               # 快速開始指南
│
├── references/                 # 📚 知識庫
│   ├── 01-planning/            # 規劃階段
│   ├── 02-development/         # 開發階段
│   │   ├── frontend/           # 前端開發
│   │   ├── backend/            # 後端開發
│   │   └── shared/             # 共用流程
│   ├── 03-review/              # 審核階段
│   └── appendix/               # 附錄
│       ├── pitfalls/           # 踩坑案例
│       ├── success-cases/      # 成功案例
│       └── tech-stack-examples/# 技術棧範例
│
├── scripts/                    # 輔助腳本
├── templates/                  # 模板
└── assets/                     # 資源
```

## 安裝

### 使用 degit（推薦）

```bash
# 1. 安裝 degit（如果還沒有）
npm install -g degit

# 2. 複製到你的專案
cd /path/to/your-project
degit ericcai0814/ai-workflow-design/.claude/skills/ai-coding-workflow .claude/skills/ai-coding-workflow
```

### 手動複製

```bash
# 1. Clone repo
git clone https://github.com/ericcai0814/ai-workflow-design.git

# 2. 複製 skill
cp -r ai-workflow-design/.claude/skills/ai-coding-workflow /path/to/your-project/.claude/skills/

# 3. 清理
rm -rf ai-workflow-design
```

## 使用方式

### 手動調用

```
/ai-coding-workflow
```

### 自動觸發

當你說以下關鍵字時，skill 會自動觸發：

| 關鍵字 | 任務類型 |
|--------|----------|
| 分析需求、建立計畫 | 規劃 |
| 設計系統、建立元件 | 前端開發 |
| API 設計、資料庫 | 後端開發 |
| 程式碼審查 | 審核 |
| 問題、錯誤、bug | 排查 |

### 範例

```
用戶：「幫我建立一個 Button 元件」
      ↓
AI 讀取 references/02-development/frontend/component-development.md
      ↓
依照流程執行（Design Token → 規格確認 → 實作 → 驗證）
      ↓
產出 70% MVP
      ↓
「MVP 已完成，請檢查後告訴我需要調整的地方」
```

## 70% MVP 標準

| 項目 | MVP 包含 | 人工迭代 |
|------|----------|----------|
| 檔案結構 | ✅ 正確位置、正確命名 | - |
| 基本功能 | ✅ 核心功能可運行 | 功能調整、功能疊加 |
| 樣式 | ✅ 套用 Design Token | 細節微調 |
| 邊界處理 | ⏸️ 基本處理 | 完整邊界處理 |

## 輔助腳本

```bash
# 建立元件檔案結構
./scripts/create-component.sh Button

# 建立 DBML 資料庫定義
./scripts/create-dbml.sh users

# 執行測試
./scripts/run-tests.sh
```

## 版本

| 版本 | 日期 | 變更 |
|------|------|------|
| 1.0.0 | 2026-01-23 | 初始版本，符合官方 Skills 規範 |

## 相關連結

- [Claude Code Skills 官方文件](https://code.claude.com/docs/en/skills)
- [GitHub Repo](https://github.com/ericcai0814/ai-workflow-design)

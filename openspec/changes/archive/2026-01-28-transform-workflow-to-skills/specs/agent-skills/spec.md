# Agent Skills Capability

將 AI Coding Workflow 文件轉化為可執行的 Claude Code Skills。

## ADDED Requirements

### Requirement: REQ-SKILL-001 Skill 基本結構

每個 Skill MUST 包含：名稱、描述、執行流程、產出標準。

#### Scenario: 建立符合規範的 Skill 文件

**Given** 需要建立一個新的 Skill
**When** 建立 `.claude/skills/{skill-name}.md` 文件
**Then** 文件必須包含：
- YAML frontmatter（name, description）
- 執行流程（步驟化）
- 產出標準（70% MVP 定義）
- 完成提示

---

### Requirement: REQ-SKILL-002 Skill 知識庫參考

Skill MUST 能夠參考 ai-coding-workflow 文件作為知識庫。

#### Scenario: Skill 讀取知識庫文件

**Given** `/create-component` Skill 執行中
**When** 需要元件開發規範
**Then** 使用 Read 工具讀取 `ai-coding-workflow/02-development/frontend/component-development.md`
**And** 根據文件的流程執行

---

### Requirement: REQ-SKILL-003 MVP 產出標準

Skill 執行後 MUST 產出 70% MVP，明確標示需人工迭代的部分。

#### Scenario: 元件建立 MVP 產出

**Given** 執行 `/create-component Button`
**When** Skill 完成執行
**Then** 產出包含：
- 檔案結構正確
- 基本 props 定義
- 套用 Design Token
- 標示需人工迭代項目
**And** 顯示「MVP 已完成，請檢查後告訴我需要調整的地方」

---

### Requirement: REQ-SKILL-004 核心 Skills 清單

系統 MUST 提供以下核心 Skills。

#### Scenario: 核心 Skills 可用

**Given** 團隊專案已設置 Skills
**When** 查看可用 Skills
**Then** 至少包含：
- `/create-component` 建立前端元件
- `/create-api` 建立 API 端點
- `/create-model` 建立資料模型
- `/review-code` 程式碼審查

---

### Requirement: REQ-SKILL-005 防呆檢查整合

Skill MUST 整合踩坑案例作為防呆檢查。

#### Scenario: 執行時檢查常見問題

**Given** `/create-component` 執行中
**When** 產出元件程式碼
**Then** 自動檢查：
- 是否使用 Design Token 非硬編碼顏色
- 是否包含 data-testid
- 是否有 TypeScript 型別定義
**And** 若違反則提示修正

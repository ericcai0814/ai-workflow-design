---
title: "問題排查與除錯對話"
id: "session-debugging"
category: "appendix"
scenario: "debugging"
tags:
  - debugging
  - troubleshooting
  - prompts
ai_usage:
  - "排查 Bug"
  - "分析錯誤訊息"
  - "除錯策略"
version: "1.0.0"
last_updated: "2026-01"
---

# Session 03: 問題排查與除錯

展示如何與 AI 協作進行有效的問題排查和除錯。

## 背景說明

**場景**：生產環境出現間歇性錯誤，需要快速定位和修復。
**目標**：系統性地排查問題，找到根因並修復。
**技術棧**：Next.js + Prisma + PostgreSQL

## 關鍵對話

### 對話片段 1：提供完整錯誤資訊

> **User**: 我們的 API 間歇性出現 500 錯誤，錯誤訊息是：
>
> ```
> Error: Connection terminated unexpectedly
>     at Connection.parseE (node_modules/pg/lib/connection.js:614:13)
>     at Socket.<anonymous> (node_modules/pg/lib/connection.js:391:19)
> ```
>
> 這是什麼問題？怎麼修？

> **AI**: 這是 PostgreSQL 連線被意外中斷的錯誤。常見原因：
>
> 1. **連線池耗盡**：連線數超過資料庫限制
> 2. **連線超時**：長時間閒置的連線被資料庫關閉
> 3. **網路問題**：資料庫和應用之間的網路不穩定
>
> 需要更多資訊來判斷。可以告訴我：
>
> - 使用什麼 ORM？（Prisma、TypeORM...）
> - 部署環境？（Vercel、自建伺服器...）
> - 錯誤發生的頻率和時間點？

> **User**: 用 Prisma，部署在 Vercel serverless。錯誤大約每小時出現 2-3 次，沒有特定規律。

> **AI**: 找到問題了！**Serverless + Prisma** 是經典的連線池問題。
>
> **原因**：
>
> - Serverless 函數每次冷啟動會建立新連線
> - 連線沒有正確關閉或重用
> - 累積的「殭屍連線」耗盡資料庫連線數
>
> **解決方案**：
>
> ```typescript
> // lib/prisma.ts
> import { PrismaClient } from "@prisma/client";
>
> const globalForPrisma = globalThis as unknown as {
>   prisma: PrismaClient | undefined;
> };
>
> export const prisma =
>   globalForPrisma.prisma ??
>   new PrismaClient({
>     log: process.env.NODE_ENV === "development" ? ["query"] : [],
>   });
>
> if (process.env.NODE_ENV !== "production") {
>   globalForPrisma.prisma = prisma;
> }
> ```
>
> 這確保每個 serverless 實例只建立一個 Prisma client。

**💡 學習重點 1**：**提供完整上下文**

- 用戶一開始只給錯誤訊息，AI 主動詢問更多資訊
- 第二次提供 ORM、部署環境、頻率後，AI 才能準確判斷
- 模式：「錯誤是 [X]，環境是 [Y]，頻率是 [Z]」

---

### 對話片段 2：系統性排查

> **User**: 修改後還是有問題。現在錯誤變成：
>
> ```
> Error: Too many connections
> ```
>
> 連線數還是超過了。

> **AI**: 需要進一步排查。讓我們系統性地檢查：
>
> **1. 確認目前連線數**
>
> ```sql
> SELECT count(*) FROM pg_stat_activity WHERE datname = 'your_db';
> ```
>
> **2. 檢查 Prisma 連線池設定**
>
> ```
> DATABASE_URL="postgresql://...?connection_limit=10&pool_timeout=20"
> ```
>
> **3. 確認 Vercel 的並發設定**
>
> - Hobby: 最多 10 concurrent executions
> - Pro: 最多 1000 concurrent executions
>
> 可以執行第一個 SQL 查詢，告訴我目前有多少連線嗎？

> **User**: 執行結果是 87 個連線。資料庫最多允許 100 個。

> **AI**: 87/100 已經很接近上限了。問題確認：**連線沒有正確釋放**。
>
> **立即行動**：
>
> ```sql
> -- 強制關閉閒置連線（先救火）
> SELECT pg_terminate_backend(pid)
> FROM pg_stat_activity
> WHERE datname = 'your_db'
> AND state = 'idle'
> AND query_start < now() - interval '5 minutes';
> ```
>
> **長期修復**：在 Prisma schema 加入連線池限制
>
> ```
> DATABASE_URL="postgresql://...?connection_limit=5&pool_timeout=10"
> ```
>
> 為什麼用 5？
>
> - Vercel 同時可能有 ~20 個 serverless 實例
> - 20 × 5 = 100，剛好是資料庫上限
> - 留一點 buffer 給其他工具（如 Prisma Studio）

**💡 學習重點 2**：**用數據驗證假設**

- AI 請用戶執行 SQL 取得實際數據
- 87/100 的數字確認了問題，不是猜測
- 模式：「執行 [某個指令] 告訴我結果，我需要驗證假設」

---

### 對話片段 3：根因分析

> **User**: 連線池設成 5 後穩定了。但我想知道，為什麼之前會累積這麼多連線？

> **AI**: 好問題！讓我分析根因：
>
> **Serverless 連線生命週期**
>
> ```
> Cold Start → 建立連線 → 執行查詢 → 函數休眠（連線保持）
>                                         ↓
>                                    多個實例累積
>                                         ↓
>                                    連線池耗盡
> ```
>
> **你之前的程式碼問題**
>
> ```typescript
> // ❌ 錯誤：每次請求都建立新 client
> export async function handler() {
>   const prisma = new PrismaClient(); // 每次 new 一個
>   await prisma.user.findMany();
>   // 沒有 disconnect，連線殘留
> }
> ```
>
> **修正後**
>
> ```typescript
> // ✅ 正確：重用 global client
> import { prisma } from "@/lib/prisma";
>
> export async function handler() {
>   await prisma.user.findMany();
>   // 使用共享的 client，連線會被重用
> }
> ```
>
> **根因總結**：
>
> 1. Serverless 環境沒有「程序結束」的概念
> 2. 每次 new PrismaClient() 都建立新連線
> 3. 沒有 disconnect 導致連線累積
> 4. 最終超過資料庫限制

> **User**: 懂了。有沒有辦法監控連線數，預防這種問題？

> **AI**: 有幾個方法：
>
> **1. 資料庫層監控（推薦）**
>
> ```sql
> -- 建立告警規則：連線數 > 80 就通知
> SELECT count(*) as connections FROM pg_stat_activity;
> ```
>
> **2. 應用層日誌**
>
> ```typescript
> const prisma = new PrismaClient({
>   log: [
>     { level: "query", emit: "event" },
>     { level: "error", emit: "stdout" },
>   ],
> });
>
> prisma.$on("query", (e) => {
>   console.log(`Query: ${e.query} | Duration: ${e.duration}ms`);
> });
> ```
>
> **3. 使用 Prisma Data Proxy（Serverless 最佳實踐）**
>
> - Prisma 官方的連線池服務
> - 自動管理連線，適合 Serverless

**💡 學習重點 3**：**追問根因**

- 問題解決後，用戶追問「為什麼會這樣」
- 理解根因可以預防類似問題
- 模式：「問題解決了，但我想知道為什麼會發生這個問題？」

---

### 對話片段 4：有效的除錯 Prompt

> **User**: 以後遇到類似問題，我應該怎麼問你才能更快找到答案？

> **AI**: 好問題！有效的除錯 Prompt 包含這些要素：
>
> **除錯 Prompt 模板**
>
> ```
> ## 問題描述
> [一句話描述症狀]
>
> ## 錯誤訊息
> [完整的錯誤訊息和 stack trace]
>
> ## 環境資訊
> - 技術棧：[框架、ORM、資料庫]
> - 部署環境：[Vercel、AWS、自建]
> - 發生頻率：[每次/間歇/特定條件]
>
> ## 已嘗試
> [列出已經試過的方法]
>
> ## 相關程式碼
> [貼上可能有問題的程式碼片段]
> ```
>
> **範例**
>
> ```
> ## 問題描述
> API 間歇性回傳 500 錯誤
>
> ## 錯誤訊息
> Error: Connection terminated unexpectedly
>     at Connection.parseE...
>
> ## 環境資訊
> - 技術棧：Next.js + Prisma + PostgreSQL
> - 部署環境：Vercel serverless
> - 發生頻率：每小時 2-3 次，無規律
>
> ## 已嘗試
> - 重啟應用（無效）
> - 檢查資料庫連線字串（正確）
>
> ## 相關程式碼
> // lib/db.ts
> export const prisma = new PrismaClient();
> ```
>
> 這樣的格式讓 AI 能快速理解問題全貌，減少來回詢問。

**💡 學習重點 4**：**學習有效的提問方式**

- 用戶主動詢問如何更有效地提問
- AI 提供了可複用的模板
- 模式：「以後遇到 [類型問題]，我應該怎麼問？」

---

## 學習重點總結

| #   | 模式           | 說明                   | 適用場景       |
| --- | -------------- | ---------------------- | -------------- |
| 1   | 提供完整上下文 | 錯誤訊息 + 環境 + 頻率 | 開始除錯時     |
| 2   | 用數據驗證     | 執行指令取得實際數據   | 需要確認假設時 |
| 3   | 追問根因       | 問題解決後理解為什麼   | 預防類似問題   |
| 4   | 學習提問方式   | 詢問有效的 Prompt 模板 | 提升除錯效率   |

## 除錯 Prompt 速查

```markdown
## 問題：[一句話描述]

## 錯誤訊息

[完整錯誤]

## 環境

- 技術棧：
- 部署環境：
- 發生頻率：

## 已嘗試

-

## 相關程式碼
```

## 延伸閱讀

- [Bug 修復流程](../../02-development/shared/prompts/bug-fixing.md)
- [測試規範](../../02-development/shared/testing.md)

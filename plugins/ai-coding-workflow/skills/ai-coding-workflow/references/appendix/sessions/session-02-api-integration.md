---
title: "API 整合協作對話"
id: "session-api-integration"
category: "appendix"
scenario: "api-integration"
tags:
  - api
  - integration
  - contract
ai_usage:
  - "設計 API 端點"
  - "前後端協作"
  - "定義資料契約"
version: "1.0.0"
last_updated: "2026-01"
---

# Session 02: API 整合協作

展示前後端開發時如何與 AI 協作定義 API 契約和整合策略。

## 背景說明

**場景**：建立用戶管理功能，需要前後端同時開發。
**目標**：定義清晰的 API 契約，確保前後端可以平行開發。
**技術棧**：Next.js API Routes + React Query

## 關鍵對話

### 對話片段 1：API 設計起點

> **User**: 我需要建立用戶管理的 API，包含 CRUD 操作。後端用 Next.js API Routes，前端會用 React Query。請幫我設計 API 結構。

> **AI**: 好的，讓我設計 RESTful API 結構：
>
> **端點設計**
> | Method | Path | 用途 |
> |--------|------|------|
> | GET | `/api/users` | 取得用戶列表 |
> | GET | `/api/users/:id` | 取得單一用戶 |
> | POST | `/api/users` | 建立用戶 |
> | PUT | `/api/users/:id` | 更新用戶 |
> | DELETE | `/api/users/:id` | 刪除用戶 |
>
> **回應格式**
>
> ```typescript
> // 成功
> { success: true, data: T }
>
> // 失敗
> { success: false, error: string, code: string }
> ```
>
> 要我先產出 TypeScript 型別定義嗎？這樣前後端可以共用。

> **User**: 對，先定義型別。另外列表 API 需要支援分頁和搜尋。

**💡 學習重點 1**：**先定義契約再實作**

- 用戶要求先產出型別定義，建立「契約優先」的開發模式
- 模式：「先定義 [型別/介面]，這樣 [前後端/多人] 可以平行開發」

---

### 對話片段 2：定義資料契約

> **AI**: 了解，以下是完整的型別定義：
>
> ```typescript
> // types/user.ts
>
> // 基礎用戶型別
> export interface User {
>   id: string;
>   email: string;
>   name: string;
>   role: "admin" | "user";
>   createdAt: string;
>   updatedAt: string;
> }
>
> // 建立用戶請求
> export interface CreateUserDto {
>   email: string;
>   name: string;
>   password: string;
>   role?: "admin" | "user";
> }
>
> // 更新用戶請求
> export interface UpdateUserDto {
>   name?: string;
>   role?: "admin" | "user";
> }
>
> // 列表查詢參數
> export interface UserListParams {
>   page?: number;
>   limit?: number;
>   search?: string;
>   role?: "admin" | "user";
> }
>
> // 分頁回應
> export interface PaginatedResponse<T> {
>   data: T[];
>   meta: {
>     total: number;
>     page: number;
>     limit: number;
>     totalPages: number;
>   };
> }
>
> // API 回應
> export type ApiResponse<T> =
>   | { success: true; data: T }
>   | { success: false; error: string; code: string };
> ```
>
> 這些型別可以放在共用目錄，前後端都能 import。

> **User**: 型別看起來不錯。password 欄位在回應中不應該出現，你確認一下？

> **AI**: 你說得對！`User` 型別是給回應用的，不應該包含 password。我來修正：
>
> ```typescript
> // 資料庫完整用戶（內部使用）
> export interface UserEntity extends User {
>   passwordHash: string;
> }
>
> // API 回應用戶（不含敏感資料）
> export interface User {
>   id: string;
>   email: string;
>   name: string;
>   role: "admin" | "user";
>   createdAt: string;
>   updatedAt: string;
>   // ✅ 沒有 password 相關欄位
> }
> ```
>
> 感謝提醒，這是常見的安全疏忽。

**💡 學習重點 2**：**主動質疑 AI 輸出**

- 用戶發現 password 不應出現在回應，主動提出質疑
- AI 產出可能有疏漏，用戶的領域知識是重要的檢查點
- 模式：「[X] 欄位在 [Y] 中不應該出現，你確認一下？」

---

### 對話片段 3：前端整合策略

> **User**: 型別定好了，現在幫我建立 React Query 的 hooks，要能處理 loading、error 狀態。

> **AI**: 好的，以下是 React Query hooks：
>
> ```typescript
> // hooks/useUsers.ts
> import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
> import type { User, UserListParams, CreateUserDto } from "@/types/user";
>
> const USERS_KEY = ["users"];
>
> // 列表
> export function useUsers(params?: UserListParams) {
>   return useQuery({
>     queryKey: [...USERS_KEY, params],
>     queryFn: () => fetchUsers(params),
>   });
> }
>
> // 單一用戶
> export function useUser(id: string) {
>   return useQuery({
>     queryKey: [...USERS_KEY, id],
>     queryFn: () => fetchUser(id),
>     enabled: !!id,
>   });
> }
>
> // 建立
> export function useCreateUser() {
>   const queryClient = useQueryClient();
>   return useMutation({
>     mutationFn: (data: CreateUserDto) => createUser(data),
>     onSuccess: () => {
>       queryClient.invalidateQueries({ queryKey: USERS_KEY });
>     },
>   });
> }
> ```

> **User**: `enabled: !!id` 這行是什麼意思？

> **AI**: 好問題！`enabled: !!id` 的作用是：
>
> - `!!id` 將 id 轉換為 boolean（有值為 true，空值為 false）
> - 當 `enabled: false` 時，React Query 不會執行這個查詢
>
> **實際場景**：
>
> ```tsx
> // 用戶詳情頁
> const { id } = useParams(); // 可能是 undefined
> const { data } = useUser(id); // id 為 undefined 時不會發請求
> ```
>
> 這避免了「id 還沒準備好就發請求」的問題。

**💡 學習重點 3**：**不懂就問**

- 用戶對 `!!id` 不理解，直接詢問
- AI 提供了解釋和實際場景，加深理解
- 模式：「[某段程式碼] 是什麼意思？」

---

### 對話片段 4：錯誤處理策略

> **User**: 如果 API 回傳錯誤，前端應該怎麼處理？有沒有統一的錯誤處理模式？

> **AI**: 建議用這個模式統一處理：
>
> **1. API 層：統一錯誤格式**
>
> ```typescript
> // lib/api.ts
> class ApiError extends Error {
>   constructor(
>     message: string,
>     public code: string,
>     public status: number,
>   ) {
>     super(message);
>   }
> }
>
> async function apiClient<T>(url: string, options?: RequestInit): Promise<T> {
>   const res = await fetch(url, options);
>   const json = await res.json();
>
>   if (!json.success) {
>     throw new ApiError(json.error, json.code, res.status);
>   }
>
>   return json.data;
> }
> ```
>
> **2. Hook 層：錯誤狀態**
>
> ```tsx
> const { data, error, isError } = useUsers();
>
> if (isError) {
>   return <ErrorMessage error={error as ApiError} />;
> }
> ```
>
> **3. UI 層：錯誤顯示元件**
>
> ```tsx
> function ErrorMessage({ error }: { error: ApiError }) {
>   const messages: Record<string, string> = {
>     USER_NOT_FOUND: "找不到用戶",
>     UNAUTHORIZED: "請先登入",
>     VALIDATION_ERROR: "資料格式錯誤",
>   };
>   return <Alert>{messages[error.code] || error.message}</Alert>;
> }
> ```

**💡 學習重點 4**：**詢問最佳實踐**

- 用戶問「有沒有統一的模式」，請 AI 提供 best practice
- 模式：「[某個問題] 有沒有統一的處理模式？」

---

## 學習重點總結

| #   | 模式         | 說明                     | 適用場景             |
| --- | ------------ | ------------------------ | -------------------- |
| 1   | 契約優先     | 先定義型別再實作         | 多人協作、前後端分離 |
| 2   | 主動質疑     | 檢查 AI 輸出的正確性     | 涉及安全、業務邏輯時 |
| 3   | 不懂就問     | 對不理解的程式碼直接詢問 | 學習新技術時         |
| 4   | 詢問最佳實踐 | 請 AI 提供統一的處理模式 | 架構設計時           |

## 延伸閱讀

- [API 設計規範](../../02-development/backend/api-design.md)
- [前後端整合指南](../../02-development/shared/integration.md)

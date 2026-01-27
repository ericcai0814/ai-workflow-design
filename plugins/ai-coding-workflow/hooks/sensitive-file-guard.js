#!/usr/bin/env node

/**
 * sensitive-file-guard.js
 *
 * Claude Code PreToolUse Hook
 * 阻止修改敏感檔案，包括：
 * - .env* (環境變數)
 * - credentials* (憑證)
 * - secrets* (機密)
 * - *.pem, *.key (金鑰)
 *
 * 輸入：stdin JSON (hook 格式)
 * 輸出：exit 0 (允許) 或 exit 2 (阻止並顯示錯誤訊息)
 */

const path = require('path');

// 敏感檔案模式
const SENSITIVE_PATTERNS = [
  /^\.env($|\..*)$/i,           // .env, .env.local, .env.production, etc.
  /^credentials/i,              // credentials, credentials.json, etc.
  /^secrets/i,                  // secrets, secrets.yaml, etc.
  /\.pem$/i,                    // *.pem
  /\.key$/i,                    // *.key
  /^\.ssh\//i,                  // .ssh/* 目錄下的檔案
  /id_rsa/i,                    // SSH 私鑰
  /id_ed25519/i,                // SSH 私鑰
  /\.p12$/i,                    // PKCS#12 憑證
  /\.pfx$/i,                    // PFX 憑證
  /private.*key/i,              // 任何包含 private key 的檔案
];

function isSensitiveFile(filePath) {
  if (!filePath) return false;

  const fileName = path.basename(filePath);
  const relativePath = filePath.replace(process.cwd(), '').replace(/^\//, '');

  return SENSITIVE_PATTERNS.some(pattern =>
    pattern.test(fileName) || pattern.test(relativePath)
  );
}

async function main() {
  let input = '';

  // 從 stdin 讀取 JSON
  for await (const chunk of process.stdin) {
    input += chunk;
  }

  if (!input.trim()) {
    // 沒有輸入，允許繼續
    process.exit(0);
  }

  let hookData;
  try {
    hookData = JSON.parse(input);
  } catch (e) {
    // JSON 解析失敗，允許繼續（不阻止）
    process.exit(0);
  }

  // 取得檔案路徑（支援不同的 hook 格式）
  const filePath =
    hookData.tool_input?.file_path ||
    hookData.tool_input?.filePath ||
    hookData.file_path ||
    hookData.filePath;

  if (isSensitiveFile(filePath)) {
    // 輸出阻止訊息到 stderr
    console.error(`[sensitive-file-guard] BLOCKED: Modification of sensitive file is not allowed.`);
    console.error(`File: ${filePath}`);
    console.error('');
    console.error('This file matches a sensitive pattern:');
    console.error('  - .env* (environment variables)');
    console.error('  - credentials* (credentials)');
    console.error('  - secrets* (secrets)');
    console.error('  - *.pem, *.key (certificates/keys)');
    console.error('');
    console.error('If you need to modify this file, please do so manually.');

    // Exit code 2 表示阻止操作
    process.exit(2);
  }

  // 允許操作
  process.exit(0);
}

main();

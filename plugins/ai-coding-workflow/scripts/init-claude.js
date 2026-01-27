#!/usr/bin/env node

/**
 * init-claude.js
 *
 * 初始化 Claude Code 設定檔
 * 讀取 .claude/settings.example.json，替換 $PWD 為實際路徑，
 * 生成 .claude/settings.json
 */

const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const examplePath = path.join(projectRoot, ".claude", "settings.example.json");
const localPath = path.join(projectRoot, ".claude", "settings.local.json");

function main() {
  // 檢查 example 檔案是否存在
  if (!fs.existsSync(examplePath)) {
    console.error("Error: .claude/settings.example.json not found");
    console.error(
      "Please ensure you are running this script from the project root directory.",
    );
    process.exit(1);
  }

  // 檢查 local 檔案是否已存在
  if (fs.existsSync(localPath)) {
    console.log("Warning: .claude/settings.local.json already exists.");
    console.log("Overwriting with fresh configuration...");
  }

  // 讀取 example 檔案
  const exampleContent = fs.readFileSync(examplePath, "utf-8");

  // 替換 $PWD 為實際路徑
  const localContent = exampleContent.replace(/\$PWD/g, projectRoot);

  // 寫入 local 檔案
  fs.writeFileSync(localPath, localContent, "utf-8");

  console.log("Claude Code settings initialized successfully!");
  console.log(`Created: ${localPath}`);
  console.log("");
  console.log(
    "Note: .claude/settings.local.json is git-ignored and contains local paths.",
  );
}

main();

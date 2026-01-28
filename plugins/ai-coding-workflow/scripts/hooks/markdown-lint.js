#!/usr/bin/env node

/**
 * markdown-lint.js
 *
 * Claude Code PostToolUse Hook
 * 輕量級 Markdown 格式檢查：
 * - 驗證 YAML Front Matter 格式
 * - 檢查標題層級（不跳級，如 h1 後直接 h3）
 *
 * 只對 .md 檔案執行，不阻止操作，只輸出警告。
 */

const fs = require('fs');
const path = require('path');

// 檢查 YAML Front Matter 格式
function checkYamlFrontMatter(content, filePath) {
  const warnings = [];

  // 檢查是否有 front matter
  if (content.startsWith('---')) {
    const endIndex = content.indexOf('---', 3);
    if (endIndex === -1) {
      warnings.push({
        line: 1,
        message: 'YAML Front Matter is not properly closed (missing closing ---)'
      });
    } else {
      const frontMatter = content.substring(3, endIndex).trim();

      // 基本 YAML 語法檢查
      const lines = frontMatter.split('\n');
      lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          // 檢查是否有 key: value 格式或是 list item
          if (!trimmedLine.match(/^[\w-]+:/) && !trimmedLine.startsWith('-')) {
            warnings.push({
              line: index + 2, // +2 因為從第一個 --- 後開始
              message: `Invalid YAML syntax: "${trimmedLine}"`
            });
          }
        }
      });
    }
  }

  return warnings;
}

// 檢查標題層級
function checkHeadingLevels(content, filePath) {
  const warnings = [];
  const lines = content.split('\n');

  let lastHeadingLevel = 0;
  let inCodeBlock = false;
  let inFrontMatter = false;
  let frontMatterCount = 0;

  lines.forEach((line, index) => {
    // 追蹤 front matter
    if (line.trim() === '---') {
      frontMatterCount++;
      inFrontMatter = frontMatterCount === 1;
      if (frontMatterCount === 2) inFrontMatter = false;
      return;
    }

    if (inFrontMatter) return;

    // 追蹤 code block
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return;
    }

    if (inCodeBlock) return;

    // 檢查 ATX 標題 (# style)
    const headingMatch = line.match(/^(#{1,6})\s+\S/);
    if (headingMatch) {
      const currentLevel = headingMatch[1].length;

      // 檢查是否跳級（允許降級任意層級，但升級只能升一級）
      if (lastHeadingLevel > 0 && currentLevel > lastHeadingLevel + 1) {
        warnings.push({
          line: index + 1,
          message: `Heading level skipped: h${lastHeadingLevel} to h${currentLevel} (line ${index + 1})`
        });
      }

      lastHeadingLevel = currentLevel;
    }
  });

  return warnings;
}

async function main() {
  let input = '';

  // 從 stdin 讀取 JSON
  for await (const chunk of process.stdin) {
    input += chunk;
  }

  if (!input.trim()) {
    process.exit(0);
  }

  let hookData;
  try {
    hookData = JSON.parse(input);
  } catch (e) {
    process.exit(0);
  }

  // 取得檔案路徑
  const filePath =
    hookData.tool_response?.filePath ||
    hookData.tool_input?.file_path ||
    hookData.tool_input?.filePath ||
    hookData.file_path ||
    hookData.filePath;

  // 只處理 .md 檔案
  if (!filePath || !filePath.endsWith('.md')) {
    process.exit(0);
  }

  // 檢查檔案是否存在
  if (!fs.existsSync(filePath)) {
    process.exit(0);
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  // 執行檢查
  const warnings = [
    ...checkYamlFrontMatter(content, filePath),
    ...checkHeadingLevels(content, filePath)
  ];

  // 輸出警告（不阻止操作）
  if (warnings.length > 0) {
    console.log(`[markdown-lint] ${path.basename(filePath)}: ${warnings.length} warning(s)`);
    warnings.forEach(w => {
      console.log(`  Line ${w.line}: ${w.message}`);
    });
  }

  // 始終允許操作繼續
  process.exit(0);
}

main();

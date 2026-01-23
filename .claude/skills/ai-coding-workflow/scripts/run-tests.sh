#!/bin/bash
# 執行測試
# 用法：./run-tests.sh [test-pattern]

TEST_PATTERN=$1

echo "🧪 執行測試..."

# 偵測測試框架
if [ -f "package.json" ]; then
  if grep -q "vitest" package.json; then
    if [ -z "$TEST_PATTERN" ]; then
      npx vitest run
    else
      npx vitest run "$TEST_PATTERN"
    fi
  elif grep -q "jest" package.json; then
    if [ -z "$TEST_PATTERN" ]; then
      npx jest
    else
      npx jest "$TEST_PATTERN"
    fi
  else
    echo "❌ 未偵測到測試框架（vitest 或 jest）"
    exit 1
  fi
elif [ -f "requirements.txt" ] || [ -f "pyproject.toml" ]; then
  if [ -z "$TEST_PATTERN" ]; then
    pytest
  else
    pytest "$TEST_PATTERN"
  fi
else
  echo "❌ 無法偵測專案類型"
  exit 1
fi

echo "✅ 測試完成"

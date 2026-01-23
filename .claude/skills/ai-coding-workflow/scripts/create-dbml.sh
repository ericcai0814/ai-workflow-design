#!/bin/bash
# 建立 DBML 資料庫定義檔
# 用法：./create-dbml.sh table_name

TABLE_NAME=$1

if [ -z "$TABLE_NAME" ]; then
  echo "❌ 請提供表格名稱"
  echo "用法：./create-dbml.sh table_name"
  exit 1
fi

DBML_DIR="database"
DBML_FILE="${DBML_DIR}/${TABLE_NAME}.dbml"

# 建立目錄
mkdir -p "${DBML_DIR}"

# 建立 DBML 檔案
cat > "${DBML_FILE}" << EOF
// ${TABLE_NAME} 表格定義
// 建立時間：$(date +%Y-%m-%d)

Table ${TABLE_NAME} {
  id uuid [pk, default: \`gen_random_uuid()\`]

  // TODO: 新增欄位

  created_at timestamp [default: \`now()\`]
  updated_at timestamp

  indexes {
    id [pk]
  }
}

// 關聯範例
// Ref: ${TABLE_NAME}.id < other_table.${TABLE_NAME}_id
EOF

echo "✅ 已建立 DBML：${DBML_FILE}"

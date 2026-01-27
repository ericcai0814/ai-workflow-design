#!/bin/bash
# 建立元件檔案結構
# 用法：./create-component.sh ComponentName

COMPONENT_NAME=$1

if [ -z "$COMPONENT_NAME" ]; then
  echo "❌ 請提供元件名稱"
  echo "用法：./create-component.sh ComponentName"
  exit 1
fi

COMPONENT_DIR="src/components/${COMPONENT_NAME}"

# 建立目錄
mkdir -p "${COMPONENT_DIR}"

# 轉換元件名稱為小寫（用於 data-testid）
COMPONENT_NAME_LOWER=$(echo "$COMPONENT_NAME" | tr '[:upper:]' '[:lower:]')

# 建立主要元件檔案
cat > "${COMPONENT_DIR}/${COMPONENT_NAME}.tsx" << EOF
export interface ${COMPONENT_NAME}Props {
  children?: React.ReactNode;
}

export function ${COMPONENT_NAME}({ children }: ${COMPONENT_NAME}Props) {
  return (
    <div data-testid="${COMPONENT_NAME_LOWER}">
      {children}
    </div>
  );
}
EOF

# 建立測試檔案
cat > "${COMPONENT_DIR}/${COMPONENT_NAME}.test.tsx" << EOF
import { render, screen } from '@testing-library/react';
import { ${COMPONENT_NAME} } from './${COMPONENT_NAME}';

describe('${COMPONENT_NAME}', () => {
  it('renders correctly', () => {
    render(<${COMPONENT_NAME}>Test</${COMPONENT_NAME}>);
    expect(screen.getByTestId('${COMPONENT_NAME_LOWER}')).toBeInTheDocument();
  });
});
EOF

# 建立 index 檔案
cat > "${COMPONENT_DIR}/index.ts" << EOF
export { ${COMPONENT_NAME} } from './${COMPONENT_NAME}';
export type { ${COMPONENT_NAME}Props } from './${COMPONENT_NAME}';
EOF

echo "✅ 已建立元件結構：${COMPONENT_DIR}"
echo "   - ${COMPONENT_NAME}.tsx"
echo "   - ${COMPONENT_NAME}.test.tsx"
echo "   - index.ts"

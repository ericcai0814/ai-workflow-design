# Claude Code Plugin Marketplace

> Eric Cai 的 Claude Code 插件集合

## 可用插件

| 插件                                        | 描述                           |
| ------------------------------------------- | ------------------------------ |
| [ai-coding-workflow](./ai-coding-workflow/) | 團隊標準化 AI 輔助開發工作流程 |

## 安裝

```bash
# 1. 添加 marketplace
/plugin marketplace add https://github.com/ericcai0814/ai-workflow-design.git

# 2. 安裝插件
/plugin install ai-coding-workflow@ai-coding-workflow
```

## 管理插件

```bash
# 列出已安裝的插件
/plugin list

# 更新 marketplace
/plugin marketplace update

# 移除插件
/plugin uninstall ai-coding-workflow@ai-coding-workflow
```

# Claude Code Plugin Marketplace

> Eric Cai 的 Claude Code 插件集合

## 可用插件

| 插件                                        | 描述                           |
| ------------------------------------------- | ------------------------------ |
| [ai-coding-workflow](./ai-coding-workflow/) | 團隊標準化 AI 輔助開發工作流程 |

## 安裝 Marketplace

```bash
/plugin marketplace add ericcai0814/ai-workflow-design/plugins
```

## 安裝插件

```bash
/plugin install ai-coding-workflow@ai-coding-workflow
```

## 團隊配置

在專案的 `.claude/settings.json` 中添加以下配置，團隊成員開啟專案時會自動提示安裝：

```json
{
  "extraKnownMarketplaces": {
    "ai-coding-workflow": {
      "source": {
        "source": "git",
        "url": "https://github.com/ericcai0814/ai-workflow-design.git",
        "path": "plugins"
      }
    }
  },
  "enabledPlugins": {
    "ai-coding-workflow@ai-coding-workflow": true
  }
}
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

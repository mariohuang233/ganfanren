# 干饭雷达 (Ganfan Radar)

一个专为大学生设计的美食发现与社交平台，帮助解决"吃什么"的决策困境。

## 功能特点

- 🗺️ **雷达地图** - 可视化展示周边餐厅位置，支持筛选和搜索
- 🎲 **吃什么盲盒** - 随机推荐餐厅，解决选择困难症
- 💬 **美食广场** - 查看最新评价、AA拼饭、顺手带饭
- 👤 **个人中心** - 管理收藏、评价和订单

## 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 部署

本项目支持静态导出，可部署到任何静态托管平台。

### Zeabur 部署

1. 在 Zeabur 创建新项目
2. 连接 GitHub 仓库
3. 选择 Static Site 类型
4. 构建命令：`npm run build`
5. 输出目录：`dist`

## 项目结构

```
src/
├── app/           # Next.js App Router
├── components/    # React 组件
└── data/          # 模拟数据
```

## License

MIT

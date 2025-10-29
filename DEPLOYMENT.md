# GitHub Pages 自动化部署配置指南

## 概述
本项目使用 GitHub Actions 自动构建和部署 Next.js 静态站点到 GitHub Pages。

## 配置步骤

### 1. 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings** (设置)
3. 在左侧菜单找到 **Pages**
4. 在 **Source** 部分，选择 **GitHub Actions**

### 2. 确认仓库名称

确保 `next.config.mjs` 中的 `basePath` 和 `assetPrefix` 与你的仓库名称匹配：

```javascript
basePath: isProd ? '/tech' : '',
assetPrefix: isProd ? '/tech' : '',
```

如果你的仓库名不是 `tech`，请修改为实际的仓库名。

### 3. 推送代码

将代码推送到 `main` 分支：

```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push origin main
```

### 4. 查看部署状态

1. 进入仓库的 **Actions** 标签页
2. 查看最新的工作流运行状态
3. 部署成功后，访问 `https://你的用户名.github.io/tech/`

## 工作流说明

### 触发条件
- 推送到 `main` 分支时自动触发
- 也可以在 Actions 页面手动触发

### 构建步骤
1. **Checkout**: 检出代码
2. **Setup Node.js**: 设置 Node.js 20 环境
3. **Setup pnpm**: 安装 pnpm 包管理器
4. **Cache**: 缓存依赖以加快构建速度
5. **Install**: 安装项目依赖
6. **Build**: 执行 `pnpm build` 构建静态站点
7. **Upload**: 上传构建产物到 GitHub Pages

### 部署步骤
- 自动将构建产物部署到 GitHub Pages

## 本地测试

在推送前，建议本地测试构建：

```bash
# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果（需要先构建）
# 由于使用了 output: 'export'，需要使用静态服务器
npx serve@latest out
```

## 注意事项

1. **basePath 配置**: 确保 `next.config.mjs` 中的 basePath 与仓库名一致
2. **图片优化**: 已配置 `images: { unoptimized: true }` 以支持静态导出
3. **动态路由**: 使用 `generateStaticParams()` 预生成所有动态路由
4. **环境变量**: 如需使用环境变量，在 GitHub 仓库设置中添加 Secrets

## 故障排查

### 构建失败
- 查看 Actions 日志中的错误信息
- 确保本地可以成功执行 `pnpm build`

### 页面 404
- 检查 basePath 配置是否正确
- 确保 GitHub Pages 设置为 "GitHub Actions" 模式

### 样式或资源加载失败
- 确认 assetPrefix 配置正确
- 检查浏览器控制台的网络请求

## 自定义域名（可选）

如果要使用自定义域名：

1. 在仓库根目录创建 `public/CNAME` 文件
2. 文件内容为你的域名，例如：`blog.example.com`
3. 在域名服务商处配置 DNS 记录

## 更多资源

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)


# 数独游戏 PWA 部署指南

## 📱 什么是PWA？

PWA（Progressive Web App）是一种可以像原生APP一样安装到手机上的网页应用。它具有以下特点：

- ✅ 可以添加到手机主屏幕，像APP一样使用
- ✅ 支持离线使用（无需网络也能玩）
- ✅ 自动更新，无需手动下载新版本
- ✅ 跨平台，iOS和Android都支持

---

## 🚀 快速部署步骤

### 第一步：生成APP图标

1. 在浏览器中打开 `generate-icon.html` 文件
2. 点击"下载 icon-192.png"和"下载 icon-512.png"按钮
3. 将下载的两个图标文件放到数独游戏文件夹中
4. 确保文件夹中有以下文件：
   - `index.html`
   - `style.css`
   - `game.js`
   - `manifest.json`
   - `service-worker.js`
   - `icon-192.png`
   - `icon-512.png`

---

### 第二步：部署到GitHub Pages（推荐，最可靠）⭐

#### 1. 注册GitHub账号

1. 访问 https://github.com
2. 点击右上角"Sign up"
3. 填写用户名、邮箱、密码
4. 验证邮箱即可

#### 2. 创建新仓库

1. 登录后，点击右上角"+" → "New repository"
2. 仓库名称填写：`sudoku-pwa`
3. 选择"Public"（公开）
4. 点击"Create repository"

#### 3. 上传文件

**方法A：网页上传（适合文件少）**
1. 在仓库页面，点击"uploading an existing file"
2. 将所有文件拖拽到页面中
3. 在底部填写提交信息："Initial commit"
4. 点击"Commit changes"

**方法B：使用Git（推荐）**
1. 在数独文件夹打开终端
2. 执行以下命令：
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/sudoku-pwa.git
git push -u origin main
```

#### 4. 启用GitHub Pages

1. 进入仓库页面
2. 点击"Settings"（设置）
3. 左侧菜单找到"Pages"
4. 在"Build and deployment"下，"Source"选择"Deploy from a branch"
5. "Branch"选择"main"，文件夹选择"/ (root)"
6. 点击"Save"
7. 等待2-3分钟，刷新页面
8. 顶部会显示网址：`https://你的用户名.github.io/sudoku-pwa`

#### 5. 获取网址

部署成功后，你会得到一个网址，例如：
```
https://你的用户名.github.io/sudoku-pwa
```

这个网址就是你的PWA地址！

---

### 第三步：部署到Gitee Pages（推荐，国内速度快）⭐

#### 1. 注册Gitee账号

1. 访问 https://gitee.com
2. 点击右上角"注册"
3. 填写用户名、邮箱、手机号（需要国内手机号验证）
4. 设置密码，完成注册

#### 2. 创建新仓库

1. 登录后，点击右上角"+" → "新建仓库"
2. 仓库名称填写：`sudoku-pwa`
3. 选择"公开"
4. 点击"创建"

#### 3. 上传文件

**方法A：网页上传**
1. 在仓库页面，点击"文件" → "上传文件"
2. 将所有文件拖拽到页面中
3. 填写提交信息："Initial commit"
4. 点击"提交"

**方法B：从GitHub导入（最快）**
1. 在Gitee创建仓库时，选择"从GitHub/GitLab导入仓库"
2. 输入你的GitHub仓库地址：`https://github.com/你的用户名/sudoku-pwa.git`
3. 点击"导入"
4. 一键同步所有文件！

#### 4. 启用Gitee Pages

1. 进入仓库页面
2. 点击"服务" → "Gitee Pages"
3. 点击"启动"
4. 等待1-2分钟
5. 页面会显示网址：`https://你的用户名.gitee.io/sudoku-pwa`

#### 5. 获取网址

部署成功后，你会得到一个网址，例如：
```
https://你的用户名.gitee.io/sudoku-pwa
```

---

## 📊 双平台部署优势

| 特性 | GitHub Pages | Gitee Pages |
|------|-------------|--------------|
| **可靠性** | ⭐⭐⭐⭐⭐ 微软背书 | ⭐⭐⭐⭐ 开源中国 |
| **国内速度** | ⭐⭐ 较慢 | ⭐⭐⭐⭐⭐ 最快 |
| **持久性** | ⭐⭐⭐⭐⭐ 永久免费 | ⭐⭐⭐⭐ 稳定 |
| **推荐用途** | 长期备份 | 家人日常使用 |

### 💡 使用建议

- **国内家人使用**：分享Gitee Pages网址（速度快）
- **长期备份**：GitHub Pages作为备份（最可靠）
- **海外用户**：分享GitHub Pages网址

---

### 第三步：在手机上安装PWA

#### Android手机

1. 用Chrome浏览器打开你的PWA网址
2. 点击浏览器右上角的菜单（三个点）
3. 选择"添加到主屏幕"或"安装应用"
4. 确认安装
5. 现在可以在主屏幕看到数独APP图标了！

#### iPhone/iPad

1. 用Safari浏览器打开你的PWA网址
2. 点击底部的分享按钮（方框带向上箭头）
3. 向下滑动，找到"添加到主屏幕"
4. 点击"添加"
5. 现在可以在主屏幕看到数独APP图标了！

---

## 🎯 测试PWA功能

### 本地测试（可选）

如果你想先在本地测试PWA功能：

1. 安装Node.js（如果还没有）
2. 在数独文件夹打开终端，运行：
   ```bash
   npx http-server -p 8080
   ```
3. 在浏览器打开 `http://localhost:8080`
4. 打开开发者工具（F12），查看Application标签
5. 确认Service Worker已注册

---

## 📝 文件说明

| 文件名 | 说明 |
|--------|------|
| `index.html` | 游戏主页面 |
| `style.css` | 样式文件 |
| `game.js` | 游戏逻辑 |
| `manifest.json` | PWA配置文件（APP名称、图标等） |
| `service-worker.js` | 离线缓存支持 |
| `icon-192.png` | Android图标（192x192） |
| `icon-512.png` | iOS图标（512x512） |
| `generate-icon.html` | 图标生成工具 |

---

## 🔧 常见问题

### Q: PWA无法安装？
**A:** 确保使用HTTPS访问（GitHub/Gitee自动提供HTTPS）。本地测试时，Service Worker可能无法正常工作。

### Q: 离线功能不工作？
**A:** 首次访问时需要联网，Service Worker会缓存所有文件。之后即使断网也能使用。

### Q: 图标不显示？
**A:** 检查图标文件名是否正确，确保文件在根目录下。

### Q: iOS上安装后打开是Safari？
**A:** 确保使用Safari浏览器打开网址，不要用Chrome。

### Q: 如何更新APP？
**A:** 只需更新部署平台上的文件，下次打开APP时会自动更新。

### Q: GitHub Pages访问很慢怎么办？
**A:** 使用Gitee Pages的网址，国内访问速度快很多。

### Q: Gitee Pages需要实名认证？
**A:** 是的，Gitee需要手机号验证，这是国内政策要求。

---

## 🎮 分享给家人

根据家人所在地区选择网址：

- **国内家人**：分享Gitee Pages网址（速度快）
- **海外家人**：分享GitHub Pages网址（稳定）

他们按照上面的"在手机上安装PWA"步骤即可安装使用。

---

## 🔄 同步更新两个平台

如果你修改了游戏代码，需要同步更新两个平台：

### 更新GitHub
```bash
git add .
git commit -m "更新游戏"
git push
```

### 更新Gitee
- 方法1：在Gitee仓库点击"从GitHub同步"
- 方法2：使用Git同时推送到两个仓库

---

## 💡 进阶功能（可选）

如果你想添加更多功能：

1. **添加推送通知** - 可以提醒每天玩一局
2. **保存游戏进度** - 使用localStorage保存
3. **排行榜** - 使用Firebase等后端服务
4. **更多主题** - 添加深色模式等

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 检查浏览器控制台是否有错误（F12）
2. 确保所有文件都已上传
3. 确认Service Worker已注册
4. 查看GitHub/Gitee的部署日志

祝游戏愉快！🎉
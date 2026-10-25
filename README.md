# 财富体质测试 · 部署与维护指南

静态前端（GitHub Pages）+ 密码校验/管理（Supabase）。本地用 `node server.js` 也可跑（server.js 仅本地开发用，不部署）。

## 一、首次部署（需你的账号操作）

### 1. 建 GitHub 仓库并推送
- 在 GitHub 新建一个**公开**仓库（如 `wealth-test`）。
- 在本项目目录执行（替换成你的仓库地址）：
  ```bash
  git remote add origin https://github.com/你的用户名/wealth-test.git
  git push -u origin main
  ```
- 推送后 GitHub Actions 会自动把 `public/` 部署到 Pages。

### 2. 开启 GitHub Pages
- 仓库 → Settings → Pages → Source 选 **GitHub Actions** → Save。
- 稍等 1–2 分钟，访问 `https://你的用户名.github.io/wealth-test/`。

### 3. 建 Supabase 项目并建表
- 注册/登录 https://supabase.com → New Project。
- SQL Editor → 粘贴 `supabase/schema.sql` 全部内容 → Run。
- Project Settings → API 复制：
  - **Project URL** → 填进 `public/supabase-config.js` 的 `SUPABASE_URL`
  - **anon public key** → 填进 `SUPABASE_ANON_KEY`
- 改完 `supabase-config.js` 后 `git push`，网站即切换为 Supabase 校验。

> 注意：anon key 本就是公开的前端凭证，放这里安全（数据库靠上面的函数鉴权保护，外部拿不到密码明文，也改不了别人的密码）。

## 二、以后怎么改内容（你选的方案：改文件 + 推送）

| 要改的东西 | 改哪个文件 | 生效方式 |
|---|---|---|
| 8 种人格文案/小知识/建议/标签 | `public/data.js`（`TEST.results`） | 编辑 → `git push` → 约 1 分钟自动上线 |
| 好评弹窗文字、按钮文字、提示语 | `public/index.html` | 同上 |
| 按钮逻辑（再测/复制/保存） | `public/app.js` | 同上 |
| 配色 / 长图样式 | `public/style.css` | 同上 |
| 客服微信 | `public/index.html` 里 `id="csWx"` | 同上 |
| 测试密码 / 剩余次数 | **Supabase 后台**（免代码） | Table Editor 直接改 `passwords` 表；或 `/admin.html` 用管理员密码操作 |

修改后只要 `git push` 到 `main`，GitHub Actions 会自动重新部署。

## 三、本地预览
```bash
npm install
node server.js          # 打开 http://localhost:3000
```
本地模式走 `server.js`（密码在 `data/passwords.json`）；若 `supabase-config.js` 已填真值，则本地也会优先走 Supabase。

## 四、目录结构
```
wealth-test/
├─ public/              # ← 部署到 GitHub Pages 的就是这个目录
│  ├─ index.html        # 测试首页（含结果页/弹窗）
│  ├─ app.js            # 前端逻辑（答题/解锁/分享）
│  ├─ data.js           # 题目 + 8 种人格结果 + 卡片渲染
│  ├─ style.css         # 样式
│  ├─ supabase-config.js# Supabase URL/Key 配置（部署时填）
│  ├─ admin.html        # 密码管理后台
│  ├─ vendor/html2canvas.min.js
│  └─ qr-xhs.jpg        # 结果页二维码图（部署时一起带走）
├─ supabase/schema.sql  # 数据库结构（一次性执行）
├─ server.js            # 本地开发用，不部署
├─ data/passwords.json  # 本地开发用，不部署
└─ .github/workflows/pages.yml  # Pages 自动部署
```

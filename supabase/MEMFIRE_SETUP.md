# 迁移到 MemFire Cloud（国产 Supabase 兼容，国内直连）

本指引帮你从「官方 Supabase（海外，国内连不上）」迁移到「MemFire Cloud（国内节点，免费）」。

---

## 你只需要做 3 步（约 5 分钟）

### 第 1 步：注册并建库
1. 打开 👉 https://memfiredb.com 注册账号（手机即可，比腾讯云轻）。
2. 登录后进入控制台 → 新建一个**云数据库（Postgres）**项目。
3. 项目创建完成后，进入该项目。

### 第 2 步：拿到 URL 和 anon Key
在 MemFire 项目里找到「API / 连接信息 / 项目设置」页面，复制两个值：
- **API URL / Project URL**：形如 `https://xxxx.memfiredb.com`（以 http 开头）
- **anon public key**：一长串 JWT 字符串（通常以 `eyJ` 开头）

> 不同版本控制台措辞可能略有差异，找「API」「连接」「密钥」「REST Endpoint」相关字样即可。

### 第 3 步：建表与函数
1. 在 MemFire 控制台找到 **SQL Editor**（SQL 编辑器）。
2. 把我给你的 `supabase/memfire-schema.sql` **全文粘贴**进去 → 点击运行（Run）。
3. 运行一次即可建好：2 张表 + 6 个函数 + 种子卡密（`abcd1234 / yt1258 / afgewe45`）。

### 第 4 步：把 Key 交给我
把第 2 步拿到的 **URL** 和 **anon Key** 发给我。
我会替你：
- 填入 `public/supabase-config.js` 的两个常量；
- 重新部署到 GitHub Pages；
- 你再用 `check.html` 验证「已连通」。

> 或者你想自己填也行：打开 `public/supabase-config.js`，把第 9、10 行的
> `REPLACE_WITH_MEMFIRE_URL` 和 `REPLACE_WITH_MEMFIRE_ANON_KEY` 换成真实值，然后告诉我部署。

---

## 验证是否打通
部署后，用手机或关掉代理的电脑打开：
👉 https://tian-yu-520.github.io/wealth-test/check.html

- 显示「已连通 / OK」→ 迁移成功，国内正常网络可用 ✅
- 显示「连接失败」→ 多半是 URL/Key 填错，或 `memfire-schema.sql` 没跑，把报错发我。

---

## 与原 Supabase 的差异说明
- 前端 `supabase-js` 调用（`sb.rpc('consume_password', ...)` 等）**完全不用改**，MemFire 兼容 Supabase 架构。
- 管理员密码已写入 `admin_secret` 表，值为 `@Liyu5201314`，与前端离线兜底密码一致。
- MemFire 免费额度：512MB 空间 + 1GB 流量/月，你这种小访问量完全够用。
- 若以后要做大、要大厂保障，可再平滑迁到腾讯云 CloudBase（同为 Supabase 兼容，迁移成本极低）。

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'passwords.json');
const ADMIN_PWD = process.env.ADMIN_PWD || 'admin888';   // 上线前请修改（或设环境变量 ADMIN_PWD）

function loadStore() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch (e) { return {}; }
}
function saveStore(store) { fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2)); }
function adminAuth(body) { return (body && body.admin || '').toString() === ADMIN_PWD; }

// 用户侧：密码门。每个密码最多可用 3 次（默认），成功则扣减一次。
app.post('/api/unlock', (req, res) => {
  const pwd = (req.body && req.body.password ? req.body.password : '').trim();
  const store = loadStore();
  if (!(pwd in store)) return res.json({ ok: false, message: '密码错误，请向店主获取正确密码' });
  if (store[pwd] <= 0) return res.json({ ok: false, message: '该密码已用完 3 次，请联系店主换密码' });
  store[pwd] = store[pwd] - 1; saveStore(store);
  return res.json({ ok: true, remaining: store[pwd] });
});

// ---------- 管理后台接口（需管理员密码） ----------
app.post('/api/admin/list', (req, res) => {
  if (!adminAuth(req.body)) return res.json({ ok: false, message: '管理员密码错误' });
  const store = loadStore();
  return res.json({ ok: true, list: Object.entries(store).map(([password, remaining]) => ({ password, remaining })) });
});
app.post('/api/admin/add', (req, res) => {
  if (!adminAuth(req.body)) return res.json({ ok: false, message: '管理员密码错误' });
  const p = (req.body.password || '').trim();
  const u = parseInt(req.body.uses, 10);
  if (!p) return res.json({ ok: false, message: '密码不能为空' });
  const store = loadStore();
  store[p] = (isNaN(u) || u < 1) ? 3 : u;
  saveStore(store);
  return res.json({ ok: true });
});
app.post('/api/admin/del', (req, res) => {
  if (!adminAuth(req.body)) return res.json({ ok: false, message: '管理员密码错误' });
  const p = (req.body.password || '').trim();
  const store = loadStore();
  if (p in store) delete store[p];
  saveStore(store);
  return res.json({ ok: true });
});
app.post('/api/admin/reset', (req, res) => {
  if (!adminAuth(req.body)) return res.json({ ok: false, message: '管理员密码错误' });
  const p = (req.body.password || '').trim();
  const u = parseInt(req.body.uses, 10);
  const store = loadStore();
  if (!(p in store)) return res.json({ ok: false, message: '密码不存在' });
  store[p] = (isNaN(u) || u < 1) ? 3 : u;
  saveStore(store);
  return res.json({ ok: true });
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('财富体质测试 running -> http://localhost:' + PORT);
});

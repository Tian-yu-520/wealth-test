// ============================================================
//  Supabase 配置（部署到 GitHub Pages 时填这里）
//  在 Supabase 控制台 → Project Settings → API 里复制下面两个值
//  - Project URL        -> 填到 SUPABASE_URL
//  - anon public key    -> 填到 SUPABASE_ANON_KEY
//  填好并 push 后，网站就会改用 Supabase 校验密码（无需自建后端）。
//  若这两个值还是占位符（REPLACE_...），前端会自动回退到本地 server.js。
// ============================================================
window.SUPABASE_URL = 'https://jurglglawcnckzfisquz.supabase.co';
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1cmdsZ2xhd2NuY2t6ZmlzcXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4OTI1NjcsImV4cCI6MjEwODQ2ODU2N30.w5B_lyYAtknaH_Bf0VMiBcW4-sT626klLpVzpxj9yRY';

// 是否已配置真实的 Supabase（用于决定走 Supabase 还是本地 fallback）
window.__useSupabase = function () {
  return typeof window.supabase !== 'undefined'
    && typeof window.SUPABASE_URL === 'string' && window.SUPABASE_URL.startsWith('http')
    && typeof window.SUPABASE_ANON_KEY === 'string' && window.SUPABASE_ANON_KEY.length > 10;
};

window.__sb = null;
window.__getSb = function () {
  if (!window.__sb && window.__useSupabase()) {
    window.__sb = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  }
  return window.__sb;
};

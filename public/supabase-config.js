// ============================================================
//  后端配置 —— 当前后端：腾讯云 CloudBase (PostgreSQL / PostgREST)
//  前端通过 @cloudbase/js-sdk 的 app.rdb().rpc() 调用后端函数。
//  保留 window.__getSb() 接口名，业务代码（app.js / admin.html）最小化改动。
//
//  ⚠️ 部署前请在 CloudBase 控制台完成两项配置，否则前端会 401 / CORS 失败：
//   1) 身份认证 → 登录方式 → 开启「匿名登录」
//   2) 环境配置 → 安全来源 → 安全域名 → 添加 tian-yu-520.github.io
// ============================================================

window.CB_ENV = 'broad-shrew-d0gvbw4vb6cdfbfd9';
window.CB_REGION = 'ap-shanghai';
window.CB_PUBLISHABLE_KEY = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM2NWI1MTM3LTc5MjAtNDBiNy05ZTcyLWC3MjExMzhmMTRlMyJ9.eyJpc3MiOiJodHRwczovL2Jyb2FkLXNocmV3LWQwZ3ZidzR2YjZjZGZiZmQ5LmFwLXNoYW5naGFpLnRjYi1hcGkudGVuY2VudGNsb3VkYXBpLmNvbSIsInN1YiI6ImFub24iLCJhdWQiOiJicm9hZC1zaHJldy1kMGd2Ync0dmI2Y2RmYmZkOSIsImV4cCI6NDA5NjY2OTQ2NywiaWF0IjoxNzkyOTg2MjY3LCJub25jZSI6ImVWbGFRUVRJUnh5a3dYcnNYSm81elEiLCJhdF9oYXNoIjoiZVZsYVFRVElSeHlrd1hyc1hKbzV6USIsIm5hbWUiOiJBbm9ueW1vdXMiLCJzY29wZSI6ImFub255bW91cyIsInByb2plY3RfaWQiOiJicm9hZC1zaHJldy1kMGd2Ync0dmI2Y2RmYmZkOSIsIm1ldGEiOnribGF0Zm9ybSI6IlB1Ymxpc2hhYmxlS2V5In0sInJvbGUiOiJhbm9uIiwiaXNfYW5vbnltb3VzIjp0cnVlLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJhbm9ueW1vdXMiLCJwcm92aWRlcnMiOlsiYW5vbnltb3VzIl19LCJ1c2VyX21ldGFkYXRhIjp7Im5hbWUiOiJBbm9ueW1vdXMifSwidXNlcl90eXBlIjoiIiwibmFtZSI6IiIsImNsaWVudF90eXBlIjoiY2xpZW50X3VzZXIiLCJpc19zeXN0ZW1fYWRtaW4iOmZhbHNlfQ.TU7T6-vT1Qk-TAnkvT2kg6P4tzELxSwbfJFuepOHirFdBwKZ8wOMuW49E5KFV086o3qNjl8BGQOZrHulLpdfFmrFbGDATQBZ5dDzdwMNQfp8hp-kG-QtBp692KbwdMwxCQ4ez2iSg9fazGmrRbSYrPfzXRus3uGrrxJTGN7V7Ji7775k95iwWqPOJXDJmBMS_bCXBGPRnkXPBISTO0i-6BiPgXChnADILjQkdOxZoOhN3__ofaEhg5z9Li-VWOlmS-OWghawGWzC7TNiEyqcZjUtOwxDq9WHctj7IoIMKzvCREaGuBOXAEo8J7OG3GhhU2KUEYc_UnGpURI2HduDsw';

// CloudBase JS SDK 已通过 index.html / admin.html 的 CDN <script> 引入（全局变量 cloudbase）。
// __getSb() 返回 rdb 实例（带 .rpc 方法），业务代码沿用 supabase 风格的 rpc 调用。
window.__cbApp = null;
window.__getSb = function () {
  if (!window.__cbApp && typeof window.cloudbase !== 'undefined') {
    window.__cbApp = window.cloudbase.init({
      env: window.CB_ENV,
      region: window.CB_REGION,
      accessKey: window.CB_PUBLISHABLE_KEY
    });
  }
  return window.__cbApp ? window.__cbApp.rdb() : null;
};

// 本地兜底管理员密码（仅离线时使用）：当后端不可达（如断网、或匿名登录未开启）时，
// 用此密码仍可直接进入后台面板。注意：此值以明文存在于前端，仅作「离线兜底」用途；
// 正式鉴权仍以 CloudBase admin_secret 表中的 admin_key 为准（在线时优先走数据库校验）。
window.ADMIN_PWD_LOCAL = '@Liyu5201314';

(function () {
  const $ = s => document.querySelector(s);
  const N = TEST.questions.length;     // 30
  const FREE = 5;                       // 前 5 题免费体验
  const SHORT = { d1: '储蓄', d2: '消费', d3: '风险', d4: '信念', d5: '掌控', d6: '能动' };

  const state = { step: 0, ans: {}, password: null, shared: false, result: null };

  // 离线核销队列：断网时先乐观放行，联网后自动回放 consume_password
  const LS_PW_QUEUE = 'wt_unlock_queue';
  function pwQueueLoad() { try { return JSON.parse(localStorage.getItem(LS_PW_QUEUE) || '[]'); } catch (e) { return []; } }
  function pwQueueSave(a) { try { localStorage.setItem(LS_PW_QUEUE, JSON.stringify(a || [])); } catch (e) {} }
  function pwQueuePush(p) { const a = pwQueueLoad(); a.push(p); pwQueueSave(a); }

  // 把离线期间累计的卡密回放到 Supabase（用不存在的探测码探活，不会误消耗真实码）
  async function flushPwQueue() {
    const sb = window.__getSb && window.__getSb();
    if (!sb) return;
    const q = pwQueueLoad();
    if (!q.length) return;
    let online = false;
    try { const { error } = await sb.rpc('consume_password', { p: '__offline_probe__' }); if (!error) online = true; } catch (e) {}
    if (!online) return;
    for (const pwd of q) { try { await sb.rpc('consume_password', { p: pwd }); } catch (e) {} }
    pwQueueSave([]);
    toast('已联网核销 ' + q.length + ' 个离线密码');
  }

  // 密码校验：优先走 Supabase（已配置），否则回退本地 server.js
  async function unlockRequest(pwd) {
    const sb = window.__getSb && window.__getSb();
    if (sb) {
      try {
        const { data, error } = await sb.rpc('consume_password', { p: pwd });
        if (error) { pwQueuePush(pwd); return { ok: true, offline: true, message: '离线模式：已记录，联网后自动核销' }; }
        if (data === null) return { ok: false, message: '密码无效或已用完' };
        return { ok: true };
      } catch (e) {
        pwQueuePush(pwd); return { ok: true, offline: true, message: '离线模式：已记录，联网后自动核销' };
      }
    }
    const r = await fetch('/api/unlock', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pwd })
    });
    return await r.json();
  }

  // ---------- 首页：免费开始 ----------
  $('#startBtn').onclick = () => {
    state.step = 0; state.ans = {}; state.password = null; state.result = null;
    showScreen('quiz'); renderQuestion();
  };

  // ---------- 第 6 题前的密码解锁层 ----------
  function openPwGate() { $('#pwMsg').textContent = ''; $('#pwd').value = ''; showScreen('pwGate'); }
  $('#pwBack').onclick = () => { state.step = FREE - 1; showScreen('quiz'); renderQuestion(); };
  $('#pwBtn').onclick = async () => {
    const pwd = $('#pwd').value.trim();
    if (!pwd) { $('#pwMsg').textContent = '请输入测试密码'; return; }
    $('#pwBtn').disabled = true;
    try {
      const d = await unlockRequest(pwd);
      if (!d.ok) { $('#pwMsg').textContent = d.message || '密码错误'; $('#pwBtn').disabled = false; return; }
      if (d.offline) toast(d.message || '离线记录成功');
      state.password = pwd;
      state.step = FREE; showScreen('quiz'); renderQuestion();   // 进入第 6 题并切回答题界面
    } catch (e) { $('#pwMsg').textContent = '网络错误，请重试'; $('#pwBtn').disabled = false; }
  };

  // ---------- 答题 ----------
  function renderQuestion() {
    const i = state.step, q = TEST.questions[i];
    const free = i < FREE;
    $('#qCount').innerHTML = '第 ' + (i + 1) + ' / ' + N + ' 题' +
      (free ? ' <span class="free-pill">免费体验</span>' : '');
    $('#qText').textContent = q.text;
    const opts = $('#opts'); opts.innerHTML = '';
    const labels = ['非常不符合', '不太符合', '说不清', '比较符合', '非常符合'];
    labels.forEach((lab, idx) => {
      const val = idx + 1;
      const b = document.createElement('button');
      b.className = 'opt' + (state.ans[q.id] === val ? ' sel' : '');
      b.innerHTML = '<span class="dot"></span>' + lab;
      b.onclick = () => {
        state.ans[q.id] = val;
        [...opts.children].forEach(c => c.classList.remove('sel'));
        b.classList.add('sel');
        $('#nextBtn').disabled = false;
      };
      opts.appendChild(b);
    });
    $('#backBtn').style.visibility = i === 0 ? 'hidden' : 'visible';
    $('#nextBtn').disabled = !(q.id in state.ans);
    $('#nextBtn').textContent = (i === N - 1) ? '查看结果' : '下一题';
    updateBar();
  }
  function updateBar() {
    const done = TEST.questions.slice(0, state.step + 1).filter(q => q.id in state.ans).length;
    $('#bar').style.width = (done / N * 100) + '%';
  }
  $('#nextBtn').onclick = () => {
    const q = TEST.questions[state.step];
    if (!(q.id in state.ans)) return;
    if (state.step < N - 1) {
      // 从第 5 题（index 4）进入第 6 题（index 5）且尚未解锁 -> 弹密码层
      if (state.step === FREE - 1 && !state.password) { openPwGate(); return; }
      state.step++; renderQuestion();
    } else finish();
  };
  $('#backBtn').onclick = () => { if (state.step > 0) { state.step--; renderQuestion(); } };

  function finish() {
    state.result = TEST.classify(state.ans);
    renderResult(state.result, false);
    showScreen('result');
  }

  // ---------- 结果（小红书风长图，复用 data.js 的 cardHTML） ----------
  function renderResult(res, shared) {
    $('#resultCard').innerHTML = TEST.cardHTML(res);
    state.shared = shared;
    $('#againBtn').textContent = shared ? '我也要测' : '再测一次';
  }

  // 保存为长图
  $('#saveBtn').onclick = async () => {
    const btn = $('#saveBtn'); btn.disabled = true; const txt = btn.textContent; btn.textContent = '生成中…';
    try {
      const canvas = await html2canvas($('#resultCard'), {
        backgroundColor: '#FFF6E6', scale: Math.min(3, window.devicePixelRatio || 2), useCORS: true, logging: false
      });
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url; a.download = '财富体质_' + TEST.results[state.result.type].name + '.png';
      document.body.appendChild(a); a.click(); a.remove();
      toast('长图已生成，长按/点击即可保存到相册');
    } catch (e) { toast('生成失败，请重试'); }
    btn.disabled = false; btn.textContent = txt;
  };

  // 分享给朋友（优先调系统分享，失败/不支持则降级为复制链接）
  $('#copyBtn').onclick = async () => {
    const payload = btoa(encodeURIComponent(JSON.stringify({ t: state.result.type, s: state.result.scores })));
    const url = location.origin + location.pathname + '#r=' + payload;
    history.replaceState(null, '', '#r=' + payload);
    const r = TEST.results[state.result.type];
    const shareText = '我测出「' + r.name + '」，' + r.share.line + ' 来对线：';
    if (navigator.share) {
      try { await navigator.share({ title: '财富体质测试', text: shareText, url }); toast('分享成功，看谁分数更高'); return; }
      catch (e) { if (e && e.name === 'AbortError') return; }  // 用户取消分享则静默
    }
    try { await navigator.clipboard.writeText(url); toast('链接已复制，发给朋友来对线吧'); }
    catch (e) {
      const ta = document.createElement('textarea'); ta.value = url; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (_) {} ta.remove(); toast('链接已复制，发给朋友来对线吧');
    }
  };

  // 再测一次（消耗密码另一次；分享态则回首页）
  $('#againBtn').onclick = async () => {
    if (state.shared) { location.href = location.pathname; return; }
    try {
      const d = await unlockRequest(state.password);
      if (!d.ok) { toast(d.message || '密码已用完'); return; }
      if (d.offline) toast(d.message || '离线记录成功');
    } catch (e) { toast('网络错误'); return; }
    state.step = 0; state.ans = {}; state.result = null; state.password = state.password;
    showScreen('quiz'); renderQuestion();
  };

  // ---------- 工具 ----------
  function showScreen(name) {
    ['gate', 'quiz', 'pwGate', 'result'].forEach(s => $('#' + s).classList.toggle('hidden', s !== name));
    window.scrollTo(0, 0);
  }
  function toast(m) {
    const t = $('#toast'); t.textContent = m; t.classList.remove('hidden');
    clearTimeout(t._t); t._t = setTimeout(() => t.classList.add('hidden'), 2200);
  }

  // 分享链接直达结果
  function loadHash() {
    if (location.hash.startsWith('#r=')) {
      try {
        const obj = JSON.parse(decodeURIComponent(atob(location.hash.slice(3))));
        renderResult({ type: obj.t, scores: obj.s }, true);
        showScreen('result');
        return true;
      } catch (e) {}
    }
    return false;
  }

  if (!loadHash()) showScreen('gate');

  // 联网后自动回放离线核销队列
  window.addEventListener('online', flushPwQueue);
  if (navigator.onLine) flushPwQueue();
})();

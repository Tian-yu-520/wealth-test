// 财富体质测试 · 题目 / 维度 / 结果 / 判定逻辑
window.TEST = (function () {
  // 6 个维度（均有行为金融学理论依据）
  const dimensions = [
    { key: 'd1', name: '储蓄纪律' },
    { key: 'd2', name: '消费痛感' },
    { key: 'd3', name: '风险偏好' },
    { key: 'd4', name: '金钱信念' },
    { key: 'd5', name: '财务掌控' },
    { key: 'd6', name: '搞钱能动' }
  ];

  // 30 题，每维度 5 题；ans[id] = 1~5
  const questions = [
    // D1 储蓄纪律
    { id: 1, dim: 'd1', text: '工资一到账，我会先转一笔进储蓄/理财账户，剩下的才敢花。' },
    { id: 2, dim: 'd1', text: '面对“先花未来钱”（花呗/信用卡/白条），我会本能警惕，不愿透支。' },
    { id: 3, dim: 'd1', text: '换手机、出游这类大额支出，我习惯提前几个月攒钱，而非临时借。' },
    { id: 4, dim: 'd1', text: '看到“满300减50”，我也会先想：这东西我真的需要吗。' },
    { id: 5, dim: 'd1', text: '即使手头宽松，我也留着一笔“睡不着也安心”的应急金。' },
    // D2 消费痛感（高分=花钱不肉痛、易冲动）
    { id: 6, dim: 'd2', text: '直播间“3、2、1 上链接”的倒计时，常让我冲动下单。' },
    { id: 7, dim: 'd2', text: '用花呗/信用卡付款时，花钱的痛感比掏现金轻很多。' },
    { id: 8, dim: 'd2', text: '我常为“凑满减”多买本来不需要的东西。' },
    { id: 9, dim: 'd2', text: '奶茶/咖啡/外卖这类小钱，我基本不过脑子就花。' },
    { id: 10, dim: 'd2', text: '视频/健身/网盘会员自动续费，我常忘了退、也懒得退。' },
    // D3 风险偏好
    { id: 11, dim: 'd3', text: '朋友晒某只基金/币涨了，我会忍不住跟投。' },
    { id: 12, dim: 'd3', text: '我对自己的投资判断很有信心，很少认真看风险提示。' },
    { id: 13, dim: 'd3', text: '被套牢时，我宁愿死扛也不愿“割肉”认亏。' },
    { id: 14, dim: 'd3', text: '我愿意把闲钱投进波动大的标的博高收益。' },
    { id: 15, dim: 'd3', text: '听说某个“内部消息/新风口”，我会想 all in 试一把。' },
    // D4 金钱信念
    { id: 16, dim: 'd4', text: '我觉得“谈钱伤感情”，主动提钱会让我尴尬。' },
    { id: 17, dim: 'd4', text: '我相信“钱是赚出来的不是省出来的”，敢花才敢赚。' },
    { id: 18, dim: 'd4', text: '我会用花钱证明自己过得不错，在意排场/面子。' },
    { id: 19, dim: 'd4', text: '我对钱有基本信任：量入为出、细水长流就安心。' },
    { id: 20, dim: 'd4', text: '我觉得自己“不配拥有钱”，有钱反而会慌。' },
    // D5 财务掌控
    { id: 21, dim: 'd5', text: '我有记账或预算习惯，清楚钱花在哪。' },
    { id: 22, dim: 'd5', text: '我会给未来（买房/养老/教育）做长期规划。' },
    { id: 23, dim: 'd5', text: '遇到意外支出（生病/随礼/维修），我有预案而不至于崩。' },
    { id: 24, dim: 'd5', text: '财务决定我倾向自己研究再做，不盲听别人。' },
    { id: 25, dim: 'd5', text: '我对收支有掌控感，不被账单追着跑。' },
    // D6 搞钱能动
    { id: 26, dim: 'd6', text: '看到别人搞钱，我第一反应是“我能学”，而非“与我无关”。' },
    { id: 27, dim: 'd6', text: '我相信赚钱能力可以通过学习和试错提升。' },
    { id: 28, dim: 'd6', text: '我在持续拓展收入来源（副业/技能/人脉），不只靠工资。' },
    { id: 29, dim: 'd6', text: '我对搞钱总体乐观，不觉得阶层已固化。' },
    { id: 30, dim: 'd6', text: '即使暂时没钱，我也相信自己能慢慢变好。' }
  ];

  // rarity = 全站测得该体质的大致概率(%)，<10 标记为稀有评价
  const results = {
    hamster: {
      name: '仓鼠型囤积者', emoji: '🐹', rarity: 18,
      proto: { d1: 4.6, d2: 1.4, d3: 1.6, d4: 1.6, d5: 3.6, d6: 2.8 },
      verdict: '你不是抠，你只是把钱当成了安全感本身。',
      portrait: '工资到账第一件事不是花，是“藏”——先转一笔进理财账户才敢呼吸。直播间、满减、凑单跟你毫无关系，应急金是你的护身符，少一块都睡不踏实。别人笑你省，你笑别人月月光。但说真的，你账户里那一笔钱，是不是也躺了很久、从没想过让它出去溜达溜达？',
      insights: [
        '你的安全感余额，和银行卡余额是正相关的。',
        '别人在直播间上头，你在余额宝里下头。',
        '你不是不爱花钱，是不敢花——怕一松手，安全感就漏了。'
      ],
      theory: '行为金融学管这叫“金钱警觉”：你把储蓄和“可控、安全”画了等号；再加上你天生擅长延迟满足，所以能忍住不买。说人话就是——你愿意为“未来的自己”先买单，这其实是种超能力，只是偶尔用过头了。',
      tips: ['钱躺活期是在偷偷贬值，拿一小笔试试债基或指数定投，让它们去生小钱。', '允许自己为“体验”花一小笔，快乐也是你的资产，别全囤成数字。'],
      share: { line: '正式确诊仓鼠型：囤钱使我快乐，但我的钱该去生小钱了。', tags: ['#储蓄控', '#延迟满足大师', '#应急金满格'] }
    },
    artist: {
      name: '月光艺术家', emoji: '🎨', rarity: 22,
      proto: { d1: 2.0, d2: 4.4, d3: 3.2, d4: 3.0, d5: 2.2, d6: 2.8 },
      verdict: '你赚的不是钱，是当下的体验券。',
      portrait: '工资到账像流水，不是被你花掉的，是被你“体验”掉的。奶茶、外卖、视频会员自动续费从不退，月底靠花呗续命。你不是没钱，是花钱根本不肉痛——扫码那一下的爽，比余额减少的真实感来得更猛。',
      insights: [
        '你的钱没消失，它只是变成了说走就走的快乐和喝完就忘的奶茶。',
        '支付痛感？不存在的。你用的是信用支付，痛的是下个月的自己。',
        '你不是不会省，是“省”这个动作，从来没进过你的优先级。'
      ],
      theory: '“支付痛感”（Prelec & Loewenstein）说：刷卡、扫码这些非现金支付，会绕开大脑里“花钱好痛”的那根神经。再叠加“现期偏差”——你的大脑天然高估“现在爽”、低估“以后还”。所以不是你意志薄弱，是钱被设计得太好花了。',
      tips: ['把“支付痛感”找回来：大额改转账、关掉免密支付，让花钱有实感。', '设一个“先储蓄后花”的自动扣款，让存钱发生在花钱之前。'],
      share: { line: '月光艺术家确诊：我的钱都变成了说走就走的快乐。', tags: ['#拿铁因子本因子', '#支付痛感缺失', '#下月再说'] }
    },
    speculator: {
      name: '冲浪型投机客', emoji: '🌊', rarity: 12,
      proto: { d1: 2.6, d2: 3.2, d3: 4.4, d4: 2.8, d5: 2.4, d6: 3.4 },
      verdict: '别人晒收益你跟投，别人割肉你死扛。',
      portrait: '风口一来你就 all in，朋友推荐你就冲，群里一条“内部消息”能让你热血上头。胆子是真大，但“这次不一样”这句话，已经骗过无数和你一样的人。被套了？死扛，绝不割肉，仿佛时间能替你解套。',
      insights: [
        '你不是在做投资，你是在追浪——而且总在浪最大的时候冲进去。',
        '别人的收益截图，就是你的行动指令。',
        '你最怕的不是亏钱，是“卖早了”，所以宁愿扛到地板。'
      ],
      theory: '“过度自信”（Odean：散户交易越频繁越亏）+“羊群效应”（别人买你也买）+“处置效应”（过早卖盈、死扛亏损）+“损失厌恶”（不肯认亏）。这四件套集齐，基本就是“为什么我总在高位接盘”的标准答案。',
      tips: ['单笔仓位设上限（如 ≤ 闲钱 5%），先保命再谈收益。', '买入前先写“卖出规则”；用指数定投替代择时，反而跑赢大多数操作。'],
      share: { line: '冲浪型投机客：我在浪尖，也在悬崖边。', tags: ['#过度自信本信', '#死扛不割', '#风口追逐者'] }
    },
    rentier: {
      name: '稳健收租型', emoji: '🏠', rarity: 15,
      proto: { d1: 3.8, d2: 2.6, d3: 3.0, d4: 2.0, d5: 4.0, d6: 3.4 },
      verdict: '你不赌风口，你只赚时间的钱。',
      portrait: '储蓄有、风险适中、规划清晰，买房养老早想明白。你不羡慕别人一夜暴富，只想稳稳跑赢通胀。你的钱像一列准点火车，不快，但每一站都到。',
      insights: [
        '你的人生信条：慢就是快，稳就是赚。',
        '别人在赌方向，你在铺轨道。',
        '你不是没野心，是懒得为泡沫心跳加速。'
      ],
      theory: '“内控点”（Rotter）：你相信结果靠自己的规划、不靠运气；分散 + 长期持有，是被实证研究反复验证过的最优解。你不是保守，你是把“少犯错”当成了核心策略——这恰恰是大多数人做不到的。',
      tips: ['别因“太稳”错过合理权益配置，适度提权益比例抗通胀。', '定期再平衡，别让某类资产悄悄超重拖慢节奏。'],
      share: { line: '稳健收租型：我不追风口，风口追不上我。', tags: ['#长期主义', '#内控点拉满', '#规划怪'] }
    },
    machine: {
      name: '搞钱永动机', emoji: '⚙️', rarity: 8,
      proto: { d1: 3.6, d2: 3.0, d3: 3.2, d4: 1.8, d5: 4.2, d6: 4.6 },
      verdict: '你对钱的态度不是“够花”，是“还能更多”。',
      portrait: '工资只是底薪，副业、技能、人脉你一直在铺。看到别人赚钱，第一反应不是酸，是“这我能学”。你是少数把搞钱当成一场无限游戏的人——输了不慌，赢了继续。',
      insights: [
        '你的脑回路：别人看到机会说“好厉害”，你说“我也能”。',
        '你不是贪婪，是觉得“赚钱能力”本身就能升级。',
        '身边人还在等暴富，你已经在造暴富的引擎。'
      ],
      theory: '“成长型思维”（Dweck）：你相信能力可以习得；“富足心态”（Mullainathan）让你在稀缺时反而看见机会，而不是被焦虑窄化。简单说：你把精力投向“开源”，而不是死盯着“省钱”那点事。',
      tips: ['注意“精力账户”也稀缺，别多线烂尾，先深后广。', '赚到的钱要用财务掌控力接住，别边赚边漏，漏斗再大也存不住。'],
      share: { line: '搞钱永动机：工资是底薪，人生是绩效。', tags: ['#成长型搞钱', '#开源狂魔', '#富足心态'] }
    },
    snail: {
      name: '避险蜗牛', emoji: '🐌', rarity: 10,
      proto: { d1: 3.4, d2: 2.4, d3: 2.0, d4: 3.8, d5: 2.8, d6: 2.4 },
      verdict: '你不是不想有钱，是觉得有钱会出事。',
      portrait: '谈钱尴尬，提钱别扭，真有钱了反而慌。你宁愿穷得安心，也不愿富得冒险。“我不配”这三个字，像只看不见的手，悄悄把你可能到手的钱推开了。',
      insights: [
        '你不是不会搞钱，是潜意识觉得“有钱 = 麻烦 / 危险”。',
        '别人怕穷，你怕的是——有钱之后，会不会失去现在的安稳。',
        '“我不配”不是谦虚，是你在给自己设的隐形天花板。'
      ],
      theory: '“金钱回避脚本”（Klontz & Britt）：潜意识里把“有钱”和“不道德 / 会出事”画了等号，于是自我设限；再叠加稀缺心态的焦虑，越怕越不敢动。这不是性格缺陷，是一段你还没发现的旧程序。',
      tips: ['先接纳“想有钱”不可耻，写下一句属于自己的金钱肯定语。', '从小额“钱生钱”体验开始，用一次次小成功，重建对钱的信任。'],
      share: { line: '避险蜗牛：我缩起来，不是因为穷，是因为慌。', tags: ['#金钱回避', '#不配得感', '#慢慢探头'] }
    },
    leaker: {
      name: '体面漏财型', emoji: '💼', rarity: 9,
      proto: { d1: 3.4, d2: 3.8, d3: 3.0, d4: 3.2, d5: 2.8, d6: 3.0 },
      verdict: '你赚得不少，漏得也不少，全漏在“体面”上。',
      portrait: '收入看着体面，钱却花在排场、面子、凑满减和忘记退的会员里。账面上你不穷，余额里你很穷。每一笔“为了人设”的开销，都在悄悄抽走你的自由。',
      insights: [
        '你的钱没乱花，它只是“为了看起来过得不错”花掉了。',
        '凑满减多买的那件，你一年没穿过；自动续费的会员，你早不用了。',
        '你买的不是东西，是“别人眼里我过得挺好”的那个瞬间。'
      ],
      theory: '“拿铁因子”（David Bach）：那些不起眼的小钱，日积月累能吃掉一大笔；“心理账户”（Thaler）：你会把钱分进不同“账户”，对“面子账户”格外大方，对“储蓄账户”格外小气。',
      tips: ['查“拿铁因子”：列本月 3 笔最小却最频繁的开销，砍掉其中一项。', '给“面子账户”设月度上限，体面不用靠花钱买。'],
      share: { line: '体面漏财型：我的钱都拿去维持人设了。', tags: ['#拿铁因子', '#心理账户错配', '#体面穷人'] }
    },
    captain: {
      name: '理财掌舵人', emoji: '🧭', rarity: 6,
      proto: { d1: 4.4, d2: 2.2, d3: 3.0, d4: 1.2, d5: 4.4, d6: 4.4 },
      verdict: '你和钱的关系，是成年人里最舒服的那一种。',
      portrait: '储蓄、消费、风险、规划、搞钱，你都不偏科。你知道自己在哪、要去哪、怎么去。你不一定最有钱，但你最稳——风浪来了，你是那个握着舵的人。',
      insights: [
        '别人和钱是“相爱相杀”，你和钱是“合伙人”。',
        '你不是没踩过坑，是你踩完会复盘，不会在同一个坑里躺平。',
        '你最贵的资产，不是钱，是那份“我很清楚自己在干嘛”的定力。'
      ],
      theory: '“财务韧性”（financial wellness）：多维平衡比单点高分更抗风险；大五人格里的“尽责性”研究一致显示——它和储蓄多、负债低正相关。你不是天赋型选手，你是把每件小事都做对的人。',
      tips: ['做“教练”：把经验分享给身边人，这本身就是影响力资产。', '定期复盘维度分，防某一维悄悄滑坡，掌舵人也会偏航。'],
      share: { line: '理财掌舵人：我和钱，是合伙人。', tags: ['#财务韧性', '#全能体质', '#钱的合伙人'] }
    }
  };

  // ---------- 题目 → 维度 映射：30 题全部参与计分，无死题 ----------
  const DIM_Q = {
    d1: [1, 2, 3, 4, 5],
    d2: [6, 7, 8, 9, 10],
    d3: [11, 12, 13, 14, 15],
    d4: [16, 17, 18, 19, 20],
    d5: [21, 22, 23, 24, 25],
    d6: [26, 27, 28, 29, 30]
  };
  // 反向计分题：该题原分越高代表金钱信念越健康，取反后并入“金钱困惑”维度
  const REVERSE_Q = { 19: true };

  // 方向一致化后的 6 维分（1~5）
  // d1 储蓄纪律(越高越好) d2 消费痛感(越高越易冲动) d3 风险偏好(越高越激进)
  // d4 金钱困惑(越高信念越拧巴) d5 财务掌控(越高越好) d6 搞钱能动(越高越好)
  function calcDimScores(ans) {
    const s = {};
    for (const k in DIM_Q) {
      const ids = DIM_Q[k];
      let sum = 0, n = 0;
      ids.forEach(id => {
        const v = ans[id];
        if (!v) return;                       // 未答不参与，避免 0 拉低均值
        sum += REVERSE_Q[id] ? (6 - v) : v;
        n++;
      });
      s[k] = n ? +(sum / n).toFixed(2) : 3;
    }
    return s;
  }

  // 判定：与 8 个人格原型的欧氏距离取最近者（原型最近邻分类）
  // 叠加稀有度先验（贝叶斯）：越稀有的体质，画像需越接近才会被判为它
  // 否则兜底逻辑会把不匹配者全塞进同一类，导致稀有度严重失真
  const PRIOR_LAMBDA = 0.55;
  function classify(ans) {
    const s = calcDimScores(ans);
    let best = null, bestCost = Infinity;
    for (const key in results) {
      const p = results[key].proto;
      let sq = 0;
      for (const k in s) { const d = s[k] - p[k]; sq += d * d; }
      const dist = Math.sqrt(sq);
      const prior = -Math.log(results[key].rarity / 100);
      const cost = dist + PRIOR_LAMBDA * prior;
      if (cost < bestCost) { bestCost = cost; best = key; }
    }
    return { type: best, scores: s, match: +bestCost.toFixed(2) };
  }

  // ---------- 财富健康分（千分制 0~1000） ----------
  // 储蓄/掌控/能动：越高越好；消费痛感/金钱回避：越低越好；风险偏好：中庸最佳
  // 千分制优势：数字量级更大、更显“分量”，尾数由真实小数精度自然生成（0~9，非整百错觉）
  function healthScore(s) {
    const hi = v => (v - 1) / 4 * 100;            // 越高越好
    const lo = v => (5 - v) / 4 * 100;            // 越低越好
    // 风险偏好：中庸最佳，但两侧惩罚不对称——
    // 激进(>3)罚更重（投机可能亏掉本金），保守(<3)罚略轻（少赚而已，本金还在）
    // 若用对称惩罚，会导致答1与答5得分相同，第11~15题形同虚设
    const bal = v => {
      const dev = Math.abs(v - 3);
      const pen = v > 3 ? dev / 2 * 100 * 1.25 : dev / 2 * 100 * 0.85;
      return Math.max(0, Math.min(100, 100 - pen));
    };
    const score100 =
      0.20 * hi(s.d1) +
      0.18 * lo(s.d2) +
      0.12 * bal(s.d3) +
      0.15 * lo(s.d4) +
      0.20 * hi(s.d5) +
      0.15 * hi(s.d6);
    return Math.max(0, Math.min(1000, Math.round(score100 * 10)));
  }

  // ---------- 全国百分位：由分数连续推导，而非分段硬编码 ----------
  // 模型假设：人群财富健康分近似正态 N(POP_MEAN, POP_SD²)
  // 参数取自 8 个原型的典型分分布，保证百分位随分数单调递增、可推导
  const POP_MEAN = 610, POP_SD = 150;
  function erf(x) {
    // Abramowitz & Stegun 7.1.26 近似，|误差| < 1.5e-7
    const t = 1 / (1 + 0.3275911 * Math.abs(x));
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x));
    return x >= 0 ? y : -y;
  }
  function nationalPercentile(score) {
    const z = (score - POP_MEAN) / POP_SD;
    const pct = Math.round(0.5 * (1 + erf(z / Math.SQRT2)) * 100);
    return Math.max(1, Math.min(99, pct));
  }

  function scoreBand(score) {
    const pct = nationalPercentile(score);
    if (score >= 850) return { label: '财富优等生', pct, impact: '你击败了全国 ' + pct + '% 的搞钱人——这分数建议直接裱起来' };
    if (score >= 700) return { label: '财富潜力股', pct, impact: '你击败了全国 ' + pct + '% 的搞钱人，晒出去能收一排柠檬🍋' };
    if (score >= 550) return { label: '财富进阶中', pct, impact: '你跑赢了全国 ' + pct + '% 的人，再往前一步就赢' };
    if (score >= 400) return { label: '财富探索者', pct, impact: '你跑赢了全国 ' + pct + '% 的人，搞钱潜能还在待机' };
    return { label: '财富萌新', pct, impact: '你跑赢了全国 ' + pct + '% 的人——醒得早的人，反而跑得远' };
  }

  // ---------- 模型自检：让整套计算逻辑可被验证 ----------
  function validateModel() {
    const issues = [];
    // 1. 稀有度加总应 ≈ 100%（完整的人群分布设定）
    let sum = 0;
    for (const k in results) sum += results[k].rarity;
    if (Math.abs(sum - 100) > 0.5) issues.push('稀有度加总=' + sum + '，应≈100');
    // 2. 30 题必须全部参与计分，且不重复
    const used = [];
    for (const k in DIM_Q) DIM_Q[k].forEach(id => used.push(id));
    for (let i = 1; i <= 30; i++) if (used.indexOf(i) < 0) issues.push('第' + i + '题未参与计分');
    if (used.length !== 30) issues.push('题目归属总数=' + used.length + '，应为30且无重复');
    // 3. 原型值须落在 1~5 量表内
    for (const k in results) {
      const p = results[k].proto;
      for (const d in p) if (p[d] < 1 || p[d] > 5) issues.push(k + ' 原型 ' + d + ' 越界');
    }
    // 4. 人格强弱顺序 与 典型分 必须同向（最强体质得分最高）
    const byStrength = ['captain', 'machine', 'rentier', 'hamster', 'leaker', 'snail', 'speculator', 'artist'];
    let prev = Infinity;
    byStrength.forEach(k => {
      const sc = healthScore(results[k].proto);
      if (sc > prev) issues.push('典型分与强弱顺序不一致：' + k + '=' + sc);
      prev = sc;
    });
    // 5. 百分位须随分数单调递增
    let lastPct = -1;
    [200, 400, 600, 800, 950].forEach(sc => {
      const p = nationalPercentile(sc);
      if (p < lastPct) issues.push('百分位非单调递增：' + sc + '分');
      lastPct = p;
    });
    return issues;
  }

  // ---------- 共享渲染：雷达图 + 结果长图 HTML ----------
  const SHORT = { d1: '储蓄', d2: '消费', d3: '风险', d4: '信念', d5: '掌控', d6: '能动' };

  function radarSVG(scores) {
    const dims = dimensions, n = dims.length;
    const cx = 130, cy = 122, R = 84;
    const ang = i => -Math.PI / 2 + i * 2 * Math.PI / n;
    let grid = '';
    [0.25, 0.5, 0.75, 1].forEach(f => {
      const pts = [];
      for (let i = 0; i < n; i++) { const a = ang(i); pts.push((cx + R * f * Math.cos(a)).toFixed(1) + ',' + (cy + R * f * Math.sin(a)).toFixed(1)); }
      grid += '<polygon points="' + pts.join(' ') + '" fill="none" stroke="#F5E6EC" stroke-width="1"/>';
    });
    let axes = '', labels = '';
    for (let i = 0; i < n; i++) {
      const a = ang(i);
      const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
      axes += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="#FAE8EE" stroke-width="1"/>';
      const lx = cx + (R + 15) * Math.cos(a), ly = cy + (R + 15) * Math.sin(a);
      labels += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" font-size="10" fill="#B0446E" text-anchor="middle" dominant-baseline="middle">' + SHORT[dims[i].key] + '</text>';
    }
    const vpts = [];
    for (let i = 0; i < n; i++) { const a = ang(i); const v = scores[dims[i].key] / 5; vpts.push((cx + R * v * Math.cos(a)).toFixed(1) + ',' + (cy + R * v * Math.sin(a)).toFixed(1)); }
    const poly = '<polygon points="' + vpts.join(' ') + '" fill="rgba(224,36,155,0.16)" stroke="#E0249B" stroke-width="2"/>';
    const dots = vpts.map(p => { const [x, y] = p.split(','); return '<circle cx="' + x + '" cy="' + y + '" r="2.6" fill="#FF6BA6"/>'; }).join('');
    return '<svg viewBox="0 0 260 250" width="100%" xmlns="http://www.w3.org/2000/svg">' + grid + axes + labels + poly + dots + '</svg>';
  }

  // ---------- 结果页封面图标：8 个强差异化「钱系」SVG ----------
  function G(p) {
    return '<defs>' +
      '<radialGradient id="' + p + 'bg" cx="50%" cy="42%" r="62%"><stop offset="0" stop-color="#FFEAD8"/><stop offset="1" stop-color="#FFEAD8" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="' + p + 'gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFD24D"/><stop offset="1" stop-color="#FF7A00"/></linearGradient>' +
      '<linearGradient id="' + p + 'pur" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B14BFF"/><stop offset="1" stop-color="#7B2FFF"/></linearGradient>' +
      '</defs>';
  }
  var FONT = "font-family:Arial,'PingFang SC','Microsoft YaHei',sans-serif";

  function icCaptain() {
    return '<svg class="mascot" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">' + G('c') +
      '<circle cx="60" cy="60" r="56" fill="url(#cbg)"/>' +
      '<ellipse cx="60" cy="110" rx="32" ry="5" fill="rgba(214,69,110,0.12)"/>' +
      '<g stroke="url(#cgold)" stroke-width="8" stroke-linecap="round">' +
      '<line x1="60" y1="16" x2="60" y2="34"/><line x1="60" y1="86" x2="60" y2="104"/>' +
      '<line x1="16" y1="60" x2="34" y2="60"/><line x1="86" y1="60" x2="104" y2="60"/>' +
      '<line x1="30" y1="30" x2="42" y2="42"/><line x1="90" y1="30" x2="78" y2="42"/>' +
      '<line x1="30" y1="90" x2="42" y2="78"/><line x1="90" y1="90" x2="78" y2="78"/></g>' +
      '<circle cx="60" cy="60" r="34" fill="none" stroke="url(#cgold)" stroke-width="8"/>' +
      '<circle cx="60" cy="60" r="22" fill="none" stroke="#E0A23A" stroke-width="3"/>' +
      '<circle cx="60" cy="60" r="15" fill="url(#cgold)" stroke="#fff" stroke-width="2"/>' +
      '<text x="60" y="66" text-anchor="middle" font-size="16" font-weight="900" fill="#fff" ' + FONT + '>¥</text>' +
      '</svg>';
  }
  function icMachine() {
    return '<svg class="mascot" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">' + G('m') +
      '<circle cx="60" cy="60" r="56" fill="url(#mbg)"/>' +
      '<ellipse cx="60" cy="110" rx="32" ry="5" fill="rgba(214,69,110,0.12)"/>' +
      '<circle cx="44" cy="48" r="20" fill="none" stroke="url(#mpur)" stroke-width="7" stroke-dasharray="5 4"/>' +
      '<circle cx="44" cy="48" r="9" fill="#fff"/><circle cx="44" cy="48" r="3.5" fill="url(#mpur)"/>' +
      '<circle cx="76" cy="70" r="16" fill="none" stroke="url(#mgold)" stroke-width="6" stroke-dasharray="4 4"/>' +
      '<circle cx="76" cy="70" r="7" fill="#fff"/><circle cx="76" cy="70" r="3" fill="url(#mgold)"/>' +
      '<line x1="58" y1="54" x2="64" y2="64" stroke="#C9A0FF" stroke-width="4" stroke-linecap="round"/>' +
      '<line x1="30" y1="94" x2="92" y2="94" stroke="#E0A23A" stroke-width="3" stroke-linecap="round"/>' +
      '<circle cx="38" cy="94" r="6" fill="url(#mgold)" stroke="#fff" stroke-width="1.5"/>' +
      '<circle cx="56" cy="94" r="6" fill="url(#mgold)" stroke="#fff" stroke-width="1.5"/>' +
      '<circle cx="74" cy="94" r="6" fill="url(#mgold)" stroke="#fff" stroke-width="1.5"/>' +
      '<circle cx="90" cy="94" r="6" fill="url(#mgold)" stroke="#fff" stroke-width="1.5"/>' +
      '<path d="M14 44 L26 44 M14 56 L24 56" stroke="#FFD84D" stroke-width="3" stroke-linecap="round"/>' +
      '</svg>';
  }
  function icHamster() {
    return '<svg class="mascot" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">' + G('h') +
      '<circle cx="60" cy="60" r="56" fill="url(#hbg)"/>' +
      '<ellipse cx="60" cy="110" rx="32" ry="5" fill="rgba(214,69,110,0.12)"/>' +
      '<circle cx="44" cy="101" r="9" fill="url(#hgold)" stroke="#fff" stroke-width="1.5"/><text x="44" y="104" text-anchor="middle" font-size="9" font-weight="900" fill="#fff" ' + FONT + '>¥</text>' +
      '<circle cx="60" cy="105" r="10" fill="url(#hgold)" stroke="#fff" stroke-width="1.5"/><text x="60" y="108" text-anchor="middle" font-size="10" font-weight="900" fill="#fff" ' + FONT + '>¥</text>' +
      '<circle cx="76" cy="101" r="9" fill="url(#hgold)" stroke="#fff" stroke-width="1.5"/><text x="76" y="104" text-anchor="middle" font-size="9" font-weight="900" fill="#fff" ' + FONT + '>¥</text>' +
      '<circle cx="60" cy="91" r="8" fill="url(#hgold)" stroke="#fff" stroke-width="1.5"/><text x="60" y="94" text-anchor="middle" font-size="8" font-weight="900" fill="#fff" ' + FONT + '>¥</text>' +
      '<ellipse cx="60" cy="62" rx="36" ry="34" fill="#FFE6D2" stroke="#F2B58C" stroke-width="2"/>' +
      '<circle cx="38" cy="38" r="11" fill="#FFE6D2" stroke="#F2B58C" stroke-width="2"/><circle cx="38" cy="38" r="5" fill="#FFC2C9"/>' +
      '<circle cx="82" cy="38" r="11" fill="#FFE6D2" stroke="#F2B58C" stroke-width="2"/><circle cx="82" cy="38" r="5" fill="#FFC2C9"/>' +
      '<circle cx="33" cy="66" r="13" fill="#FFFFFF" opacity="0.55" stroke="#F2B58C" stroke-width="1.5"/>' +
      '<circle cx="87" cy="66" r="13" fill="#FFFFFF" opacity="0.55" stroke="#F2B58C" stroke-width="1.5"/>' +
      '<circle cx="33" cy="66" r="3.5" fill="url(#hgold)"/><circle cx="87" cy="66" r="3.5" fill="url(#hgold)"/>' +
      '<path d="M50 56 Q54 60 58 56" stroke="#7A3358" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<path d="M62 56 Q66 60 70 56" stroke="#7A3358" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<circle cx="60" cy="62" r="2.5" fill="#7A3358"/>' +
      '<circle cx="45" cy="64" r="3" fill="#FF9DBE"/><circle cx="75" cy="64" r="3" fill="#FF9DBE"/>' +
      '</svg>';
  }
  function icArtist() {
    var star = 'points="0,-8 2.1,-2.8 8.6,-2.8 3.4,1.4 5.3,7.6 0,3.2 -5.3,7.6 -3.4,1.4 -8.6,-2.8 -2.1,-2.8"';
    return '<svg class="mascot" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">' + G('a') +
      '<circle cx="60" cy="60" r="56" fill="url(#abg)"/>' +
      '<ellipse cx="60" cy="110" rx="32" ry="5" fill="rgba(214,69,110,0.12)"/>' +
      '<path d="M40 54 Q60 40 80 54 L86 96 Q60 108 34 96 Z" fill="url(#apur)" stroke="#fff" stroke-width="2"/>' +
      '<path d="M44 54 Q60 46 76 54" stroke="#fff" stroke-width="3" fill="none"/>' +
      '<ellipse cx="60" cy="50" rx="14" ry="5" fill="#fff"/>' +
      '<text x="60" y="87" text-anchor="middle" font-size="20" font-weight="900" fill="#fff" opacity="0.45" ' + FONT + '>¥</text>' +
      '<polygon transform="translate(94 34)" ' + star + ' fill="url(#agold)" stroke="#fff" stroke-width="0.6"/>' +
      '<polygon transform="translate(28 32)" ' + star + ' fill="#FF6FA5" stroke="#fff" stroke-width="0.6"/>' +
      '<polygon transform="translate(98 64) rotate(12)" ' + star + ' fill="#FFB14D" stroke="#fff" stroke-width="0.6"/>' +
      '<line x1="20" y1="98" x2="44" y2="68" stroke="#3DA5FF" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="44" cy="68" r="5" fill="#FF3D68"/>' +
      '</svg>';
  }
  function icSpeculator() {
    return '<svg class="mascot" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">' + G('s') +
      '<circle cx="60" cy="60" r="56" fill="url(#sbg)"/>' +
      '<ellipse cx="60" cy="110" rx="32" ry="5" fill="rgba(214,69,110,0.12)"/>' +
      '<path d="M8 96 Q26 82 44 96 T80 96 T112 96" stroke="#3DA5FF" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<path d="M8 104 Q26 92 44 104 T80 104 T112 104" stroke="#9ED0FF" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<rect x="34" y="90" width="52" height="11" rx="5.5" transform="rotate(-16 60 95)" fill="url(#sgold)" stroke="#E0A23A" stroke-width="1.5"/>' +
      '<line x1="30" y1="92" x2="90" y2="92" transform="rotate(-16 60 95)" stroke="#E0A23A" stroke-width="1" opacity="0.6"/>' +
      '<circle cx="60" cy="56" r="16" fill="url(#sgold)" stroke="#fff" stroke-width="2"/>' +
      '<text x="60" y="62" text-anchor="middle" font-size="16" font-weight="900" fill="#fff" ' + FONT + '>¥</text>' +
      '<line x1="74" y1="48" x2="88" y2="38" stroke="#FF7A00" stroke-width="3" stroke-linecap="round"/>' +
      '<circle cx="88" cy="38" r="3.5" fill="#FF7A00"/>' +
      '<g transform="translate(92 70)"><rect x="-7" y="-7" width="14" height="14" rx="3" fill="#fff" stroke="#FF3D68" stroke-width="2"/>' +
      '<circle cx="-2.5" cy="-2.5" r="1.6" fill="#FF3D68"/><circle cx="2.5" cy="-2.5" r="1.6" fill="#FF3D68"/><circle cx="-2.5" cy="2.5" r="1.6" fill="#FF3D68"/><circle cx="2.5" cy="2.5" r="1.6" fill="#FF3D68"/></g>' +
      '<circle cx="26" cy="84" r="2.5" fill="#9ED0FF"/><circle cx="98" cy="86" r="2" fill="#9ED0FF"/>' +
      '</svg>';
  }
  function icRentier() {
    return '<svg class="mascot" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">' + G('r') +
      '<circle cx="60" cy="60" r="56" fill="url(#rbg)"/>' +
      '<ellipse cx="60" cy="110" rx="32" ry="5" fill="rgba(214,69,110,0.12)"/>' +
      '<rect x="34" y="58" width="52" height="44" rx="3" fill="#fff" stroke="#7B2FFF" stroke-width="2"/>' +
      '<path d="M28 58 L60 30 L92 58 Z" fill="url(#rgold)" stroke="#E0A23A" stroke-width="1.5"/>' +
      '<circle cx="44" cy="50" r="3" fill="#FFE9A8" stroke="#C8821A" stroke-width="0.6"/>' +
      '<circle cx="60" cy="44" r="3.4" fill="#FFE9A8" stroke="#C8821A" stroke-width="0.6"/>' +
      '<circle cx="76" cy="50" r="3" fill="#FFE9A8" stroke="#C8821A" stroke-width="0.6"/>' +
      '<rect x="40" y="64" width="11" height="11" rx="1.5" fill="#B9E0FF"/>' +
      '<rect x="69" y="64" width="11" height="11" rx="1.5" fill="#B9E0FF"/>' +
      '<rect x="52" y="76" width="16" height="26" rx="2" fill="#FFD84D"/>' +
      '<rect x="45" y="60" width="30" height="13" rx="3" fill="#FF3D68"/>' +
      '<text x="60" y="70" text-anchor="middle" font-size="9" font-weight="900" fill="#fff" ' + FONT + '>租</text>' +
      '</svg>';
  }
  function icSnail() {
    return '<svg class="mascot" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">' + G('n') +
      '<circle cx="60" cy="60" r="56" fill="url(#nbg)"/>' +
      '<ellipse cx="60" cy="110" rx="32" ry="5" fill="rgba(214,69,110,0.12)"/>' +
      '<path d="M20 86 Q18 100 40 100 L96 100 Q106 100 102 90 Q82 82 60 86 Q40 88 20 86 Z" fill="#FFE6D2" stroke="#F2B58C" stroke-width="2"/>' +
      '<circle cx="64" cy="56" r="28" fill="url(#ngold)" stroke="#fff" stroke-width="3"/>' +
      '<circle cx="64" cy="56" r="20" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>' +
      '<rect x="58" y="38" width="12" height="4" rx="2" fill="#C8821A"/>' +
      '<circle cx="64" cy="62" r="7" fill="#FFE9A8" stroke="#C8821A" stroke-width="1"/>' +
      '<line x1="34" y1="84" x2="30" y2="66" stroke="#F2B58C" stroke-width="2.5" stroke-linecap="round"/>' +
      '<line x1="42" y1="84" x2="46" y2="66" stroke="#F2B58C" stroke-width="2.5" stroke-linecap="round"/>' +
      '<circle cx="30" cy="64" r="4" fill="url(#ngold)"/><circle cx="46" cy="64" r="4" fill="url(#ngold)"/>' +
      '<path d="M16 108 Q40 104 64 108 T112 108" stroke="#FFB3C8" stroke-width="2" stroke-dasharray="3 4" fill="none"/>' +
      '</svg>';
  }
  function icLeaker() {
    return '<svg class="mascot" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">' + G('l') +
      '<circle cx="60" cy="60" r="56" fill="url(#lbg)"/>' +
      '<ellipse cx="60" cy="110" rx="32" ry="5" fill="rgba(214,69,110,0.12)"/>' +
      '<path d="M40 48 Q60 36 80 48 L86 90 Q60 102 34 90 Z" fill="url(#lgold)" stroke="#fff" stroke-width="2"/>' +
      '<path d="M48 48 L60 70 L72 48 Z" fill="#5B2DA8"/>' +
      '<path d="M60 52 L55 60 L60 86 L65 60 Z" fill="#FF3D68"/>' +
      '<ellipse cx="60" cy="46" rx="14" ry="5" fill="#fff"/>' +
      '<path d="M50 94 q5 9 11 0 q-5 7 -11 0 Z" fill="#3A1A5A"/>' +
      '<circle cx="53" cy="103" r="5" fill="url(#lgold)" stroke="#fff" stroke-width="1.2"/>' +
      '<circle cx="63" cy="106" r="5" fill="url(#lgold)" stroke="#fff" stroke-width="1.2"/>' +
      '<circle cx="73" cy="102" r="4" fill="url(#lgold)" stroke="#fff" stroke-width="1.2"/>' +
      '</svg>';
  }
  var ICONS = { captain: icCaptain, machine: icMachine, hamster: icHamster, artist: icArtist, speculator: icSpeculator, rentier: icRentier, snail: icSnail, leaker: icLeaker };
  function icon(type) { return (ICONS[type] || icCaptain)(); }

  function cardHTML(res) {
    const t = results[res.type];
    const score = healthScore(res.scores);
    const band = scoreBand(score);
    const rare = t.rarity < 10;

    const dims = dimensions.map(d => {
      const sc = res.scores[d.key];
      return '<div class="dim"><span class="dn">' + d.name + '</span>' +
        '<span class="dtrack"><span class="dfill" style="width:' + (sc / 5 * 100) + '%"></span></span>' +
        '<span class="dv">' + sc.toFixed(1) + '</span></div>';
    }).join('');

    const insights = t.insights.map(x => '<li>' + x + '</li>').join('');

    return '<div class="rc-top">' +
        '<div class="rc-handle">@养生到底-搞钱研究</div>' +
        '<div class="rc-cover-tag">财富体质 · 测试结果</div>' +
        '<div class="rc-emoji">' + icon(res.type) + '</div>' +
        '<div class="rc-name">' + t.name + '</div>' +
        '<div class="rc-verdict">' + t.verdict + '</div>' +
        '<div class="rc-hook">测完这30题，终于知道怎么搞钱</div>' +
      '</div>' +
      '<div class="rc-body">' +
        // —— 分数块（千分制分数 + 冲突感横幅 + 稀有度） ——
        '<div class="rc-scorebox">' +
          '<div class="rc-score-label">你的财富健康分<span class="rc-scale">千分制</span></div>' +
          '<div class="rc-score-num">' + score + '<span class="rc-unit">/1000</span></div>' +
          '<div class="rc-score-band">' + band.label + '</div>' +
          '<div class="rc-impact">' + band.impact + '</div>' +
          '<div class="rc-rarity' + (rare ? ' rare' : '') + '">' +
            (rare ? '🌟 稀有体质' : '📊 同款概率') + ' · 全站仅 ' + t.rarity + '%' +
          '</div>' +
        '</div>' +
        // —— 雷达 ——
        '<div class="rc-radar">' + radarSVG(res.scores) + '</div>' +
        // —— 财富画像 ——
        '<div class="rc-block bk-portrait"><div class="rc-h">🪞 你的财富画像</div><p>' + t.portrait + '</p></div>' +
        // —— 灵魂暴击 ——
        '<div class="rc-insights">' +
          '<div class="rc-h">💥 这3句，句句戳你心趴</div>' +
          '<ul>' + insights + '</ul>' +
        '</div>' +
        // —— 六维 ——
        '<div class="rc-block bk-dim"><div class="rc-h">📊 六维财富得分</div>' + dims + '</div>' +
        // —— 为什么 ——
        '<div class="rc-block bk-why"><div class="rc-h">💡 为什么你会这样</div><p>' + t.theory + '</p></div>' +
        // —— 破局 ——
        '<div class="rc-block bk-fix"><div class="rc-h">🪄 给你的破局建议</div><ul>' + t.tips.map(x => '<li>' + x + '</li>').join('') + '</ul></div>' +
        // —— 分享 ——
        '<div class="rc-share"><p class="share-cta">敢不敢把分数晒出去？看谁才是真·搞钱王👑</p>' +
          '<p class="share-line">' + t.share.line + '</p>' +
          '<div class="share-tags">' + t.share.tags.map(x => '<span>' + x + '</span>').join('') + '</div></div>' +
        '<div class="rc-footer">@养生到底-搞钱研究</div>' +
      '</div>';
  }

  return {
    dimensions, questions, results, DIM_Q, REVERSE_Q,
    calcDimScores, classify, healthScore, scoreBand,
    nationalPercentile, validateModel, radarSVG, cardHTML, icon
  };
})();

// 8-bit 音效播放层 · 基于 Kenney CC0 sfx 资产
// API: window.sfx.play(name)  · window.sfx.seq([{name,at}])  · window.sfx.giftByPrice(coin)
//
// 设计原则：
//   · HTMLAudioElement 池（每音效 3 个实例轮换，支持并发）
//   · iOS Safari 首次 touch/click 统一解锁 AudioContext
//   · 同名音效 50ms 节流，防刷屏
//   · 全局音量 0.25（~25%），不扰民
//   · document 级事件代理：所有 .pixel-btn 点击自动播 click

(function () {
  const BASE = 'assets/sfx/';
  const NAMES = [
    'click','click_soft','select','confirm','error','back_blip',
    'modal_open','modal_close','toggle','whoosh','page_in',
    'coin','coin_big','unlock','achievement','correct_ding',
    'whistle_tweet','kick','goal_fanfare','hattrick','mvp_fanfare',
    'gift_low','gift_mid','gift_high','gift_boom',
    'firework_pop','drum_hit','splat','card_snap','tv_static',
    'card_flip','copy_done','combo_tick','tick',
  ];
  const VOLUME = 0.12;
  const THROTTLE_MS = 80;

  const instances = {};        // name → HTMLAudioElement（每音效只 1 个实例够用）
  const lastPlayed = {};
  let unlocked = false;
  let muted = (function () {
    try { return localStorage.getItem('wc_muted') === '1'; } catch (e) { return false; }
  })();

  // 启动即预创建 + 显式 load()，让文件早早进浏览器缓存
  NAMES.forEach((name) => {
    const a = new Audio(BASE + name + '.ogg');
    a.volume = VOLUME;
    a.preload = 'auto';
    try { a.load(); } catch (e) {}
    instances[name] = a;
    lastPlayed[name] = 0;
  });

  function unlockAll() {
    if (unlocked) return;
    unlocked = true;
    // iOS 首次 user gesture 后统一触发一次解锁（文件已下载，此时只是拿到 play 许可）
    NAMES.forEach((name) => {
      try { instances[name].load(); } catch (e) {}
    });
  }

  function play(name) {
    if (!name) return;
    if (muted) return;
    const a = instances[name];
    if (!a) return;
    const now = Date.now();
    if (now - lastPlayed[name] < THROTTLE_MS) return;
    lastPlayed[name] = now;
    try {
      a.currentTime = 0;
      const p = a.play();
      if (p && p.catch) p.catch(() => {});
    } catch (e) {}
  }

  // 序列播放：[{name:'kick', at:0}, {name:'goal_fanfare', at:150}, ...]
  function seq(steps) {
    if (!Array.isArray(steps)) return;
    steps.forEach((s) => {
      setTimeout(() => play(s.name), s.at || 0);
    });
  }

  // 按礼物单价自动匹配档位音效（doc 4 档：1-9 / 10-99 / 100-999 / 1000+）
  function giftByPrice(coin) {
    const n = Number(coin) || 0;
    if (n >= 1000) play('gift_boom');
    else if (n >= 100) play('gift_high');
    else if (n >= 10)  play('gift_mid');
    else play('gift_low');
  }

  // 进球组合音效（精简：号角 + 1 声烟花）
  function goalBurst() {
    seq([
      { name: 'goal_fanfare', at: 0   },
      { name: 'firework_pop', at: 280 },
    ]);
  }

  // MVP 结算合奏（精简：主题 + 成就）
  function mvpBurst() {
    seq([
      { name: 'mvp_fanfare', at: 0   },
      { name: 'achievement', at: 450 },
    ]);
  }

  // Hat-trick 三连击（精简：主题单播）
  function hatTrickBurst() {
    play('hattrick');
  }

  // document 级事件代理：只给 NavPanel 按钮挂 whoosh，其他交互由页面显式调用 sfx.play()
  // 取消 .pixel-btn 自动 click —— 普通按钮太多，叠加太冲
  document.addEventListener('click', (e) => {
    unlockAll();
    if (window.__sfx_suppressClick) {
      window.__sfx_suppressClick = false;
      return;
    }
    let el = e.target;
    while (el && el !== document.body) {
      if (el.classList && el.classList.contains('nav-btn')) {
        play('whoosh');
        return;
      }
      el = el.parentElement;
    }
  }, false);

  // 首次任意 pointerdown/touch 统一解锁
  ['pointerdown', 'touchstart', 'keydown'].forEach((ev) => {
    document.addEventListener(ev, unlockAll, { once: false, passive: true });
  });

  window.sfx = {
    play,
    seq,
    giftByPrice,
    goalBurst,
    mvpBurst,
    hatTrickBurst,
    suppressNextClick() { window.__sfx_suppressClick = true; },
    setVolume(v) {
      const vol = Math.max(0, Math.min(1, Number(v)));
      NAMES.forEach((n) => { if (instances[n]) instances[n].volume = vol; });
    },
    setMuted(val) {
      muted = !!val;
      try { localStorage.setItem('wc_muted', muted ? '1' : '0'); } catch (e) {}
    },
    isMuted() { return muted; },
  };
})();

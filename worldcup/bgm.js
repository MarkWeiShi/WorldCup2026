// 背景音乐（BGM）播放层 v3 · 回到 HTMLAudioElement + 强 pause 兜底
//   · Web Audio 版在 iOS Safari 上静音（createMediaElementSource 的异步时序坑）
//   · 改回 <audio>，但切后台时除了 pause 还清零 volume、并在 resume 时重 play
//   API: window.bgm.setPage(pageId)  ·  window.bgm.stop()

(function () {
  const BASE = 'assets/bgm/';
  const TRACKS = {
    'theme':   BASE + 'theme.mp3',      // 原 theme.ogg 320kbps → 压到 80kbps mp3
    'stadium': BASE + 'stadium.mp3',    // 320kbps 立体声 → 48kbps 单声道
    'room':    BASE + 'room.mp3',       // 320kbps 立体声 → 48kbps 单声道
  };
  const PAGE_TO_TRACK = {
    'H0':    'theme',
    'P1':    'stadium',
    'P2':    'theme', 'P2.1':'theme',
    'P3':    'theme',
    'P4':    'theme',
    'P5':    'theme', 'P5.1':null,
    'P6':    'theme',
    'P7':    'theme',
    'P8':    'theme',
    'P9':    'theme',
    'P10':   'theme','P10.1':'theme','P10.2':'theme','P10.3':'theme',
    'P11':   'stadium',
    'P12':   'theme',
    'P13':   'room', 'P13.1':null,
    'P14':   'theme',
    'P15':   'theme',
    'P16':   'theme',
    'P17':   'stadium',
    'P18':   'theme',
    'P19':   'theme',
  };
  const VOLUME = 0.06;
  const FADE_MS = 400;
  const FADE_STEPS = 12;

  const cache = {};                 // trackName → HTMLAudioElement
  let currentTrack = null;
  let unlocked = false;
  let pendingPage = null;
  let pausedByVisibility = false;
  let muted = (function () {
    try { return localStorage.getItem('wc_muted') === '1'; } catch (e) { return false; }
  })();

  // 启动即预创建所有 BGM 元素 + 触发浏览器开始下载（不等用户导航）
  function preloadAll() {
    Object.keys(TRACKS).forEach((track) => {
      if (cache[track]) return;
      const a = new Audio(TRACKS[track]);
      a.loop = true;
      a.volume = 0;
      a.preload = 'auto';
      a.playsInline = true;
      a.__fadeTimer = null;
      try { a.load(); } catch (e) {}   // 显式 kick 下载
      cache[track] = a;
    });
  }
  preloadAll();                        // script 加载瞬间就开始抓 3 个 BGM 文件

  function getAudio(track) {
    return cache[track] || (preloadAll(), cache[track]);
  }

  // 每个 audio 挂自己的 fade timer，避免多个 audio 共用一个 timer 互相打断
  function fade(audio, to, ms, onDone) {
    if (!audio) return;
    if (audio.__fadeTimer) { clearInterval(audio.__fadeTimer); audio.__fadeTimer = null; }
    const from = audio.volume;
    const steps = FADE_STEPS;
    const dt = ms / steps;
    let i = 0;
    audio.__fadeTimer = setInterval(() => {
      i += 1;
      const t = i / steps;
      audio.volume = Math.max(0, Math.min(1, from + (to - from) * t));
      if (i >= steps) {
        clearInterval(audio.__fadeTimer);
        audio.__fadeTimer = null;
        if (onDone) onDone();
      }
    }, dt);
  }

  function silenceOthers(except) {
    Object.keys(cache).forEach((k) => {
      if (k === except) return;
      const a = cache[k];
      if (a.paused && a.volume < 0.001) return;
      fade(a, 0, FADE_MS, () => { try { a.pause(); } catch (e) {} });
    });
  }

  function playTrack(track) {
    if (!track || !TRACKS[track]) return;
    if (!unlocked) return;
    // muted 时仍记录 currentTrack 以便 setMuted(false) 可恢复
    if (muted) { currentTrack = track; return; }
    silenceOthers(track);
    const next = getAudio(track);
    if (currentTrack === track && !next.paused && next.volume >= VOLUME - 0.005) return;
    currentTrack = track;
    try {
      if (next.paused) {
        const p = next.play();
        if (p && p.catch) p.catch(() => {});
      }
      fade(next, VOLUME, FADE_MS);
    } catch (e) {}
  }

  function stop() {
    Object.keys(cache).forEach((k) => {
      const a = cache[k];
      fade(a, 0, FADE_MS, () => { try { a.pause(); } catch (e) {} });
    });
    currentTrack = null;
  }

  function setPage(pageId) {
    const track = PAGE_TO_TRACK[pageId];
    if (!unlocked) { pendingPage = pageId; return; }
    if (track === null || track === undefined) { stop(); return; }
    playTrack(track);
  }

  // 首次任意 user gesture 解锁
  function unlockOnce() {
    if (unlocked) return;
    unlocked = true;
    if (pendingPage) { const p = pendingPage; pendingPage = null; setPage(p); }
  }
  ['pointerdown', 'touchstart', 'keydown', 'click'].forEach((ev) => {
    document.addEventListener(ev, unlockOnce, { passive: true });
  });

  // ── 后台挂起 · 多路兜底 · 防 iOS Safari media session 续播 ──
  function backgroundPause() {
    let any = false;
    Object.values(cache).forEach((a) => {
      if (!a.paused) {
        any = true;
        try { a.pause(); } catch (e) {}
        if (a.__fadeTimer) { clearInterval(a.__fadeTimer); a.__fadeTimer = null; }
        a.volume = 0;             // 双保险：即便 pause 被忽略也静音
      }
    });
    if (any) pausedByVisibility = true;
  }
  function foregroundResume() {
    if (!pausedByVisibility) return;
    pausedByVisibility = false;
    if (currentTrack && cache[currentTrack]) {
      const a = cache[currentTrack];
      try {
        const p = a.play();
        if (p && p.catch) p.catch(() => {});
      } catch (e) {}
      fade(a, VOLUME, FADE_MS);
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) backgroundPause();
    else foregroundResume();
  });
  window.addEventListener('pagehide', backgroundPause);
  window.addEventListener('blur',     backgroundPause);
  window.addEventListener('pageshow', foregroundResume);
  window.addEventListener('focus',    foregroundResume);

  function setMuted(val) {
    const next = !!val;
    if (next === muted) return;
    muted = next;
    try { localStorage.setItem('wc_muted', muted ? '1' : '0'); } catch (e) {}
    if (muted) {
      // 静音：暂停并清零所有 track，但保留 currentTrack 以便恢复
      Object.values(cache).forEach((a) => {
        if (a.__fadeTimer) { clearInterval(a.__fadeTimer); a.__fadeTimer = null; }
        try { a.pause(); } catch (e) {}
        a.volume = 0;
      });
    } else {
      // 取消静音：恢复 currentTrack（若有）
      if (currentTrack && cache[currentTrack] && unlocked) {
        const a = cache[currentTrack];
        try {
          const p = a.play();
          if (p && p.catch) p.catch(() => {});
        } catch (e) {}
        fade(a, VOLUME, FADE_MS);
      }
    }
  }

  window.bgm = {
    setPage,
    stop,
    setVolume(v) {
      const val = Math.max(0, Math.min(1, Number(v)));
      if (currentTrack && cache[currentTrack]) cache[currentTrack].volume = val;
    },
    setMuted,
    isMuted() { return muted; },
  };
})();

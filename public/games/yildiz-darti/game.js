(() => {
  "use strict";

  const TAU = Math.PI * 2;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  const easeInOutCubic = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  function mulberry32(seed) {
    return function random() {
      let t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function roundedRectPath(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function starPath(ctx, cx, cy, points, outerRadius, innerRadius, rotation = -Math.PI / 2) {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i += 1) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = rotation + i * Math.PI / points;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  class AudioEngine {
    constructor() {
      this.enabled = true;
      this.context = null;
      this.master = null;
      this.musicTimer = null;
      this.musicStep = 0;
      this.noiseBuffer = null;
    }

    ensure() {
      if (!this.enabled) return false;
      if (!this.context) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return false;
        this.context = new AudioContext();
        this.master = this.context.createGain();
        this.master.gain.value = .42;
        this.master.connect(this.context.destination);
        this.noiseBuffer = this.createNoiseBuffer();
      }
      if (this.context.state === "suspended") this.context.resume().catch(() => {});
      return true;
    }

    createNoiseBuffer() {
      const length = Math.floor(this.context.sampleRate * .7);
      const buffer = this.context.createBuffer(1, length, this.context.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
      return buffer;
    }

    tone(frequency, duration, type = "sine", volume = .12, delay = 0, glideTo = null) {
      if (!this.ensure()) return;
      const now = this.context.currentTime + delay;
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now);
      if (glideTo) oscillator.frequency.exponentialRampToValueAtTime(glideTo, now + duration);
      gain.gain.setValueAtTime(.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + Math.min(.025, duration * .18));
      gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
      oscillator.connect(gain);
      gain.connect(this.master);
      oscillator.start(now);
      oscillator.stop(now + duration + .03);
    }

    filteredNoise(duration = .35, volume = .08, startFreq = 1500, endFreq = 350) {
      if (!this.ensure() || !this.noiseBuffer) return;
      const now = this.context.currentTime;
      const source = this.context.createBufferSource();
      const filter = this.context.createBiquadFilter();
      const gain = this.context.createGain();
      source.buffer = this.noiseBuffer;
      filter.type = "bandpass";
      filter.Q.value = .7;
      filter.frequency.setValueAtTime(startFreq, now);
      filter.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.master);
      source.start(now);
      source.stop(now + duration);
    }

    tap() {
      this.tone(520, .08, "sine", .09);
      this.tone(780, .09, "sine", .05, .035);
    }

    charge(value) {
      const frequency = 250 + value * 360;
      this.tone(frequency, .07, "triangle", .025);
    }

    whoosh(power) {
      this.filteredNoise(.34, .09 + power * .04, 2200, 260);
      this.tone(180 + power * 80, .3, "sine", .05, 0, 420 + power * 90);
    }

    hit(points) {
      if (points >= 100) {
        [523.25, 659.25, 783.99, 1046.5].forEach((note, index) => this.tone(note, .45, "triangle", .095, index * .065));
        this.tone(130.81, .55, "sine", .07);
        return;
      }
      if (points >= 60) {
        [440, 554.37, 659.25].forEach((note, index) => this.tone(note, .32, "triangle", .075, index * .055));
        return;
      }
      if (points > 0) {
        this.tone(392, .2, "triangle", .065);
        this.tone(523.25, .24, "sine", .06, .055);
      } else {
        this.tone(180, .19, "sine", .045, 0, 130);
      }
    }

    bonus() {
      [880, 1174.66, 1396.91].forEach((note, index) => this.tone(note, .28, "sine", .055, index * .04));
    }

    level() {
      [261.63, 329.63, 392, 523.25].forEach((note, index) => this.tone(note, .55, "triangle", .07, index * .1));
    }

    startMusic() {
      if (!this.enabled || this.musicTimer) return;
      if (!this.ensure()) return;
      const notes = [261.63, 329.63, 392, 329.63, 293.66, 392, 440, 392];
      const playStep = () => {
        if (!this.enabled || !this.context) return;
        const note = notes[this.musicStep % notes.length];
        this.tone(note, .85, "sine", .022);
        if (this.musicStep % 2 === 0) this.tone(note / 2, 1.1, "triangle", .013);
        if (this.musicStep % 4 === 0) this.tone(note * 2, .28, "sine", .012, .12);
        this.musicStep += 1;
      };
      playStep();
      this.musicTimer = window.setInterval(playStep, 920);
    }

    stopMusic() {
      if (this.musicTimer) window.clearInterval(this.musicTimer);
      this.musicTimer = null;
    }

    setEnabled(enabled) {
      this.enabled = enabled;
      if (!enabled) {
        this.stopMusic();
        if (this.master && this.context) this.master.gain.setTargetAtTime(.0001, this.context.currentTime, .03);
      } else {
        this.ensure();
        if (this.master && this.context) this.master.gain.setTargetAtTime(.42, this.context.currentTime, .03);
      }
    }
  }

  class Particle {
    constructor(options) {
      Object.assign(this, {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        gravity: 0,
        drag: .985,
        life: 1,
        maxLife: 1,
        size: 4,
        color: "#fff",
        glow: 0,
        shape: "circle",
        rotation: 0,
        spin: 0,
        alpha: 1
      }, options);
    }

    update(dt) {
      this.life -= dt;
      this.vx *= Math.pow(this.drag, dt * 60);
      this.vy *= Math.pow(this.drag, dt * 60);
      this.vy += this.gravity * dt;
      this.x += this.vx * dt;
      this.y += this.vy * dt;
      this.rotation += this.spin * dt;
      return this.life > 0;
    }

    draw(ctx) {
      const t = clamp(this.life / this.maxLife, 0, 1);
      ctx.save();
      ctx.globalAlpha = t * this.alpha;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      if (this.glow) {
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.glow;
      }
      ctx.fillStyle = this.color;
      if (this.shape === "star") {
        starPath(ctx, 0, 0, 5, this.size, this.size * .45);
        ctx.fill();
      } else if (this.shape === "diamond") {
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(this.size * .62, 0);
        ctx.lineTo(0, this.size);
        ctx.lineTo(-this.size * .62, 0);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size * (.7 + t * .3), 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  class StarDartGame {
    constructor() {
      this.canvas = document.getElementById("gameCanvas");
      this.ctx = this.canvas.getContext("2d", { alpha: false });
      this.shell = document.getElementById("gameShell");
      this.audio = new AudioEngine();
      this.reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
      this.isTouchDevice = window.matchMedia?.("(pointer: coarse)").matches ?? false;
      this.pointerType = "mouse";
      this.firstThrowMade = false;
      this.coachVisible = false;
      this.hasSeenCoach = this.loadCoachSeen();
      this.pausedTargetFreeze = null;

      this.levels = [
        {
          name: "Sihirli Orman",
          shortName: "Orman",
          story: "İlk yıldız ışığı ormanda saklanıyor. Hedefi vur ve ateş böceklerini uyandır.",
          scene: "forest",
          goal: 100,
          throws: 5,
          radiusScale: 1.04,
          moveX: .022,
          moveY: .015,
          wind: .005,
          colors: ["#1ed8c4", "#8156ec", "#ffd36a"],
          chapter: "1"
        },
        {
          name: "Bulut Şatosu",
          shortName: "Bulut Şatosu",
          story: "İkinci yıldız ışığı bulutların üzerinde. Hareket eden hedefi sakin bir şekilde takip et.",
          scene: "sky",
          goal: 135,
          throws: 5,
          radiusScale: .92,
          moveX: .105,
          moveY: .047,
          wind: .014,
          colors: ["#64e7f4", "#9b66ff", "#ffd76e"],
          chapter: "2"
        },
        {
          name: "Kristal Mağara",
          shortName: "Kristal Mağara",
          story: "Son yıldız ışığı kristallerin arasında. Işıltılı hedefi bul ve üç diyarı tamamla.",
          scene: "cave",
          goal: 165,
          throws: 5,
          radiusScale: .84,
          moveX: .15,
          moveY: .078,
          wind: .022,
          colors: ["#55f0d3", "#b166ff", "#ffcf62"],
          chapter: "3"
        }
      ];

      this.state = "menu";
      this.levelIndex = 0;
      this.totalScore = 0;
      this.roundScore = 0;
      this.throwsLeft = 0;
      this.combo = 0;
      this.bestCombo = 0;
      this.bestScore = this.loadBestScore();
      this.roundStars = [];
      this.particles = [];
      this.embeddedDarts = [];
      this.flyingDart = null;
      this.isAiming = false;
      this.pointer = { x: 0, y: 0, active: false };
      this.crosshair = { x: 0, y: 0 };
      this.keyboardAim = false;
      this.chargeStart = 0;
      this.lastChargeTick = -1;
      this.targetFreeze = null;
      this.targetCenter = { x: 0, y: 0 };
      this.targetRadius = 140;
      this.targetRotation = 0;
      this.bonus = null;
      this.bonusTimer = 0;
      this.bonusHit = false;
      this.screenShake = 0;
      this.flash = 0;
      this.time = 0;
      this.lastFrame = performance.now();
      this.toastTimer = null;
      this.chapterStartAt = 0;
      this.ambient = this.createAmbientObjects();
      this.noisePattern = this.createNoisePattern();
      this.dom = this.collectDom();
      this.bindEvents();
      this.resize();
      this.updateBestScoreLabels();
      this.setState("menu");
      this.showScreen("menuScreen");
      requestAnimationFrame(now => this.loop(now));
    }

    collectDom() {
      const ids = [
        "topHud", "hudLevel", "hudScore", "hudGoal", "hudProgress", "hudDarts",
        "menuScreen", "howToScreen", "chapterScreen", "resultScreen", "finalScreen", "pauseScreen",
        "startButton", "howToButton", "closeHowTo", "howToPlayButton", "chapterStartButton",
        "nextButton", "retryButton", "playAgainButton", "backToMenuButton", "soundButton", "fullscreenButton",
        "pauseButton", "resumeButton", "restartButton", "quitButton", "coachOverlay", "coachButton",
        "menuBest", "chapterBadge", "chapterEyebrow", "chapterTitle", "chapterStory", "chapterGoal",
        "resultStars", "resultEyebrow", "resultTitle", "resultCopy", "resultRoundScore", "resultTotalScore", "resultCombo",
        "finalScore", "newBestLabel", "finalStars", "toast", "liveStatus", "aimHint"
      ];
      return Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));
    }

    bindEvents() {
      window.addEventListener("resize", () => this.resize(), { passive: true });
      window.addEventListener("orientationchange", () => window.setTimeout(() => this.resize(), 160), { passive: true });
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) this.audio.stopMusic();
        else if (this.state === "playing" && this.audio.enabled) this.audio.startMusic();
      });

      this.canvas.addEventListener("pointerdown", event => this.onPointerDown(event));
      this.canvas.addEventListener("pointermove", event => this.onPointerMove(event));
      this.canvas.addEventListener("pointerup", event => this.onPointerUp(event));
      this.canvas.addEventListener("pointercancel", event => this.onPointerUp(event, true));
      this.canvas.addEventListener("contextmenu", event => event.preventDefault());

      window.addEventListener("keydown", event => this.onKeyDown(event));
      window.addEventListener("keyup", event => this.onKeyUp(event));

      this.dom.startButton.addEventListener("click", () => this.beginAdventure());
      this.dom.howToButton.addEventListener("click", () => { this.audio.tap(); this.showScreen("howToScreen"); });
      this.dom.closeHowTo.addEventListener("click", () => { this.audio.tap(); this.showScreen("menuScreen"); });
      this.dom.howToPlayButton.addEventListener("click", () => {
        this.markCoachSeen();
        this.beginAdventure();
      });
      this.dom.chapterStartButton.addEventListener("click", () => this.startLevelPlay());
      this.dom.nextButton.addEventListener("click", () => this.advanceLevel());
      this.dom.retryButton.addEventListener("click", () => this.retryLevel());
      this.dom.playAgainButton.addEventListener("click", () => this.beginAdventure());
      this.dom.backToMenuButton.addEventListener("click", () => this.returnToMenu());
      this.dom.soundButton.addEventListener("click", () => this.toggleSound());
      this.dom.fullscreenButton.addEventListener("click", () => this.toggleFullscreen());
      this.dom.pauseButton.addEventListener("click", () => this.pauseGame());
      this.dom.resumeButton.addEventListener("click", () => this.resumeGame());
      this.dom.restartButton.addEventListener("click", () => {
        this.hideCoach(false);
        this.retryLevel();
      });
      this.dom.quitButton.addEventListener("click", () => this.returnToMenu());
      this.dom.coachButton.addEventListener("click", () => this.hideCoach(true));

      document.addEventListener("fullscreenchange", () => {
        const active = Boolean(document.fullscreenElement);
        this.dom.fullscreenButton.setAttribute("aria-label", active ? "Tam ekrandan çık" : "Tam ekran aç");
      });
    }

    loadBestScore() {
      try {
        const current = localStorage.getItem("masalnova-yildiz-darti-best");
        const legacy = localStorage.getItem("massalnova-sternendart-best");
        const value = Number(current ?? legacy ?? 0);
        return Number.isFinite(value) ? value : 0;
      } catch (_) {
        return 0;
      }
    }

    saveBestScore(score) {
      try { localStorage.setItem("masalnova-yildiz-darti-best", String(score)); } catch (_) {}
    }

    loadCoachSeen() {
      try { return localStorage.getItem("masalnova-yildiz-darti-coach") === "1"; }
      catch (_) { return false; }
    }

    markCoachSeen() {
      this.hasSeenCoach = true;
      try { localStorage.setItem("masalnova-yildiz-darti-coach", "1"); } catch (_) {}
    }

    updateBestScoreLabels() {
      this.dom.menuBest.textContent = this.bestScore.toLocaleString("tr-TR");
    }

    createAmbientObjects() {
      const random = mulberry32(20260826);
      const stars = Array.from({ length: 115 }, () => ({
        x: random(),
        y: random() * .72,
        size: .5 + random() * 1.8,
        phase: random() * TAU,
        speed: .6 + random() * 1.6
      }));
      const motes = Array.from({ length: 42 }, () => ({
        x: random(),
        y: random(),
        size: 1 + random() * 2.4,
        phase: random() * TAU,
        speed: .25 + random() * .6,
        drift: .01 + random() * .03
      }));
      const clouds = Array.from({ length: 9 }, (_, index) => ({
        x: random() * 1.3 - .15,
        y: .12 + random() * .5,
        scale: .5 + random() * 1.15,
        speed: .003 + random() * .006,
        layer: index % 3
      }));
      return { stars, motes, clouds };
    }

    createNoisePattern() {
      const tile = document.createElement("canvas");
      tile.width = 96;
      tile.height = 96;
      const ctx = tile.getContext("2d");
      const image = ctx.createImageData(tile.width, tile.height);
      for (let i = 0; i < image.data.length; i += 4) {
        const value = 205 + Math.random() * 50;
        image.data[i] = value;
        image.data[i + 1] = value;
        image.data[i + 2] = value;
        image.data[i + 3] = Math.random() * 20;
      }
      ctx.putImageData(image, 0, 0);
      return this.ctx.createPattern(tile, "repeat");
    }

    resize() {
      const rect = this.shell.getBoundingClientRect();
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2.25);
      this.width = Math.max(320, rect.width);
      this.height = Math.max(430, rect.height);
      this.dpr = dpr;
      this.canvas.width = Math.round(this.width * dpr);
      this.canvas.height = Math.round(this.height * dpr);
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.ctx.imageSmoothingEnabled = true;
      this.baseTargetRadius = clamp(Math.min(this.width * .19, this.height * .225), 82, 178);
      this.targetRadius = this.baseTargetRadius * this.levels[this.levelIndex].radiusScale;
      this.crosshair.x = this.crosshair.x || this.width / 2;
      this.crosshair.y = this.crosshair.y || this.height * .42;
    }

    showScreen(id = null) {
      ["menuScreen", "howToScreen", "chapterScreen", "resultScreen", "finalScreen", "pauseScreen"].forEach(screenId => {
        this.dom[screenId].classList.toggle("screen--visible", screenId === id);
      });
    }

    setState(state) {
      this.state = state;
      this.shell.dataset.state = state;
      const showHud = state === "playing" || state === "throwing" || state === "roundTransition";
      this.dom.topHud.classList.toggle("hidden", !showHud);
      this.dom.pauseButton.disabled = state !== "playing";
      this.updateAimHint();
    }

    updateAimHint() {
      const shouldShow = this.state === "playing" && !this.firstThrowMade && !this.coachVisible;
      this.dom.aimHint.classList.toggle("hidden", !shouldShow);
    }

    showCoach() {
      if (this.hasSeenCoach || this.levelIndex !== 0) return;
      this.coachVisible = true;
      this.dom.coachOverlay.classList.remove("hidden");
      this.updateAimHint();
      window.setTimeout(() => this.dom.coachButton.focus({ preventScroll: true }), 60);
    }

    hideCoach(remember = true) {
      this.coachVisible = false;
      this.dom.coachOverlay.classList.add("hidden");
      if (remember) this.markCoachSeen();
      this.updateAimHint();
      if (remember) this.showToast("Hedefe dokun · basılı tut · bırak", false, 1600);
    }

    pauseGame() {
      if (this.state !== "playing") return;
      this.audio.tap();
      this.hideToast();
      this.isAiming = false;
      this.pointer.active = false;
      this.pausedTargetFreeze = { ...this.targetCenter };
      this.targetFreeze = { ...this.targetCenter };
      this.setState("paused");
      this.showScreen("pauseScreen");
      this.audio.stopMusic();
      this.dom.resumeButton.focus({ preventScroll: true });
    }

    resumeGame() {
      if (this.state !== "paused") return;
      this.audio.tap();
      this.showScreen(null);
      this.targetFreeze = null;
      this.pausedTargetFreeze = null;
      this.setState("playing");
      this.audio.startMusic();
      this.showToast("Devam!", false, 850);
    }

    beginAdventure() {
      this.audio.tap();
      this.audio.ensure();
      this.levelIndex = 0;
      this.totalScore = 0;
      this.bestCombo = 0;
      this.openChapter();
    }

    openChapter() {
      const level = this.levels[this.levelIndex];
      this.hideToast();
      this.setState("chapter");
      this.showScreen("chapterScreen");
      this.dom.chapterBadge.textContent = level.chapter;
      this.dom.chapterEyebrow.textContent = `BÖLÜM ${this.levelIndex + 1} / ${this.levels.length}`;
      this.dom.chapterTitle.textContent = level.name;
      this.dom.chapterStory.textContent = level.story;
      this.dom.chapterGoal.textContent = level.goal;
      this.embeddedDarts.length = 0;
      this.particles.length = 0;
      this.flyingDart = null;
      this.isAiming = false;
      this.targetFreeze = null;
      this.chapterStartAt = this.time;
      this.audio.stopMusic();
      this.hideCoach(false);
    }

    startLevelPlay() {
      this.audio.tap();
      const level = this.levels[this.levelIndex];
      this.roundScore = 0;
      this.roundStars = [];
      this.throwsLeft = level.throws;
      this.combo = 0;
      this.embeddedDarts.length = 0;
      this.particles.length = 0;
      this.flyingDart = null;
      this.isAiming = false;
      this.targetFreeze = null;
      this.bonus = null;
      this.bonusTimer = 1.5;
      this.firstThrowMade = false;
      this.targetRadius = this.baseTargetRadius * level.radiusScale;
      this.crosshair = { x: this.width / 2, y: this.height * .42 };
      this.updateHud();
      this.showScreen(null);
      this.setState("playing");
      this.audio.level();
      this.audio.startMusic();
      this.announce(`${level.name}. Hedef ${level.goal} puan.`);
      if (!this.hasSeenCoach && this.levelIndex === 0) {
        window.setTimeout(() => this.showCoach(), 260);
      } else {
        this.showToast("Hedefe dokun · basılı tut · bırak", false, 1450);
      }
    }

    retryLevel() {
      this.audio.tap();
      this.totalScore -= this.roundScore;
      this.totalScore = Math.max(0, this.totalScore);
      this.startLevelPlay();
    }

    advanceLevel() {
      this.audio.tap();
      if (this.levelIndex < this.levels.length - 1) {
        this.levelIndex += 1;
        this.openChapter();
      } else {
        this.showFinal();
      }
    }

    returnToMenu() {
      this.audio.tap();
      this.hideToast();
      this.audio.stopMusic();
      this.hideCoach(false);
      this.setState("menu");
      this.showScreen("menuScreen");
      this.particles.length = 0;
      this.embeddedDarts.length = 0;
      this.flyingDart = null;
      this.updateBestScoreLabels();
    }

    showRoundResult() {
      this.hideToast();
      this.setState("result");
      this.showScreen("resultScreen");
      this.audio.stopMusic();
      const level = this.levels[this.levelIndex];
      const stars = this.calculateRoundStars(this.roundScore, level.goal);
      const success = this.roundScore >= level.goal;
      this.dom.resultEyebrow.textContent = success ? "YENİ DİYAR AÇILDI" : "BÖLÜM TAMAMLANDI";
      this.dom.resultTitle.textContent = success ? "Harika oynadın!" : "Güzel deneme!";
      this.dom.resultCopy.textContent = success
        ? `${level.shortName} yeniden ışıldıyor. Bir sonraki masal diyarı seni bekliyor.`
        : `Yıldız ışığı büyüdü. Sonraki bölüme geçebilir veya puanını yükseltmek için tekrar deneyebilirsin.`;
      this.dom.resultRoundScore.textContent = this.roundScore.toLocaleString("tr-TR");
      this.dom.resultTotalScore.textContent = this.totalScore.toLocaleString("tr-TR");
      this.dom.resultCombo.textContent = `${this.bestCombo}×`;
      this.dom.nextButton.textContent = this.levelIndex === this.levels.length - 1 ? "Büyük finale git" : "Sonraki bölüm";
      this.lightStars(this.dom.resultStars, stars);
      this.audio.level();
      this.spawnCelebration(this.width / 2, this.height * .3, stars * 30);
    }

    showFinal() {
      this.hideToast();
      this.setState("final");
      this.showScreen("finalScreen");
      this.audio.stopMusic();
      const previousBest = this.bestScore;
      if (this.totalScore > this.bestScore) {
        this.bestScore = this.totalScore;
        this.saveBestScore(this.bestScore);
      }
      this.dom.finalScore.textContent = this.totalScore.toLocaleString("tr-TR");
      this.dom.newBestLabel.classList.toggle("hidden", this.totalScore <= previousBest);
      const possible = this.levels.reduce((sum, level) => sum + level.throws * 100, 0);
      const ratio = this.totalScore / possible;
      const stars = ratio >= .58 ? 3 : ratio >= .34 ? 2 : 1;
      this.lightStars(this.dom.finalStars, stars);
      this.updateBestScoreLabels();
      this.audio.level();
      window.setTimeout(() => this.audio.level(), 420);
      this.spawnCelebration(this.width / 2, this.height * .36, this.reducedMotion ? 35 : 130, true);
      this.announce(`Macera tamamlandı. Toplam puanın ${this.totalScore}.`);
    }

    calculateRoundStars(score, goal) {
      if (score >= goal * 1.75) return 3;
      if (score >= goal) return 2;
      return 1;
    }

    lightStars(container, count) {
      const stars = [...container.querySelectorAll("span")];
      stars.forEach(star => star.classList.remove("is-lit"));
      stars.forEach((star, index) => {
        if (index < count) window.setTimeout(() => star.classList.add("is-lit"), 120 + index * 170);
      });
    }

    toggleSound() {
      const enabled = !this.audio.enabled;
      this.audio.setEnabled(enabled);
      this.dom.soundButton.setAttribute("aria-pressed", String(enabled));
      this.dom.soundButton.setAttribute("aria-label", enabled ? "Sesi kapat" : "Sesi aç");
      if (enabled) {
        this.audio.tap();
        if (this.state === "playing") this.audio.startMusic();
      }
    }

    async toggleFullscreen() {
      this.audio.tap();
      try {
        if (!document.fullscreenElement) await this.shell.requestFullscreen?.();
        else await document.exitFullscreen?.();
      } catch (_) {
        this.showToast("Tam ekran bu tarayıcıda kullanılamıyor", false, 1600);
      }
    }

    canvasPoint(event) {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) * (this.width / rect.width),
        y: (event.clientY - rect.top) * (this.height / rect.height)
      };
    }

    adjustedAimPoint(point, pointerType = "mouse") {
      if (pointerType !== "touch") return point;
      const offset = clamp(this.height * .075, 42, 66);
      return {
        x: clamp(point.x, 8, this.width - 8),
        y: clamp(point.y - offset, 72, this.height - 74)
      };
    }

    haptic(pattern) {
      try { navigator.vibrate?.(pattern); } catch (_) {}
    }

    onPointerDown(event) {
      if (this.state !== "playing" || this.flyingDart || this.throwsLeft <= 0) return;
      event.preventDefault();
      this.canvas.setPointerCapture?.(event.pointerId);
      const point = this.canvasPoint(event);
      this.pointerType = event.pointerType || "mouse";
      this.pointer = { ...point, active: true, id: event.pointerId };
      this.crosshair = this.adjustedAimPoint(point, this.pointerType);
      this.isAiming = true;
      this.keyboardAim = false;
      this.haptic(8);
      this.chargeStart = performance.now();
      this.lastChargeTick = -1;
      this.audio.tap();
    }

    onPointerMove(event) {
      const point = this.canvasPoint(event);
      this.pointer.x = point.x;
      this.pointer.y = point.y;
      if (this.isAiming && this.pointer.id === event.pointerId) {
        event.preventDefault();
        this.crosshair = this.adjustedAimPoint(point, this.pointerType);
      }
    }

    onPointerUp(event, cancelled = false) {
      if (!this.isAiming || (this.pointer.id != null && this.pointer.id !== event.pointerId)) return;
      event.preventDefault();
      this.pointer.active = false;
      this.isAiming = false;
      if (!cancelled) this.releaseThrow(performance.now());
    }

    onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        if (this.state === "playing") this.pauseGame();
        else if (this.state === "paused") this.resumeGame();
        return;
      }
      if (this.state === "menu" && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        this.beginAdventure();
        return;
      }
      if (event.key.toLowerCase() === "m") {
        event.preventDefault();
        this.toggleSound();
        return;
      }
      if (this.state !== "playing" || this.flyingDart) return;
      const step = event.shiftKey ? 14 : 7;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        this.keyboardAim = true;
        if (event.key === "ArrowLeft") this.crosshair.x -= step;
        if (event.key === "ArrowRight") this.crosshair.x += step;
        if (event.key === "ArrowUp") this.crosshair.y -= step;
        if (event.key === "ArrowDown") this.crosshair.y += step;
        this.crosshair.x = clamp(this.crosshair.x, 8, this.width - 8);
        this.crosshair.y = clamp(this.crosshair.y, 75, this.height - 50);
      }
      if ((event.key === " " || event.key === "Enter") && !event.repeat && !this.isAiming) {
        event.preventDefault();
        this.isAiming = true;
        this.keyboardAim = true;
        this.chargeStart = performance.now();
        this.lastChargeTick = -1;
        this.audio.tap();
      }
    }

    onKeyUp(event) {
      if (this.state !== "playing" || !this.keyboardAim || !this.isAiming) return;
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        this.isAiming = false;
        this.releaseThrow(performance.now());
      }
    }

    chargeValue(now = performance.now()) {
      if (!this.isAiming) return .72;
      const elapsed = Math.max(0, now - this.chargeStart);
      const progress = clamp(elapsed / 680, 0, 1);
      return .46 + easeOutCubic(progress) * .36;
    }

    releaseThrow(now) {
      if (this.state !== "playing" || this.flyingDart || this.throwsLeft <= 0) return;
      const level = this.levels[this.levelIndex];
      const power = this.chargeValue(now);
      const center = { ...this.targetCenter };
      const localAim = {
        x: this.crosshair.x - center.x,
        y: this.crosshair.y - center.y
      };

      // A gentle rim magnet prevents near-perfect child touches from becoming frustrating misses.
      const aimedDistance = Math.hypot(localAim.x, localAim.y);
      if (aimedDistance > this.targetRadius && aimedDistance <= this.targetRadius * 1.14) {
        const scale = this.targetRadius * .97 / aimedDistance;
        localAim.x *= scale;
        localAim.y *= scale;
      }

      this.firstThrowMade = true;
      this.updateAimHint();
      this.haptic(12);

      const optimality = 1 - clamp(Math.abs(power - .78) / .78, 0, 1);
      const spread = this.targetRadius * (level.wind + (1 - optimality) * .055);
      const angle = Math.random() * TAU;
      const magnitude = Math.random() * spread;
      const finalLocal = {
        x: localAim.x + Math.cos(angle) * magnitude,
        y: localAim.y + Math.sin(angle) * magnitude
      };

      this.throwsLeft -= 1;
      this.updateHud();
      this.targetFreeze = center;
      this.flyingDart = {
        startTime: now,
        duration: lerp(760, 440, power),
        power,
        start: { x: this.width / 2, y: this.height + 38 },
        control: {
          x: lerp(this.width / 2, center.x + finalLocal.x, .46) + (Math.random() - .5) * 45,
          y: Math.min(this.height * .35, center.y - this.targetRadius * .55)
        },
        end: { x: center.x + finalLocal.x, y: center.y + finalLocal.y },
        local: finalLocal,
        angle: 0
      };
      this.setState("throwing");
      this.audio.whoosh(power);
      this.announce("Yıldız oku uçuyor.");
    }

    resolveHit() {
      const dart = this.flyingDart;
      if (!dart) return;
      const ratio = Math.hypot(dart.local.x, dart.local.y) / this.targetRadius;
      let basePoints = 0;
      let label = "Çok yakındı!";
      if (ratio <= .14) { basePoints = 100; label = "Yıldızın tam ortası!"; }
      else if (ratio <= .34) { basePoints = 60; label = "Sihirli vuruş!"; }
      else if (ratio <= .56) { basePoints = 35; label = "Harika vuruş!"; }
      else if (ratio <= .78) { basePoints = 20; label = "Güzel nişan!"; }
      else if (ratio <= 1) { basePoints = 10; label = "İsabet!"; }

      let bonusPoints = 0;
      let bonusHit = false;
      if (this.bonus && this.bonus.active && distance(dart.local, this.bonus) <= this.targetRadius * .13) {
        bonusPoints = 40;
        bonusHit = true;
        this.bonus.active = false;
        label = "Yıldız bonusu!";
      }

      if (basePoints >= 35) this.combo += 1;
      else if (basePoints === 0) this.combo = 0;
      else this.combo = Math.max(0, this.combo - 1);
      this.bestCombo = Math.max(this.bestCombo, this.combo);
      const comboBonus = basePoints > 0 ? Math.min(Math.max(0, this.combo - 1) * 5, 20) : 0;
      const gained = basePoints + bonusPoints + comboBonus;
      this.roundScore += gained;
      this.totalScore += gained;

      this.embeddedDarts.push({
        local: { ...dart.local },
        angle: dart.angle,
        hit: basePoints > 0,
        colorIndex: this.embeddedDarts.length % 3
      });

      const end = { ...dart.end };
      if (basePoints > 0) {
        const count = basePoints >= 100 ? 58 : basePoints >= 60 ? 36 : 20;
        this.spawnHitParticles(end.x, end.y, count, basePoints >= 100);
        this.screenShake = basePoints >= 100 ? 12 : basePoints >= 60 ? 6 : 3;
        this.flash = basePoints >= 100 ? .75 : .22;
      } else {
        this.spawnMissParticles(end.x, end.y);
      }
      if (bonusHit) {
        this.audio.bonus();
        this.spawnCelebration(end.x, end.y, 38);
      }
      this.audio.hit(basePoints);
      if (basePoints >= 100) this.haptic([28, 35, 28]);
      else if (basePoints >= 35) this.haptic(24);
      else if (basePoints > 0) this.haptic(14);
      this.updateHud();
      const comboText = comboBonus ? ` · Seri +${comboBonus}` : "";
      const pointsText = gained ? `+${gained}` : "0";
      this.showToast(`${label} ${pointsText}${comboText}`, basePoints >= 60 || bonusHit, 1200);
      this.announce(`${label} ${gained} puan.`);

      this.flyingDart = null;
      this.targetFreeze = null;
      this.setState("roundTransition");
      window.setTimeout(() => {
        if (this.throwsLeft <= 0) {
          this.showRoundResult();
        } else {
          this.setState("playing");
          this.scheduleBonus();
        }
      }, basePoints >= 100 ? 1080 : 720);
    }

    scheduleBonus() {
      if (this.bonus?.active) return;
      this.bonusTimer = .8 + Math.random() * 1.8;
    }

    createBonus() {
      const angle = Math.random() * TAU;
      const radius = this.targetRadius * (.25 + Math.random() * .45);
      this.bonus = {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        active: true,
        life: 3.8,
        phase: Math.random() * TAU
      };
      this.showToast("Altın yıldız çıktı! +40", true, 1050);
    }

    updateHud() {
      const level = this.levels[this.levelIndex];
      this.dom.hudLevel.textContent = `${this.levelIndex + 1} / ${this.levels.length}`;
      this.dom.hudScore.textContent = this.roundScore.toLocaleString("tr-TR");
      this.dom.hudGoal.textContent = level.goal.toLocaleString("tr-TR");
      this.dom.hudDarts.textContent = this.throwsLeft;
      this.dom.hudProgress.style.width = `${clamp(this.roundScore / level.goal * 100, 0, 100)}%`;
    }

    showToast(message, gold = false, duration = 1050) {
      window.clearTimeout(this.toastTimer);
      this.dom.toast.textContent = message;
      this.dom.toast.classList.toggle("is-gold", gold);
      this.dom.toast.classList.add("is-visible");
      this.toastTimer = window.setTimeout(() => this.hideToast(), duration);
    }

    hideToast() {
      window.clearTimeout(this.toastTimer);
      this.dom.toast.classList.remove("is-visible", "is-gold");
    }

    announce(message) {
      this.dom.liveStatus.textContent = "";
      window.setTimeout(() => { this.dom.liveStatus.textContent = message; }, 20);
    }

    spawnHitParticles(x, y, count, bullseye = false) {
      if (this.reducedMotion) count = Math.min(count, 18);
      const colors = bullseye
        ? ["#fff8cf", "#ffd765", "#58e7de", "#ff7db7"]
        : ["#fff4b2", "#58e7de", "#9b6dff"];
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * TAU;
        const speed = 60 + Math.random() * (bullseye ? 240 : 150);
        const life = .45 + Math.random() * .75;
        this.particles.push(new Particle({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          gravity: 60,
          drag: .97,
          life,
          maxLife: life,
          size: 2 + Math.random() * (bullseye ? 6 : 4),
          color: colors[i % colors.length],
          glow: 12,
          shape: i % 4 === 0 ? "star" : i % 3 === 0 ? "diamond" : "circle",
          rotation: Math.random() * TAU,
          spin: (Math.random() - .5) * 7
        }));
      }
    }

    spawnMissParticles(x, y) {
      for (let i = 0; i < 9; i += 1) {
        const angle = Math.PI + (Math.random() - .5) * 1.2;
        const life = .35 + Math.random() * .35;
        this.particles.push(new Particle({
          x, y,
          vx: Math.cos(angle) * (30 + Math.random() * 70),
          vy: Math.sin(angle) * (30 + Math.random() * 70),
          gravity: 120,
          life,
          maxLife: life,
          size: 1.5 + Math.random() * 2,
          color: "#c2c8df",
          alpha: .72
        }));
      }
    }

    spawnCelebration(x, y, count = 80, wide = false) {
      if (this.reducedMotion) count = Math.min(count, 28);
      const colors = ["#ffd765", "#58e7de", "#ff7db7", "#a579ff", "#fff8da"];
      for (let i = 0; i < count; i += 1) {
        const angle = wide ? (-Math.PI + Math.random() * Math.PI) : Math.random() * TAU;
        const speed = (wide ? 100 : 50) + Math.random() * (wide ? 340 : 220);
        const life = .8 + Math.random() * 1.6;
        this.particles.push(new Particle({
          x: x + (wide ? (Math.random() - .5) * this.width * .7 : 0),
          y,
          vx: Math.cos(angle) * speed,
          vy: wide ? -120 - Math.random() * 260 : Math.sin(angle) * speed,
          gravity: wide ? 360 : 120,
          drag: .992,
          life,
          maxLife: life,
          size: 3 + Math.random() * 6,
          color: colors[i % colors.length],
          glow: i % 4 === 0 ? 10 : 0,
          shape: i % 5 === 0 ? "star" : i % 2 ? "diamond" : "circle",
          rotation: Math.random() * TAU,
          spin: (Math.random() - .5) * 8
        }));
      }
    }

    update(dt, now) {
      this.time += dt;
      this.screenShake = Math.max(0, this.screenShake - dt * 22);
      this.flash = Math.max(0, this.flash - dt * 1.8);
      this.particles = this.particles.filter(particle => particle.update(dt));

      if (this.state === "playing" || this.state === "throwing" || this.state === "roundTransition") {
        if (this.bonus?.active) {
          this.bonus.life -= dt;
          if (this.bonus.life <= 0) this.bonus.active = false;
        } else if (this.state === "playing") {
          this.bonusTimer -= dt;
          if (this.bonusTimer <= 0 && this.throwsLeft <= 3 && this.throwsLeft > 0) this.createBonus();
        }
      }

      if (this.isAiming) {
        const charge = this.chargeValue(now);
        const tick = Math.floor(charge * 8);
        if (tick !== this.lastChargeTick) {
          this.lastChargeTick = tick;
          if (tick % 2 === 0) this.audio.charge(charge);
        }
      }

      if (this.flyingDart) {
        const progress = clamp((now - this.flyingDart.startTime) / this.flyingDart.duration, 0, 1);
        if (progress >= 1) this.resolveHit();
      }
    }

    updateTargetPosition() {
      const level = this.levels[this.levelIndex];
      if (this.targetFreeze) {
        this.targetCenter.x = this.targetFreeze.x;
        this.targetCenter.y = this.targetFreeze.y;
        return;
      }
      const playWidth = Math.max(0, this.width - this.targetRadius * 2 - 80);
      const maxX = Math.min(playWidth * .5, this.width * level.moveX);
      const maxY = Math.min(this.height * .09, this.height * level.moveY);
      const baseY = this.height * (this.height < 620 ? .43 : .42);
      this.targetCenter.x = this.width / 2 + Math.sin(this.time * (1.05 + this.levelIndex * .23)) * maxX;
      this.targetCenter.y = baseY + Math.sin(this.time * (1.34 + this.levelIndex * .2) + 1.1) * maxY;
      this.targetRotation = Math.sin(this.time * .55) * .022 + this.time * (.01 + this.levelIndex * .006);
    }

    loop(now) {
      const dt = clamp((now - this.lastFrame) / 1000, 0, .033);
      this.lastFrame = now;
      this.update(dt, now);
      this.updateTargetPosition();
      this.draw(now);
      requestAnimationFrame(time => this.loop(time));
    }

    draw(now) {
      const ctx = this.ctx;
      const shakeX = this.screenShake ? (Math.random() - .5) * this.screenShake : 0;
      const shakeY = this.screenShake ? (Math.random() - .5) * this.screenShake : 0;
      ctx.save();
      ctx.translate(shakeX, shakeY);
      const scene = this.levels[this.levelIndex]?.scene || "forest";
      this.drawBackground(ctx, scene);

      if (["playing", "throwing", "roundTransition", "paused"].includes(this.state)) {
        this.drawTargetRig(ctx);
        this.drawTarget(ctx);
        this.drawNovaCompanion(ctx);
        if (this.state === "playing" && !this.flyingDart) {
          this.drawLauncher(ctx, now);
          this.drawCrosshair(ctx, now);
        }
        if (this.flyingDart) this.drawFlyingDart(ctx, now);
      } else {
        this.drawMenuDecor(ctx);
      }

      for (const particle of this.particles) particle.draw(ctx);
      this.drawVignette(ctx);
      if (this.flash > 0) {
        ctx.fillStyle = `rgba(255, 246, 196, ${this.flash * .26})`;
        ctx.fillRect(0, 0, this.width, this.height);
      }
      ctx.restore();
    }

    drawBackground(ctx, scene) {
      let top;
      let middle;
      let bottom;
      if (scene === "sky") {
        top = "#33226f";
        middle = "#6e58b8";
        bottom = "#f09ca7";
      } else if (scene === "cave") {
        top = "#0c1636";
        middle = "#22134f";
        bottom = "#0b0b25";
      } else {
        top = "#241454";
        middle = "#173e57";
        bottom = "#0b222f";
      }
      const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
      gradient.addColorStop(0, top);
      gradient.addColorStop(.55, middle);
      gradient.addColorStop(1, bottom);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.width, this.height);

      this.drawStars(ctx, scene);
      if (scene === "sky") this.drawSkyScene(ctx);
      else if (scene === "cave") this.drawCaveScene(ctx);
      else this.drawForestScene(ctx);
      this.drawAmbientMotes(ctx, scene);

      ctx.save();
      ctx.globalAlpha = .055;
      ctx.fillStyle = this.noisePattern;
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.restore();
    }

    drawStars(ctx, scene) {
      ctx.save();
      for (const star of this.ambient.stars) {
        const alphaBase = scene === "sky" ? .46 : .72;
        const alpha = alphaBase * (.45 + Math.sin(this.time * star.speed + star.phase) * .28 + .28);
        ctx.globalAlpha = clamp(alpha, .08, .9);
        ctx.fillStyle = star.size > 1.7 ? "#fff0b7" : "#dce8ff";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = star.size * 4;
        ctx.beginPath();
        ctx.arc(star.x * this.width, star.y * this.height, star.size, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }

    drawForestScene(ctx) {
      const moonX = this.width * .16;
      const moonY = this.height * .18;
      const moonR = clamp(this.width * .04, 24, 52);
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonR * 3.6);
      moonGlow.addColorStop(0, "rgba(255,244,189,.42)");
      moonGlow.addColorStop(.3, "rgba(255,224,133,.13)");
      moonGlow.addColorStop(1, "rgba(255,224,133,0)");
      ctx.fillStyle = moonGlow;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR * 3.6, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "#fff0b6";
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "rgba(84,65,140,.18)";
      ctx.beginPath();
      ctx.arc(moonX - moonR * .24, moonY - moonR * .08, moonR * .12, 0, TAU);
      ctx.arc(moonX + moonR * .22, moonY + moonR * .19, moonR * .18, 0, TAU);
      ctx.fill();

      this.drawMountainLayer(ctx, this.height * .55, this.height * .13, "rgba(20,35,65,.42)", .8, 1.7);
      this.drawMountainLayer(ctx, this.height * .63, this.height * .18, "rgba(11,38,48,.7)", 1.2, 2.6);
      this.drawMountainLayer(ctx, this.height * .72, this.height * .16, "#092a2c", 2.1, 4.8);

      const treeCount = Math.ceil(this.width / 80) + 2;
      for (let i = -1; i < treeCount; i += 1) {
        const x = i * 80 + (i % 2) * 18;
        const scale = .8 + ((i * 37) % 5) * .08;
        this.drawPine(ctx, x, this.height + 10, 95 * scale, "#061c22", .92);
        if (i % 2 === 0) this.drawPine(ctx, x + 40, this.height + 5, 70 * scale, "#0a2a2d", .72);
      }

      this.drawMushroom(ctx, this.width * .08, this.height * .86, 1.15, "#ff77ad");
      this.drawMushroom(ctx, this.width * .9, this.height * .88, .9, "#7be9d3");
      if (this.width > 700) this.drawMushroom(ctx, this.width * .82, this.height * .83, .55, "#ffd46d");
    }

    drawSkyScene(ctx) {
      const sunX = this.width * .79;
      const sunY = this.height * .2;
      const sunR = clamp(this.width * .043, 28, 60);
      const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 4.2);
      glow.addColorStop(0, "rgba(255,238,177,.45)");
      glow.addColorStop(.4, "rgba(255,164,176,.12)");
      glow.addColorStop(1, "rgba(255,164,176,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunR * 4.2, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "#ffebad";
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunR, 0, TAU);
      ctx.fill();

      for (const cloud of this.ambient.clouds) {
        const x = ((cloud.x + this.time * cloud.speed) % 1.4 - .2) * this.width;
        const y = cloud.y * this.height;
        const alpha = .1 + cloud.layer * .055;
        this.drawCloud(ctx, x, y, 70 * cloud.scale, alpha);
      }

      this.drawFloatingIsland(ctx, this.width * .17, this.height * .61, .8);
      this.drawFloatingIsland(ctx, this.width * .83, this.height * .54, .6);
      this.drawCloudCastle(ctx, this.width * .14, this.height * .23, this.width > 700 ? 1 : .68);
      this.drawMountainLayer(ctx, this.height * .78, this.height * .1, "rgba(66,48,128,.35)", 1.4, 2.4);
      this.drawCloud(ctx, this.width * .5, this.height * .85, this.width * .38, .14);
    }

    drawCaveScene(ctx) {
      const centerGlow = ctx.createRadialGradient(this.width * .5, this.height * .42, 0, this.width * .5, this.height * .42, this.width * .54);
      centerGlow.addColorStop(0, "rgba(92,95,217,.22)");
      centerGlow.addColorStop(.5, "rgba(105,48,156,.08)");
      centerGlow.addColorStop(1, "rgba(0,0,0,.2)");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.fillStyle = "rgba(4,6,20,.62)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= this.width; x += 45) {
        const y = 18 + Math.sin(x * .032) * 14 + ((x / 45) % 2) * 18;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(this.width, 0);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, this.height);
      for (let x = 0; x <= this.width; x += 50) {
        const y = this.height - 28 - Math.sin(x * .025 + 1.5) * 16 - ((x / 50) % 3) * 9;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(this.width, this.height);
      ctx.closePath();
      ctx.fill();

      this.drawCrystalCluster(ctx, this.width * .08, this.height * .86, 1.1, "#57e7d5");
      this.drawCrystalCluster(ctx, this.width * .91, this.height * .84, 1.35, "#b267ff");
      this.drawCrystalCluster(ctx, this.width * .21, this.height * .94, .64, "#ff7fb4");
      if (this.width > 720) this.drawCrystalCluster(ctx, this.width * .72, this.height * .95, .68, "#62d8ff");

      const archGradient = ctx.createRadialGradient(this.width / 2, this.height * .46, this.height * .05, this.width / 2, this.height * .46, this.height * .65);
      archGradient.addColorStop(.58, "rgba(0,0,0,0)");
      archGradient.addColorStop(.72, "rgba(3,4,18,.35)");
      archGradient.addColorStop(1, "rgba(2,3,12,.88)");
      ctx.fillStyle = archGradient;
      ctx.fillRect(0, 0, this.width, this.height);
    }

    drawMountainLayer(ctx, baseline, amplitude, color, frequency, phase) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, this.height);
      ctx.lineTo(0, baseline);
      const step = Math.max(45, this.width / 15);
      for (let x = 0; x <= this.width + step; x += step) {
        const y = baseline - Math.abs(Math.sin(x / this.width * frequency * Math.PI + phase)) * amplitude * (.55 + .45 * Math.sin(x * .013 + phase));
        ctx.lineTo(x, y);
      }
      ctx.lineTo(this.width, this.height);
      ctx.closePath();
      ctx.fill();
    }

    drawPine(ctx, x, baseY, height, color, alpha = 1) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.fillRect(x - height * .035, baseY - height * .45, height * .07, height * .45);
      for (let i = 0; i < 4; i += 1) {
        const y = baseY - height * (.28 + i * .19);
        const half = height * (.25 - i * .035);
        ctx.beginPath();
        ctx.moveTo(x, y - height * .31);
        ctx.lineTo(x - half, y + height * .12);
        ctx.lineTo(x + half, y + height * .12);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }

    drawMushroom(ctx, x, y, scale, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillStyle = "#f6dcbd";
      roundedRectPath(ctx, -5, -18, 10, 22, 5);
      ctx.fill();
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(-18, -17);
      ctx.quadraticCurveTo(0, -38, 18, -17);
      ctx.quadraticCurveTo(0, -8, -18, -17);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,.75)";
      ctx.beginPath();
      ctx.arc(-6, -20, 2.5, 0, TAU);
      ctx.arc(6, -24, 2.1, 0, TAU);
      ctx.fill();
      ctx.restore();
    }

    drawCloud(ctx, x, y, size, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      const gradient = ctx.createLinearGradient(x, y - size * .25, x, y + size * .2);
      gradient.addColorStop(0, "#fffdf8");
      gradient.addColorStop(1, "#d8c7ef");
      ctx.fillStyle = gradient;
      ctx.shadowColor = "rgba(255,255,255,.32)";
      ctx.shadowBlur = size * .18;
      ctx.beginPath();
      ctx.ellipse(x - size * .28, y, size * .34, size * .19, 0, 0, TAU);
      ctx.ellipse(x, y - size * .1, size * .39, size * .28, 0, 0, TAU);
      ctx.ellipse(x + size * .34, y, size * .36, size * .2, 0, 0, TAU);
      ctx.ellipse(x + size * .05, y + size * .08, size * .62, size * .18, 0, 0, TAU);
      ctx.fill();
      ctx.restore();
    }

    drawFloatingIsland(ctx, x, y, scale) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      const glow = ctx.createRadialGradient(0, -14, 0, 0, -14, 90);
      glow.addColorStop(0, "rgba(88,231,222,.22)");
      glow.addColorStop(1, "rgba(88,231,222,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, -14, 90, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "#4f4b79";
      ctx.beginPath();
      ctx.ellipse(0, 0, 70, 19, 0, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "#2e315b";
      ctx.beginPath();
      ctx.moveTo(-62, 3);
      ctx.quadraticCurveTo(-30, 70, 0, 92);
      ctx.quadraticCurveTo(36, 54, 62, 3);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#6ba86e";
      ctx.beginPath();
      ctx.ellipse(0, -5, 69, 18, 0, 0, TAU);
      ctx.fill();
      ctx.restore();
    }

    drawCloudCastle(ctx, x, y, scale) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.globalAlpha = .55;
      ctx.fillStyle = "#392c72";
      ctx.fillRect(-28, 8, 56, 57);
      ctx.fillRect(-57, 20, 28, 45);
      ctx.fillRect(29, 20, 28, 45);
      const towers = [-43, 0, 43];
      for (const tx of towers) {
        ctx.beginPath();
        ctx.moveTo(tx - 20, 20);
        ctx.lineTo(tx, -22 - (tx === 0 ? 18 : 0));
        ctx.lineTo(tx + 20, 20);
        ctx.closePath();
        ctx.fill();
        ctx.fillRect(tx - 15, 10, 30, 42);
      }
      ctx.fillStyle = "rgba(255,220,120,.85)";
      [-43, 0, 43].forEach(tx => {
        ctx.fillRect(tx - 3, 24, 6, 11);
      });
      ctx.restore();
    }

    drawCrystalCluster(ctx, x, y, scale, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.shadowColor = color;
      ctx.shadowBlur = 22;
      const crystals = [
        { x: -24, y: 0, w: 19, h: 67, r: -.26 },
        { x: 0, y: 0, w: 24, h: 95, r: .05 },
        { x: 27, y: 0, w: 17, h: 58, r: .28 },
        { x: 45, y: 4, w: 12, h: 39, r: .45 }
      ];
      for (const c of crystals) {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.r);
        const gradient = ctx.createLinearGradient(-c.w / 2, -c.h, c.w / 2, 0);
        gradient.addColorStop(0, "rgba(255,255,255,.92)");
        gradient.addColorStop(.18, color);
        gradient.addColorStop(1, "rgba(55,25,97,.72)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, -c.h);
        ctx.lineTo(c.w / 2, -c.h * .72);
        ctx.lineTo(c.w * .42, 0);
        ctx.lineTo(-c.w * .42, 0);
        ctx.lineTo(-c.w / 2, -c.h * .72);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.35)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();
    }

    drawAmbientMotes(ctx, scene) {
      ctx.save();
      for (const mote of this.ambient.motes) {
        const x = (mote.x * this.width + Math.sin(this.time * mote.speed + mote.phase) * this.width * mote.drift + this.width) % this.width;
        const y = (mote.y * this.height - this.time * (4 + mote.speed * 5) + this.height * 2) % this.height;
        const pulse = .42 + Math.sin(this.time * 2 + mote.phase) * .25;
        ctx.globalAlpha = clamp(pulse, .08, .72);
        ctx.fillStyle = scene === "cave" ? (mote.phase > Math.PI ? "#a978ff" : "#5ae8dc") : (mote.phase > Math.PI ? "#ffd765" : "#71f0d8");
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, mote.size, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }

    drawTargetRig(ctx) {
      const { x, y } = this.targetCenter;
      const r = this.targetRadius;
      ctx.save();
      ctx.globalAlpha = .35;
      ctx.strokeStyle = "rgba(255,226,151,.7)";
      ctx.lineWidth = Math.max(1, r * .012);
      ctx.setLineDash([r * .07, r * .055]);
      ctx.beginPath();
      ctx.moveTo(x - r * .48, y - r * .96);
      ctx.quadraticCurveTo(x - r * .68, y - r * 1.35, x - r * .38, -20);
      ctx.moveTo(x + r * .48, y - r * .96);
      ctx.quadraticCurveTo(x + r * .68, y - r * 1.35, x + r * .38, -20);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = .16;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.ellipse(x, y + r * 1.11, r * .76, r * .17, 0, 0, TAU);
      ctx.fill();
      ctx.restore();
    }

    drawTarget(ctx) {
      const { x, y } = this.targetCenter;
      const r = this.targetRadius;
      const level = this.levels[this.levelIndex];
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(this.targetRotation);

      const halo = ctx.createRadialGradient(0, 0, r * .58, 0, 0, r * 1.36);
      halo.addColorStop(0, "rgba(255,215,101,0)");
      halo.addColorStop(.7, "rgba(88,231,222,.1)");
      halo.addColorStop(1, "rgba(88,231,222,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(0, 0, r * 1.36, 0, TAU);
      ctx.fill();

      ctx.shadowColor = "rgba(0,0,0,.48)";
      ctx.shadowBlur = r * .2;
      ctx.shadowOffsetY = r * .12;
      ctx.fillStyle = "#2b174c";
      ctx.beginPath();
      ctx.arc(0, 0, r * 1.04, 0, TAU);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      const rim = ctx.createRadialGradient(-r * .25, -r * .3, r * .15, 0, 0, r * 1.08);
      rim.addColorStop(0, "#fff0a8");
      rim.addColorStop(.46, "#d9a73b");
      rim.addColorStop(.72, "#7a4821");
      rim.addColorStop(1, "#2f193f");
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(0, 0, r * 1.04, 0, TAU);
      ctx.fill();

      ctx.fillStyle = "#21163f";
      ctx.beginPath();
      ctx.arc(0, 0, r * .94, 0, TAU);
      ctx.fill();

      const rings = [
        { inner: .78, outer: .94, light: .03 },
        { inner: .56, outer: .78, light: .09 },
        { inner: .34, outer: .56, light: .02 },
        { inner: .14, outer: .34, light: .1 }
      ];
      const segments = 12;
      for (let ringIndex = 0; ringIndex < rings.length; ringIndex += 1) {
        const ring = rings[ringIndex];
        for (let segment = 0; segment < segments; segment += 1) {
          const start = -Math.PI / 2 + segment * TAU / segments;
          const end = start + TAU / segments;
          const base = (segment + ringIndex) % 2 === 0 ? level.colors[0] : level.colors[1];
          ctx.globalAlpha = .72 + ring.light;
          ctx.fillStyle = base;
          ctx.beginPath();
          ctx.arc(0, 0, r * ring.outer, start, end);
          ctx.arc(0, 0, r * ring.inner, end, start, true);
          ctx.closePath();
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      for (const ratio of [.14, .34, .56, .78, .94]) {
        ctx.strokeStyle = ratio === .94 ? "rgba(255,239,180,.9)" : "rgba(255,255,255,.3)";
        ctx.lineWidth = ratio === .94 ? r * .026 : Math.max(1.2, r * .011);
        ctx.beginPath();
        ctx.arc(0, 0, r * ratio, 0, TAU);
        ctx.stroke();
      }

      const centerGlow = ctx.createRadialGradient(-r * .035, -r * .055, 0, 0, 0, r * .18);
      centerGlow.addColorStop(0, "#fffbe3");
      centerGlow.addColorStop(.3, "#ffec93");
      centerGlow.addColorStop(1, "#e39b2f");
      ctx.shadowColor = "#ffe06e";
      ctx.shadowBlur = r * .18;
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(0, 0, r * .14, 0, TAU);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(101,50,121,.64)";
      starPath(ctx, 0, 0, 5, r * .09, r * .04);
      ctx.fill();

      ctx.save();
      ctx.rotate(-this.targetRotation * 2.4);
      ctx.font = `900 ${Math.max(8, r * .072)}px Trebuchet MS, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(255,246,213,.75)";
      ctx.shadowColor = "rgba(0,0,0,.5)";
      ctx.shadowBlur = 4;
      [
        { text: "10", ratio: .865 },
        { text: "20", ratio: .67 },
        { text: "35", ratio: .45 },
        { text: "60", ratio: .235 }
      ].forEach((label, index) => {
        const angle = -Math.PI / 2 + index * Math.PI / 2;
        ctx.fillText(label.text, Math.cos(angle) * r * label.ratio, Math.sin(angle) * r * label.ratio);
      });
      ctx.restore();

      for (let i = 0; i < 16; i += 1) {
        const angle = i * TAU / 16 + this.time * .09;
        const runeX = Math.cos(angle) * r * 1.0;
        const runeY = Math.sin(angle) * r * 1.0;
        ctx.fillStyle = i % 2 ? "rgba(88,231,222,.72)" : "rgba(255,222,120,.78)";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(runeX, runeY, r * .013 + Math.sin(this.time * 2 + i) * r * .003, 0, TAU);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      if (this.bonus?.active) this.drawBonusStar(ctx, this.bonus);
      for (const dart of this.embeddedDarts) this.drawEmbeddedDart(ctx, dart);
      ctx.restore();
    }

    drawBonusStar(ctx, bonus) {
      const pulse = 1 + Math.sin(this.time * 7 + bonus.phase) * .13;
      ctx.save();
      ctx.translate(bonus.x, bonus.y);
      ctx.rotate(-this.targetRotation + this.time * 1.5);
      ctx.scale(pulse, pulse);
      const size = this.targetRadius * .082;
      ctx.shadowColor = "#ffe36f";
      ctx.shadowBlur = size * 1.4;
      ctx.fillStyle = "#fff4a8";
      starPath(ctx, 0, 0, 5, size, size * .45);
      ctx.fill();
      ctx.fillStyle = "#d98520";
      starPath(ctx, 0, 0, 5, size * .52, size * .24);
      ctx.fill();
      ctx.restore();
    }

    drawEmbeddedDart(ctx, dart) {
      ctx.save();
      ctx.translate(dart.local.x, dart.local.y);
      ctx.rotate(-this.targetRotation + dart.angle + Math.PI / 2);
      const scale = clamp(this.targetRadius / 145, .72, 1.05);
      ctx.scale(scale, scale);
      ctx.shadowColor = dart.hit ? "rgba(88,231,222,.8)" : "rgba(0,0,0,.35)";
      ctx.shadowBlur = dart.hit ? 8 : 3;
      ctx.strokeStyle = ["#62e8de", "#ffca64", "#b47aff"][dart.colorIndex];
      ctx.lineWidth = 3.8;
      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(0, 28);
      ctx.stroke();
      ctx.fillStyle = "#fff3bf";
      ctx.beginPath();
      ctx.moveTo(0, -7);
      ctx.lineTo(4, 1);
      ctx.lineTo(-4, 1);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = ["#7d4de4", "#e79f30", "#34b9ae"][dart.colorIndex];
      ctx.beginPath();
      ctx.moveTo(0, 23);
      ctx.lineTo(8, 34);
      ctx.lineTo(0, 31);
      ctx.lineTo(-8, 34);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    drawNovaCompanion(ctx) {
      const r = clamp(this.targetRadius * .22, 24, 39);
      const side = this.targetCenter.x < this.width * .55 ? 1 : -1;
      let x = this.targetCenter.x + side * (this.targetRadius * 1.32 + r);
      x = clamp(x, r + 12, this.width - r - 12);
      const y = this.targetCenter.y - this.targetRadius * .42 + Math.sin(this.time * 2.1) * 7;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.sin(this.time * 1.7) * .09);
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 2.4);
      glow.addColorStop(0, "rgba(255,227,111,.27)");
      glow.addColorStop(1, "rgba(255,227,111,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, r * 2.4, 0, TAU);
      ctx.fill();
      ctx.shadowColor = "#ffe178";
      ctx.shadowBlur = 16;
      const faceGradient = ctx.createRadialGradient(-r * .25, -r * .32, 1, 0, 0, r);
      faceGradient.addColorStop(0, "#fff7c2");
      faceGradient.addColorStop(1, "#f1a73e");
      ctx.fillStyle = faceGradient;
      starPath(ctx, 0, 0, 5, r, r * .48, -Math.PI / 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#3a2457";
      ctx.beginPath();
      ctx.ellipse(-r * .18, -r * .08, r * .07, r * .11, 0, 0, TAU);
      ctx.ellipse(r * .18, -r * .08, r * .07, r * .11, 0, 0, TAU);
      ctx.fill();
      ctx.strokeStyle = "#6d3b54";
      ctx.lineWidth = Math.max(1.4, r * .05);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(0, r * .02, r * .19, .2, Math.PI - .2);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,115,151,.5)";
      ctx.beginPath();
      ctx.arc(-r * .34, r * .08, r * .1, 0, TAU);
      ctx.arc(r * .34, r * .08, r * .1, 0, TAU);
      ctx.fill();
      ctx.restore();
    }

    drawLauncher(ctx, now) {
      const x = this.width / 2;
      const y = this.height - clamp(this.height * .08, 45, 74);
      const charge = this.isAiming ? this.chargeValue(now) : 0;
      const pulse = 1 + Math.sin(this.time * 3) * .035;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(pulse, pulse);

      const glow = ctx.createRadialGradient(0, 8, 0, 0, 8, 82 + charge * 28);
      glow.addColorStop(0, `rgba(88,231,222,${.24 + charge * .17})`);
      glow.addColorStop(.4, `rgba(138,92,255,${.14 + charge * .1})`);
      glow.addColorStop(1, "rgba(88,231,222,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 8, 82 + charge * 28, 0, TAU);
      ctx.fill();

      ctx.fillStyle = "rgba(7,7,28,.65)";
      ctx.beginPath();
      ctx.ellipse(0, 30, 58, 17, 0, 0, TAU);
      ctx.fill();
      const pedestal = ctx.createLinearGradient(0, 10, 0, 42);
      pedestal.addColorStop(0, "#7560ba");
      pedestal.addColorStop(1, "#25184d");
      ctx.fillStyle = pedestal;
      ctx.beginPath();
      ctx.moveTo(-43, 18);
      ctx.lineTo(-31, 42);
      ctx.lineTo(31, 42);
      ctx.lineTo(43, 18);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(255,231,164,.42)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 17, 43, 12, 0, 0, TAU);
      ctx.stroke();

      this.drawDartShape(ctx, 0, -8, -Math.PI / 2, 1.12 + charge * .08, charge);
      ctx.restore();

      if (this.isAiming) this.drawPowerMeter(ctx, charge, x, y);
    }

    drawPowerMeter(ctx, charge, x, y) {
      const width = clamp(this.width * .26, 120, 240);
      const height = 12;
      const meterY = y + 58;
      ctx.save();
      roundedRectPath(ctx, x - width / 2, meterY, width, height, height / 2);
      ctx.fillStyle = "rgba(7,6,27,.72)";
      ctx.fill();
      const inner = 3;
      const fillWidth = Math.max(0, (width - inner * 2) * charge);
      const gradient = ctx.createLinearGradient(x - width / 2, 0, x + width / 2, 0);
      gradient.addColorStop(0, "#57e7d8");
      gradient.addColorStop(.68, "#ffe06b");
      gradient.addColorStop(1, "#ff7baa");
      roundedRectPath(ctx, x - width / 2 + inner, meterY + inner, fillWidth, height - inner * 2, (height - inner * 2) / 2);
      ctx.fillStyle = gradient;
      ctx.shadowColor = charge > .68 && charge < .9 ? "#ffe06b" : "#58e7de";
      ctx.shadowBlur = 9;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(255,255,255,.55)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - width / 2 + width * .72, meterY - 3);
      ctx.lineTo(x - width / 2 + width * .72, meterY + height + 3);
      ctx.moveTo(x - width / 2 + width * .88, meterY - 3);
      ctx.lineTo(x - width / 2 + width * .88, meterY + height + 3);
      ctx.stroke();
      ctx.restore();
    }

    drawCrosshair(ctx, now) {
      const point = this.crosshair;
      const inside = distance(point, this.targetCenter) <= this.targetRadius;
      const pulse = 1 + Math.sin(this.time * 5) * .08;
      if (this.isAiming && this.pointerType === "touch" && this.pointer.active) {
        ctx.save();
        ctx.strokeStyle = "rgba(255,255,255,.48)";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 7]);
        ctx.beginPath();
        ctx.moveTo(this.pointer.x, this.pointer.y - 8);
        ctx.lineTo(point.x, point.y + 22);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "rgba(255,255,255,.22)";
        ctx.beginPath();
        ctx.arc(this.pointer.x, this.pointer.y, 17, 0, TAU);
        ctx.fill();
        ctx.restore();
      }

      if (this.isAiming) {
        ctx.save();
        const x = this.width / 2;
        const y = this.height - clamp(this.height * .08, 45, 74) - 15;
        const gradient = ctx.createLinearGradient(x, y, point.x, point.y);
        gradient.addColorStop(0, "rgba(88,231,222,.08)");
        gradient.addColorStop(1, inside ? "rgba(255,227,111,.55)" : "rgba(255,255,255,.2)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 10]);
        ctx.lineDashOffset = -this.time * 24;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo((x + point.x) / 2, Math.min(y, point.y) - 75, point.x, point.y);
        ctx.stroke();
        ctx.restore();
      }

      ctx.save();
      ctx.translate(point.x, point.y);
      ctx.scale(pulse, pulse);
      const color = inside ? "#ffe477" : "rgba(255,255,255,.76)";
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = inside ? 14 : 7;
      ctx.lineWidth = 2.2;
      const radius = 17;
      const gap = 7;
      for (let i = 0; i < 4; i += 1) {
        ctx.save();
        ctx.rotate(i * Math.PI / 2);
        ctx.beginPath();
        ctx.arc(0, 0, radius, -.63, .63);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(radius + gap, 0);
        ctx.lineTo(radius + gap + 7, 0);
        ctx.stroke();
        ctx.restore();
      }
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(0, 0, 2.6, 0, TAU);
      ctx.fill();
      ctx.restore();
    }

    drawDartShape(ctx, x, y, angle, scale = 1, glow = 0) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);
      ctx.scale(scale, scale);
      if (glow > 0) {
        ctx.shadowColor = "#62e8de";
        ctx.shadowBlur = 12 + glow * 14;
      }
      ctx.fillStyle = "#fff3bd";
      ctx.beginPath();
      ctx.moveTo(0, -31);
      ctx.lineTo(5, -20);
      ctx.lineTo(-5, -20);
      ctx.closePath();
      ctx.fill();
      const shaft = ctx.createLinearGradient(-4, -20, 4, 25);
      shaft.addColorStop(0, "#a7fff5");
      shaft.addColorStop(.45, "#48d8d0");
      shaft.addColorStop(1, "#268b9d");
      ctx.fillStyle = shaft;
      roundedRectPath(ctx, -3.5, -21, 7, 47, 3.5);
      ctx.fill();
      ctx.fillStyle = "#8b5be8";
      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.lineTo(12, 34);
      ctx.lineTo(2, 31);
      ctx.lineTo(0, 39);
      ctx.lineTo(-2, 31);
      ctx.lineTo(-12, 34);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.42)";
      ctx.fillRect(-1.6, -18, 1.5, 34);
      ctx.restore();
    }

    drawFlyingDart(ctx, now) {
      const dart = this.flyingDart;
      const raw = clamp((now - dart.startTime) / dart.duration, 0, 1);
      const t = easeInOutCubic(raw);
      const inv = 1 - t;
      const x = inv * inv * dart.start.x + 2 * inv * t * dart.control.x + t * t * dart.end.x;
      const y = inv * inv * dart.start.y + 2 * inv * t * dart.control.y + t * t * dart.end.y;
      const nextT = clamp(t + .015, 0, 1);
      const nextInv = 1 - nextT;
      const nx = nextInv * nextInv * dart.start.x + 2 * nextInv * nextT * dart.control.x + nextT * nextT * dart.end.x;
      const ny = nextInv * nextInv * dart.start.y + 2 * nextInv * nextT * dart.control.y + nextT * nextT * dart.end.y;
      const angle = Math.atan2(ny - y, nx - x);
      dart.angle = angle;
      const scale = lerp(1.5, .58, easeOutCubic(raw));

      ctx.save();
      ctx.globalAlpha = .16 * (1 - raw);
      ctx.strokeStyle = "#7af5e8";
      ctx.lineWidth = 8 * scale;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(lerp(dart.start.x, x, .58), lerp(dart.start.y, y, .58));
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.restore();
      this.drawDartShape(ctx, x, y, angle, scale, .8);
    }

    drawMenuDecor(ctx) {
      const centerX = this.width * .5;
      const centerY = this.height * .47;
      ctx.save();
      ctx.globalAlpha = .14;
      ctx.strokeStyle = "#ffd765";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 13]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(this.width, this.height) * .34 + Math.sin(this.time) * 8, 0, TAU);
      ctx.stroke();
      ctx.setLineDash([]);
      for (let i = 0; i < 10; i += 1) {
        const angle = i * TAU / 10 + this.time * .04;
        const radius = Math.min(this.width, this.height) * .36;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        ctx.fillStyle = i % 2 ? "#58e7de" : "#ffd765";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }

    drawVignette(ctx) {
      const vignette = ctx.createRadialGradient(this.width / 2, this.height * .42, Math.min(this.width, this.height) * .2, this.width / 2, this.height * .45, Math.max(this.width, this.height) * .72);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(.72, "rgba(4,2,18,.05)");
      vignette.addColorStop(1, "rgba(3,2,15,.48)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
    window.massalNovaStarDart = new StarDartGame();
  });
})();

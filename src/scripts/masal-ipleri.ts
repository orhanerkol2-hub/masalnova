type WorldId = 'moon' | 'cloud' | 'crystal';
type GameState = 'loading' | 'menu' | 'playing' | 'paused' | 'result';

interface Point { x: number; y: number }
interface NormalizedPoint { x: number; y: number }
interface BlowerSpec extends NormalizedPoint { dx: number; dy: number; radius: number }
interface BumperSpec extends NormalizedPoint { radius: number; rotation?: number }
interface HazardSpec extends NormalizedPoint { radius: number; rotation?: number }
interface LevelSpec {
  spawn: NormalizedPoint;
  anchors: NormalizedPoint[];
  ropeScale?: number[];
  stars: NormalizedPoint[];
  receiver: NormalizedPoint & { radius: number };
  hazards?: HazardSpec[];
  blower?: BlowerSpec;
  bumper?: BumperSpec;
}

interface WorldSpec {
  id: WorldId;
  title: string;
  kicker: string;
  levelWord: string;
  hint: string;
  successKicker: string;
  successCopy: string;
  background: string;
  orbSprite: string;
  starSprite: string;
  hazardSprite: string;
  blowerSprite: string;
  bumperSprite: string;
  anchorSprite: string;
  ropeColor: string;
  glowColor: string;
  gravity: number;
  levels: LevelSpec[];
}

interface RopeState { anchor: Point; length: number; cut: boolean }
interface StarState { point: Point; collected: boolean; pulse: number }
interface Particle { point: Point; velocity: Point; life: number; size: number }

const required = <T extends Element>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Masal İpleri arayüzü eksik: ${selector}`);
  return element;
};

const root = required<HTMLElement>('[data-game-root]');
const canvas = required<HTMLCanvasElement>('[data-game-canvas]');
const context = canvas.getContext('2d', { alpha: false });
if (!context) throw new Error('Canvas desteklenmiyor.');

const loadingScreen = required<HTMLElement>('[data-loading-screen]');
const loadingProgress = required<HTMLElement>('[data-loading-progress]');
const loadingCopy = required<HTMLElement>('[data-loading-copy]');
const menuScreen = required<HTMLElement>('[data-menu-screen]');
const hud = required<HTMLElement>('[data-hud]');
const worldKicker = required<HTMLElement>('[data-world-kicker]');
const levelLabel = required<HTMLElement>('[data-level-label]');
const hint = required<HTMLElement>('[data-hint]');
const hintCopy = required<HTMLElement>('[data-hint-copy]');
const cutGuide = required<HTMLElement>('[data-cut-guide]');
const toast = required<HTMLElement>('[data-toast]');
const pauseScreen = required<HTMLElement>('[data-pause-screen]');
const resultScreen = required<HTMLElement>('[data-result-screen]');
const resultKicker = required<HTMLElement>('[data-result-kicker]');
const resultTitle = required<HTMLElement>('[data-result-title]');
const resultCopy = required<HTMLElement>('[data-result-copy]');
const resultIcon = required<HTMLElement>('[data-result-icon]');
const resultStars = required<HTMLElement>('[data-result-stars]');
const nextButton = required<HTMLButtonElement>('[data-next-button]');
const startButton = required<HTMLButtonElement>('[data-start-button]');
const startLabel = required<HTMLElement>('[data-start-label]');
const resetButton = required<HTMLButtonElement>('[data-reset-button]');
const soundButton = required<HTMLButtonElement>('[data-sound-button]');
const pauseButton = required<HTMLButtonElement>('[data-pause-button]');
const resumeButton = required<HTMLButtonElement>('[data-resume-button]');
const rotateNote = required<HTMLElement>('[data-rotate-note]');
const worldCards = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-world-select]'));
const hudStars = Array.from(document.querySelectorAll<HTMLElement>('[data-hud-star]'));
const lockedWorld = ((): WorldId | null => {
  const value = root.dataset.lockedWorld;
  return value === 'moon' || value === 'cloud' || value === 'crystal' ? value : null;
})();

const ASSET_ROOT = '/games/masal-ipleri/assets';

const WORLDS: Record<WorldId, WorldSpec> = {
  moon: {
    id: 'moon',
    title: 'Ay Işığı Bahçesi',
    kicker: 'AY IŞIĞI BAHÇESİ',
    levelWord: 'BÖLÜM',
    hint: 'İpi kes, ay damlasını çiçeğe ulaştır',
    successKicker: 'AY ÇİÇEĞİ UYANDI',
    successCopy: 'Mimo’nun ay çiçeği yeniden parlıyor.',
    background: `${ASSET_ROOT}/moon-garden.webp`,
    orbSprite: `${ASSET_ROOT}/sprites/moon-dew.png`,
    starSprite: `${ASSET_ROOT}/sprites/moon-star.png`,
    hazardSprite: `${ASSET_ROOT}/sprites/thorn.png`,
    blowerSprite: `${ASSET_ROOT}/sprites/moon-blower.png`,
    bumperSprite: `${ASSET_ROOT}/sprites/flower-bounce.png`,
    anchorSprite: `${ASSET_ROOT}/sprites/moon-anchor.png`,
    ropeColor: '#d3a96b',
    glowColor: '#fff0a6',
    gravity: 620,
    levels: [
      {
        spawn: { x: .46, y: .34 }, anchors: [{ x: .27, y: .13 }, { x: .66, y: .12 }],
        stars: [{ x: .52, y: .51 }, { x: .65, y: .62 }, { x: .77, y: .69 }], receiver: { x: .86, y: .78, radius: .13 },
        hazards: [{ x: .27, y: .67, radius: .085, rotation: -.2 }], blower: { x: .2, y: .53, dx: 1, dy: -.04, radius: .55 }, bumper: { x: .57, y: .79, radius: .09 },
      },
      {
        spawn: { x: .42, y: .29 }, anchors: [{ x: .2, y: .12 }, { x: .46, y: .1 }, { x: .68, y: .15 }], ropeScale: [1, .84, 1],
        stars: [{ x: .49, y: .46 }, { x: .61, y: .56 }, { x: .74, y: .64 }], receiver: { x: .86, y: .78, radius: .13 },
        hazards: [{ x: .39, y: .66, radius: .08, rotation: .25 }], blower: { x: .17, y: .58, dx: 1, dy: -.12, radius: .58 }, bumper: { x: .62, y: .78, radius: .085 },
      },
      {
        spawn: { x: .5, y: .32 }, anchors: [{ x: .24, y: .12 }, { x: .74, y: .12 }], ropeScale: [.93, .93],
        stars: [{ x: .42, y: .5 }, { x: .58, y: .57 }, { x: .75, y: .69 }], receiver: { x: .86, y: .78, radius: .13 },
        hazards: [{ x: .31, y: .63, radius: .075 }, { x: .66, y: .72, radius: .07, rotation: -.35 }], blower: { x: .15, y: .48, dx: 1, dy: .03, radius: .62 }, bumper: { x: .52, y: .8, radius: .09 },
      },
    ],
  },
  cloud: {
    id: 'cloud',
    title: 'Bulut Fırını',
    kicker: 'BULUT FIRINI',
    levelWord: 'FIRIN',
    hint: 'İpleri kes, yıldız çöreğini sepete ulaştır',
    successKicker: 'YILDIZ ÇÖREĞİ HAZIR',
    successCopy: 'Pofur’un yıldız çöreği tam vaktinde sepete indi.',
    background: `${ASSET_ROOT}/cloud-bakery.webp`,
    orbSprite: `${ASSET_ROOT}/sprites/cloud-pastry.png`,
    starSprite: `${ASSET_ROOT}/sprites/cloud-star.png`,
    hazardSprite: `${ASSET_ROOT}/sprites/steam-blower.png`,
    blowerSprite: `${ASSET_ROOT}/sprites/steam-blower.png`,
    bumperSprite: `${ASSET_ROOT}/sprites/teacup-bumper.png`,
    anchorSprite: `${ASSET_ROOT}/sprites/cloud-anchor.png`,
    ropeColor: '#f0dfbd',
    glowColor: '#fff1a7',
    gravity: 560,
    levels: [
      {
        spawn: { x: .48, y: .31 }, anchors: [{ x: .29, y: .11 }, { x: .5, y: .09 }, { x: .7, y: .12 }], ropeScale: [1, .84, 1],
        stars: [{ x: .49, y: .47 }, { x: .61, y: .58 }, { x: .71, y: .69 }], receiver: { x: .76, y: .84, radius: .13 },
        blower: { x: .18, y: .5, dx: 1, dy: -.03, radius: .6 }, bumper: { x: .5, y: .73, radius: .085 },
      },
      {
        spawn: { x: .4, y: .29 }, anchors: [{ x: .22, y: .12 }, { x: .55, y: .1 }], ropeScale: [1, .9],
        stars: [{ x: .46, y: .43 }, { x: .6, y: .55 }, { x: .74, y: .67 }], receiver: { x: .76, y: .84, radius: .13 },
        hazards: [{ x: .42, y: .69, radius: .07, rotation: .25 }], blower: { x: .15, y: .53, dx: 1, dy: -.08, radius: .62 }, bumper: { x: .61, y: .75, radius: .09, rotation: -.12 },
      },
      {
        spawn: { x: .52, y: .28 }, anchors: [{ x: .24, y: .11 }, { x: .78, y: .12 }], ropeScale: [.93, .93],
        stars: [{ x: .42, y: .45 }, { x: .58, y: .56 }, { x: .72, y: .66 }], receiver: { x: .76, y: .84, radius: .13 },
        hazards: [{ x: .3, y: .68, radius: .07, rotation: -.1 }], blower: { x: .16, y: .46, dx: 1, dy: .04, radius: .66 }, bumper: { x: .53, y: .76, radius: .085, rotation: .06 },
      },
    ],
  },
  crystal: {
    id: 'crystal',
    title: 'Kristal Saray',
    kicker: 'KRİSTAL SARAY',
    levelWord: 'SARAY',
    hint: 'Asmaları kes, su incisini taca ulaştır',
    successKicker: 'SARAY ÇEŞMESİ UYANDI',
    successCopy: 'Mirza’nın su incisi kristal çeşmeyi yeniden akıttı.',
    background: `${ASSET_ROOT}/crystal-palace.webp`,
    orbSprite: `${ASSET_ROOT}/sprites/water-pearl.png`,
    starSprite: `${ASSET_ROOT}/sprites/crystal-star.png`,
    hazardSprite: `${ASSET_ROOT}/sprites/crystal-spikes.png`,
    blowerSprite: `${ASSET_ROOT}/sprites/bubble-blower.png`,
    bumperSprite: `${ASSET_ROOT}/sprites/lily-drum.png`,
    anchorSprite: `${ASSET_ROOT}/sprites/crystal-anchor.png`,
    ropeColor: '#4f8b4e',
    glowColor: '#70f1e5',
    gravity: 590,
    levels: [
      {
        spawn: { x: .48, y: .33 }, anchors: [{ x: .27, y: .11 }, { x: .68, y: .11 }],
        stars: [{ x: .48, y: .48 }, { x: .59, y: .58 }, { x: .69, y: .69 }], receiver: { x: .69, y: .82, radius: .14 },
        hazards: [{ x: .78, y: .63, radius: .075 }], blower: { x: .16, y: .51, dx: 1, dy: -.05, radius: .6 }, bumper: { x: .5, y: .75, radius: .1 },
      },
      {
        spawn: { x: .4, y: .3 }, anchors: [{ x: .21, y: .1 }, { x: .48, y: .12 }, { x: .72, y: .11 }], ropeScale: [1, .83, 1],
        stars: [{ x: .43, y: .45 }, { x: .56, y: .56 }, { x: .67, y: .68 }], receiver: { x: .69, y: .82, radius: .14 },
        hazards: [{ x: .34, y: .67, radius: .07 }, { x: .79, y: .66, radius: .07 }], blower: { x: .14, y: .5, dx: 1, dy: -.1, radius: .65 }, bumper: { x: .53, y: .75, radius: .1 },
      },
      {
        spawn: { x: .5, y: .29 }, anchors: [{ x: .23, y: .1 }, { x: .76, y: .1 }], ropeScale: [.93, .93],
        stars: [{ x: .38, y: .46 }, { x: .55, y: .56 }, { x: .68, y: .68 }], receiver: { x: .69, y: .82, radius: .14 },
        hazards: [{ x: .31, y: .68, radius: .075 }, { x: .79, y: .62, radius: .075 }], blower: { x: .14, y: .48, dx: 1, dy: .02, radius: .68 }, bumper: { x: .5, y: .76, radius: .1 },
      },
    ],
  },
};

const ACTIVE_WORLDS = lockedWorld ? [WORLDS[lockedWorld]] : Object.values(WORLDS);
const ALL_ASSETS = Array.from(new Set(ACTIVE_WORLDS.flatMap((world) => [
  world.background, world.orbSprite, world.starSprite, world.hazardSprite,
  world.blowerSprite, world.bumperSprite, world.anchorSprite,
])));

class MasalIpleriGame {
  private ctx = context!;
  private images = new Map<string, HTMLImageElement>();
  private state: GameState = 'loading';
  private selectedWorld: WorldId = lockedWorld || 'moon';
  private levelIndex = 0;
  private world = WORLDS[this.selectedWorld];
  private width = window.innerWidth;
  private height = window.innerHeight;
  private scale = 1;
  private orb = { point: { x: 0, y: 0 }, velocity: { x: 0, y: 0 }, radius: 34 };
  private ropes: RopeState[] = [];
  private stars: StarState[] = [];
  private hazards: Array<HazardSpec & Point> = [];
  private blower: (BlowerSpec & Point) | null = null;
  private bumper: (BumperSpec & Point) | null = null;
  private receiver = { x: 0, y: 0, radius: 80 };
  private particles: Particle[] = [];
  private pointerDown = false;
  private pointerPoint: Point | null = null;
  private pointerPrevious: Point | null = null;
  private lastFrame = performance.now();
  private accumulator = 0;
  private tutorialVisible = true;
  private resultType: 'won' | 'failed' = 'won';
  private soundEnabled = true;
  private audio: AudioContext | null = null;
  private toastTimer = 0;
  private completed: Record<WorldId, number> = { moon: 0, cloud: 0, crystal: 0 };

  constructor() {
    this.restoreProgress();
    this.bindEvents();
    this.resize();
    this.loadAssets();
    requestAnimationFrame((time) => this.frame(time));
  }

  private restoreProgress(): void {
    try {
      const stored = JSON.parse(localStorage.getItem('masal-ipleri-progress') || '{}') as Partial<Record<WorldId, number>>;
      for (const id of Object.keys(WORLDS) as WorldId[]) this.completed[id] = Math.max(0, Math.min(3, Number(stored[id]) || 0));
    } catch { /* local progress is optional */ }
    this.updateWorldProgress();
  }

  private saveProgress(): void {
    localStorage.setItem('masal-ipleri-progress', JSON.stringify(this.completed));
    this.updateWorldProgress();
  }

  private updateWorldProgress(): void {
    for (const id of Object.keys(WORLDS) as WorldId[]) {
      const label = document.querySelector<HTMLElement>(`[data-world-progress="${id}"]`);
      if (label) label.textContent = `${this.completed[id]}/3`;
    }
  }

  private async loadAssets(): Promise<void> {
    let loaded = 0;
    const notes = ['Mimo ay çiçeklerini uyandırıyor', 'Pofur fırını ısıtıyor', 'Mirza kristal çeşmeyi hazırlıyor'];
    await Promise.all(ALL_ASSETS.map((source, index) => new Promise<void>((resolve) => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => {
        this.images.set(source, image);
        loaded += 1;
        loadingProgress.style.width = `${Math.round((loaded / ALL_ASSETS.length) * 100)}%`;
        loadingCopy.textContent = notes[index % notes.length];
        resolve();
      };
      image.onerror = () => { loaded += 1; resolve(); };
      image.src = source;
    })));
    window.setTimeout(() => this.showMenu(), 350);
  }

  private bindEvents(): void {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('orientationchange', () => window.setTimeout(() => this.resize(), 160));
    startButton.addEventListener('click', () => this.startSelectedWorld());
    resetButton.addEventListener('click', () => this.loadLevel(true));
    soundButton.addEventListener('click', () => this.toggleSound());
    pauseButton.addEventListener('click', () => this.pause());
    resumeButton.addEventListener('click', () => this.resume());
    required<HTMLButtonElement>('[data-pause-menu]').addEventListener('click', () => {
      if (lockedWorld) this.loadLevel(true);
      else this.showMenu();
    });
    required<HTMLButtonElement>('[data-result-menu]').addEventListener('click', () => {
      if (lockedWorld) {
        this.levelIndex = 0;
        this.loadLevel(false);
      } else this.showMenu();
    });
    nextButton.addEventListener('click', () => this.advance());

    for (const card of worldCards) {
      card.addEventListener('click', () => this.selectWorld(card.dataset.worldSelect as WorldId));
    }

    canvas.addEventListener('pointerdown', (event) => this.onPointerDown(event));
    canvas.addEventListener('pointermove', (event) => this.onPointerMove(event));
    canvas.addEventListener('pointerup', (event) => this.onPointerUp(event));
    canvas.addEventListener('pointercancel', (event) => this.onPointerUp(event));
    window.addEventListener('keydown', (event) => this.onKeyDown(event));
  }

  private onKeyDown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    if (target?.closest('button, a, input, select, textarea')) return;
    if ((event.key === 'p' || event.key === 'P' || event.key === 'Escape') && this.state === 'playing') {
      event.preventDefault();
      this.pause();
    } else if ((event.key === 'p' || event.key === 'P' || event.key === 'Escape') && this.state === 'paused') {
      event.preventDefault();
      this.resume();
    } else if ((event.key === 'r' || event.key === 'R') && this.state === 'playing') {
      event.preventDefault();
      this.loadLevel(true);
    }
  }

  private selectWorld(id: WorldId): void {
    if (lockedWorld && id !== lockedWorld) return;
    this.selectedWorld = id;
    const world = WORLDS[id];
    root.classList.remove('theme-moon', 'theme-cloud', 'theme-crystal');
    root.classList.add(`theme-${id}`);
    menuScreen.style.backgroundImage = `linear-gradient(90deg, rgba(2,10,26,.92), rgba(2,10,26,.26) 48%, rgba(2,10,26,.66)), url('${world.background}')`;
    startLabel.textContent = world.title;
    for (const card of worldCards) {
      const selected = card.dataset.worldSelect === id;
      card.classList.toggle('is-selected', selected);
      card.setAttribute('aria-pressed', String(selected));
    }
    this.tone(430, .05);
  }

  private startSelectedWorld(): void {
    this.world = WORLDS[this.selectedWorld];
    this.levelIndex = Math.min(this.completed[this.selectedWorld], 2);
    this.loadLevel(false);
  }

  private showMenu(): void {
    if (lockedWorld) {
      this.selectedWorld = lockedWorld;
      this.world = WORLDS[lockedWorld];
      this.levelIndex = Math.min(this.completed[lockedWorld], 2);
      this.loadLevel(false);
      return;
    }
    this.setState('menu');
    loadingScreen.hidden = true;
    menuScreen.hidden = false;
    hud.hidden = true;
    hint.hidden = true;
    cutGuide.hidden = true;
    pauseScreen.hidden = true;
    resultScreen.hidden = true;
    this.selectWorld(this.selectedWorld);
    startButton.focus({ preventScroll: true });
  }

  private setState(state: GameState): void {
    this.state = state;
    root.dataset.gameState = state;
  }

  private loadLevel(announce: boolean): void {
    this.world = WORLDS[this.selectedWorld];
    const level = this.world.levels[this.levelIndex];
    const min = Math.min(this.width, this.height);
    this.scale = Math.max(.56, min / 1024);
    this.orb.radius = 38 * this.scale;
    this.orb.point = this.denormalize(level.spawn);
    this.orb.velocity = { x: 0, y: 0 };
    this.ropes = level.anchors.map((anchor, index) => {
      const point = this.denormalize(anchor);
      const distance = Math.hypot(this.orb.point.x - point.x, this.orb.point.y - point.y);
      return { anchor: point, length: distance * (level.ropeScale?.[index] || 1), cut: false };
    });
    this.stars = level.stars.map((point) => ({ point: this.denormalize(point), collected: false, pulse: Math.random() * Math.PI * 2 }));
    this.hazards = (level.hazards || []).map((hazard) => ({ ...hazard, ...this.denormalize(hazard) }));
    this.blower = level.blower ? { ...level.blower, ...this.denormalize(level.blower) } : null;
    this.bumper = level.bumper ? { ...level.bumper, ...this.denormalize(level.bumper) } : null;
    const receiver = this.denormalize(level.receiver);
    this.receiver = { ...receiver, radius: level.receiver.radius * Math.min(this.width, this.height) };
    this.particles = [];
    this.pointerDown = false;
    this.tutorialVisible = this.levelIndex === 0;
    this.setState('playing');
    menuScreen.hidden = true;
    loadingScreen.hidden = true;
    pauseScreen.hidden = true;
    resultScreen.hidden = true;
    hud.hidden = false;
    hint.hidden = false;
    cutGuide.hidden = !this.tutorialVisible;
    worldKicker.textContent = this.world.kicker;
    levelLabel.textContent = `${this.world.levelWord} ${String(this.levelIndex + 1).padStart(2, '0')}`;
    hintCopy.textContent = this.world.hint;
    this.updateHudStars();
    this.resize();
    canvas.focus({ preventScroll: true });
    if (announce) this.showToast('Bulmaca yeniden başladı');
    this.tone(560, .06);
  }

  private pause(): void {
    if (this.state !== 'playing') return;
    this.setState('paused');
    pauseScreen.hidden = false;
    resumeButton.focus({ preventScroll: true });
  }

  private resume(): void {
    if (this.state !== 'paused') return;
    this.setState('playing');
    pauseScreen.hidden = true;
    canvas.focus({ preventScroll: true });
    this.lastFrame = performance.now();
  }

  private advance(): void {
    if (this.resultType === 'failed') {
      this.loadLevel(true);
      return;
    }
    if (this.levelIndex < 2) {
      this.levelIndex += 1;
      this.loadLevel(false);
    } else if (lockedWorld) {
      this.levelIndex = 0;
      this.loadLevel(false);
    } else {
      this.showMenu();
    }
  }

  private resize(): void {
    const rect = root.getBoundingClientRect();
    this.width = Math.max(320, rect.width);
    this.height = Math.max(420, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(this.width * dpr);
    canvas.height = Math.round(this.height * dpr);
    canvas.style.width = `${this.width}px`;
    canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    rotateNote.hidden = !(matchMedia('(orientation: portrait)').matches && this.width < 620 && this.state === 'playing');
    if (this.state === 'playing' || this.state === 'paused') this.loadLevelGeometry();
  }

  private loadLevelGeometry(): void {
    const currentState = this.state;
    const level = this.world.levels[this.levelIndex];
    const collected = this.stars.map((star) => star.collected);
    this.scale = Math.max(.56, Math.min(this.width, this.height) / 1024);
    this.orb.radius = 38 * this.scale;
    this.orb.point = this.denormalize(level.spawn);
    this.orb.velocity = { x: 0, y: 0 };
    this.ropes = level.anchors.map((anchor, index) => {
      const point = this.denormalize(anchor);
      return { anchor: point, length: Math.hypot(this.orb.point.x - point.x, this.orb.point.y - point.y) * (level.ropeScale?.[index] || 1), cut: false };
    });
    this.stars = level.stars.map((point, index) => ({ point: this.denormalize(point), collected: collected[index] || false, pulse: Math.random() * Math.PI * 2 }));
    this.hazards = (level.hazards || []).map((hazard) => ({ ...hazard, ...this.denormalize(hazard) }));
    this.blower = level.blower ? { ...level.blower, ...this.denormalize(level.blower) } : null;
    this.bumper = level.bumper ? { ...level.bumper, ...this.denormalize(level.bumper) } : null;
    const receiver = this.denormalize(level.receiver);
    this.receiver = { ...receiver, radius: level.receiver.radius * Math.min(this.width, this.height) };
    this.state = currentState;
  }

  private denormalize(point: NormalizedPoint): Point {
    return { x: point.x * this.width, y: point.y * this.height };
  }

  private pointerPosition(event: PointerEvent): Point {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  private onPointerDown(event: PointerEvent): void {
    if (this.state !== 'playing') return;
    this.pointerDown = true;
    this.pointerPoint = this.pointerPosition(event);
    this.pointerPrevious = this.pointerPoint;
    canvas.setPointerCapture(event.pointerId);
    canvas.focus({ preventScroll: true });
    this.tryCutAtPoint(this.pointerPoint);
    if (this.tutorialVisible) {
      this.tutorialVisible = false;
      cutGuide.hidden = true;
    }
  }

  private onPointerMove(event: PointerEvent): void {
    if (!this.pointerDown || this.state !== 'playing') return;
    const next = this.pointerPosition(event);
    if (this.pointerPrevious) this.tryCutSegment(this.pointerPrevious, next);
    this.pointerPrevious = next;
    this.pointerPoint = next;
  }

  private onPointerUp(event: PointerEvent): void {
    if (!this.pointerDown) return;
    this.pointerDown = false;
    this.pointerPrevious = null;
    this.pointerPoint = null;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  }

  private tryCutAtPoint(point: Point): void {
    for (let index = 0; index < this.ropes.length; index += 1) {
      const rope = this.ropes[index];
      if (!rope.cut && this.pointToSegment(point, rope.anchor, this.orb.point) < 24 * this.scale) this.cutRope(index);
    }
  }

  private tryCutSegment(from: Point, to: Point): void {
    for (let index = 0; index < this.ropes.length; index += 1) {
      const rope = this.ropes[index];
      if (rope.cut) continue;
      if (this.segmentsIntersect(from, to, rope.anchor, this.orb.point)
        || this.pointToSegment(from, rope.anchor, this.orb.point) < 18 * this.scale
        || this.pointToSegment(to, rope.anchor, this.orb.point) < 18 * this.scale) this.cutRope(index);
    }
  }

  private cutRope(index: number): void {
    const rope = this.ropes[index];
    if (!rope || rope.cut) return;
    rope.cut = true;
    const midpoint = { x: (rope.anchor.x + this.orb.point.x) / 2, y: (rope.anchor.y + this.orb.point.y) / 2 };
    this.spawnParticles(midpoint, this.world.glowColor, 10);
    this.tone(760, .045);
    if (this.ropes.every((item) => item.cut)) this.showToast('Emanet artık serbest!');
  }

  private pointToSegment(point: Point, start: Point, end: Point): number {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    if (dx === 0 && dy === 0) return Math.hypot(point.x - start.x, point.y - start.y);
    const t = Math.max(0, Math.min(1, ((point.x - start.x) * dx + (point.y - start.y) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(point.x - (start.x + t * dx), point.y - (start.y + t * dy));
  }

  private segmentsIntersect(a: Point, b: Point, c: Point, d: Point): boolean {
    const cross = (p: Point, q: Point, r: Point) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
    const c1 = cross(a, b, c);
    const c2 = cross(a, b, d);
    const c3 = cross(c, d, a);
    const c4 = cross(c, d, b);
    return ((c1 > 0 && c2 < 0) || (c1 < 0 && c2 > 0)) && ((c3 > 0 && c4 < 0) || (c3 < 0 && c4 > 0));
  }

  private frame(time: number): void {
    const elapsed = Math.min(.04, (time - this.lastFrame) / 1000 || 0);
    this.lastFrame = time;
    if (this.state === 'playing') {
      this.accumulator += elapsed;
      while (this.accumulator >= 1 / 120) {
        this.updatePhysics(1 / 120);
        this.accumulator -= 1 / 120;
      }
    }
    this.updateParticles(elapsed);
    this.draw(time / 1000);
    requestAnimationFrame((next) => this.frame(next));
  }

  private updatePhysics(dt: number): void {
    const orb = this.orb;
    orb.velocity.y += this.world.gravity * this.scale * dt;

    if (this.blower) {
      const distance = Math.hypot(orb.point.x - this.blower.x, orb.point.y - this.blower.y);
      if (distance < this.blower.radius * Math.min(this.width, this.height) && orb.point.x > this.blower.x - 20 * this.scale) {
        const strength = 760 * this.scale * (1 - distance / (this.blower.radius * Math.min(this.width, this.height)));
        orb.velocity.x += this.blower.dx * strength * dt;
        orb.velocity.y += this.blower.dy * strength * dt;
      }
    }

    orb.velocity.x *= .999;
    orb.velocity.y *= .999;
    orb.point.x += orb.velocity.x * dt;
    orb.point.y += orb.velocity.y * dt;

    for (let iteration = 0; iteration < 5; iteration += 1) this.solveRopes();
    this.solveBumper();
    this.solveBounds();
    this.checkStars();
    this.checkHazardsAndGoal();
  }

  private solveRopes(): void {
    for (const rope of this.ropes) {
      if (rope.cut) continue;
      const dx = this.orb.point.x - rope.anchor.x;
      const dy = this.orb.point.y - rope.anchor.y;
      const distance = Math.hypot(dx, dy) || 1;
      if (distance <= rope.length) continue;
      const nx = dx / distance;
      const ny = dy / distance;
      this.orb.point.x = rope.anchor.x + nx * rope.length;
      this.orb.point.y = rope.anchor.y + ny * rope.length;
      const radial = this.orb.velocity.x * nx + this.orb.velocity.y * ny;
      if (radial > 0) {
        this.orb.velocity.x -= radial * nx;
        this.orb.velocity.y -= radial * ny;
      }
    }
  }

  private solveBumper(): void {
    if (!this.bumper) return;
    const radius = this.bumper.radius * Math.min(this.width, this.height);
    const dx = this.orb.point.x - this.bumper.x;
    const dy = this.orb.point.y - this.bumper.y;
    const distance = Math.hypot(dx, dy) || 1;
    const minDistance = radius + this.orb.radius * .62;
    if (distance >= minDistance) return;
    const nx = dx / distance;
    const ny = dy / distance;
    this.orb.point.x = this.bumper.x + nx * minDistance;
    this.orb.point.y = this.bumper.y + ny * minDistance;
    const dot = this.orb.velocity.x * nx + this.orb.velocity.y * ny;
    this.orb.velocity.x -= 1.75 * dot * nx;
    this.orb.velocity.y -= 1.75 * dot * ny;
    this.orb.velocity.x += 150 * this.scale;
    this.orb.velocity.y -= 150 * this.scale;
    this.tone(520, .035);
  }

  private solveBounds(): void {
    const radius = this.orb.radius * .6;
    if (this.orb.point.x < radius) {
      this.orb.point.x = radius;
      this.orb.velocity.x = Math.abs(this.orb.velocity.x) * .65;
    } else if (this.orb.point.x > this.width - radius) {
      this.orb.point.x = this.width - radius;
      this.orb.velocity.x = -Math.abs(this.orb.velocity.x) * .65;
    }
    if (this.orb.point.y < radius) {
      this.orb.point.y = radius;
      this.orb.velocity.y = Math.abs(this.orb.velocity.y) * .55;
    }
    if (this.orb.point.y > this.height + this.orb.radius * 2.4) this.finish(false);
  }

  private checkStars(): void {
    for (const star of this.stars) {
      if (star.collected) continue;
      if (Math.hypot(this.orb.point.x - star.point.x, this.orb.point.y - star.point.y) < this.orb.radius * 1.45) {
        star.collected = true;
        this.spawnParticles(star.point, this.world.glowColor, 14);
        this.tone(880 + this.stars.filter((item) => item.collected).length * 100, .055);
        this.updateHudStars();
        this.showToast(`${this.stars.filter((item) => item.collected).length}. yıldız toplandı`);
      }
    }
  }

  private checkHazardsAndGoal(): void {
    for (const hazard of this.hazards) {
      const radius = hazard.radius * Math.min(this.width, this.height);
      if (Math.hypot(this.orb.point.x - hazard.x, this.orb.point.y - hazard.y) < radius * .64 + this.orb.radius * .56) {
        this.finish(false);
        return;
      }
    }
    if (Math.hypot(this.orb.point.x - this.receiver.x, this.orb.point.y - this.receiver.y) < this.receiver.radius) this.finish(true);
  }

  private finish(won: boolean): void {
    if (this.state !== 'playing') return;
    this.resultType = won ? 'won' : 'failed';
    this.setState('result');
    resultScreen.hidden = false;
    cutGuide.hidden = true;
    const collected = this.stars.filter((star) => star.collected).length;
    resultStars.innerHTML = Array.from({ length: 3 }, (_, index) => `<i class="${index < collected ? 'ph-fill' : 'ph'} ph-star${index < collected ? '' : ' is-empty'}"></i>`).join('');
    if (won) {
      resultKicker.textContent = this.world.successKicker;
      resultTitle.textContent = collected === 3 ? 'Kusursuz bir masal!' : 'Masal tamamlandı!';
      resultCopy.textContent = this.world.successCopy;
      resultIcon.innerHTML = '<i class="ph-fill ph-star"></i>';
      this.completed[this.selectedWorld] = Math.max(this.completed[this.selectedWorld], this.levelIndex + 1);
      this.saveProgress();
      const isFinal = this.levelIndex === 2;
      nextButton.querySelector('small')!.textContent = isFinal ? (lockedWorld ? 'YENİDEN OYNA' : 'ÜÇ DİYARA DÖN') : 'SONRAKİ BULMACA';
      nextButton.querySelector('strong')!.textContent = isFinal ? (lockedWorld ? 'Baştan başla' : 'Yeni bir dünya seç') : 'Devam et';
      this.spawnParticles(this.receiver, this.world.glowColor, 28);
      this.tone(700, .12);
      window.setTimeout(() => this.tone(940, .16), 100);
    } else {
      resultKicker.textContent = 'SİHİR YOLDAN ÇIKTI';
      resultTitle.textContent = 'Bir kez daha deneyelim.';
      resultCopy.textContent = 'İpleri farklı bir sırayla keserek emaneti güvenli yola yönlendirebilirsin.';
      resultIcon.innerHTML = '<i class="ph ph-arrow-counter-clockwise"></i>';
      nextButton.querySelector('small')!.textContent = 'AYNI BULMACA';
      nextButton.querySelector('strong')!.textContent = 'Yeniden dene';
      this.tone(220, .12);
    }
    nextButton.focus({ preventScroll: true });
  }

  private updateHudStars(): void {
    hudStars.forEach((element, index) => {
      const collected = this.stars[index]?.collected || false;
      element.classList.toggle('is-collected', collected);
      element.classList.toggle('ph-fill', collected);
      element.classList.toggle('ph', !collected);
    });
  }

  private draw(time: number): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    const world = this.state === 'menu' || this.state === 'loading' ? WORLDS[this.selectedWorld] : this.world;
    const background = this.images.get(world.background);
    if (background) this.drawCover(background);
    else { ctx.fillStyle = '#061630'; ctx.fillRect(0, 0, this.width, this.height); }

    if (this.state === 'playing' || this.state === 'paused' || this.state === 'result') {
      this.drawReceiver(time);
      this.drawWorldObjects(time);
      this.drawRopes();
      this.drawStars(time);
      this.drawOrb(time);
      this.drawParticles();
      this.drawPointerTrail();
    }
  }

  private drawCover(image: HTMLImageElement): void {
    const imageAspect = image.naturalWidth / image.naturalHeight;
    const canvasAspect = this.width / this.height;
    let sourceWidth = image.naturalWidth;
    let sourceHeight = image.naturalHeight;
    let sourceX = 0;
    let sourceY = 0;
    if (canvasAspect > imageAspect) {
      sourceHeight = image.naturalWidth / canvasAspect;
      sourceY = (image.naturalHeight - sourceHeight) / 2;
    } else {
      sourceWidth = image.naturalHeight * canvasAspect;
      sourceX = (image.naturalWidth - sourceWidth) / 2;
    }
    this.ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, this.width, this.height);
  }

  private drawWorldObjects(time: number): void {
    if (this.blower) {
      const rotation = Math.atan2(this.blower.dy, this.blower.dx);
      this.drawSprite(this.world.blowerSprite, this.blower, 138 * this.scale, 138 * this.scale, rotation);
      const ctx = this.ctx;
      ctx.save();
      ctx.globalAlpha = .16 + Math.sin(time * 4) * .035;
      ctx.strokeStyle = this.world.glowColor;
      ctx.lineWidth = 4 * this.scale;
      ctx.setLineDash([14 * this.scale, 18 * this.scale]);
      ctx.beginPath();
      ctx.moveTo(this.blower.x + 48 * this.scale, this.blower.y);
      ctx.lineTo(this.blower.x + this.blower.dx * 220 * this.scale, this.blower.y + this.blower.dy * 220 * this.scale);
      ctx.stroke();
      ctx.restore();
    }
    if (this.bumper) {
      const size = this.bumper.radius * Math.min(this.width, this.height) * 2.2;
      this.drawSprite(this.world.bumperSprite, this.bumper, size, size, this.bumper.rotation || 0);
    }
    for (const hazard of this.hazards) {
      const size = hazard.radius * Math.min(this.width, this.height) * 2.55;
      this.drawSprite(this.world.hazardSprite, hazard, size, size, hazard.rotation || 0);
    }
  }

  private drawRopes(): void {
    const ctx = this.ctx;
    for (const rope of this.ropes) {
      if (rope.cut) continue;
      ctx.save();
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(0,0,0,.35)';
      ctx.shadowBlur = 8 * this.scale;
      ctx.strokeStyle = this.world.ropeColor;
      ctx.lineWidth = 8 * this.scale;
      ctx.beginPath();
      ctx.moveTo(rope.anchor.x, rope.anchor.y);
      ctx.quadraticCurveTo((rope.anchor.x + this.orb.point.x) / 2 + Math.sin(performance.now() / 800) * 2, (rope.anchor.y + this.orb.point.y) / 2, this.orb.point.x, this.orb.point.y);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,.28)';
      ctx.lineWidth = 2 * this.scale;
      ctx.stroke();
      ctx.restore();
      this.drawSprite(this.world.anchorSprite, rope.anchor, 72 * this.scale, 72 * this.scale);
    }
  }

  private drawStars(time: number): void {
    for (const star of this.stars) {
      if (star.collected) continue;
      const pulse = 1 + Math.sin(time * 3 + star.pulse) * .08;
      this.drawSprite(this.world.starSprite, star.point, 66 * this.scale * pulse, 66 * this.scale * pulse, Math.sin(time + star.pulse) * .06);
    }
  }

  private drawOrb(time: number): void {
    const size = this.orb.radius * 2.65;
    const rotation = Math.max(-.28, Math.min(.28, this.orb.velocity.x / 820));
    this.ctx.save();
    this.ctx.shadowColor = this.world.glowColor;
    this.ctx.shadowBlur = (18 + Math.sin(time * 4) * 4) * this.scale;
    this.drawSprite(this.world.orbSprite, this.orb.point, size, size, rotation);
    this.ctx.restore();
  }

  private drawReceiver(time: number): void {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = .5 + Math.sin(time * 3) * .12;
    ctx.strokeStyle = this.world.glowColor;
    ctx.lineWidth = 3 * this.scale;
    ctx.setLineDash([8 * this.scale, 10 * this.scale]);
    ctx.beginPath();
    ctx.arc(this.receiver.x, this.receiver.y, this.receiver.radius * .72, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  private drawSprite(source: string, point: Point, width: number, height: number, rotation = 0): void {
    const image = this.images.get(source);
    if (!image) return;
    this.ctx.save();
    this.ctx.translate(point.x, point.y);
    this.ctx.rotate(rotation);
    this.ctx.drawImage(image, -width / 2, -height / 2, width, height);
    this.ctx.restore();
  }

  private drawPointerTrail(): void {
    if (!this.pointerDown || !this.pointerPrevious || !this.pointerPoint) return;
    this.ctx.save();
    this.ctx.strokeStyle = '#fff4bb';
    this.ctx.lineWidth = 5 * this.scale;
    this.ctx.lineCap = 'round';
    this.ctx.shadowColor = this.world.glowColor;
    this.ctx.shadowBlur = 12 * this.scale;
    this.ctx.beginPath();
    this.ctx.moveTo(this.pointerPrevious.x, this.pointerPrevious.y);
    this.ctx.lineTo(this.pointerPoint.x, this.pointerPoint.y);
    this.ctx.stroke();
    this.ctx.restore();
  }

  private spawnParticles(point: Point, color: string, count: number): void {
    for (let index = 0; index < count; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (50 + Math.random() * 190) * this.scale;
      this.particles.push({
        point: { x: point.x, y: point.y },
        velocity: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
        life: .5 + Math.random() * .5,
        size: (2 + Math.random() * 5) * this.scale,
      });
    }
    root.style.setProperty('--particle-color', color);
  }

  private updateParticles(delta: number): void {
    for (const particle of this.particles) {
      particle.life -= delta;
      particle.point.x += particle.velocity.x * delta;
      particle.point.y += particle.velocity.y * delta;
      particle.velocity.y += 70 * this.scale * delta;
      particle.velocity.x *= .985;
    }
    this.particles = this.particles.filter((particle) => particle.life > 0);
  }

  private drawParticles(): void {
    this.ctx.save();
    this.ctx.fillStyle = this.world.glowColor;
    for (const particle of this.particles) {
      this.ctx.globalAlpha = Math.max(0, particle.life);
      this.ctx.beginPath();
      this.ctx.arc(particle.point.x, particle.point.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.restore();
  }

  private showToast(copy: string): void {
    toast.textContent = copy;
    toast.hidden = false;
    window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => { toast.hidden = true; }, 1350);
  }

  private toggleSound(): void {
    this.soundEnabled = !this.soundEnabled;
    soundButton.setAttribute('aria-pressed', String(this.soundEnabled));
    soundButton.setAttribute('aria-label', this.soundEnabled ? 'Sesi kapat' : 'Sesi aç');
    soundButton.innerHTML = `<i class="ph ph-speaker-${this.soundEnabled ? 'high' : 'slash'}"></i>`;
    if (this.soundEnabled) this.tone(620, .06);
  }

  private tone(frequency: number, duration: number): void {
    if (!this.soundEnabled) return;
    try {
      this.audio ||= new AudioContext();
      const oscillator = this.audio.createOscillator();
      const gain = this.audio.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(.035, this.audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(.0001, this.audio.currentTime + duration);
      oscillator.connect(gain).connect(this.audio.destination);
      oscillator.start();
      oscillator.stop(this.audio.currentTime + duration);
    } catch { /* sound is optional */ }
  }
}

new MasalIpleriGame();

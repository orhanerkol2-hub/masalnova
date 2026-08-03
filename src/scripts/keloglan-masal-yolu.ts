import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

type GamePhase = 'loading' | 'menu' | 'running' | 'paused' | 'result' | 'fallback';
type BiomeKey = 'village' | 'forest' | 'valley' | 'meadow';
type EntityKind = 'spark' | 'apple' | 'horseshoe' | 'hay' | 'cart' | 'log' | 'puddle' | 'rock' | 'goat' | 'crystal';

interface BiomeDefinition {
  key: BiomeKey;
  name: string;
  start: number;
  end: number;
  sky: number;
  fog: number;
  road: number;
  ground: number;
  accent: number;
  hemiSky: number;
  hemiGround: number;
  sun: number;
  fogNear: number;
  fogFar: number;
}

interface ActiveEntity {
  group: THREE.Group;
  kind: EntityKind;
  lane: number;
  worldDistance: number;
  baseY: number;
  clearHeight: number;
  phase: number;
  collected: boolean;
}

interface TrackSegment {
  group: THREE.Group;
  road: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>;
  ground: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>;
  decor: THREE.Group;
  grass: THREE.InstancedMesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  worldCenter: number;
}

type AmbientMotionKind = 'tree' | 'bush' | 'flower' | 'lantern';

interface AmbientMotion {
  kind: AmbientMotionKind;
  phase: number;
  strength: number;
  baseRotationX: number;
  baseRotationZ: number;
}

const FINISH_DISTANCE = 3000;
const PLAYER_Z = 6;
const LANE_WIDTH = 3.35;
const LANES = [-LANE_WIDTH, 0, LANE_WIDTH] as const;
const SEGMENT_LENGTH = 25;
const SEGMENT_COUNT = 16;
const TRANSITION_LENGTH = 135;
const STORAGE_KEY = 'masalnova.keloglan-masal-yolu.v1';

const BIOMES: readonly BiomeDefinition[] = [
  {
    key: 'village', name: 'Gündoğumu Köyü', start: 0, end: 650,
    sky: 0x78ccec, fog: 0xb8def0, road: 0xcaa878, ground: 0x79a957, accent: 0xf3b43e,
    hemiSky: 0xc9efff, hemiGround: 0x6d593c, sun: 0xfff0c0, fogNear: 42, fogFar: 150,
  },
  {
    key: 'forest', name: 'Fısıldayan Orman', start: 650, end: 1400,
    sky: 0x6fa9a7, fog: 0x8bbab0, road: 0x8e7558, ground: 0x356f4a, accent: 0x86d07a,
    hemiSky: 0xb9dcca, hemiGround: 0x263e2f, sun: 0xd7e8bb, fogNear: 32, fogFar: 125,
  },
  {
    key: 'valley', name: 'Altın Kaya Vadisi', start: 1400, end: 2200,
    sky: 0xe6956f, fog: 0xdca27e, road: 0xa86f4f, ground: 0xb86f45, accent: 0xffd064,
    hemiSky: 0xffd7a6, hemiGround: 0x6a3a35, sun: 0xffc270, fogNear: 38, fogFar: 142,
  },
  {
    key: 'meadow', name: 'Yıldız Çayırı', start: 2200, end: FINISH_DISTANCE,
    sky: 0x172968, fog: 0x273a72, road: 0x4e5a73, ground: 0x214c55, accent: 0x8ee8dc,
    hemiSky: 0x718dd1, hemiGround: 0x172e3c, sun: 0xb8d8ff, fogNear: 40, fogFar: 155,
  },
] as const;

const AMBIENCE_ROOT: Readonly<Record<BiomeKey, number>> = {
  village: 65.41,
  forest: 55,
  valley: 49,
  meadow: 73.42,
};

const AMBIENCE_FILTER: Readonly<Record<BiomeKey, number>> = {
  village: 720,
  forest: 430,
  valley: 590,
  meadow: 920,
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarsePointer = window.matchMedia('(any-pointer: coarse)').matches || navigator.maxTouchPoints > 0;

const root = required<HTMLElement>('[data-game-root]');
const canvas = required<HTMLCanvasElement>('[data-game-canvas]');
const loadingScreen = required<HTMLElement>('[data-loading-screen]');
const loadingProgress = required<HTMLElement>('[data-loading-progress]');
const menuScreen = required<HTMLElement>('[data-menu-screen]');
const pauseScreen = required<HTMLElement>('[data-pause-screen]');
const resultScreen = required<HTMLElement>('[data-result-screen]');
const fallbackScreen = required<HTMLElement>('[data-fallback-screen]');
const hud = required<HTMLElement>('[data-hud]');
const powerMeter = required<HTMLElement>('[data-power-meter]');
const powerRing = required<SVGCircleElement>('[data-power-ring]');
const powerTitle = required<HTMLElement>('[data-power-title]');
const powerCopy = required<HTMLElement>('[data-power-copy]');
const boostButton = required<HTMLButtonElement>('[data-control="boost"]');
const touchControls = required<HTMLElement>('[data-touch-controls]');
const tutorial = required<HTMLElement>('[data-tutorial]');
const tutorialIcon = required<HTMLElement>('[data-tutorial-icon]');
const tutorialCopy = required<HTMLElement>('[data-tutorial-copy]');
const toast = required<HTMLElement>('[data-toast]');
const liveRegion = required<HTMLElement>('[data-live-region]');
const rotateHint = required<HTMLElement>('[data-rotate-hint]');
const scoreLabel = required<HTMLElement>('[data-score]');
const comboLabel = required<HTMLElement>('[data-combo]');
const biomeLabel = required<HTMLElement>('[data-biome-name]');
const distanceLabel = required<HTMLElement>('[data-distance]');
const journeyProgress = required<HTMLElement>('[data-journey-progress]');
const heartsLabel = required<HTMLElement>('[data-hearts]');
const bestScoreLabel = required<HTMLElement>('[data-best-score]');
const soundButton = required<HTMLButtonElement>('[data-sound-button]');
const menuSoundButton = required<HTMLButtonElement>('[data-menu-sound]');
const menuSoundIcon = required<HTMLElement>('[data-menu-sound-icon]');
const menuSoundLabel = required<HTMLElement>('[data-menu-sound-label]');
const calmModeButton = required<HTMLButtonElement>('[data-calm-mode]');
const calmModeIcon = required<HTMLElement>('[data-calm-icon]');
const calmModeLabel = required<HTMLElement>('[data-calm-label]');

function required<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Masal Yolu arayüzü eksik: ${selector}`);
  return element;
}

function focusNextFrame(element: HTMLElement): void {
  requestAnimationFrame(() => element.focus({ preventScroll: true }));
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(value: number): number {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

function roadCenter(distance: number): number {
  const raw = Math.sin(distance * 0.0062) * 2.55 + Math.sin(distance * 0.00235 + 1.1) * 1.45;
  const origin = Math.sin(1.1) * 1.45;
  return raw - origin;
}

function roadHeading(distance: number): number {
  return (roadCenter(distance + 3) - roadCenter(distance - 3)) / 6;
}

function biomeIndexAt(distance: number): number {
  for (let index = BIOMES.length - 1; index >= 0; index -= 1) {
    if (distance >= BIOMES[index].start) return index;
  }
  return 0;
}

function biomeBlendAt(distance: number): { from: BiomeDefinition; to: BiomeDefinition; mix: number; index: number } {
  const index = biomeIndexAt(distance);
  const from = BIOMES[index];
  const to = BIOMES[Math.min(index + 1, BIOMES.length - 1)];
  if (from === to) return { from, to, mix: 0, index };
  const transitionStart = from.end - TRANSITION_LENGTH;
  return { from, to, mix: smoothstep((distance - transitionStart) / TRANSITION_LENGTH), index };
}

const blendColorScratch = new THREE.Color();

function setColorBetween(target: THREE.Color, a: number, b: number, t: number): THREE.Color {
  return target.setHex(a).lerp(blendColorScratch.setHex(b), t);
}

class SeededRandom {
  private state: number;

  constructor(seed: number) {
    this.state = seed || 0x6d2b79f5;
  }

  next(): number {
    let value = this.state += 0x6d2b79f5;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  }

  int(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  pick<T>(items: readonly T[]): T {
    return items[Math.floor(this.next() * items.length)];
  }
}

const materialCache = new Map<string, THREE.MeshStandardMaterial>();

function material(
  color: number,
  options: { emissive?: number; emissiveIntensity?: number; roughness?: number; metalness?: number; transparent?: boolean; opacity?: number; flatShading?: boolean } = {},
): THREE.MeshStandardMaterial {
  const key = `${color}-${options.emissive ?? 0}-${options.emissiveIntensity ?? 0}-${options.roughness ?? .74}-${options.metalness ?? .015}-${options.transparent ?? false}-${options.opacity ?? 1}-${options.flatShading ?? false}`;
  const cached = materialCache.get(key);
  if (cached) return cached;
  const created = new THREE.MeshStandardMaterial({
    color,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0,
    roughness: options.roughness ?? .74,
    metalness: options.metalness ?? .015,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    flatShading: options.flatShading ?? false,
  });
  materialCache.set(key, created);
  return created;
}

const GEO = {
  box: new THREE.BoxGeometry(1, 1, 1),
  roundedBox: new RoundedBoxGeometry(1, 1, 1, coarsePointer ? 2 : 4, .075),
  sphere: new THREE.SphereGeometry(1, coarsePointer ? 14 : 20, coarsePointer ? 10 : 14),
  smallSphere: new THREE.SphereGeometry(1, coarsePointer ? 10 : 14, coarsePointer ? 8 : 10),
  cylinder: new THREE.CylinderGeometry(1, 1, 1, coarsePointer ? 10 : 16),
  cone: new THREE.ConeGeometry(1, 1, coarsePointer ? 8 : 12),
  cone4: new THREE.ConeGeometry(1, 1, 4),
  dodeca: new THREE.DodecahedronGeometry(1, 0),
  octa: new THREE.OctahedronGeometry(1, 0),
  torus: new THREE.TorusGeometry(1, .18, coarsePointer ? 7 : 10, coarsePointer ? 16 : 24),
};

function addMesh<T extends THREE.BufferGeometry>(
  parent: THREE.Object3D,
  geometry: T,
  meshMaterial: THREE.Material,
  scale: readonly [number, number, number],
  position: readonly [number, number, number],
  options: { rotation?: readonly [number, number, number]; castShadow?: boolean; receiveShadow?: boolean } = {},
): THREE.Mesh<T, THREE.Material> {
  const result = new THREE.Mesh(geometry, meshMaterial);
  result.scale.set(...scale);
  result.position.set(...position);
  if (options.rotation) result.rotation.set(...options.rotation);
  result.castShadow = options.castShadow ?? false;
  result.receiveShadow = options.receiveShadow ?? false;
  parent.add(result);
  return result;
}

class AudioManager {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private ambienceGain: GainNode | null = null;
  private ambienceFilter: BiquadFilterNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private ambienceOscillators: OscillatorNode[] = [];
  private lastAmbienceUpdate = 0;
  enabled = true;
  private lastHoof = 0;

  ensure(): void {
    if (!this.enabled) return;
    if (!this.context) {
      const Context = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Context) return;
      this.context = new Context();
      this.master = this.context.createGain();
      this.master.gain.value = .22;
      this.master.connect(this.context.destination);
      this.buildAmbience();
    }
    if (this.context.state === 'suspended') void this.context.resume().catch(() => undefined);
  }

  toggle(force?: boolean): void {
    this.enabled = force ?? !this.enabled;
    if (this.enabled) this.ensure();
    if (this.master && this.context) {
      this.master.gain.setTargetAtTime(this.enabled ? .22 : 0, this.context.currentTime, .03);
    }
  }

  private buildAmbience(): void {
    if (!this.context || !this.master || this.ambienceGain) return;
    const context = this.context;
    this.ambienceGain = context.createGain();
    this.ambienceGain.gain.value = .0001;
    this.ambienceFilter = context.createBiquadFilter();
    this.ambienceFilter.type = 'lowpass';
    this.ambienceFilter.frequency.value = 620;
    this.ambienceFilter.Q.value = .55;
    this.ambienceFilter.connect(this.ambienceGain);
    this.ambienceGain.connect(this.master);

    ([55, 82.5] as const).forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = index === 0 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      gain.gain.value = index === 0 ? .72 : .16;
      oscillator.connect(gain);
      gain.connect(this.ambienceFilter!);
      oscillator.start();
      this.ambienceOscillators.push(oscillator);
    });

    const noiseBuffer = context.createBuffer(1, Math.max(1, Math.floor(context.sampleRate * 1.25)), context.sampleRate);
    const noise = noiseBuffer.getChannelData(0);
    let previous = 0;
    for (let index = 0; index < noise.length; index += 1) {
      const white = Math.random() * 2 - 1;
      previous = previous * .985 + white * .015;
      noise[index] = previous * .55;
    }
    const wind = context.createBufferSource();
    const windGain = context.createGain();
    this.windFilter = context.createBiquadFilter();
    this.windFilter.type = 'bandpass';
    this.windFilter.frequency.value = 850;
    this.windFilter.Q.value = .35;
    wind.buffer = noiseBuffer;
    wind.loop = true;
    windGain.gain.value = .18;
    wind.connect(this.windFilter);
    this.windFilter.connect(windGain);
    windGain.connect(this.ambienceFilter);
    wind.start();
  }

  updateAmbience(biome: BiomeKey, speed: number, boosting: boolean, active: boolean, calm: boolean): void {
    if (!this.enabled || !this.context || !this.ambienceGain || !this.ambienceFilter || !this.windFilter) return;
    const now = this.context.currentTime;
    if (now - this.lastAmbienceUpdate < .12) return;
    this.lastAmbienceUpdate = now;
    const rootFrequency = AMBIENCE_ROOT[biome];
    this.ambienceOscillators.forEach((oscillator, index) => {
      oscillator.frequency.setTargetAtTime(rootFrequency * (index === 0 ? 1 : 1.5), now, .8);
    });
    this.ambienceFilter.frequency.setTargetAtTime(AMBIENCE_FILTER[biome] + (boosting ? 330 : 0), now, .7);
    this.windFilter.frequency.setTargetAtTime(620 + speed * 27 + (biome === 'meadow' ? 260 : 0), now, .8);
    const motionGain = clamp((speed - 6) / 18, 0, 1) * .011;
    const target = active ? (calm ? .022 : .029) + motionGain + (boosting ? .012 : 0) : .0001;
    this.ambienceGain.gain.setTargetAtTime(target, now, active ? .9 : .14);
  }

  silenceAmbience(): void {
    if (this.context && this.ambienceGain) {
      this.ambienceGain.gain.setTargetAtTime(.0001, this.context.currentTime, .12);
    }
  }

  tone(frequency: number, duration: number, type: OscillatorType = 'sine', volume = .24, delay = 0): void {
    if (!this.enabled) return;
    this.ensure();
    if (!this.context || !this.master) return;
    const now = this.context.currentTime + delay;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(.001, volume), now + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start(now);
    oscillator.stop(now + duration + .03);
  }

  pickup(combo: number): void {
    const base = 560 + Math.min(combo, 5) * 38;
    this.tone(base, .12, 'sine', .18);
    this.tone(base * 1.5, .17, 'triangle', .11, .055);
  }

  jump(): void {
    this.tone(230, .16, 'triangle', .16);
    this.tone(340, .12, 'sine', .1, .05);
  }

  hit(): void {
    this.tone(120, .25, 'sawtooth', .16);
    this.tone(78, .3, 'square', .07, .03);
  }

  boost(): void {
    [330, 440, 660, 880].forEach((frequency, index) => this.tone(frequency, .28, 'triangle', .12, index * .06));
  }

  relic(): void {
    [440, 554, 659, 880].forEach((frequency, index) => this.tone(frequency, .38, 'sine', .13, index * .08));
  }

  updateHooves(elapsed: number, speed: number, jumping: boolean): void {
    if (!this.enabled || jumping || elapsed - this.lastHoof < clamp(.34 - speed * .008, .18, .29)) return;
    this.lastHoof = elapsed;
    this.tone(90 + Math.random() * 12, .055, 'triangle', .042);
  }
}

class Rider {
  readonly root = new THREE.Group();
  private donkeyBody!: THREE.Mesh;
  private keloglanBody!: THREE.Group;
  private ears: THREE.Object3D[] = [];
  private legs: THREE.Group[] = [];
  private arms: THREE.Group[] = [];
  private tail!: THREE.Group;
  private glow!: THREE.Group;
  private shadow!: THREE.Mesh;
  private blinkMeshes: THREE.Mesh[] = [];

  constructor(scene: THREE.Scene) {
    this.build();
    this.root.position.set(roadCenter(0), 0, PLAYER_Z);
    scene.add(this.root);
  }

  private build(): void {
    const gray = material(0x827a70);
    const darkGray = material(0x393b3a);
    const muzzle = material(0xd8c6aa);
    const cream = material(0xfff0cb);
    const skin = material(0xe9a06d);
    const skinLight = material(0xf1b27c);
    const red = material(0xb93d32);
    const redDark = material(0x7e2725);
    const blue = material(0x2e75a6);
    const turquoise = material(0x1c9e9b);
    const gold = material(0xf3c249);
    const brown = material(0x624233);
    const black = material(0x151b20, { roughness: .5 });
    const white = material(0xffffff);

    const donkey = new THREE.Group();
    donkey.name = 'Karakaçan';
    this.root.add(donkey);

    this.donkeyBody = addMesh(donkey, GEO.sphere, gray, [1.04, .72, 1.55], [0, 2.05, 0], { castShadow: true }) as THREE.Mesh;
    for (const side of [-1, 1]) {
      addMesh(donkey, GEO.sphere, gray, [.55, .57, .62], [side * .48, 2.08, .84], { castShadow: true });
    }
    addMesh(donkey, GEO.sphere, gray, [.58, .66, .72], [0, 2.54, -1.55], { rotation: [-.08, 0, 0], castShadow: true });
    addMesh(donkey, GEO.sphere, muzzle, [.47, .36, .5], [0, 2.37, -2.05], { castShadow: true });
    addMesh(donkey, GEO.sphere, darkGray, [.55, .3, .24], [0, 2.86, -1.22], { rotation: [.15, 0, 0] });

    for (const side of [-1, 1]) {
      const ear = new THREE.Group();
      ear.position.set(side * .28, 3.09, -1.53);
      ear.rotation.z = side * -.12;
      addMesh(ear, GEO.sphere, gray, [.16, .54, .16], [0, .27, 0], { rotation: [0, 0, side * .06], castShadow: true });
      addMesh(ear, GEO.sphere, material(0xc98f86), [.07, .37, .075], [0, .28, -.09]);
      donkey.add(ear);
      this.ears.push(ear);

      addMesh(donkey, GEO.sphere, white, [.13, .15, .08], [side * .26, 2.69, -2.06]);
      addMesh(donkey, GEO.sphere, black, [.065, .08, .045], [side * .26, 2.68, -2.13]);
    }

    addMesh(donkey, GEO.roundedBox, turquoise, [1.58, .14, 1.4], [0, 2.62, .12], { castShadow: true });
    addMesh(donkey, GEO.box, red, [1.7, .08, .22], [0, 2.68, -.25]);
    addMesh(donkey, GEO.box, gold, [1.7, .08, .16], [0, 2.69, .28]);
    addMesh(donkey, GEO.box, brown, [1.18, .18, .82], [0, 2.77, .04], { castShadow: true });

    const legPositions: readonly [number, number][] = [[-.62, -.92], [.62, -.92], [-.62, .91], [.62, .91]];
    legPositions.forEach(([x, z], index) => {
      const leg = new THREE.Group();
      leg.position.set(x, 1.5, z);
      addMesh(leg, GEO.cylinder, gray, [.16, .62, .16], [0, -.47, 0], { rotation: [0, 0, index % 2 ? -.05 : .05], castShadow: true });
      addMesh(leg, GEO.cylinder, darkGray, [.14, .32, .14], [0, -1.08, index < 2 ? -.09 : .08], { rotation: [.12, 0, 0], castShadow: true });
      addMesh(leg, GEO.roundedBox, black, [.28, .13, .38], [0, -1.39, -.08], { castShadow: true });
      donkey.add(leg);
      this.legs.push(leg);
    });

    this.tail = new THREE.Group();
    this.tail.position.set(0, 2.34, 1.45);
    addMesh(this.tail, GEO.cylinder, darkGray, [.07, .65, .07], [0, -.52, .06], { rotation: [.35, 0, 0] });
    addMesh(this.tail, GEO.sphere, darkGray, [.16, .28, .16], [0, -1.12, .26]);
    donkey.add(this.tail);

    const hero = new THREE.Group();
    hero.name = 'Keloğlan';
    hero.position.set(0, 2.8, -.05);
    donkey.add(hero);
    this.keloglanBody = hero;

    addMesh(hero, GEO.sphere, blue, [.53, .55, .62], [0, .34, .12], { castShadow: true });
    addMesh(hero, GEO.roundedBox, cream, [.82, 1.05, .42], [0, 1.15, -.02], { castShadow: true });
    addMesh(hero, GEO.roundedBox, red, [.36, 1.08, .16], [-.27, 1.17, -.32], { rotation: [0, .04, -.04], castShadow: true });
    addMesh(hero, GEO.roundedBox, red, [.36, 1.08, .16], [.27, 1.17, -.32], { rotation: [0, -.04, .04], castShadow: true });
    addMesh(hero, GEO.box, redDark, [.68, .1, .16], [0, .74, -.34]);
    addMesh(hero, GEO.roundedBox, red, [.78, .96, .16], [0, 1.22, .31], { castShadow: true });
    addMesh(hero, GEO.roundedBox, gold, [.82, .1, .18], [0, .76, .32], { castShadow: true });
    addMesh(hero, GEO.cylinder, blue, [.47, .18, .47], [0, .64, -.01]);

    for (const side of [-1, 1]) {
      const arm = new THREE.Group();
      arm.position.set(side * .5, 1.55, -.04);
      arm.rotation.z = side * -.35;
      arm.rotation.x = -.6;
      addMesh(arm, GEO.cylinder, cream, [.14, .5, .14], [0, -.38, 0], { castShadow: true });
      addMesh(arm, GEO.sphere, skin, [.17, .17, .17], [0, -.83, 0], { castShadow: true });
      hero.add(arm);
      this.arms.push(arm);

      const leg = new THREE.Group();
      leg.position.set(side * .36, .62, .12);
      leg.rotation.z = side * -.34;
      addMesh(leg, GEO.sphere, blue, [.31, .68, .32], [side * .12, -.46, 0], { castShadow: true });
      addMesh(leg, GEO.cylinder, skin, [.14, .3, .14], [side * .2, -1.01, -.07], { rotation: [.2, 0, 0], castShadow: true });
      addMesh(leg, GEO.roundedBox, brown, [.3, .1, .42], [side * .2, -1.29, -.18], { castShadow: true });
      hero.add(leg);
    }

    addMesh(hero, GEO.cylinder, skin, [.22, .2, .22], [0, 1.83, 0]);
    addMesh(hero, GEO.sphere, skinLight, [.61, .64, .57], [0, 2.35, -.02], { castShadow: true });
    addMesh(hero, GEO.sphere, skin, [.13, .17, .1], [-.61, 2.35, -.01]);
    addMesh(hero, GEO.sphere, skin, [.13, .17, .1], [.61, 2.35, -.01]);

    for (const side of [-1, 1]) {
      addMesh(hero, GEO.sphere, white, [.12, .14, .07], [side * .23, 2.43, -.53]);
      const pupil = addMesh(hero, GEO.sphere, black, [.058, .072, .045], [side * .23, 2.42, -.59]);
      this.blinkMeshes.push(pupil as THREE.Mesh);
      addMesh(hero, GEO.box, darkGray, [.19, .035, .045], [side * .23, 2.63, -.52], { rotation: [0, 0, side * -.08] });
    }
    addMesh(hero, GEO.sphere, skin, [.09, .1, .1], [0, 2.31, -.59]);
    addMesh(hero, GEO.box, material(0x8e3e2f), [.22, .045, .04], [0, 2.13, -.56], { rotation: [0, 0, 0] });

    const reinMaterial = new THREE.LineBasicMaterial({ color: 0x5c3a27, transparent: true, opacity: .9 });
    for (const side of [-1, 1]) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * .45, 3.64, -.58),
        new THREE.Vector3(side * .58, 3.18, -1.1),
        new THREE.Vector3(side * .42, 2.56, -1.92),
      ]);
      donkey.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(14)), reinMaterial));
    }

    const shadowMaterial = new THREE.MeshBasicMaterial({ color: 0x10202b, transparent: true, opacity: .22, depthWrite: false });
    this.shadow = addMesh(this.root, new THREE.CircleGeometry(1, 20), shadowMaterial, [1.35, 1.35, 1], [0, .025, .1], { rotation: [-Math.PI / 2, 0, 0] });

    this.glow = new THREE.Group();
    const glowMaterial = new THREE.MeshBasicMaterial({ color: 0xffdf54, transparent: true, opacity: .62, blending: THREE.AdditiveBlending, depthWrite: false });
    for (let index = 0; index < 3; index += 1) {
      const ring = addMesh(this.glow, GEO.torus, glowMaterial, [1.2 + index * .34, 1.2 + index * .34, 1], [0, 1.5, 1.7 + index * .6], { rotation: [0, 0, 0] });
      ring.rotation.x = Math.PI / 2;
    }
    this.glow.visible = false;
    this.root.add(this.glow);
  }

  update(elapsed: number, speed: number, jumpY: number, lateralVelocity: number, boosting: boolean, invulnerable: number, calm: boolean): void {
    const gait = elapsed * (4.8 + speed * .34);
    const bobAmount = calm ? .025 : .055;
    this.donkeyBody.position.y = 2.05 + Math.sin(gait * 2) * bobAmount;
    this.donkeyBody.rotation.z = Math.sin(gait) * .018;
    this.keloglanBody.position.y = 2.8 + Math.sin(gait * 2 + .4) * (calm ? .018 : .045);
    this.keloglanBody.rotation.x = -.02 + Math.sin(gait * 2) * .018;
    this.legs.forEach((leg, index) => {
      leg.rotation.x = Math.sin(gait + (index % 2 ? Math.PI : 0)) * .52;
    });
    this.arms.forEach((arm, index) => {
      arm.rotation.x = -.6 + Math.sin(gait * 2 + index * .4) * .035;
    });
    this.ears.forEach((ear, index) => {
      ear.rotation.x = -.08 + Math.sin(elapsed * 3.2 + index) * .08;
    });
    this.tail.rotation.z = Math.sin(elapsed * 5.5) * .32;
    this.root.position.y = jumpY;
    this.root.rotation.z = THREE.MathUtils.lerp(this.root.rotation.z, clamp(-lateralVelocity * .025, -.17, .17), .12);
    this.root.rotation.x = THREE.MathUtils.lerp(this.root.rotation.x, jumpY > .1 ? -.04 : 0, .12);
    this.shadow.position.y = .025 - jumpY;
    this.shadow.scale.setScalar(clamp(1.35 - jumpY * .09, .78, 1.35));
    (this.shadow.material as THREE.MeshBasicMaterial).opacity = clamp(.23 - jumpY * .035, .07, .23);
    this.glow.visible = boosting;
    if (boosting) {
      this.glow.rotation.z = elapsed * 1.8;
      this.glow.children.forEach((ring, index) => {
        ring.scale.setScalar(1 + Math.sin(elapsed * 5 + index) * .08);
      });
    }
    const visible = invulnerable <= 0 || Math.floor(invulnerable * 12) % 2 === 0;
    this.donkeyBody.parent!.visible = visible;
  }
}

function clearGroup(group: THREE.Group): void {
  while (group.children.length > 0) group.remove(group.children[group.children.length - 1]);
}

function addAmbientMotion(group: THREE.Group, kind: AmbientMotionKind, x: number, z: number, strength: number): void {
  const phase = Math.abs(x * .73 + z * .41) % (Math.PI * 2);
  group.userData.ambientMotion = {
    kind,
    phase,
    strength,
    baseRotationX: group.rotation.x,
    baseRotationZ: group.rotation.z,
  } satisfies AmbientMotion;
}

function createGrassBladeGeometry(): THREE.PlaneGeometry {
  const geometry = new THREE.PlaneGeometry(.3, .84, 1, 4);
  geometry.translate(0, .42, 0);
  const positions = geometry.attributes.position as THREE.BufferAttribute;
  const uvs = geometry.attributes.uv as THREE.BufferAttribute;
  for (let index = 0; index < positions.count; index += 1) {
    const taper = 1 - uvs.getY(index) * .82;
    positions.setX(index, positions.getX(index) * taper);
  }
  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

function makeHouse(parent: THREE.Object3D, x: number, z: number, variant: number): void {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  group.rotation.y = x < 0 ? .16 : -.16;
  const wallColors = [0xf1dfbb, 0xe8cda9, 0xf8e8cc];
  const roofColors = [0xa84431, 0xbd5637, 0x8d3d32];
  const height = 2.2 + (variant % 3) * .3;
  addMesh(group, GEO.roundedBox, material(wallColors[variant % wallColors.length]), [3.2, height, 2.8], [0, height / 2, 0], { castShadow: true });
  addMesh(group, GEO.cone4, material(roofColors[variant % roofColors.length]), [2.65, 1.25, 2.35], [0, height + .58, 0], { rotation: [0, Math.PI / 4, 0], castShadow: true });
  addMesh(group, GEO.roundedBox, material(0x3b7f8c), [.55, 1.05, .13], [0, .54, x < 0 ? 1.47 : -1.47]);
  for (const side of [-1, 1]) {
    addMesh(group, GEO.box, material(0x86c9d7), [.48, .48, .12], [side * .85, 1.35, x < 0 ? 1.48 : -1.48]);
    addMesh(group, GEO.box, material(0xf3c449), [.08, .48, .14], [side * .85, 1.35, x < 0 ? 1.55 : -1.55]);
  }
  parent.add(group);
}

function makeCypress(parent: THREE.Object3D, x: number, z: number, scale = 1): void {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  addMesh(group, GEO.cylinder, material(0x75513d), [.17 * scale, 2 * scale, .17 * scale], [0, 1.7 * scale, 0], { castShadow: true });
  addMesh(group, GEO.sphere, material(0x2b714d), [.74 * scale, 2.05 * scale, .72 * scale], [0, 3.08 * scale, 0], { castShadow: true });
  addMesh(group, GEO.sphere, material(0x3a875a), [.54 * scale, 1.48 * scale, .52 * scale], [0, 4.45 * scale, 0], { castShadow: true });
  addAmbientMotion(group, 'tree', x, z, .038);
  parent.add(group);
}

function makeCanopyTree(parent: THREE.Object3D, x: number, z: number, scale = 1): void {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  addMesh(group, GEO.cylinder, material(0x79533a), [.22 * scale, 2.55 * scale, .22 * scale], [0, 1.45 * scale, 0], { castShadow: true });
  const crown = [
    { x: 0, y: 3.2, z: 0, scale: [1.35, 1.08, 1.22] as const, color: 0x4f9658 },
    { x: -.82, y: 3.05, z: .08, scale: [.9, .82, .86] as const, color: 0x5ba864 },
    { x: .82, y: 3.08, z: .02, scale: [.88, .78, .84] as const, color: 0x438950 },
    { x: -.28, y: 3.88, z: -.05, scale: [.86, .78, .82] as const, color: 0x67b46d },
    { x: .48, y: 3.7, z: .12, scale: [.76, .7, .72] as const, color: 0x54a05d },
  ];
  crown.forEach((leaf) => {
    addMesh(
      group,
      GEO.smallSphere,
      material(leaf.color),
      [leaf.scale[0] * scale, leaf.scale[1] * scale, leaf.scale[2] * scale],
      [leaf.x * scale, leaf.y * scale, leaf.z * scale],
      { castShadow: true },
    );
  });
  addAmbientMotion(group, 'tree', x, z, .045);
  parent.add(group);
}

function makePine(parent: THREE.Object3D, x: number, z: number, scale = 1, tint = 0x2d6d4a): void {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  addMesh(group, GEO.cylinder, material(0x6c4b37), [.18 * scale, 2.6 * scale, .18 * scale], [0, 1.5 * scale, 0], { castShadow: true });
  addMesh(group, GEO.sphere, material(tint), [1.34 * scale, 1.08 * scale, 1.28 * scale], [0, 2.3 * scale, 0], { castShadow: true });
  addMesh(group, GEO.sphere, material(tint), [1.04 * scale, 1.2 * scale, .98 * scale], [0, 3.42 * scale, 0], { castShadow: true });
  addMesh(group, GEO.sphere, material(0x3b8154), [.72 * scale, 1.08 * scale, .68 * scale], [0, 4.5 * scale, 0], { castShadow: true });
  addAmbientMotion(group, 'tree', x, z, .052);
  parent.add(group);
}

function makeRockSpire(parent: THREE.Object3D, x: number, z: number, scale = 1): void {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  group.rotation.z = (x < 0 ? 1 : -1) * .05;
  addMesh(group, GEO.cone, material(0xc87851), [1.45 * scale, 5.8 * scale, 1.45 * scale], [0, 2.8 * scale, 0]);
  addMesh(group, GEO.cone, material(0xe1a06c), [.55 * scale, 1.55 * scale, .55 * scale], [0, 5.85 * scale, 0]);
  parent.add(group);
}

function makeBush(parent: THREE.Object3D, x: number, z: number, color = 0x58884a, scale = 1): void {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  addMesh(group, GEO.smallSphere, material(color), [.74 * scale, .58 * scale, .7 * scale], [0, .48 * scale, 0], { castShadow: true });
  addMesh(group, GEO.smallSphere, material(color), [.52 * scale, .46 * scale, .5 * scale], [.5 * scale, .42 * scale, .05], { rotation: [.2, 0, .1], castShadow: true });
  addAmbientMotion(group, 'bush', x, z, .044);
  parent.add(group);
}

function makeFlowerCluster(parent: THREE.Object3D, x: number, z: number, variant: number): void {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  const colors = [0x7be1d2, 0xf9d95f, 0xd78cf0];
  for (let index = 0; index < 4; index += 1) {
    const offsetX = (index % 2) * .42 - .2;
    const offsetZ = Math.floor(index / 2) * .4 - .2;
    addMesh(group, GEO.cylinder, material(0x4a8d65), [.025, .35 + index * .025, .025], [offsetX, .2, offsetZ]);
    addMesh(group, GEO.octa, material(colors[(variant + index) % colors.length], { emissive: colors[(variant + index) % colors.length], emissiveIntensity: .45 }), [.13, .13, .13], [offsetX, .46 + index * .03, offsetZ]);
  }
  addAmbientMotion(group, 'flower', x, z, .095);
  parent.add(group);
}

function makeFence(parent: THREE.Object3D, x: number, z: number): void {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  addMesh(group, GEO.box, material(0x8a6848), [.16, 1.2, .16], [-1, .55, 0]);
  addMesh(group, GEO.box, material(0x8a6848), [.16, 1.2, .16], [1, .55, 0]);
  addMesh(group, GEO.box, material(0xa98258), [2.25, .13, .13], [0, .78, 0]);
  addMesh(group, GEO.box, material(0xa98258), [2.25, .13, .13], [0, .32, 0]);
  parent.add(group);
}

function makeLantern(parent: THREE.Object3D, x: number, z: number): void {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  addMesh(group, GEO.cylinder, material(0x26314a, { metalness: .45 }), [.07, 1.9, .07], [0, .92, 0]);
  addMesh(group, GEO.box, material(0xffd864, { emissive: 0xffbd33, emissiveIntensity: 1.6 }), [.32, .44, .32], [0, 1.82, 0]);
  addMesh(group, GEO.cone4, material(0x26314a, { metalness: .45 }), [.38, .25, .38], [0, 2.16, 0], { rotation: [0, Math.PI / 4, 0] });
  addAmbientMotion(group, 'lantern', x, z, .035);
  parent.add(group);
}

class WorldStream {
  readonly root = new THREE.Group();
  private segments: TrackSegment[] = [];
  private shadows: boolean;
  private readonly grassGeometry = createGrassBladeGeometry();
  private readonly grassMaterial = new THREE.MeshBasicMaterial({
    color: 0x78ae58,
    side: THREE.DoubleSide,
    fog: true,
    toneMapped: true,
  });
  private readonly grassTime = { value: 0 };
  private readonly grassWind = { value: .7 };
  private readonly grassTransform = new THREE.Object3D();

  constructor(scene: THREE.Scene, shadows: boolean) {
    this.shadows = shadows;
    this.grassMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uGrassTime = this.grassTime;
      shader.uniforms.uGrassWind = this.grassWind;
      shader.vertexShader = `
        uniform float uGrassTime;
        uniform float uGrassWind;
      ${shader.vertexShader}`.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        #ifdef USE_INSTANCING
          float grassPhase = instanceMatrix[3].x * .43 + instanceMatrix[3].z * .29;
          float grassTip = uv.y * uv.y;
          float grassSway = sin(uGrassTime * 1.65 + grassPhase) * uGrassWind;
          transformed.x += grassSway * grassTip * .28;
          transformed.z += cos(uGrassTime * 1.13 + grassPhase * 1.7) * uGrassWind * grassTip * .1;
        #endif`,
      );
    };
    this.grassMaterial.customProgramCacheKey = () => 'masalnova-animated-grass-v1';
    scene.add(this.root);
    for (let index = 0; index < SEGMENT_COUNT; index += 1) {
      const group = new THREE.Group();
      const groundMaterial = new THREE.MeshStandardMaterial({
        color: BIOMES[0].ground,
        roughness: .94,
        flatShading: true,
        transparent: true,
      });
      const roadMaterial = new THREE.MeshStandardMaterial({
        color: BIOMES[0].road,
        roughness: .98,
        flatShading: true,
        transparent: true,
      });
      const ground = new THREE.Mesh(new THREE.BoxGeometry(34, .28, SEGMENT_LENGTH + 1.2), groundMaterial);
      ground.position.y = -.27;
      ground.receiveShadow = shadows;
      const road = new THREE.Mesh(new THREE.BoxGeometry(10.2, .18, SEGMENT_LENGTH + 1.35), roadMaterial);
      road.position.y = -.08;
      road.receiveShadow = shadows;
      const decor = new THREE.Group();
      const grass = new THREE.InstancedMesh(
        this.grassGeometry,
        this.grassMaterial,
        coarsePointer ? 34 : 58,
      );
      grass.frustumCulled = false;
      group.add(ground, road, grass, decor);
      this.root.add(group);
      this.segments.push({ group, road, ground, decor, grass, worldCenter: (index - 1) * SEGMENT_LENGTH });
    }
    this.reset(0);
  }

  reset(distance: number): void {
    this.segments.forEach((segment, index) => {
      segment.worldCenter = distance + (index - 1) * SEGMENT_LENGTH;
      this.configure(segment);
    });
    this.update(distance);
  }

  update(distance: number, elapsed = 0, speed = 0, calm = true): void {
    this.grassTime.value = elapsed;
    this.grassWind.value = calm ? .25 : clamp(.62 + speed * .035, .62, 1.28);
    const grassBlend = biomeBlendAt(distance);
    const cinematicAmount = 1 - smoothstep((distance - 455) / 185);
    const worldOpacity = 1 - cinematicAmount;
    setColorBetween(this.grassMaterial.color, grassBlend.from.ground, grassBlend.to.ground, grassBlend.mix);
    this.grassMaterial.color.offsetHSL(0, .08, -.025);
    for (const segment of this.segments) {
      if (segment.worldCenter < distance - SEGMENT_LENGTH * 1.6) {
        segment.worldCenter += SEGMENT_COUNT * SEGMENT_LENGTH;
        this.configure(segment);
      }
      segment.group.position.x = roadCenter(segment.worldCenter);
      segment.group.position.z = PLAYER_Z - (segment.worldCenter - distance);
      segment.group.rotation.y = -Math.atan(roadHeading(segment.worldCenter));
      segment.road.material.opacity = worldOpacity;
      segment.ground.material.opacity = worldOpacity;
      segment.road.material.depthWrite = worldOpacity > .96;
      segment.ground.material.depthWrite = worldOpacity > .96;
      segment.road.visible = worldOpacity > .01;
      segment.ground.visible = worldOpacity > .01;
      segment.decor.visible = cinematicAmount < .58;
      segment.grass.visible = cinematicAmount < .58;
      this.animateDecor(segment, elapsed, speed, calm);
    }
  }

  private animateDecor(segment: TrackSegment, elapsed: number, speed: number, calm: boolean): void {
    const wind = calm ? .28 : clamp(.7 + speed * .025, .7, 1.15);
    segment.decor.children.forEach((object) => {
      const motion = object.userData.ambientMotion as AmbientMotion | undefined;
      if (!motion) return;
      const gust = .72 + Math.sin(elapsed * .37 + motion.phase * .7) * .28;
      const sway = Math.sin(elapsed * 1.28 + motion.phase) * motion.strength * wind * gust;
      if (motion.kind === 'tree') {
        object.rotation.z = motion.baseRotationZ + sway;
        object.rotation.x = motion.baseRotationX + Math.cos(elapsed * .91 + motion.phase) * motion.strength * .42 * wind;
      } else if (motion.kind === 'bush') {
        const pulse = Math.sin(elapsed * 1.7 + motion.phase) * .018 * wind;
        object.rotation.z = motion.baseRotationZ + sway * .55;
        object.scale.set(1 - pulse * .22, 1 + pulse, 1 - pulse * .12);
      } else if (motion.kind === 'flower') {
        object.rotation.z = motion.baseRotationZ + sway;
        object.rotation.x = motion.baseRotationX + Math.cos(elapsed * 1.45 + motion.phase) * motion.strength * .35 * wind;
      } else {
        object.rotation.z = motion.baseRotationZ + sway * .42;
      }
    });
  }

  private configure(segment: TrackSegment): void {
    const blend = biomeBlendAt(segment.worldCenter);
    setColorBetween(segment.road.material.color, blend.from.road, blend.to.road, blend.mix);
    setColorBetween(segment.ground.material.color, blend.from.ground, blend.to.ground, blend.mix);
    clearGroup(segment.decor);

    const random = new SeededRandom(Math.floor(segment.worldCenter * 131 + 9949));
    const biome = BIOMES[biomeIndexAt(segment.worldCenter)];
    const count = coarsePointer ? 6 : 9;

    const grassRandom = new SeededRandom((Math.floor(segment.worldCenter * 197 + 48731) ^ 0x9e3779b9) >>> 0);
    for (let index = 0; index < segment.grass.count; index += 1) {
      const side = index % 2 === 0 ? -1 : 1;
      const x = side * (5.65 + grassRandom.next() * 10.2);
      const z = -SEGMENT_LENGTH / 2 + grassRandom.next() * SEGMENT_LENGTH;
      const height = .45 + grassRandom.next() * .85;
      this.grassTransform.position.set(x, -.01, z);
      this.grassTransform.rotation.set(0, (grassRandom.next() - .5) * .9, (grassRandom.next() - .5) * .12);
      this.grassTransform.scale.set(.7 + grassRandom.next() * .75, height, .7 + grassRandom.next() * .55);
      this.grassTransform.updateMatrix();
      segment.grass.setMatrixAt(index, this.grassTransform.matrix);
    }
    segment.grass.instanceMatrix.needsUpdate = true;

    for (let index = 0; index < count; index += 1) {
      const side = index % 2 === 0 ? -1 : 1;
      const x = side * (7.5 + random.next() * 7.2);
      const z = -SEGMENT_LENGTH / 2 + random.next() * SEGMENT_LENGTH;
      const scale = .72 + random.next() * .52;
      if (biome.key === 'village') {
        if (index < 2 && random.next() > .32) makeHouse(segment.decor, x, z, random.int(0, 5));
        else if (random.next() > .64) makeCypress(segment.decor, x, z, scale);
        else if (random.next() > .42) makeCanopyTree(segment.decor, x, z, scale * .82);
        else makeFence(segment.decor, x, z);
      } else if (biome.key === 'forest') {
        if (random.next() > .22) makePine(segment.decor, x, z, scale, random.next() > .5 ? 0x2d6d4a : 0x387653);
        else makeBush(segment.decor, x, z, 0x416f43, scale);
      } else if (biome.key === 'valley') {
        if (random.next() > .38) makeRockSpire(segment.decor, x, z, scale);
        else makeBush(segment.decor, x, z, 0x728044, scale * .7);
      } else {
        if (random.next() > .45) makeFlowerCluster(segment.decor, x, z, random.int(0, 5));
        else makeLantern(segment.decor, x, z);
      }
    }

    if (biome.key === 'village' || biome.key === 'meadow') {
      const flowerCount = coarsePointer ? 2 : 4;
      for (let index = 0; index < flowerCount; index += 1) {
        const side = index % 2 === 0 ? -1 : 1;
        makeFlowerCluster(
          segment.decor,
          side * (6.1 + random.next() * 5.4),
          -SEGMENT_LENGTH / 2 + random.next() * SEGMENT_LENGTH,
          random.int(0, 5),
        );
      }
    }

    const markerMaterial = material(biome.key === 'meadow' ? 0x9adfd5 : 0xe7d3a5);
    for (let index = 0; index < 5; index += 1) {
      addMesh(segment.decor, GEO.box, markerMaterial, [.12, .025, 1.1], [-LANE_WIDTH / 2, .035, -9.5 + index * 4.8]);
      addMesh(segment.decor, GEO.box, markerMaterial, [.12, .025, 1.1], [LANE_WIDTH / 2, .035, -9.5 + index * 4.8]);
    }
  }
}

function createGlowTexture(): THREE.CanvasTexture {
  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = 64;
  glowCanvas.height = 64;
  const context = glowCanvas.getContext('2d');
  if (context) {
    const gradient = context.createRadialGradient(32, 32, 1, 32, 32, 31);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(.22, 'rgba(255,255,255,.72)');
    gradient.addColorStop(.58, 'rgba(255,255,255,.18)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(glowCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function weatherColorFor(biome: BiomeKey): number {
  if (biome === 'forest') return 0xb9e1dd;
  if (biome === 'valley') return 0xffd19b;
  if (biome === 'meadow') return 0x8cf4d7;
  return 0xffdc86;
}

function cloudOpacityFor(biome: BiomeKey): number {
  if (biome === 'forest') return .72;
  if (biome === 'meadow') return .14;
  if (biome === 'valley') return .42;
  return .56;
}

class Atmosphere {
  private scene: THREE.Scene;
  private hemisphere: THREE.HemisphereLight;
  private sunLight: THREE.DirectionalLight;
  private fillLight: THREE.DirectionalLight;
  private sun: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  private moon: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  private sunHalo: THREE.Sprite;
  private moonHalo: THREE.Sprite;
  private skyDome: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>;
  private skyMaterial: THREE.ShaderMaterial;
  private cinematicBackdrop: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private cinematicTexture: THREE.Texture | null = null;
  private backdropAspect = window.innerWidth / Math.max(1, window.innerHeight);
  private stars: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
  private weather: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
  private weatherPositions: Float32Array;
  private motes: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
  private motePositions: Float32Array;
  private cloudRoot = new THREE.Group();
  private horizonRoot = new THREE.Group();
  private horizonFrontMaterial = new THREE.MeshStandardMaterial({
    color: BIOMES[0].ground,
    roughness: 1,
    flatShading: true,
    transparent: true,
    opacity: .68,
    depthWrite: false,
  });
  private horizonBackMaterial = new THREE.MeshStandardMaterial({
    color: BIOMES[0].fog,
    roughness: 1,
    flatShading: true,
    transparent: true,
    opacity: .42,
    depthWrite: false,
  });
  exposureTarget = 1.05;

  constructor(scene: THREE.Scene, shadows: boolean) {
    this.scene = scene;
    scene.background = new THREE.Color(BIOMES[0].sky);
    scene.fog = new THREE.Fog(BIOMES[0].fog, BIOMES[0].fogNear, BIOMES[0].fogFar);

    this.skyMaterial = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(BIOMES[0].sky) },
        horizonColor: { value: new THREE.Color(BIOMES[0].fog) },
        lowerColor: { value: new THREE.Color(BIOMES[0].ground) },
        nightAmount: { value: 0 },
        transitionGlow: { value: 0 },
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vDirection;
        void main() {
          vDirection = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 lowerColor;
        uniform float nightAmount;
        uniform float transitionGlow;
        uniform float time;
        varying vec3 vDirection;
        void main() {
          float altitude = clamp(vDirection.y * .5 + .5, 0.0, 1.0);
          float horizon = pow(1.0 - abs(vDirection.y), 3.0);
          vec3 color = mix(lowerColor, horizonColor, smoothstep(.04, .48, altitude));
          color = mix(color, topColor, smoothstep(.36, .94, altitude));
          vec3 warmBand = mix(vec3(1.0, .48, .16), vec3(.20, .54, 1.0), nightAmount);
          float breathing = .92 + sin(time * .10) * .08;
          color += warmBand * horizon * (.028 + transitionGlow * .085) * breathing;
          gl_FragColor = vec4(color, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
      depthTest: false,
      fog: false,
    });
    this.skyDome = new THREE.Mesh(
      new THREE.SphereGeometry(1, coarsePointer ? 20 : 28, coarsePointer ? 12 : 16),
      this.skyMaterial,
    );
    this.skyDome.scale.setScalar(185);
    this.skyDome.position.set(0, 0, -35);
    this.skyDome.frustumCulled = false;
    this.skyDome.renderOrder = -1000;
    scene.add(this.skyDome);

    const cinematicMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: true,
      fog: false,
      toneMapped: false,
    });
    this.cinematicBackdrop = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), cinematicMaterial);
    this.cinematicBackdrop.position.set(0, -6, -112);
    this.cinematicBackdrop.renderOrder = -900;
    this.cinematicBackdrop.frustumCulled = false;
    scene.add(this.cinematicBackdrop);
    new THREE.TextureLoader().load(
      '/games/keloglan-masal-yolu/cinematic-village-v2.webp',
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = coarsePointer ? 2 : 4;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        cinematicMaterial.map = texture;
        cinematicMaterial.needsUpdate = true;
        this.cinematicTexture = texture;
        this.resize(this.backdropAspect);
      },
    );

    this.hemisphere = new THREE.HemisphereLight(BIOMES[0].hemiSky, BIOMES[0].hemiGround, 2.35);
    scene.add(this.hemisphere);
    this.sunLight = new THREE.DirectionalLight(BIOMES[0].sun, 3.2);
    this.sunLight.position.set(-22, 34, 18);
    this.sunLight.castShadow = shadows;
    if (shadows) {
      this.sunLight.shadow.mapSize.set(coarsePointer ? 1024 : 2048, coarsePointer ? 1024 : 2048);
      this.sunLight.shadow.camera.left = -16;
      this.sunLight.shadow.camera.right = 16;
      this.sunLight.shadow.camera.top = 18;
      this.sunLight.shadow.camera.bottom = -8;
      this.sunLight.shadow.camera.near = 1;
      this.sunLight.shadow.camera.far = 85;
      this.sunLight.shadow.bias = -.0008;
    }
    scene.add(this.sunLight, this.sunLight.target);
    this.fillLight = new THREE.DirectionalLight(BIOMES[0].accent, .62);
    this.fillLight.position.set(18, 15, -28);
    scene.add(this.fillLight, this.fillLight.target);

    const glowTexture = createGlowTexture();

    this.sun = new THREE.Mesh(
      new THREE.SphereGeometry(5.5, 20, 14),
      new THREE.MeshBasicMaterial({ color: 0xffe8a6, transparent: true, opacity: .85, fog: false }),
    );
    this.sun.position.set(44, 38, -116);
    this.sunHalo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture, color: 0xffd173, transparent: true, opacity: .48,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    this.sunHalo.scale.set(24, 24, 1);
    this.sun.add(this.sunHalo);
    scene.add(this.sun);

    this.moon = new THREE.Mesh(
      new THREE.SphereGeometry(3.7, 20, 14),
      new THREE.MeshBasicMaterial({ color: 0xdde8ff, transparent: true, opacity: 0, fog: false }),
    );
    this.moon.position.set(-35, 32, -108);
    this.moonHalo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture, color: 0x9fc9ff, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    this.moonHalo.scale.set(17, 17, 1);
    this.moon.add(this.moonHalo);
    scene.add(this.moon);

    const starCount = coarsePointer ? 150 : 280;
    const starPositions = new Float32Array(starCount * 3);
    const random = new SeededRandom(45129);
    for (let index = 0; index < starCount; index += 1) {
      starPositions[index * 3] = (random.next() - .5) * 210;
      starPositions[index * 3 + 1] = 8 + random.next() * 72;
      starPositions[index * 3 + 2] = -30 - random.next() * 170;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    this.stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xffefb0, size: .55, transparent: true, opacity: 0, depthWrite: false, fog: false }));
    scene.add(this.stars);

    const weatherCount = coarsePointer ? 90 : 170;
    this.weatherPositions = new Float32Array(weatherCount * 3);
    for (let index = 0; index < weatherCount; index += 1) {
      this.weatherPositions[index * 3] = (random.next() - .5) * 34;
      this.weatherPositions[index * 3 + 1] = random.next() * 15;
      this.weatherPositions[index * 3 + 2] = -75 + random.next() * 92;
    }
    const weatherGeometry = new THREE.BufferGeometry();
    weatherGeometry.setAttribute('position', new THREE.BufferAttribute(this.weatherPositions, 3));
    this.weather = new THREE.Points(weatherGeometry, new THREE.PointsMaterial({ color: 0xffdc86, size: .15, transparent: true, opacity: .48, depthWrite: false }));
    scene.add(this.weather);

    const moteCount = coarsePointer ? 70 : 128;
    this.motePositions = new Float32Array(moteCount * 3);
    const moteScales = new Float32Array(moteCount);
    const motePhases = new Float32Array(moteCount);
    for (let index = 0; index < moteCount; index += 1) {
      this.motePositions[index * 3] = (random.next() - .5) * 38;
      this.motePositions[index * 3 + 1] = .45 + random.next() * 10;
      this.motePositions[index * 3 + 2] = -96 + random.next() * 112;
      moteScales[index] = 1.1 + random.next() * 1.9;
      motePhases[index] = random.next() * Math.PI * 2;
    }
    const moteGeometry = new THREE.BufferGeometry();
    moteGeometry.setAttribute('position', new THREE.BufferAttribute(this.motePositions, 3));
    moteGeometry.setAttribute('aScale', new THREE.BufferAttribute(moteScales, 1));
    moteGeometry.setAttribute('aPhase', new THREE.BufferAttribute(motePhases, 1));
    const moteMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(BIOMES[0].accent) },
        opacity: { value: .16 },
        time: { value: 0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 1.75) },
      },
      vertexShader: `
        attribute float aScale;
        attribute float aPhase;
        uniform float time;
        uniform float pixelRatio;
        varying float vPulse;
        void main() {
          vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
          vPulse = .72 + .28 * sin(time * 1.7 + aPhase);
          gl_PointSize = aScale * pixelRatio * (48.0 / max(8.0, -viewPosition.z));
          gl_Position = projectionMatrix * viewPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        varying float vPulse;
        void main() {
          float distanceToCenter = length(gl_PointCoord - vec2(.5));
          float softDisc = 1.0 - smoothstep(.08, .5, distanceToCenter);
          gl_FragColor = vec4(color, softDisc * opacity * vPulse);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    });
    this.motes = new THREE.Points(moteGeometry, moteMaterial);
    this.motes.frustumCulled = false;
    scene.add(this.motes);

    this.buildHorizon();
    this.buildClouds();
  }

  resize(aspect: number): void {
    this.backdropAspect = clamp(aspect, .48, 3.2);
    const backdropHeight = 190;
    this.cinematicBackdrop.scale.set(backdropHeight * this.backdropAspect, backdropHeight, 1);
    if (!this.cinematicTexture) return;
    const imageAspect = 16 / 9;
    if (this.backdropAspect >= imageAspect) {
      const visibleHeight = imageAspect / this.backdropAspect;
      this.cinematicTexture.repeat.set(1, visibleHeight);
      this.cinematicTexture.offset.set(0, (1 - visibleHeight) / 2);
    } else {
      const visibleWidth = this.backdropAspect / imageAspect;
      this.cinematicTexture.repeat.set(visibleWidth, 1);
      this.cinematicTexture.offset.set((1 - visibleWidth) / 2, 0);
    }
    this.cinematicTexture.needsUpdate = true;
  }

  private buildHorizon(): void {
    const random = new SeededRandom(81473);
    for (let layer = 0; layer < 2; layer += 1) {
      const count = layer === 0 ? 11 : 13;
      for (let index = 0; index < count; index += 1) {
        const width = 10 + random.next() * (layer === 0 ? 10 : 7);
        const height = 7 + random.next() * (layer === 0 ? 11 : 8);
        const hill = addMesh(
          this.horizonRoot,
          GEO.cone,
          layer === 0 ? this.horizonBackMaterial : this.horizonFrontMaterial,
          [width, height, width * .78],
          [-105 + index * (210 / (count - 1)) + (random.next() - .5) * 6, height * .42 - 2.8, -146 + layer * 18],
          { rotation: [0, random.next() * Math.PI, (random.next() - .5) * .08] },
        );
        hill.userData.horizonPhase = random.next() * Math.PI * 2;
        hill.userData.horizonBaseY = hill.position.y;
        hill.userData.horizonLayer = layer;
      }
    }
    this.scene.add(this.horizonRoot);
  }

  private buildClouds(): void {
    const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .56, depthWrite: false, fog: false });
    for (let cloudIndex = 0; cloudIndex < 7; cloudIndex += 1) {
      const cloud = new THREE.Group();
      const x = -52 + cloudIndex * 18;
      cloud.position.set(x, 24 + (cloudIndex % 3) * 5, -82 - (cloudIndex % 2) * 22);
      cloud.userData.baseY = cloud.position.y;
      cloud.userData.phase = cloudIndex * 1.17;
      for (let puff = 0; puff < 4; puff += 1) {
        addMesh(cloud, GEO.sphere, cloudMaterial, [4.5 + puff * .45, 2.1 + (puff % 2), 2.2], [(puff - 1.5) * 4, (puff % 2) * 1.1, 0]);
      }
      this.cloudRoot.add(cloud);
    }
    this.scene.add(this.cloudRoot);
  }

  update(distance: number, elapsed: number, delta: number, calm: boolean): void {
    const blend = biomeBlendAt(distance);
    const mix = blend.mix;
    const transitionGlow = mix > 0 && mix < 1 ? Math.sin(Math.PI * mix) : 0;
    const nightAmount = blend.from.key === 'meadow' ? 1 : blend.to.key === 'meadow' ? mix : 0;
    const cinematicAmount = 1 - smoothstep((distance - 455) / 185);
    this.cinematicBackdrop.visible = cinematicAmount > .004 && this.cinematicTexture !== null;
    this.cinematicBackdrop.material.opacity = cinematicAmount;
    this.cinematicBackdrop.position.x = roadCenter(distance) * .16 + Math.sin(elapsed * .027) * (calm ? .16 : .52);
    this.cinematicBackdrop.position.y = -6 + Math.sin(elapsed * .052) * (calm ? .04 : .14);
    this.cinematicBackdrop.rotation.z = Math.sin(elapsed * .021) * (calm ? .0002 : .00065);
    setColorBetween(this.scene.background as THREE.Color, blend.from.sky, blend.to.sky, mix);
    setColorBetween(this.skyMaterial.uniforms.topColor.value as THREE.Color, blend.from.sky, blend.to.sky, mix);
    setColorBetween(this.skyMaterial.uniforms.horizonColor.value as THREE.Color, blend.from.fog, blend.to.fog, mix);
    const lowerSky = this.skyMaterial.uniforms.lowerColor.value as THREE.Color;
    setColorBetween(lowerSky, blend.from.ground, blend.to.ground, mix);
    lowerSky.lerp(this.skyMaterial.uniforms.horizonColor.value as THREE.Color, .48);
    this.skyMaterial.uniforms.nightAmount.value = nightAmount;
    this.skyMaterial.uniforms.transitionGlow.value = calm ? transitionGlow * .45 : transitionGlow;
    this.skyMaterial.uniforms.time.value = elapsed;
    this.skyDome.position.x = roadCenter(distance);
    this.skyDome.rotation.y = elapsed * .0015;
    if (this.scene.fog instanceof THREE.Fog) {
      setColorBetween(this.scene.fog.color, blend.from.fog, blend.to.fog, mix);
      this.scene.fog.near = lerp(blend.from.fogNear, blend.to.fogNear, mix) - transitionGlow * 4;
      this.scene.fog.far = lerp(blend.from.fogFar, blend.to.fogFar, mix) - transitionGlow * 9;
    }
    setColorBetween(this.hemisphere.color, blend.from.hemiSky, blend.to.hemiSky, mix);
    setColorBetween(this.hemisphere.groundColor, blend.from.hemiGround, blend.to.hemiGround, mix);
    this.hemisphere.intensity = lerp(2.35, 1.82, nightAmount) + transitionGlow * .08;
    setColorBetween(this.sunLight.color, blend.from.sun, blend.to.sun, mix);
    this.sunLight.intensity = lerp(blend.from.key === 'meadow' ? 1.4 : 3.15, blend.to.key === 'meadow' ? 1.4 : 3.15, mix);
    this.sunLight.position.x = roadCenter(distance) - 22;
    this.sunLight.target.position.set(roadCenter(distance), 0, PLAYER_Z - 18);
    this.sunLight.target.updateMatrixWorld();
    setColorBetween(this.fillLight.color, blend.from.accent, blend.to.accent, mix);
    this.fillLight.intensity = lerp(.54, .88, nightAmount) + transitionGlow * .22;
    this.fillLight.position.x = roadCenter(distance) + 18;
    this.fillLight.target.position.set(roadCenter(distance), 2.2, PLAYER_Z - 26);
    this.fillLight.target.updateMatrixWorld();

    this.sun.material.opacity = .84 * (1 - nightAmount) * (1 - cinematicAmount * .96);
    this.moon.material.opacity = .9 * nightAmount;
    this.sunHalo.material.opacity = (.42 + transitionGlow * .14) * (1 - nightAmount) * (1 - cinematicAmount * .96);
    this.moonHalo.material.opacity = (.34 + transitionGlow * .18) * nightAmount;
    this.sun.position.x = roadCenter(distance) + 44;
    this.sun.position.y = 38 + Math.sin(elapsed * .035) * 1.5;
    this.moon.position.x = roadCenter(distance) - 35;
    this.moon.position.y = 32 + Math.cos(elapsed * .028) * 1.2;
    this.stars.material.opacity = nightAmount * (.84 + Math.sin(elapsed * 1.35) * .11);
    this.stars.material.size = .5 + Math.sin(elapsed * .82) * .055;
    this.stars.rotation.y = elapsed * .003;
    this.stars.position.x = roadCenter(distance);

    setColorBetween(this.horizonFrontMaterial.color, blend.from.ground, blend.to.ground, mix);
    setColorBetween(this.horizonBackMaterial.color, blend.from.fog, blend.to.fog, mix);
    this.horizonFrontMaterial.color.lerp(this.scene.fog instanceof THREE.Fog ? this.scene.fog.color : this.horizonFrontMaterial.color, .14);
    this.horizonBackMaterial.color.copy(this.horizonFrontMaterial.color)
      .lerp(this.scene.fog instanceof THREE.Fog ? this.scene.fog.color : this.horizonBackMaterial.color, .5)
      .offsetHSL(0, -.04, -.055);
    this.horizonFrontMaterial.opacity = .68 * (1 - cinematicAmount * .98);
    this.horizonBackMaterial.opacity = .42 * (1 - cinematicAmount * .98);
    this.horizonRoot.position.x = roadCenter(distance) * .36 + Math.sin(elapsed * .024) * 3.8;
    this.horizonRoot.children.forEach((hill) => {
      const phase = Number(hill.userData.horizonPhase ?? 0);
      const baseY = Number(hill.userData.horizonBaseY ?? hill.position.y);
      const layer = Number(hill.userData.horizonLayer ?? 0);
      hill.position.y = baseY + Math.sin(elapsed * (.09 + layer * .025) + phase) * (calm ? .04 : .14 + layer * .05);
    });

    const weatherBiome = mix >= .5 ? blend.to.key : blend.from.key;
    setColorBetween(this.weather.material.color, weatherColorFor(blend.from.key), weatherColorFor(blend.to.key), mix);
    this.weather.material.size = lerp(blend.from.key === 'forest' ? .11 : .18, blend.to.key === 'forest' ? .11 : .18, mix);
    const weatherOpacity = lerp(blend.from.key === 'meadow' ? .7 : .45, blend.to.key === 'meadow' ? .7 : .45, mix);
    this.weather.material.opacity = (calm ? weatherOpacity * .52 : weatherOpacity) + transitionGlow * .08;
    this.weather.position.x = roadCenter(distance);
    const positions = this.weather.geometry.attributes.position as THREE.BufferAttribute;
    for (let index = 0; index < positions.count; index += 1) {
      const offset = index * 3;
      if (weatherBiome === 'forest') {
        this.weatherPositions[offset + 1] -= delta * (calm ? 5 : 10);
        this.weatherPositions[offset + 2] += delta * 2.5;
      } else if (weatherBiome === 'valley') {
        this.weatherPositions[offset] += Math.sin(elapsed * 1.7 + index) * delta * .8;
        this.weatherPositions[offset + 1] += Math.sin(elapsed * 2.2 + index * .3) * delta * .24;
        this.weatherPositions[offset + 2] += delta * 2;
      } else {
        this.weatherPositions[offset] += Math.sin(elapsed * .9 + index) * delta * .25;
        this.weatherPositions[offset + 1] += Math.sin(elapsed * 1.8 + index * .7) * delta * .18;
        this.weatherPositions[offset + 2] += delta * 1.4;
      }
      if (this.weatherPositions[offset + 1] < .2) this.weatherPositions[offset + 1] = 13 + (index % 7) * .3;
      if (this.weatherPositions[offset + 1] > 16) this.weatherPositions[offset + 1] = .4;
      if (this.weatherPositions[offset + 2] > 14) this.weatherPositions[offset + 2] = -76;
    }
    positions.needsUpdate = true;

    const moteAttribute = this.motes.geometry.attributes.position as THREE.BufferAttribute;
    const moteSpeed = calm ? 1.15 : 2.35 + transitionGlow * 1.4;
    for (let index = 0; index < moteAttribute.count; index += 1) {
      const zOffset = index * 3 + 2;
      this.motePositions[zOffset] += delta * moteSpeed;
      if (this.motePositions[zOffset] > 17) this.motePositions[zOffset] = -96;
    }
    moteAttribute.needsUpdate = true;
    setColorBetween(this.motes.material.uniforms.color.value as THREE.Color, blend.from.accent, blend.to.accent, mix);
    this.motes.material.uniforms.opacity.value = (calm ? .08 : .15) + nightAmount * .16 + transitionGlow * .34;
    this.motes.material.uniforms.time.value = elapsed;
    this.motes.position.x = roadCenter(distance);
    this.motes.rotation.z = calm ? 0 : Math.sin(elapsed * .11) * .008;

    this.cloudRoot.position.x = roadCenter(distance) + Math.sin(elapsed * .035) * 7;
    this.cloudRoot.children.forEach((cloud, index) => {
      const phase = Number(cloud.userData.phase ?? index);
      const baseY = Number(cloud.userData.baseY ?? cloud.position.y);
      const cloudSpeed = calm ? .14 : .38 + transitionGlow * .22;
      cloud.position.x += delta * (cloudSpeed + index * .045);
      if (cloud.position.x > 78) cloud.position.x = -78;
      cloud.position.y = baseY + Math.sin(elapsed * .18 + phase) * (calm ? .12 : .48);
      cloud.rotation.z = Math.sin(elapsed * .11 + phase) * (calm ? .003 : .014);
      const cloudBreath = calm ? 0 : Math.sin(elapsed * .22 + phase) * .025;
      cloud.scale.set(1 + cloudBreath, 1 - cloudBreath * .45, 1);
    });
    const cloudOpacity = lerp(cloudOpacityFor(blend.from.key), cloudOpacityFor(blend.to.key), mix);
    this.cloudRoot.traverse((object) => {
      if (object instanceof THREE.Mesh && object.material instanceof THREE.MeshBasicMaterial) {
        object.material.opacity = cloudOpacity * (1 - cinematicAmount * .86);
      }
    });

    const exposureFrom = blend.from.key === 'forest' ? .96 : blend.from.key === 'meadow' ? .9 : 1.05;
    const exposureTo = blend.to.key === 'forest' ? .96 : blend.to.key === 'meadow' ? .9 : 1.05;
    this.exposureTarget = lerp(exposureFrom, exposureTo, mix) + transitionGlow * .045;
  }
}

function createSpark(): THREE.Group {
  const group = new THREE.Group();
  const glow = material(0xffd743, { emissive: 0xffb400, emissiveIntensity: 1.8, roughness: .35 });
  addMesh(group, GEO.octa, glow, [.42, .58, .42], [0, 0, 0], { rotation: [0, 0, Math.PI / 4] });
  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffefa0, transparent: true, opacity: .68, blending: THREE.AdditiveBlending, depthWrite: false });
  addMesh(group, GEO.torus, ringMaterial, [.56, .56, .56], [0, 0, 0], { rotation: [Math.PI / 2, 0, 0] });
  return group;
}

function createApple(): THREE.Group {
  const group = new THREE.Group();
  addMesh(group, GEO.sphere, material(0xdc4438), [.45, .42, .42], [0, 0, 0], { castShadow: true });
  addMesh(group, GEO.cylinder, material(0x704331), [.055, .2, .055], [0, .45, 0], { rotation: [0, 0, -.18] });
  addMesh(group, GEO.sphere, material(0x4b9a50), [.21, .07, .12], [.16, .56, 0], { rotation: [0, 0, .45] });
  return group;
}

function createHorseshoe(): THREE.Group {
  const group = new THREE.Group();
  const gold = material(0xf2c348, { emissive: 0x9d6200, emissiveIntensity: .8, metalness: .55, roughness: .3 });
  const torus = addMesh(group, GEO.torus, gold, [.62, .75, .62], [0, 0, 0], { rotation: [0, 0, 0], castShadow: true });
  torus.rotation.z = Math.PI;
  addMesh(group, GEO.box, gold, [.34, .22, .2], [-.49, .49, 0]);
  addMesh(group, GEO.box, gold, [.34, .22, .2], [.49, .49, 0]);
  return group;
}

function createHay(): THREE.Group {
  const group = new THREE.Group();
  const hay = material(0xdca936);
  addMesh(group, GEO.box, hay, [2.2, 1.3, 1.35], [0, .66, 0], { castShadow: true });
  addMesh(group, GEO.box, material(0xf3c94f), [2.26, .13, 1.39], [0, .58, 0]);
  addMesh(group, GEO.box, material(0x9a6a2b), [.13, 1.34, 1.39], [0, .66, 0]);
  return group;
}

function createCart(): THREE.Group {
  const group = new THREE.Group();
  const wood = material(0x8a5537);
  addMesh(group, GEO.box, wood, [2.55, .75, 1.6], [0, .95, 0], { castShadow: true });
  addMesh(group, GEO.box, material(0xae7449), [2.7, .18, 1.72], [0, 1.42, 0], { castShadow: true });
  for (const side of [-1, 1]) {
    const wheel = addMesh(group, GEO.torus, material(0x49372f), [.58, .58, .28], [side * 1.18, .52, 0], { castShadow: true });
    wheel.rotation.y = Math.PI / 2;
    for (let spoke = 0; spoke < 4; spoke += 1) {
      addMesh(group, GEO.box, material(0x684733), [.08, 1.05, .08], [side * 1.18, .52, 0], { rotation: [spoke * Math.PI / 4, 0, 0] });
    }
  }
  return group;
}

function createLog(): THREE.Group {
  const group = new THREE.Group();
  addMesh(group, GEO.cylinder, material(0x6d4932), [.46, 1.4, .46], [0, .48, 0], { rotation: [0, 0, Math.PI / 2], castShadow: true });
  addMesh(group, GEO.cylinder, material(0xb18458), [.33, 1.42, .33], [0, .48, 0], { rotation: [0, 0, Math.PI / 2] });
  for (const side of [-1, 1]) addMesh(group, GEO.cone, material(0x4e7c3d), [.42, .8, .42], [side * .75, .72, 0], { rotation: [0, 0, side * .8] });
  return group;
}

function createPuddle(): THREE.Group {
  const group = new THREE.Group();
  const puddleMaterial = new THREE.MeshStandardMaterial({ color: 0x438ea2, transparent: true, opacity: .72, roughness: .25, metalness: .12, depthWrite: false });
  addMesh(group, new THREE.CircleGeometry(1, 20), puddleMaterial, [1.32, 1.75, 1], [0, .025, 0], { rotation: [-Math.PI / 2, 0, 0] });
  for (let index = 0; index < 4; index += 1) addMesh(group, GEO.sphere, material(0x586b58), [.28 + index * .04, .16, .3], [-1.15 + index * .76, .1, (index % 2) * .7 - .35]);
  return group;
}

function createRock(): THREE.Group {
  const group = new THREE.Group();
  addMesh(group, GEO.dodeca, material(0x7d7168), [1.05, .9, .95], [0, .75, 0], { rotation: [.2, .25, .05], castShadow: true });
  addMesh(group, GEO.dodeca, material(0x9b8d7d), [.58, .45, .62], [.7, .35, .25], { rotation: [.1, -.4, 0], castShadow: true });
  return group;
}

function createGoat(): THREE.Group {
  const group = new THREE.Group();
  const wool = material(0xe5dfca);
  addMesh(group, GEO.sphere, wool, [.76, .55, .92], [0, .86, 0], { castShadow: true });
  addMesh(group, GEO.sphere, material(0xa88d73), [.38, .4, .4], [0, 1.18, -.85], { castShadow: true });
  for (const side of [-1, 1]) {
    addMesh(group, GEO.cone, material(0x6e5a4d), [.09, .45, .09], [side * .18, 1.57, -.86], { rotation: [0, 0, side * -.24] });
    addMesh(group, GEO.cylinder, material(0x8d775f), [.09, .62, .09], [side * .42, .38, side * .22], { castShadow: true });
  }
  return group;
}

function createCrystal(): THREE.Group {
  const group = new THREE.Group();
  const crystal = material(0x7ee2d3, { emissive: 0x2ea898, emissiveIntensity: .9, metalness: .22, roughness: .3 });
  addMesh(group, GEO.cone, crystal, [.45, 1.7, .45], [0, .85, 0], { castShadow: true });
  addMesh(group, GEO.cone, crystal, [.3, 1.15, .3], [-.48, .57, .15], { rotation: [0, 0, -.2], castShadow: true });
  addMesh(group, GEO.cone, crystal, [.25, .9, .25], [.45, .45, -.1], { rotation: [0, 0, .28], castShadow: true });
  return group;
}

function createEntityGroup(kind: EntityKind): THREE.Group {
  switch (kind) {
    case 'spark': return createSpark();
    case 'apple': return createApple();
    case 'horseshoe': return createHorseshoe();
    case 'hay': return createHay();
    case 'cart': return createCart();
    case 'log': return createLog();
    case 'puddle': return createPuddle();
    case 'rock': return createRock();
    case 'goat': return createGoat();
    case 'crystal': return createCrystal();
  }
}

function obstacleKindForBiome(biome: BiomeKey, random: SeededRandom): EntityKind {
  if (biome === 'village') return random.pick(['hay', 'cart', 'puddle'] as const);
  if (biome === 'forest') return random.pick(['log', 'rock', 'puddle', 'goat'] as const);
  if (biome === 'valley') return random.pick(['rock', 'goat', 'cart'] as const);
  return random.pick(['crystal', 'rock', 'goat'] as const);
}

function clearHeightFor(kind: EntityKind): number {
  switch (kind) {
    case 'puddle': return .2;
    case 'log': return .95;
    case 'goat': return 1.12;
    case 'hay': return 1.28;
    case 'rock': return 1.38;
    case 'crystal': return 1.45;
    case 'cart': return 99;
    default: return 0;
  }
}

class SpawnDirector {
  readonly root = new THREE.Group();
  readonly entities: ActiveEntity[] = [];
  private pools = new Map<EntityKind, THREE.Group[]>();
  private random = new SeededRandom(1);
  private nextPatternDistance = 18;

  constructor(scene: THREE.Scene) {
    scene.add(this.root);
  }

  reset(seed: number): void {
    while (this.entities.length > 0) this.release(this.entities[0]);
    this.random = new SeededRandom(seed);
    this.nextPatternDistance = 22;
  }

  fillAhead(distance: number, hearts: number): void {
    while (this.nextPatternDistance < Math.min(distance + 205, FINISH_DISTANCE - 34)) {
      const at = this.nextPatternDistance;
      if (at < 92) {
        const lane = at < 52 ? 1 : this.random.int(0, 2);
        this.spawnSparkTrail(lane, at, 3, 4.2);
        this.nextPatternDistance += 16;
        continue;
      }

      const nearGate = BIOMES.slice(0, -1).some((biome) => Math.abs(at - biome.end) < 34);
      const progress = at / FINISH_DISTANCE;
      if (nearGate || this.random.next() < .28) {
        const lane = this.random.int(0, 2);
        this.spawnSparkTrail(lane, at, this.random.int(3, 5), 3.4);
      } else {
        const lanes = [0, 1, 2];
        const safeLane = lanes.splice(this.random.int(0, lanes.length - 1), 1)[0];
        const blockCount = progress > .22 && this.random.next() < lerp(.2, .58, progress) ? 2 : 1;
        for (let index = 0; index < blockCount; index += 1) {
          const blockedLane = lanes.splice(this.random.int(0, lanes.length - 1), 1)[0];
          const biome = BIOMES[biomeIndexAt(at)].key;
          this.spawn(obstacleKindForBiome(biome, this.random), blockedLane, at + (blockCount > 1 ? index * .55 : 0), 0);
        }
        this.spawnSparkTrail(safeLane, at - 5.2, this.random.int(3, 5), 3.1);
      }

      if (hearts < 3 && this.random.next() < .11) this.spawn('apple', this.random.int(0, 2), at + 8, 1.65);
      else if (this.random.next() < .075) this.spawn('horseshoe', this.random.int(0, 2), at + 7, 1.75);
      const gap = lerp(24, 17.5, progress) + this.random.next() * 7;
      this.nextPatternDistance += gap;
    }
  }

  update(distance: number, elapsed: number, delta: number, playerX: number, boosting: boolean): void {
    for (let index = this.entities.length - 1; index >= 0; index -= 1) {
      const entity = this.entities[index];
      const z = PLAYER_Z - (entity.worldDistance - distance);
      const targetX = roadCenter(entity.worldDistance) + LANES[entity.lane];
      entity.group.position.z = z;
      if (boosting && entity.kind !== 'hay' && entity.kind !== 'cart' && entity.kind !== 'log' && entity.kind !== 'puddle' && entity.kind !== 'rock' && entity.kind !== 'goat' && entity.kind !== 'crystal' && z < PLAYER_Z + 2 && z > PLAYER_Z - 14) {
        entity.group.position.x = THREE.MathUtils.lerp(entity.group.position.x, playerX, 1 - Math.exp(-delta * 9));
      } else {
        entity.group.position.x = THREE.MathUtils.lerp(entity.group.position.x, targetX, 1 - Math.exp(-delta * 14));
      }
      if (entity.kind === 'spark') {
        entity.group.position.y = entity.baseY + Math.sin(elapsed * 4 + entity.phase) * .22;
        entity.group.rotation.y += delta * 2.8;
        entity.group.rotation.z = Math.sin(elapsed * 2.4 + entity.phase) * .22;
      } else if (entity.kind === 'apple' || entity.kind === 'horseshoe') {
        entity.group.position.y = entity.baseY + Math.sin(elapsed * 3 + entity.phase) * .18;
        entity.group.rotation.y += delta * 1.8;
      } else if (entity.kind === 'goat') {
        entity.group.position.y = Math.abs(Math.sin(elapsed * 2 + entity.phase)) * .05;
        entity.group.rotation.y = Math.sin(elapsed * .7 + entity.phase) * .08;
      }
      if (entity.worldDistance < distance - 14) this.release(entity);
    }
  }

  release(entity: ActiveEntity): void {
    const index = this.entities.indexOf(entity);
    if (index >= 0) this.entities.splice(index, 1);
    this.root.remove(entity.group);
    entity.group.visible = false;
    const pool = this.pools.get(entity.kind) ?? [];
    pool.push(entity.group);
    this.pools.set(entity.kind, pool);
  }

  private obtain(kind: EntityKind): THREE.Group {
    const pool = this.pools.get(kind);
    const group = pool?.pop() ?? createEntityGroup(kind);
    group.visible = true;
    group.rotation.set(0, 0, 0);
    group.scale.set(1, 1, 1);
    this.root.add(group);
    return group;
  }

  private spawn(kind: EntityKind, lane: number, worldDistance: number, baseY: number): void {
    const group = this.obtain(kind);
    group.position.set(roadCenter(worldDistance) + LANES[lane], baseY, PLAYER_Z - worldDistance);
    this.entities.push({
      group,
      kind,
      lane,
      worldDistance,
      baseY,
      clearHeight: clearHeightFor(kind),
      phase: this.random.next() * Math.PI * 2,
      collected: false,
    });
  }

  private spawnSparkTrail(lane: number, startDistance: number, count: number, gap: number): void {
    for (let index = 0; index < count; index += 1) {
      const high = index === Math.floor(count / 2) && startDistance > 160 && this.random.next() < .28;
      this.spawn('spark', lane, startDistance + index * gap, high ? 2.8 : 1.72);
    }
  }
}

interface Burst {
  points: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
  velocities: Float32Array;
  life: number;
  maxLife: number;
}

class Effects {
  private scene: THREE.Scene;
  private bursts: Burst[] = [];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  burst(position: THREE.Vector3, color: number, count = 12): void {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = position.x;
      positions[index * 3 + 1] = position.y;
      positions[index * 3 + 2] = position.z;
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.4 + Math.random() * 3.3;
      velocities[index * 3] = Math.cos(angle) * speed;
      velocities[index * 3 + 1] = 1.3 + Math.random() * 3.2;
      velocities[index * 3 + 2] = Math.sin(angle) * speed;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({ color, size: .18, transparent: true, opacity: .95, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    this.scene.add(points);
    this.bursts.push({ points, velocities, life: .72, maxLife: .72 });
  }

  update(delta: number): void {
    for (let burstIndex = this.bursts.length - 1; burstIndex >= 0; burstIndex -= 1) {
      const burst = this.bursts[burstIndex];
      burst.life -= delta;
      const attribute = burst.points.geometry.attributes.position as THREE.BufferAttribute;
      const values = attribute.array as Float32Array;
      for (let index = 0; index < attribute.count; index += 1) {
        values[index * 3] += burst.velocities[index * 3] * delta;
        values[index * 3 + 1] += burst.velocities[index * 3 + 1] * delta;
        values[index * 3 + 2] += burst.velocities[index * 3 + 2] * delta;
        burst.velocities[index * 3 + 1] -= 7.5 * delta;
      }
      attribute.needsUpdate = true;
      burst.points.material.opacity = clamp(burst.life / burst.maxLife, 0, 1);
      if (burst.life <= 0) {
        this.scene.remove(burst.points);
        burst.points.geometry.dispose();
        burst.points.material.dispose();
        this.bursts.splice(burstIndex, 1);
      }
    }
  }
}

interface SaveData {
  bestScore: number;
  sound: boolean;
  calm: boolean;
  runs: number;
  tutorialDone: boolean;
}

function loadSave(): SaveData {
  const fallback: SaveData = { bestScore: 0, sound: true, calm: prefersReducedMotion, runs: 0, tutorialDone: false };
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<SaveData>;
    return {
      bestScore: Number.isFinite(stored.bestScore) ? Math.max(0, Number(stored.bestScore)) : 0,
      sound: typeof stored.sound === 'boolean' ? stored.sound : true,
      calm: prefersReducedMotion || stored.calm === true,
      runs: Number.isFinite(stored.runs) ? Math.max(0, Number(stored.runs)) : 0,
      tutorialDone: stored.tutorialDone === true,
    };
  } catch {
    return fallback;
  }
}

class MasalRoadGame {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(58, 1, .1, 260);
  private readonly cameraLook = new THREE.Vector3();
  private readonly desiredCameraPosition = new THREE.Vector3();
  private readonly desiredCameraLook = new THREE.Vector3();
  private readonly world: WorldStream;
  private readonly atmosphere: Atmosphere;
  private readonly rider: Rider;
  private readonly spawner: SpawnDirector;
  private readonly effects: Effects;
  private readonly audio = new AudioManager();
  private readonly save = loadSave();
  private readonly shadows = !coarsePointer && window.devicePixelRatio <= 2.25;

  private phase: GamePhase = 'loading';
  private animationFrame = 0;
  private lastFrame = performance.now();
  private elapsed = 0;
  private runTime = 0;
  private distance = 0;
  private currentSpeed = 5;
  private targetLane = 1;
  private playerX = roadCenter(0);
  private previousPlayerX = this.playerX;
  private jumpY = 0;
  private jumpVelocity = 0;
  private hearts = 3;
  private power = 0;
  private boostTime = 0;
  private invulnerable = 0;
  private speedPenalty = 0;
  private shakeTime = 0;
  private bonusScore = 0;
  private score = 0;
  private sparksCollected = 0;
  private combo = 0;
  private comboTimer = 0;
  private currentBiome = 0;
  private tutorialStage = -1;
  private tutorialDelay = 0;
  private lastUiUpdate = 0;
  private toastTimer = 0;
  private rotateTimer = 0;
  private lastPausedRender = 0;
  private cameraLateralVelocity = 0;
  private cameraRoll = 0;
  private pointerStart: { x: number; y: number; id: number } | null = null;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !coarsePointer,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = this.shadows;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarsePointer ? 1.35 : 1.75));

    this.atmosphere = new Atmosphere(this.scene, this.shadows);
    this.world = new WorldStream(this.scene, this.shadows);
    this.spawner = new SpawnDirector(this.scene);
    this.effects = new Effects(this.scene);
    this.rider = new Rider(this.scene);
    this.camera.position.set(7.5, 5.4, -1.5);
    this.cameraLook.set(-2.5, 2.9, PLAYER_Z);

    this.audio.enabled = this.save.sound;
    this.bindEvents();
    this.resize();
    this.updateSoundUi();
    this.updateCalmUi();
    this.updateBestScoreUi();
    this.animationFrame = requestAnimationFrame(this.frame);
  }

  ready(): void {
    this.showMenu();
  }

  private bindEvents(): void {
    required<HTMLButtonElement>('[data-start-button]').addEventListener('click', () => this.start());
    required<HTMLButtonElement>('[data-resume-button]').addEventListener('click', () => this.resume());
    required<HTMLButtonElement>('[data-menu-button]').addEventListener('click', () => this.showMenu());
    required<HTMLButtonElement>('[data-restart-button]').addEventListener('click', () => this.start());
    required<HTMLButtonElement>('[data-result-menu-button]').addEventListener('click', () => this.showMenu());
    required<HTMLButtonElement>('[data-pause-button]').addEventListener('click', () => this.pause());
    soundButton.addEventListener('click', () => this.toggleSound());
    menuSoundButton.addEventListener('click', () => this.toggleSound());
    calmModeButton.addEventListener('click', () => {
      this.save.calm = !this.save.calm;
      this.persist();
      this.updateCalmUi();
    });

    document.querySelectorAll<HTMLButtonElement>('[data-control]').forEach((button) => {
      button.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        const control = button.dataset.control;
        if (control === 'left') this.moveLane(-1);
        if (control === 'right') this.moveLane(1);
        if (control === 'jump') this.jump();
        if (control === 'boost') this.activateBoost();
      });
    });

    window.addEventListener('keydown', this.onKeyDown, { passive: false });
    window.addEventListener('resize', this.resize, { passive: true });
    window.addEventListener('orientationchange', this.resize, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.phase === 'running') this.pause();
    });
    canvas.addEventListener('pointerdown', this.onPointerDown);
    canvas.addEventListener('pointerup', this.onPointerUp);
    canvas.addEventListener('pointercancel', () => { this.pointerStart = null; });
    canvas.addEventListener('wheel', (event) => {
      if (window.self !== window.top && !document.fullscreenElement) {
        window.parent.postMessage({ type: 'masalnova:embedded-game-scroll', deltaY: event.deltaY }, window.location.origin);
      }
    }, { passive: true });
    canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      this.showFallback();
    });
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    const actionKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'Space', 'KeyA', 'KeyD', 'KeyW', 'ShiftLeft', 'ShiftRight'];
    const target = event.target instanceof Element ? event.target : null;
    const isInteractive = Boolean(target?.closest('button, a, input, select, textarea, [contenteditable="true"]'));
    if (isInteractive && event.code !== 'Escape' && event.code !== 'KeyP' && event.code !== 'KeyM') return;
    if (this.phase === 'running' && actionKeys.includes(event.code)) event.preventDefault();
    if (event.code === 'KeyM') {
      this.toggleSound();
      return;
    }
    if (event.code === 'Escape' || event.code === 'KeyP') {
      if (this.phase === 'running') this.pause();
      else if (this.phase === 'paused') this.resume();
      return;
    }
    if (event.code === 'Enter') {
      if (this.phase === 'menu' || this.phase === 'result') this.start();
      else if (this.phase === 'paused') this.resume();
      return;
    }
    if (event.repeat || this.phase !== 'running') return;
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') this.moveLane(-1);
    if (event.code === 'ArrowRight' || event.code === 'KeyD') this.moveLane(1);
    if (event.code === 'ArrowUp' || event.code === 'KeyW' || event.code === 'Space') this.jump();
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') this.activateBoost();
  };

  private onPointerDown = (event: PointerEvent): void => {
    if (this.phase !== 'running') return;
    this.pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
    canvas.setPointerCapture?.(event.pointerId);
  };

  private onPointerUp = (event: PointerEvent): void => {
    if (!this.pointerStart || this.pointerStart.id !== event.pointerId || this.phase !== 'running') return;
    const dx = event.clientX - this.pointerStart.x;
    const dy = event.clientY - this.pointerStart.y;
    this.pointerStart = null;
    if (Math.abs(dx) > 34 && Math.abs(dx) > Math.abs(dy)) this.moveLane(dx > 0 ? 1 : -1);
    else if (dy < -28) this.jump();
    else if (Math.abs(dx) < 16 && Math.abs(dy) < 16) this.jump();
  };

  private resize = (): void => {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.atmosphere.resize(this.camera.aspect);
    this.renderer.setSize(width, height, false);
    if (this.phase === 'running' && coarsePointer && height > width) {
      rotateHint.hidden = false;
      window.clearTimeout(this.rotateTimer);
      this.rotateTimer = window.setTimeout(() => { rotateHint.hidden = true; }, 5000);
    } else {
      rotateHint.hidden = true;
    }
  };

  private frame = (now: number): void => {
    const delta = Math.min((now - this.lastFrame) / 1000, .05);
    this.lastFrame = now;
    if (document.hidden) {
      this.animationFrame = requestAnimationFrame(this.frame);
      return;
    }
    this.elapsed += delta;

    if (this.phase === 'running') this.updateRunning(delta);
    else if (this.phase === 'menu' || this.phase === 'result') {
      this.world.update(this.distance, this.elapsed, 5.5, this.save.calm);
      this.atmosphere.update(this.distance, this.elapsed, delta, this.save.calm);
      this.rider.update(this.elapsed, 5.5, 0, 0, false, 0, this.save.calm);
      this.audio.updateAmbience(BIOMES[biomeIndexAt(this.distance)].key, 5.5, false, true, this.save.calm);
    }
    this.renderer.toneMappingExposure = THREE.MathUtils.lerp(
      this.renderer.toneMappingExposure,
      this.atmosphere.exposureTarget,
      1 - Math.exp(-delta * .85),
    );

    const shouldRender = this.phase !== 'paused' || now - this.lastPausedRender >= 240;
    if (this.phase !== 'paused') this.effects.update(delta);
    if (shouldRender) {
      this.updateCamera(delta);
      this.renderer.render(this.scene, this.camera);
      if (this.phase === 'paused') this.lastPausedRender = now;
    }
    this.animationFrame = requestAnimationFrame(this.frame);
  };

  private updateRunning(delta: number): void {
    this.runTime += delta;
    this.invulnerable = Math.max(0, this.invulnerable - delta);
    this.speedPenalty = Math.max(0, this.speedPenalty - delta * 1.25);
    this.shakeTime = Math.max(0, this.shakeTime - delta);
    this.comboTimer = Math.max(0, this.comboTimer - delta);
    if (this.comboTimer <= 0) this.combo = 0;

    if (this.jumpY > 0 || this.jumpVelocity > 0) {
      this.jumpVelocity -= 24 * delta;
      this.jumpY += this.jumpVelocity * delta;
      if (this.jumpY <= 0) {
        this.jumpY = 0;
        this.jumpVelocity = 0;
      }
    }

    const progress = clamp(this.distance / FINISH_DISTANCE, 0, 1);
    const boostSpeed = this.boostTime > 0 ? 7 : 0;
    const targetSpeed = 10.4 + progress * 5.4 + boostSpeed - this.speedPenalty;
    this.currentSpeed = THREE.MathUtils.lerp(this.currentSpeed, targetSpeed, 1 - Math.exp(-delta * 2.8));
    this.distance += this.currentSpeed * delta;
    this.previousPlayerX = this.playerX;
    const targetX = roadCenter(this.distance) + LANES[this.targetLane];
    this.playerX = THREE.MathUtils.lerp(this.playerX, targetX, 1 - Math.exp(-delta * 8.2));
    const lateralVelocity = (this.playerX - this.previousPlayerX) / Math.max(delta, .001);
    this.cameraLateralVelocity = THREE.MathUtils.lerp(
      this.cameraLateralVelocity,
      lateralVelocity,
      1 - Math.exp(-delta * 7),
    );
    this.rider.root.position.x = this.playerX;

    if (this.boostTime > 0) {
      this.boostTime = Math.max(0, this.boostTime - delta);
      if (this.boostTime <= 0) root.classList.remove('is-boosting');
    }

    this.world.update(this.distance, this.elapsed, this.currentSpeed, this.save.calm);
    this.atmosphere.update(this.distance, this.elapsed, delta, this.save.calm);
    this.spawner.fillAhead(this.distance, this.hearts);
    this.spawner.update(this.distance, this.elapsed, delta, this.playerX, this.boostTime > 0);
    this.handleCollisions();
    this.updateBiomeMilestones();
    this.updateTutorial(delta);
    this.score = Math.floor(this.distance * .55) + this.bonusScore;
    this.audio.updateHooves(this.elapsed, this.currentSpeed, this.jumpY > .05);
    this.audio.updateAmbience(
      BIOMES[biomeIndexAt(this.distance)].key,
      this.currentSpeed,
      this.boostTime > 0,
      true,
      this.save.calm,
    );
    this.rider.update(this.elapsed, this.currentSpeed, this.jumpY, lateralVelocity, this.boostTime > 0, this.invulnerable, this.save.calm);

    if (this.elapsed - this.lastUiUpdate > .055) {
      this.updateUi();
      this.lastUiUpdate = this.elapsed;
    }
    if (this.distance >= FINISH_DISTANCE) this.finish(true);
  }

  private handleCollisions(): void {
    const obstacles = new Set<EntityKind>(['hay', 'cart', 'log', 'puddle', 'rock', 'goat', 'crystal']);
    const snapshot = [...this.spawner.entities];
    for (const entity of snapshot) {
      if (entity.collected || Math.abs(entity.worldDistance - this.distance) > 1.45) continue;
      if (Math.abs(entity.group.position.x - this.playerX) > 1.42) continue;

      if (!obstacles.has(entity.kind)) {
        const pickupAnchorY = 1.6 + this.jumpY;
        if (Math.abs(entity.group.position.y - pickupAnchorY) > .65) continue;
        this.collect(entity);
        continue;
      }
      if (this.boostTime > 0) {
        entity.collected = true;
        this.bonusScore += 35;
        this.effects.burst(entity.group.position.clone().setY(1), 0xffdc58, 9);
        this.spawner.release(entity);
        continue;
      }
      if (this.jumpY > entity.clearHeight) continue;
      if (this.invulnerable <= 0) this.hit(entity);
    }
  }

  private collect(entity: ActiveEntity): void {
    entity.collected = true;
    if (entity.kind === 'spark') {
      this.combo = this.comboTimer > 0 ? Math.min(this.combo + 1, 5) : 1;
      this.comboTimer = 2.15;
      this.sparksCollected += 1;
      this.bonusScore += 18 * this.combo;
      this.power = clamp(this.power + 9, 0, 100);
      this.audio.pickup(this.combo);
      this.effects.burst(entity.group.position.clone(), 0xffdd55, 9);
      if (this.power >= 100 && this.boostTime <= 0) this.showToast('Masal ışığı hazır · Shift veya IŞIK');
    } else if (entity.kind === 'apple') {
      const previous = this.hearts;
      this.hearts = Math.min(3, this.hearts + 1);
      this.bonusScore += previous === this.hearts ? 80 : 45;
      this.audio.tone(520, .18, 'sine', .14);
      this.effects.burst(entity.group.position.clone(), 0xff6c55, 10);
      this.showToast(previous === this.hearts ? 'Elma bonusu · +80' : 'Karakaçan güçlendi · +1 can');
    } else if (entity.kind === 'horseshoe') {
      this.power = clamp(this.power + 34, 0, 100);
      this.bonusScore += 65;
      this.audio.tone(680, .22, 'triangle', .15);
      this.effects.burst(entity.group.position.clone(), 0xffd24b, 12);
      this.showToast('Altın nal · Masal ışığı doldu');
    }
    this.spawner.release(entity);
  }

  private hit(entity: ActiveEntity): void {
    this.hearts -= 1;
    this.invulnerable = 1.85;
    this.speedPenalty = 3.4;
    this.shakeTime = this.save.calm ? .12 : .38;
    this.power = Math.max(0, this.power - 16);
    this.combo = 0;
    this.comboTimer = 0;
    this.audio.hit();
    this.effects.burst(entity.group.position.clone().setY(1), 0xf18a64, 14);
    this.spawner.release(entity);
    if (this.hearts <= 0) {
      this.updateUi();
      this.finish(false);
    } else {
      this.showToast(`Dikkat · ${this.hearts} can kaldı`);
      liveRegion.textContent = `Bir engele çarptın. ${this.hearts} canın kaldı.`;
    }
  }

  private updateBiomeMilestones(): void {
    const nextBiome = biomeIndexAt(this.distance);
    if (nextBiome <= this.currentBiome) return;
    for (let index = this.currentBiome; index < nextBiome; index += 1) {
      const relic = document.querySelector<HTMLElement>(`[data-relic="${index}"]`);
      relic?.classList.add('is-found');
      this.bonusScore += 260;
      this.power = clamp(this.power + 24, 0, 100);
      this.invulnerable = Math.max(this.invulnerable, .9);
      this.audio.relic();
      this.showToast(`Masal mührü bulundu · ${BIOMES[index + 1].name}`);
      liveRegion.textContent = `${index + 1}. masal mührünü buldun. ${BIOMES[index + 1].name} başladı.`;
    }
    this.currentBiome = nextBiome;
  }

  private updateTutorial(delta: number): void {
    if (this.tutorialStage < 0) return;
    this.tutorialDelay -= delta;
    if (this.tutorialDelay > 0) return;
    if (this.tutorialStage === 0 && tutorial.hidden) {
      this.showTutorial('↔', coarsePointer ? 'Kaydır veya oklarla yönel' : 'A · D veya oklarla yönel');
    } else if (this.tutorialStage === 1 && tutorial.hidden) {
      this.showTutorial('↑', coarsePointer ? 'Yukarı kaydır veya ZIPLA' : 'Boşluk ile zıpla');
    } else if (this.tutorialStage === 2 && this.power >= 100 && tutorial.hidden) {
      this.showTutorial('✦', coarsePointer ? 'IŞIK düğmesine dokun' : 'Shift ile ışık galobu');
    }
  }

  private moveLane(direction: -1 | 1): void {
    if (this.phase !== 'running') return;
    this.targetLane = clamp(this.targetLane + direction, 0, 2);
    if (this.tutorialStage === 0) {
      tutorial.hidden = true;
      this.tutorialStage = 1;
      this.tutorialDelay = .8;
    }
  }

  private jump(): void {
    if (this.phase !== 'running' || this.jumpY > .04 || this.jumpVelocity > 0) return;
    this.jumpVelocity = 9.4;
    this.audio.jump();
    if (this.tutorialStage === 1) {
      tutorial.hidden = true;
      this.tutorialStage = 2;
      this.tutorialDelay = .8;
    }
  }

  private activateBoost(): void {
    if (this.phase !== 'running' || this.power < 99 || this.boostTime > 0) return;
    this.power = 0;
    this.boostTime = 6;
    this.invulnerable = Math.max(this.invulnerable, 6.1);
    root.classList.add('is-boosting');
    this.audio.boost();
    this.showToast('Işık galobu · Engeller artık yol veriyor!');
    if (this.tutorialStage === 2) {
      tutorial.hidden = true;
      this.tutorialStage = -1;
      this.save.tutorialDone = true;
      this.persist();
    }
  }

  private start(): void {
    this.audio.ensure();
    this.save.runs += 1;
    this.persist();
    this.phase = 'running';
    root.dataset.gameState = 'running';
    menuScreen.hidden = true;
    pauseScreen.hidden = true;
    resultScreen.hidden = true;
    fallbackScreen.hidden = true;
    loadingScreen.hidden = true;
    hud.hidden = false;
    powerMeter.hidden = false;
    touchControls.hidden = !coarsePointer;
    tutorial.hidden = true;
    rotateHint.hidden = true;
    root.classList.remove('is-boosting');
    this.setModalLayer(null);

    this.runTime = 0;
    this.distance = 0;
    this.currentSpeed = 8.5;
    this.cameraLateralVelocity = 0;
    this.cameraRoll = 0;
    this.targetLane = 1;
    this.playerX = roadCenter(0);
    this.previousPlayerX = this.playerX;
    this.jumpY = 0;
    this.jumpVelocity = 0;
    this.hearts = 3;
    this.power = 0;
    this.boostTime = 0;
    this.invulnerable = 0;
    this.speedPenalty = 0;
    this.shakeTime = 0;
    this.bonusScore = 0;
    this.score = 0;
    this.sparksCollected = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.currentBiome = 0;
    this.tutorialStage = this.save.tutorialDone ? -1 : 0;
    this.tutorialDelay = 1.1;
    this.rider.root.position.set(this.playerX, 0, PLAYER_Z);
    this.world.reset(0);
    const date = new Date();
    const daySeed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    this.spawner.reset((daySeed ^ Math.imul(this.save.runs, 2654435761)) >>> 0);
    document.querySelectorAll<HTMLElement>('[data-relic]').forEach((relic) => relic.classList.remove('is-found'));
    this.updateUi();
    this.resize();
    canvas.focus({ preventScroll: true });
    liveRegion.textContent = 'Masal Yolu başladı.';
  }

  private pause(): void {
    if (this.phase !== 'running') return;
    this.phase = 'paused';
    root.dataset.gameState = 'paused';
    pauseScreen.hidden = false;
    touchControls.hidden = true;
    tutorial.hidden = true;
    this.audio.silenceAmbience();
    this.setModalLayer(pauseScreen);
    focusNextFrame(required<HTMLButtonElement>('[data-resume-button]'));
    liveRegion.textContent = 'Oyun duraklatıldı.';
  }

  private resume(): void {
    if (this.phase !== 'paused') return;
    this.audio.ensure();
    this.phase = 'running';
    root.dataset.gameState = 'running';
    pauseScreen.hidden = true;
    touchControls.hidden = !coarsePointer;
    this.setModalLayer(null);
    this.lastFrame = performance.now();
    canvas.focus({ preventScroll: true });
    liveRegion.textContent = 'Oyun devam ediyor.';
  }

  private finish(victory: boolean): void {
    if (this.phase !== 'running') return;
    this.phase = 'result';
    root.dataset.gameState = 'result';
    root.classList.remove('is-boosting');
    touchControls.hidden = true;
    tutorial.hidden = true;
    powerMeter.hidden = true;
    hud.hidden = true;
    this.score = Math.floor(this.distance * .55) + this.bonusScore + (victory ? 450 : 0);
    if (this.score > this.save.bestScore) {
      this.save.bestScore = this.score;
      this.persist();
    }

    const starCount = victory
      ? 1 + (this.sparksCollected >= 36 ? 1 : 0) + (this.sparksCollected >= 58 && this.hearts >= 2 ? 1 : 0)
      : 1 + (this.currentBiome >= 2 ? 1 : 0);
    required<HTMLElement>('[data-result-icon]').textContent = victory ? '✦' : '♧';
    required<HTMLElement>('[data-result-kicker]').textContent = victory ? 'YILDIZ ÇAYIRI PARLADI' : 'KARAKAÇAN DİNLENİYOR';
    required<HTMLElement>('[data-result-title]').textContent = victory ? 'Masal tamamlandı!' : 'Bu yolculuk burada bitti';
    required<HTMLElement>('[data-result-message]').textContent = victory
      ? 'Keloğlan ve Karakaçan üç mührü de yerine ulaştırdı.'
      : 'Bir sonraki denemede ışıkları toplayıp daha da uzağa gidebilirsin.';
    required<HTMLElement>('[data-result-score]').textContent = this.score.toLocaleString('tr-TR');
    required<HTMLElement>('[data-result-distance]').textContent = `${Math.floor(this.distance)} m`;
    const stars = `${'★ '.repeat(starCount)}${'☆ '.repeat(3 - starCount)}`.trim();
    const starElement = required<HTMLElement>('[data-result-stars]');
    starElement.textContent = stars;
    starElement.setAttribute('aria-label', `${starCount} yıldız kazandın`);
    resultScreen.hidden = false;
    this.setModalLayer(resultScreen);
    focusNextFrame(required<HTMLButtonElement>('[data-restart-button]'));
    this.updateBestScoreUi();
    this.audio.relic();
    liveRegion.textContent = victory ? `Masalı tamamladın. ${this.score} puan.` : `Yolculuk bitti. ${this.score} puan.`;
  }

  private showMenu(): void {
    this.phase = 'menu';
    root.dataset.gameState = 'menu';
    root.classList.remove('is-boosting');
    loadingScreen.hidden = true;
    menuScreen.hidden = false;
    pauseScreen.hidden = true;
    resultScreen.hidden = true;
    fallbackScreen.hidden = true;
    hud.hidden = true;
    powerMeter.hidden = true;
    touchControls.hidden = true;
    tutorial.hidden = true;
    toast.hidden = true;
    rotateHint.hidden = true;
    this.setModalLayer(null);
    this.distance = 42;
    this.currentSpeed = 5;
    this.playerX = roadCenter(this.distance);
    this.rider.root.position.set(this.playerX, 0, PLAYER_Z);
    this.world.reset(this.distance);
    this.spawner.reset(112358);
    this.updateBestScoreUi();
    focusNextFrame(required<HTMLButtonElement>('[data-start-button]'));
  }

  private showFallback(): void {
    this.phase = 'fallback';
    root.dataset.gameState = 'fallback';
    loadingScreen.hidden = true;
    menuScreen.hidden = true;
    pauseScreen.hidden = true;
    resultScreen.hidden = true;
    hud.hidden = true;
    powerMeter.hidden = true;
    touchControls.hidden = true;
    fallbackScreen.hidden = false;
    this.setModalLayer(null);
    this.audio.silenceAmbience();
    focusNextFrame(required<HTMLAnchorElement>('.fallback-card .primary-button'));
    cancelAnimationFrame(this.animationFrame);
  }

  private updateCamera(delta: number): void {
    const desiredPosition = this.desiredCameraPosition;
    const desiredLook = this.desiredCameraLook;
    const calmFactor = this.save.calm ? 0 : 1;
    if (this.phase === 'menu') {
      const orbit = Math.sin(this.elapsed * .22) * .34 * calmFactor;
      desiredPosition.set(this.playerX + orbit * .5, 6.05 + orbit * .08, PLAYER_Z + 11.8 + orbit * .35);
      desiredLook.set(this.playerX + orbit * .18, 2.28 + orbit * .04, PLAYER_Z - 16.4);
    } else {
      const speedRatio = clamp((this.currentSpeed - 8) / 15, 0, 1);
      const boostAmount = this.boostTime > 0 ? 1 : 0;
      const currentRoadX = roadCenter(this.distance);
      const laneOffset = this.playerX - currentRoadX;
      const behindDistance = Math.max(0, this.distance - 10.5 - speedRatio * 2.2);
      const cameraRoadX = roadCenter(behindDistance);
      const lookAheadDistance = this.distance + 19 + speedRatio * 9;
      const roadAheadX = roadCenter(lookAheadDistance);
      const swayX = Math.sin(this.elapsed * .58) * .09 * calmFactor;
      const swayY = Math.sin(this.elapsed * .83 + 1.3) * .045 * calmFactor;
      const strafeLead = clamp(this.cameraLateralVelocity * .027, -.32, .32) * (this.save.calm ? .22 : 1);
      desiredPosition.set(
        cameraRoadX + laneOffset * .76 - strafeLead + swayX,
        6.15 + speedRatio * .34 + this.jumpY * .15 + swayY,
        PLAYER_Z + 11.45 + speedRatio * 1.65 + boostAmount * .72,
      );
      desiredLook.set(
        lerp(this.playerX, roadAheadX + laneOffset * .25, .52) + strafeLead * .2,
        2.22 + speedRatio * .08 + this.jumpY * .28,
        PLAYER_Z - 15.5 - speedRatio * 7.2,
      );
    }
    const positionEase = 1 - Math.exp(-delta * (this.phase === 'menu' ? 2.15 : this.save.calm ? 3.8 : 5.15));
    const lookEase = 1 - Math.exp(-delta * (this.save.calm ? 4.2 : 6.1));
    this.camera.position.lerp(desiredPosition, positionEase);
    this.cameraLook.lerp(desiredLook, lookEase);
    if (this.shakeTime > 0 && !this.save.calm) {
      const amount = this.shakeTime * .18;
      this.camera.position.x += (Math.random() - .5) * amount;
      this.camera.position.y += (Math.random() - .5) * amount;
    }
    this.camera.lookAt(this.cameraLook);
    const curveRoll = -roadHeading(this.distance) * .42;
    const strafeRoll = -this.cameraLateralVelocity * .0035;
    const targetRoll = this.phase === 'menu' || this.save.calm ? 0 : clamp(curveRoll + strafeRoll, -.035, .035);
    this.cameraRoll = THREE.MathUtils.lerp(this.cameraRoll, targetRoll, 1 - Math.exp(-delta * 4.4));
    this.camera.rotation.z += this.cameraRoll;

    const portrait = window.innerHeight > window.innerWidth;
    const speedRatio = clamp((this.currentSpeed - 8) / 15, 0, 1);
    const dynamicFov = speedRatio * (this.save.calm ? .8 : 2.4) + (this.boostTime > 0 ? (this.save.calm ? 2.4 : 5.8) : 0);
    const targetFov = (portrait ? 67 : 58) + dynamicFov;
    const nextFov = THREE.MathUtils.lerp(this.camera.fov, targetFov, 1 - Math.exp(-delta * 3.2));
    if (Math.abs(nextFov - this.camera.fov) > .001) {
      this.camera.fov = nextFov;
      this.camera.updateProjectionMatrix();
    }
  }

  private updateUi(): void {
    scoreLabel.textContent = this.score.toLocaleString('tr-TR');
    distanceLabel.textContent = `${Math.floor(this.distance)} m`;
    biomeLabel.textContent = BIOMES[biomeIndexAt(this.distance)].name;
    journeyProgress.style.width = `${clamp(this.distance / FINISH_DISTANCE * 100, 0, 100)}%`;
    heartsLabel.textContent = `${'♥ '.repeat(this.hearts)}${'♡ '.repeat(3 - this.hearts)}`.trim();
    heartsLabel.setAttribute('aria-label', `${this.hearts} can kaldı`);
    comboLabel.hidden = this.combo < 2;
    comboLabel.textContent = `Seri ×${this.combo}`;
    const powerRatio = clamp(this.power / 100, 0, 1);
    powerRing.style.strokeDashoffset = String(138.23 * (1 - powerRatio));
    const ready = this.power >= 99 && this.boostTime <= 0;
    powerMeter.classList.toggle('is-ready', ready);
    boostButton.disabled = !ready;
    if (this.boostTime > 0) {
      powerTitle.textContent = 'IŞIK GALOBU';
      powerCopy.textContent = `${Math.ceil(this.boostTime)} saniye`;
    } else if (ready) {
      powerTitle.textContent = 'IŞIK HAZIR';
      powerCopy.textContent = coarsePointer ? 'Düğmeye dokun' : 'Shift tuşuna bas';
    } else {
      powerTitle.textContent = 'MASAL IŞIĞI';
      powerCopy.textContent = 'Yıldızları topla';
    }
  }

  private toggleSound(): void {
    this.audio.toggle();
    this.save.sound = this.audio.enabled;
    this.persist();
    this.updateSoundUi();
  }

  private updateSoundUi(): void {
    soundButton.textContent = this.audio.enabled ? '♪' : '×';
    soundButton.setAttribute('aria-label', this.audio.enabled ? 'Sesi kapat' : 'Sesi aç');
    soundButton.setAttribute('aria-pressed', String(!this.audio.enabled));
    menuSoundIcon.textContent = this.audio.enabled ? '♪' : '×';
    menuSoundLabel.textContent = this.audio.enabled ? 'Ses açık' : 'Ses kapalı';
    menuSoundButton.setAttribute('aria-pressed', String(this.audio.enabled));
  }

  private updateCalmUi(): void {
    calmModeIcon.textContent = this.save.calm ? '●' : '◌';
    calmModeLabel.textContent = this.save.calm ? 'Sakin kamera açık' : 'Sakin kamera';
    calmModeButton.setAttribute('aria-pressed', String(this.save.calm));
  }

  private setModalLayer(dialog: HTMLElement | null): void {
    Array.from(root.children).forEach((child) => {
      if (child instanceof HTMLElement) child.inert = dialog !== null && child !== dialog && child !== liveRegion;
    });
  }

  private updateBestScoreUi(): void {
    bestScoreLabel.textContent = `En iyi yolculuk · ${this.save.bestScore.toLocaleString('tr-TR')} puan`;
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.save));
    } catch {
      // Oyun, özel tarama modunda kayıt olmadan da çalışır.
    }
  }

  private showToast(message: string): void {
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => { toast.hidden = true; }, 2200);
  }

  private showTutorial(icon: string, copy: string): void {
    tutorialIcon.textContent = icon;
    tutorialCopy.textContent = copy;
    tutorial.hidden = false;
  }
}

async function boot(): Promise<void> {
  try {
    loadingProgress.style.width = '22%';
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    const game = new MasalRoadGame();
    loadingProgress.style.width = '72%';
    await Promise.race([
      document.fonts.ready,
      new Promise<FontFaceSet>((resolve) => window.setTimeout(() => resolve(document.fonts), 700)),
    ]);
    loadingProgress.style.width = '100%';
    await new Promise<void>((resolve) => window.setTimeout(resolve, 180));
    game.ready();
  } catch (error) {
    console.error('Masal Yolu 3D başlatılamadı', error);
    root.dataset.gameState = 'fallback';
    loadingScreen.hidden = true;
    menuScreen.hidden = true;
    fallbackScreen.hidden = false;
  }
}

void boot();

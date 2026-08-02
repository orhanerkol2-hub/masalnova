import {
  _decorator,
  Color,
  Component,
  Graphics,
  Label,
  Node,
  sys,
  UIOpacity,
  UITransform,
} from 'cc';
import { GAME_CONFIG } from '../config/GameConfig';
import { getDifficulty } from '../core/DifficultyCurve';
import { GamePhase, GameSession } from '../core/GameSession';
import { HighScoreStore } from '../core/HighScoreStore';
import {
  createButton,
  createLabel,
  createUiNode,
  drawRoundedPanel,
  PALETTE,
  resizeUiNode,
} from '../presentation/ProceduralArt';
import { loadGeneratedGameArt } from '../presentation/GameArtLoader';
import { VillageScroller } from '../presentation/VillageScroller';
import { SpawnManager, type WorldEntity } from '../world/SpawnManager';
import { InputController } from './InputController';
import { RunnerController, type Bounds } from './RunnerController';

const { ccclass } = _decorator;

interface OverlayView {
  readonly root: Node;
  readonly backdrop: Graphics;
  readonly card: Graphics;
}

@ccclass('GameController')
export class GameController extends Component {
  private readonly session = new GameSession();
  private readonly highScores = new HighScoreStore(
    sys.localStorage,
    GAME_CONFIG.highScoreKey,
  );

  private initialized = false;
  private width: number = GAME_CONFIG.landscapeWidth;
  private height: number = GAME_CONFIG.landscapeHeight;
  private portrait = false;
  private groundY = -240;
  private invulnerability = 0;

  private backgroundLayer: Node | null = null;
  private worldLayer: Node | null = null;
  private hudLayer: Node | null = null;
  private village: VillageScroller | null = null;
  private spawner: SpawnManager | null = null;
  private runner: RunnerController | null = null;
  private runnerOpacity: UIOpacity | null = null;

  private scoreLabel: Label | null = null;
  private livesLabel: Label | null = null;
  private levelLabel: Label | null = null;
  private instructionLabel: Label | null = null;
  private pauseButton: Node | null = null;
  private hudStatusPanel: Graphics | null = null;
  private hudHintPanel: Graphics | null = null;

  private menuView: OverlayView | null = null;
  private pauseView: OverlayView | null = null;
  private gameOverView: OverlayView | null = null;
  private menuHighScoreLabel: Label | null = null;
  private gameOverScoreLabel: Label | null = null;
  private gameOverHighScoreLabel: Label | null = null;

  public initialize(width: number, height: number): void {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
    this.createLayers();
    this.createWorld();
    this.createHud();
    this.createMenu();
    this.createPauseMenu();
    this.createGameOverMenu();

    const inputController = this.node.addComponent(InputController);
    inputController.startListening({
      jump: () => this.handleJump(),
      togglePause: () => this.togglePause(),
      primaryAction: () => this.handlePrimaryAction(),
    });

    this.resize(width, height);
    this.showPhase(GamePhase.Menu);
    this.refreshHighScoreLabels();
  }

  public resize(width: number, height: number): void {
    if (!this.initialized) {
      return;
    }

    const previousWidth = this.width;
    const previousGroundY = this.groundY;
    this.width = width;
    this.height = height;
    this.portrait = height > width;
    const groundInset = this.portrait
      ? Math.max(168, Math.min(210, height * 0.145))
      : 118;
    this.groundY = -height / 2 + groundInset;

    for (const layer of [
      this.backgroundLayer,
      this.worldLayer,
      this.hudLayer,
      this.menuView?.root,
      this.pauseView?.root,
      this.gameOverView?.root,
    ]) {
      if (layer) {
        resizeUiNode(layer, width, height);
      }
    }

    this.village?.resize(width, height, this.groundY);
    if (this.runner) {
      this.runner.reflow(
        this.groundY,
        this.portrait ? -width * 0.27 : -width * 0.29,
      );
      this.layoutRunnerForPhase(this.session.phase);
    }
    this.spawner?.reflow(
      (width - previousWidth) / 2,
      this.groundY - previousGroundY,
    );

    this.layoutHud();
    this.resizeOverlay(this.menuView);
    this.resizeOverlay(this.pauseView);
    this.resizeOverlay(this.gameOverView);
  }

  protected override update(deltaTime: number): void {
    if (
      !this.initialized ||
      this.session.phase !== GamePhase.Running ||
      !this.runner ||
      !this.spawner ||
      !this.village
    ) {
      return;
    }

    // Large background-tab deltas would otherwise tunnel through collisions.
    const delta = Math.min(Math.max(deltaTime, 0), 0.05);
    this.session.tick(delta);
    const difficulty = getDifficulty(this.session.elapsedSeconds);
    const speedMultiplier = this.portrait
      ? 0.64
      : Math.min(1.28, Math.max(1, this.width / GAME_CONFIG.landscapeWidth));

    this.village.tick(
      delta,
      difficulty.scrollSpeed * speedMultiplier,
    );
    this.runner.tick(delta);
    this.spawner.tick(
      delta,
      difficulty,
      this.groundY,
      this.width / 2 + 115,
      -this.width / 2,
      speedMultiplier,
    );

    this.updateInvulnerability(delta);
    this.resolveCollisions();
    this.updateHud();
  }

  private createLayers(): void {
    this.backgroundLayer = createUiNode(
      'BackgroundLayer',
      this.node,
      this.width,
      this.height,
    );
    this.worldLayer = createUiNode(
      'WorldLayer',
      this.node,
      this.width,
      this.height,
    );
    this.hudLayer = createUiNode(
      'HudLayer',
      this.node,
      this.width,
      this.height,
    );
  }

  private createWorld(): void {
    if (!this.backgroundLayer || !this.worldLayer) {
      return;
    }

    this.village = new VillageScroller(this.backgroundLayer);
    this.spawner = new SpawnManager(this.worldLayer);

    const runnerNode = createUiNode('Runner', this.worldLayer, 78, 132);
    this.runnerOpacity = runnerNode.addComponent(UIOpacity);
    this.runner = runnerNode.addComponent(RunnerController);
    this.runner.initialize(this.groundY);

    loadGeneratedGameArt({
      background: (frame) => this.village?.applyGeneratedBackground(frame),
      runner: (frame) => this.runner?.applyGeneratedSprite(frame),
      star: (frame) => this.spawner?.setStarFrame(frame),
      testi: (frame) => this.spawner?.setTestiFrame(frame),
    });
  }

  private createHud(): void {
    if (!this.hudLayer) {
      return;
    }

    const statusPanelNode = createUiNode(
      'HudStatusPanel',
      this.hudLayer,
    );
    this.hudStatusPanel = statusPanelNode.addComponent(Graphics);

    const hintPanelNode = createUiNode('HudHintPanel', this.hudLayer);
    this.hudHintPanel = hintPanelNode.addComponent(Graphics);

    this.scoreLabel = createLabel(
      this.hudLayer,
      'ScoreLabel',
      'PUAN  ★ 0',
      32,
      230,
      56,
      PALETTE.ink,
    );
    this.scoreLabel.isBold = true;

    this.livesLabel = createLabel(
      this.hudLayer,
      'LivesLabel',
      'CAN  ♥ ♥ ♥',
      27,
      260,
      56,
      PALETTE.redDark,
    );
    this.livesLabel.isBold = true;

    this.levelLabel = createLabel(
      this.hudLayer,
      'LevelLabel',
      'SEVİYE 1',
      25,
      180,
      50,
      PALETTE.ink,
    );
    this.levelLabel.isBold = true;

    this.instructionLabel = createLabel(
      this.hudLayer,
      'InstructionLabel',
      'DOKUN / TIKLA / BOŞLUK: 3 KEZ ZIPLA',
      20,
      440,
      42,
      new Color(75, 61, 52, 220),
    );

    this.pauseButton = createButton(
      this.hudLayer,
      'PauseButton',
      'Ⅱ',
      96,
      96,
      () => this.togglePause(),
    );
  }

  private createMenu(): void {
    this.menuView = this.createOverlay('MenuLayer', 620, 420);
    const cardNode = this.menuView.card.node;

    const title = createLabel(
      cardNode,
      'Title',
      'KELOĞLAN',
      52,
      520,
      74,
      PALETTE.gold,
    );
    title.isBold = true;
    title.node.setPosition(0, 132, 0);

    const taleLabel = createLabel(
      cardNode,
      'TaleLabel',
      'BİR ANADOLU MASALI',
      17,
      340,
      32,
      new Color(224, 191, 116, 255),
    );
    taleLabel.node.setPosition(0, 181, 0);

    const subtitle = createLabel(
      cardNode,
      'Subtitle',
      'YILDIZ PEŞİNDE',
      30,
      500,
      50,
      PALETTE.white,
    );
    subtitle.isBold = true;
    subtitle.node.setPosition(0, 79, 0);

    const description = createLabel(
      cardNode,
      'Description',
      'Yıldızları topla, testileri ve engelleri aş!',
      22,
      500,
      68,
      new Color(232, 235, 241, 255),
    );
    description.node.setPosition(0, 18, 0);

    this.menuHighScoreLabel = createLabel(
      cardNode,
      'MenuHighScore',
      'EN YÜKSEK  0',
      22,
      330,
      44,
      PALETTE.gold,
    );
    this.menuHighScoreLabel.node.setPosition(0, -52, 0);

    const button = createButton(
      cardNode,
      'StartButton',
      'BAŞLA',
      270,
      82,
      () => this.startNewRun(),
    );
    button.setPosition(0, -132, 0);
  }

  private createPauseMenu(): void {
    this.pauseView = this.createOverlay('PauseLayer', 560, 330);
    const cardNode = this.pauseView.card.node;

    const title = createLabel(
      cardNode,
      'PauseTitle',
      'MOLA',
      48,
      420,
      70,
      PALETTE.gold,
    );
    title.isBold = true;
    title.node.setPosition(0, 82, 0);

    const hint = createLabel(
      cardNode,
      'PauseHint',
      'Kısa bir nefes, sonra macera devam!',
      22,
      420,
      48,
      PALETTE.white,
    );
    hint.node.setPosition(0, 22, 0);

    const button = createButton(
      cardNode,
      'ResumeButton',
      'DEVAM ET',
      260,
      82,
      () => this.resumeRun(),
    );
    button.setPosition(0, -80, 0);
  }

  private createGameOverMenu(): void {
    this.gameOverView = this.createOverlay('GameOverLayer', 600, 410);
    const cardNode = this.gameOverView.card.node;

    const title = createLabel(
      cardNode,
      'GameOverTitle',
      'OYUN BİTTİ',
      46,
      480,
      70,
      PALETTE.gold,
    );
    title.isBold = true;
    title.node.setPosition(0, 126, 0);

    this.gameOverScoreLabel = createLabel(
      cardNode,
      'FinalScore',
      'PUAN  0',
      29,
      420,
      55,
      PALETTE.white,
    );
    this.gameOverScoreLabel.isBold = true;
    this.gameOverScoreLabel.node.setPosition(0, 48, 0);

    this.gameOverHighScoreLabel = createLabel(
      cardNode,
      'FinalHighScore',
      'EN YÜKSEK  0',
      22,
      420,
      48,
      PALETTE.gold,
    );
    this.gameOverHighScoreLabel.node.setPosition(0, -7, 0);

    const button = createButton(
      cardNode,
      'RestartButton',
      'TEKRAR OYNA',
      300,
      82,
      () => this.startNewRun(),
    );
    button.setPosition(0, -104, 0);
  }

  private createOverlay(
    name: string,
    cardWidth: number,
    cardHeight: number,
  ): OverlayView {
    const root = createUiNode(name, this.node, this.width, this.height);
    const backdrop = root.addComponent(Graphics);
    const cardNode = createUiNode(
      `${name}Card`,
      root,
      cardWidth,
      cardHeight,
    );
    const card = cardNode.addComponent(Graphics);
    drawRoundedPanel(
      card,
      cardWidth,
      cardHeight,
      PALETTE.panel,
      32,
      PALETTE.gold,
      4,
    );
    return { root, backdrop, card };
  }

  private resizeOverlay(view: OverlayView | null): void {
    if (!view) {
      return;
    }
    view.backdrop.clear();
    view.backdrop.fillColor = new Color(25, 29, 43, 178);
    view.backdrop.rect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
    );
    view.backdrop.fill();

    const maximumCardWidth = Math.max(
      1,
      this.width - (this.portrait ? 56 : 80),
    );
    const maximumCardHeight = Math.max(
      1,
      this.height - (this.portrait ? 210 : 90),
    );
    const cardSize = view.card.node.getComponent(UITransform)?.contentSize;
    const cardWidth = cardSize?.width ?? 600;
    const cardHeight = cardSize?.height ?? 420;
    const scale = Math.min(
      1,
      maximumCardWidth / cardWidth,
      maximumCardHeight / cardHeight,
    );
    view.card.node.setScale(scale, scale, 1);

    if (view === this.menuView) {
      view.card.node.setPosition(
        this.portrait ? 0 : this.width * 0.22,
        this.portrait ? this.height * 0.1 : 0,
        0,
      );
    } else {
      view.card.node.setPosition(0, 0, 0);
    }
  }

  private layoutHud(): void {
    if (
      !this.scoreLabel ||
      !this.livesLabel ||
      !this.levelLabel ||
      !this.instructionLabel ||
      !this.pauseButton ||
      !this.hudStatusPanel ||
      !this.hudHintPanel
    ) {
      return;
    }

    const top = this.height / 2 - (this.portrait ? 116 : 54);
    const statusWidth = this.portrait
      ? Math.min(672, this.width - 48)
      : Math.max(1, this.width - 112);
    const statusHeight = this.portrait ? 128 : 68;
    const statusX = this.portrait ? 0 : -40;
    const statusY = this.portrait ? top - 31 : top;
    resizeUiNode(this.hudStatusPanel.node, statusWidth, statusHeight);
    drawRoundedPanel(
      this.hudStatusPanel,
      statusWidth,
      statusHeight,
      new Color(255, 246, 218, 220),
      statusHeight / 2,
      new Color(137, 90, 44, 190),
      2,
    );
    this.hudStatusPanel.node.setPosition(statusX, statusY, 0);

    const hintWidth = Math.min(
      this.portrait ? this.width - 70 : 520,
      520,
    );
    resizeUiNode(this.hudHintPanel.node, hintWidth, 44);
    drawRoundedPanel(
      this.hudHintPanel,
      hintWidth,
      44,
      new Color(255, 246, 218, 205),
      22,
      new Color(137, 90, 44, 150),
      2,
    );

    this.scoreLabel.node.setPosition(
      -this.width / 2 + (this.portrait ? 144 : 135),
      top,
      0,
    );
    this.pauseButton.setPosition(this.width / 2 - 72, top, 0);

    if (this.portrait) {
      this.livesLabel.node.setPosition(
        -this.width / 2 + 154,
        top - 58,
        0,
      );
      this.levelLabel.node.setPosition(this.width / 2 - 114, top - 58, 0);
      this.instructionLabel.node.setPosition(
        0,
        -this.height / 2 + 92,
        0,
      );
      this.hudHintPanel.node.setPosition(
        0,
        -this.height / 2 + 92,
        0,
      );
    } else {
      this.livesLabel.node.setPosition(0, top, 0);
      this.levelLabel.node.setPosition(this.width / 2 - 190, top, 0);
      this.instructionLabel.node.setPosition(
        0,
        -this.height / 2 + 43,
        0,
      );
      this.hudHintPanel.node.setPosition(
        0,
        -this.height / 2 + 43,
        0,
      );
    }
  }

  private startNewRun(): void {
    this.session.startNewRun();
    this.invulnerability = 0;
    if (this.runnerOpacity) {
      this.runnerOpacity.opacity = 255;
    }
    this.runner?.reset();
    this.spawner?.reset();
    this.updateHud();
    this.showPhase(GamePhase.Running);
  }

  private handleJump(): void {
    if (this.session.phase === GamePhase.Running) {
      this.runner?.jump();
    }
  }

  private handlePrimaryAction(): void {
    switch (this.session.phase) {
      case GamePhase.Menu:
      case GamePhase.GameOver:
        this.startNewRun();
        break;
      case GamePhase.Paused:
        this.resumeRun();
        break;
      case GamePhase.Running:
        this.handleJump();
        break;
      default:
        break;
    }
  }

  private togglePause(): void {
    if (this.session.pause()) {
      this.showPhase(GamePhase.Paused);
    } else if (this.session.phase === GamePhase.Paused) {
      this.resumeRun();
    }
  }

  private resumeRun(): void {
    if (this.session.resume()) {
      this.showPhase(GamePhase.Running);
    }
  }

  private showPhase(phase: GamePhase): void {
    if (this.hudLayer) {
      this.hudLayer.active = phase !== GamePhase.Menu;
    }
    if (this.pauseButton) {
      this.pauseButton.active = phase === GamePhase.Running;
    }
    if (this.menuView) {
      this.menuView.root.active = phase === GamePhase.Menu;
    }
    if (this.pauseView) {
      this.pauseView.root.active = phase === GamePhase.Paused;
    }
    if (this.gameOverView) {
      this.gameOverView.root.active = phase === GamePhase.GameOver;
    }
    this.layoutRunnerForPhase(phase);
  }

  private layoutRunnerForPhase(phase: GamePhase): void {
    if (!this.runner) {
      return;
    }
    const presentationScale =
      phase === GamePhase.Menu
        ? 2.3
        : this.portrait
          ? 1.08
          : 1;
    this.runner.setPresentationScale(presentationScale);
  }

  private updateHud(): void {
    if (this.scoreLabel) {
      this.scoreLabel.string = `PUAN  ★ ${this.session.score}`;
    }
    if (this.livesLabel) {
      const hearts = Array.from(
        { length: GAME_CONFIG.initialLives },
        (_, index) => (index < this.session.lives ? '♥' : '♡'),
      ).join(' ');
      this.livesLabel.string = `CAN  ${hearts}`;
    }
    if (this.levelLabel) {
      const difficulty = getDifficulty(this.session.elapsedSeconds);
      this.levelLabel.string = `SEVİYE ${difficulty.level}`;
    }
  }

  private updateInvulnerability(deltaSeconds: number): void {
    if (this.invulnerability <= 0) {
      if (this.runnerOpacity) {
        this.runnerOpacity.opacity = 255;
      }
      return;
    }

    this.invulnerability = Math.max(0, this.invulnerability - deltaSeconds);
    if (this.runnerOpacity) {
      this.runnerOpacity.opacity =
        Math.sin(this.invulnerability * 30) > 0 ? 90 : 255;
    }
  }

  private resolveCollisions(): void {
    if (!this.runner || !this.spawner) {
      return;
    }
    for (const entity of this.spawner.getActiveEntities()) {
      const runnerBounds =
        entity.kind === 'star'
          ? this.runner.getCollectBounds()
          : this.runner.getBounds();
      if (
        entity.consumed ||
        !this.overlaps(runnerBounds, this.spawner.getBounds(entity))
      ) {
        continue;
      }

      if (entity.kind === 'star') {
        this.collectStar(entity);
      } else if (this.invulnerability <= 0) {
        this.hitObstacle(entity);
        if (this.session.phase === GamePhase.GameOver) {
          break;
        }
      }
    }
  }

  private collectStar(entity: WorldEntity): void {
    if (this.session.collectStar()) {
      this.spawner?.consume(entity);
    }
  }

  private hitObstacle(entity: WorldEntity): void {
    if (!this.session.hitObstacle()) {
      return;
    }

    this.spawner?.consume(entity);
    this.runner?.knockUp();
    this.invulnerability = GAME_CONFIG.hitInvulnerabilitySeconds;

    if (this.session.phase === GamePhase.GameOver) {
      const highScore = this.highScores.commitIfHigher(this.session.score);
      if (this.gameOverScoreLabel) {
        this.gameOverScoreLabel.string = `PUAN  ${this.session.score}`;
      }
      if (this.gameOverHighScoreLabel) {
        this.gameOverHighScoreLabel.string = `EN YÜKSEK  ${highScore}`;
      }
      this.refreshHighScoreLabels();
      this.showPhase(GamePhase.GameOver);
    }
  }

  private refreshHighScoreLabels(): void {
    const highScore = this.highScores.read();
    if (this.menuHighScoreLabel) {
      this.menuHighScoreLabel.string = `EN YÜKSEK  ${highScore}`;
    }
    if (this.gameOverHighScoreLabel) {
      this.gameOverHighScoreLabel.string = `EN YÜKSEK  ${highScore}`;
    }
  }

  private overlaps(first: Bounds, second: Bounds): boolean {
    return (
      first.left < second.right &&
      first.right > second.left &&
      first.bottom < second.top &&
      first.top > second.bottom
    );
  }

}

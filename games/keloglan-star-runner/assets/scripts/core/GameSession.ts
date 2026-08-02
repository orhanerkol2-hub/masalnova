import { GAME_CONFIG, type GameConfig } from '../config/GameConfig';

export enum GamePhase {
  Menu = 'menu',
  Running = 'running',
  Paused = 'paused',
  GameOver = 'game-over',
}

/**
 * Engine-independent game state. Components may ask this class to transition,
 * but cannot mutate score, lives or time directly.
 */
export class GameSession {
  private currentPhase = GamePhase.Menu;
  private currentScore = 0;
  private currentLives: number;
  private elapsed = 0;

  public constructor(private readonly config: GameConfig = GAME_CONFIG) {
    this.currentLives = config.initialLives;
  }

  public get phase(): GamePhase {
    return this.currentPhase;
  }

  public get score(): number {
    return this.currentScore;
  }

  public get lives(): number {
    return this.currentLives;
  }

  public get elapsedSeconds(): number {
    return this.elapsed;
  }

  public startNewRun(): void {
    this.currentScore = 0;
    this.currentLives = this.config.initialLives;
    this.elapsed = 0;
    this.currentPhase = GamePhase.Running;
  }

  public tick(deltaSeconds: number): void {
    if (
      this.currentPhase !== GamePhase.Running ||
      !Number.isFinite(deltaSeconds) ||
      deltaSeconds <= 0
    ) {
      return;
    }

    this.elapsed += deltaSeconds;
  }

  public collectStar(): boolean {
    if (this.currentPhase !== GamePhase.Running) {
      return false;
    }

    this.currentScore += this.config.pointsPerStar;
    return true;
  }

  /**
   * Applies exactly one hit. Invulnerability is intentionally handled by the
   * runtime controller because it depends on frame time and presentation.
   */
  public hitObstacle(): boolean {
    if (this.currentPhase !== GamePhase.Running) {
      return false;
    }

    this.currentLives = Math.max(0, this.currentLives - 1);
    if (this.currentLives === 0) {
      this.currentPhase = GamePhase.GameOver;
    }
    return true;
  }

  public pause(): boolean {
    if (this.currentPhase !== GamePhase.Running) {
      return false;
    }
    this.currentPhase = GamePhase.Paused;
    return true;
  }

  public resume(): boolean {
    if (this.currentPhase !== GamePhase.Paused) {
      return false;
    }
    this.currentPhase = GamePhase.Running;
    return true;
  }
}

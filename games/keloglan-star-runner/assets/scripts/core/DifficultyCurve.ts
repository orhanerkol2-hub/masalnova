import { GAME_CONFIG, type GameConfig } from '../config/GameConfig';

export interface DifficultySnapshot {
  readonly level: number;
  readonly scrollSpeed: number;
  readonly obstacleInterval: number;
  readonly starInterval: number;
}

/**
 * Returns a deterministic difficulty snapshot for a given run time.
 * Level one starts immediately; every configured time slice adds one level.
 */
export function getDifficulty(
  elapsedSeconds: number,
  config: GameConfig = GAME_CONFIG,
): DifficultySnapshot {
  const safeElapsed = Number.isFinite(elapsedSeconds)
    ? Math.max(0, elapsedSeconds)
    : 0;
  const level =
    Math.floor(safeElapsed / config.levelDurationSeconds) + 1;
  const completedLevels = level - 1;

  return {
    level,
    scrollSpeed: Math.min(
      config.maximumScrollSpeed,
      config.baseScrollSpeed + completedLevels * config.speedPerLevel,
    ),
    obstacleInterval: Math.max(
      config.minimumObstacleInterval,
      config.initialObstacleInterval -
        completedLevels * config.obstacleIntervalStep,
    ),
    starInterval: Math.max(
      config.minimumStarInterval,
      config.initialStarInterval - completedLevels * config.starIntervalStep,
    ),
  };
}

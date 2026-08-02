import { GAME_CONFIG, type GameConfig } from '../config/GameConfig';

export interface DifficultySnapshot {
  readonly level: number;
  readonly scrollSpeed: number;
  readonly obstacleInterval: number;
  readonly starInterval: number;
}

/**
 * Returns a deterministic difficulty snapshot for a given run time.
 * Level one starts immediately. The visible level changes in configured time
 * slices, while speed and spawn pressure ramp continuously between boundaries
 * so the game never changes pace in a single abrupt frame.
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
  const difficultyProgress = safeElapsed / config.levelDurationSeconds;

  return {
    level,
    scrollSpeed: Math.min(
      config.maximumScrollSpeed,
      config.baseScrollSpeed + difficultyProgress * config.speedPerLevel,
    ),
    obstacleInterval: Math.max(
      config.minimumObstacleInterval,
      config.initialObstacleInterval -
        difficultyProgress * config.obstacleIntervalStep,
    ),
    starInterval: Math.max(
      config.minimumStarInterval,
      config.initialStarInterval - difficultyProgress * config.starIntervalStep,
    ),
  };
}

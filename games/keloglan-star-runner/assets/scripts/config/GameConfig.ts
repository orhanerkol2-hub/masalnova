/**
 * Central balancing values. Keeping these values out of the components makes
 * tuning possible without changing gameplay control flow.
 */
export const GAME_CONFIG = Object.freeze({
  initialLives: 3,
  pointsPerStar: 10,
  highScoreKey: 'masalnova.keloglan-star-runner.highscore.v1',

  gravity: -1900,
  maximumJumps: 3,
  jumpVelocity: 790,
  airJumpVelocity: 620,
  airJumpBoostVelocity: 90,
  maximumJumpVelocity: 960,
  hitBounceVelocity: 350,
  hitInvulnerabilitySeconds: 1.35,

  levelDurationSeconds: 15,
  baseScrollSpeed: 360,
  speedPerLevel: 34,
  maximumScrollSpeed: 700,

  initialObstacleInterval: 2.25,
  // Give new players two collectible beats before the first hazard arrives.
  firstObstacleDelay: 3.4,
  minimumObstacleInterval: 1.12,
  obstacleIntervalStep: 0.12,

  initialStarInterval: 1.08,
  firstStarDelay: 0.7,
  minimumStarInterval: 0.62,
  starIntervalStep: 0.055,

  // A collectible must never visually bait the player into an obstacle.
  minimumStarObstacleGap: 230,
  maximumStarObstacleGap: 420,
  starObstacleSafetySeconds: 0.72,
  blockedSpawnRetrySeconds: 0.12,

  landscapeWidth: 1280,
  landscapeHeight: 720,
  portraitWidth: 720,
  portraitHeight: 1280,
});

export type GameConfig = typeof GAME_CONFIG;

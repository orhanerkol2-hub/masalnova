import { GAME_CONFIG } from '../config/GameConfig';

/**
 * Converts the current world speed into a fair center-to-center clearance
 * between stars and obstacles. The minimum is deliberately generous on narrow
 * phones; the maximum keeps late-game patterns challenging on desktop.
 */
export function getStarObstacleSafetyDistance(
  scrollSpeed: number,
): number {
  const safeSpeed = Number.isFinite(scrollSpeed)
    ? Math.max(0, scrollSpeed)
    : 0;
  return Math.min(
    GAME_CONFIG.maximumStarObstacleGap,
    Math.max(
      GAME_CONFIG.minimumStarObstacleGap,
      safeSpeed * GAME_CONFIG.starObstacleSafetySeconds,
    ),
  );
}

/**
 * Fails closed for invalid values so a broken coordinate can never create an
 * unfair mixed spawn.
 */
export function hasHorizontalClearance(
  candidateX: number,
  oppositePositions: readonly number[],
  requiredGap: number,
): boolean {
  if (
    !Number.isFinite(candidateX) ||
    !Number.isFinite(requiredGap) ||
    requiredGap < 0
  ) {
    return false;
  }

  return oppositePositions.every(
    (position) =>
      Number.isFinite(position) &&
      Math.abs(position - candidateX) >= requiredGap,
  );
}

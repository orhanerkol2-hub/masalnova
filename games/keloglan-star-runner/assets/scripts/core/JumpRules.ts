import { GAME_CONFIG } from '../config/GameConfig';

/**
 * Returns the vertical velocity for the next accepted jump.
 *
 * The first input starts the normal ground jump. The two air jumps either
 * restore upward momentum or add a small boost when the player taps quickly.
 * Capping the result prevents rapid taps from launching Keloğlan off-screen.
 */
export function getNextJumpVelocity(
  currentVelocity: number,
  jumpsUsed: number,
): number | null {
  if (
    !Number.isFinite(currentVelocity) ||
    !Number.isInteger(jumpsUsed) ||
    jumpsUsed < 0 ||
    jumpsUsed >= GAME_CONFIG.maximumJumps
  ) {
    return null;
  }

  if (jumpsUsed === 0) {
    return GAME_CONFIG.jumpVelocity;
  }

  return Math.min(
    GAME_CONFIG.maximumJumpVelocity,
    Math.max(
      GAME_CONFIG.airJumpVelocity,
      currentVelocity + GAME_CONFIG.airJumpBoostVelocity,
    ),
  );
}

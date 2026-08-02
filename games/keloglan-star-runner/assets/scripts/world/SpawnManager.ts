import {
  Color,
  Graphics,
  Node,
  Sprite,
  SpriteFrame,
} from 'cc';
import type { DifficultySnapshot } from '../core/DifficultyCurve';
import type { Bounds } from '../components/RunnerController';
import { GAME_CONFIG } from '../config/GameConfig';
import {
  getStarObstacleSafetyDistance,
  hasHorizontalClearance,
} from '../core/SpawnSafety';
import {
  createUiNode,
  drawFivePointStar,
  PALETTE,
} from '../presentation/ProceduralArt';

export type EntityKind = 'star' | 'obstacle';

export interface WorldEntity {
  readonly node: Node;
  readonly kind: EntityKind;
  readonly width: number;
  readonly height: number;
  baseY: number;
  readonly phase: number;
  consumed: boolean;
}

/**
 * Owns all short-lived world objects. Destroyed entities are removed from the
 * active array at the beginning of the next tick.
 */
export class SpawnManager {
  private entities: WorldEntity[] = [];
  private obstacleTimer: number = GAME_CONFIG.firstObstacleDelay;
  private starTimer: number = GAME_CONFIG.firstStarDelay;
  private obstaclePending = false;
  private elapsed = 0;
  private starFrame: SpriteFrame | null = null;
  private testiFrame: SpriteFrame | null = null;

  public constructor(private readonly parent: Node) {}

  public setStarFrame(frame: SpriteFrame): void {
    this.starFrame = frame;
  }

  public setTestiFrame(frame: SpriteFrame): void {
    this.testiFrame = frame;
  }

  public reset(): void {
    for (const entity of this.entities) {
      entity.node.destroy();
    }
    this.entities = [];
    this.obstacleTimer = GAME_CONFIG.firstObstacleDelay;
    this.starTimer = GAME_CONFIG.firstStarDelay;
    this.obstaclePending = false;
    this.elapsed = 0;
  }

  /**
   * Keeps active entities stable when a browser resize changes the design
   * canvas. Their distance from the right edge and height above the road remain
   * unchanged, so mobile browser chrome does not silently clear gameplay.
   */
  public reflow(horizontalShift: number, groundShift: number): void {
    for (const entity of this.entities) {
      const position = entity.node.position;
      entity.baseY += groundShift;
      entity.node.setPosition(
        position.x + horizontalShift,
        position.y + groundShift,
        0,
      );
    }
  }

  public tick(
    deltaSeconds: number,
    difficulty: DifficultySnapshot,
    groundY: number,
    spawnX: number,
    leftBoundary: number,
    speedMultiplier: number,
  ): void {
    this.elapsed += deltaSeconds;
    const scrollSpeed = difficulty.scrollSpeed * speedMultiplier;
    this.obstacleTimer -= deltaSeconds;
    this.starTimer -= deltaSeconds;
    const safetyDistance =
      getStarObstacleSafetyDistance(scrollSpeed);

    if (this.obstacleTimer <= 0) {
      this.obstaclePending = true;
    }

    if (this.obstaclePending) {
      if (this.hasSafeGap('obstacle', spawnX, safetyDistance)) {
        this.spawnObstacle(spawnX, groundY);
        const variance = 0.88 + Math.random() * 0.3;
        this.obstacleTimer = difficulty.obstacleInterval * variance;
        this.obstaclePending = false;
      }
    }

    // A due obstacle temporarily owns the spawn lane. Otherwise a dense late-
    // game star stream could postpone obstacles forever.
    if (this.starTimer <= 0 && !this.obstaclePending) {
      const starX = spawnX + Math.random() * 90;
      if (this.hasSafeGap('star', starX, safetyDistance)) {
        this.spawnStar(starX, groundY);
        const variance = 0.84 + Math.random() * 0.32;
        this.starTimer = difficulty.starInterval * variance;
      } else {
        this.starTimer = GAME_CONFIG.blockedSpawnRetrySeconds;
      }
    }

    for (const entity of this.entities) {
      if (entity.consumed) {
        continue;
      }
      const position = entity.node.position;
      const bob =
        entity.kind === 'star'
          ? Math.sin(this.elapsed * 5 + entity.phase) * 8
          : 0;
      entity.node.setPosition(
        position.x - scrollSpeed * deltaSeconds,
        entity.baseY + bob,
        0,
      );
      if (entity.kind === 'star') {
        entity.node.angle -= deltaSeconds * 75;
      }
      if (entity.node.position.x < leftBoundary - 140) {
        this.consume(entity);
      }
    }

    this.entities = this.entities.filter((entity) => !entity.consumed);
  }

  public getActiveEntities(): readonly WorldEntity[] {
    return this.entities;
  }

  public getBounds(entity: WorldEntity): Bounds {
    const position = entity.node.position;
    const inset = entity.kind === 'star' ? 7 : 4;
    return {
      left: position.x - entity.width / 2 + inset,
      right: position.x + entity.width / 2 - inset,
      bottom: position.y - entity.height / 2 + inset,
      top: position.y + entity.height / 2 - inset,
    };
  }

  public consume(entity: WorldEntity): void {
    if (entity.consumed) {
      return;
    }
    entity.consumed = true;
    entity.node.destroy();
  }

  private hasSafeGap(
    kind: EntityKind,
    candidateX: number,
    requiredGap: number,
  ): boolean {
    const oppositePositions = this.entities
      .filter(
        (entity) =>
          !entity.consumed &&
          entity.kind !== kind,
      )
      .map((entity) => entity.node.position.x);
    return hasHorizontalClearance(
      candidateX,
      oppositePositions,
      requiredGap,
    );
  }

  private spawnStar(spawnX: number, groundY: number): void {
    const size = this.starFrame ? 64 : 52;
    const node = createUiNode('Star', this.parent, size, size);
    if (this.starFrame) {
      const sprite = node.addComponent(Sprite);
      sprite.sizeMode = Sprite.SizeMode.CUSTOM;
      sprite.spriteFrame = this.starFrame;
    } else {
      const graphics = node.addComponent(Graphics);
      drawFivePointStar(graphics, 25, 11);
    }

    const heightVariant = Math.random();
    const centerY =
      heightVariant < 0.52
        ? groundY + 102
        : heightVariant < 0.82
          ? groundY + 165
          : groundY + 225;
    node.setPosition(spawnX, centerY, 0);
    this.entities.push({
      node,
      kind: 'star',
      width: size,
      height: size,
      baseY: centerY,
      phase: Math.random() * Math.PI * 2,
      consumed: false,
    });
  }

  private spawnObstacle(spawnX: number, groundY: number): void {
    const variant = Math.random();
    const width = variant < 0.48 ? 82 : variant < 0.78 ? 96 : 68;
    const height = variant < 0.48 ? 86 : variant < 0.78 ? 60 : 90;
    const node = createUiNode('Obstacle', this.parent, width, height);

    if (variant < 0.48 && this.testiFrame) {
      const sprite = node.addComponent(Sprite);
      sprite.sizeMode = Sprite.SizeMode.CUSTOM;
      sprite.spriteFrame = this.testiFrame;
    } else {
      const graphics = node.addComponent(Graphics);
      if (variant < 0.48) {
        this.drawTesti(graphics, width, height);
      } else if (variant < 0.78) {
        this.drawStoneWall(graphics, width, height);
      } else {
        this.drawHaystack(graphics, width, height);
      }
    }

    const centerY = groundY + height / 2;
    node.setPosition(spawnX, centerY, 0);
    this.entities.push({
      node,
      kind: 'obstacle',
      width,
      height,
      baseY: centerY,
      phase: 0,
      consumed: false,
    });
  }

  private drawTesti(
    graphics: Graphics,
    width: number,
    height: number,
  ): void {
    graphics.fillColor = new Color(188, 78, 43, 255);
    graphics.ellipse(0, -height * 0.14, width * 0.39, height * 0.34);
    graphics.roundRect(
      -width * 0.15,
      height * 0.08,
      width * 0.3,
      height * 0.34,
      7,
    );
    graphics.fill();
    graphics.lineWidth = 5;
    graphics.strokeColor = new Color(245, 210, 148, 255);
    graphics.arc(
      width * 0.23,
      height * 0.18,
      width * 0.22,
      -Math.PI * 0.6,
      Math.PI * 0.66,
    );
    graphics.stroke();
    graphics.lineWidth = 4;
    graphics.strokeColor = new Color(38, 137, 156, 255);
    graphics.moveTo(-width * 0.34, -height * 0.13);
    graphics.lineTo(width * 0.34, -height * 0.13);
    graphics.stroke();
  }

  private drawStoneWall(
    graphics: Graphics,
    width: number,
    height: number,
  ): void {
    graphics.fillColor = new Color(132, 119, 99, 255);
    graphics.roundRect(-width / 2, -height / 2, width, height, 10);
    graphics.fill();
    graphics.lineWidth = 4;
    graphics.strokeColor = new Color(94, 82, 68, 255);
    graphics.moveTo(-width / 2, -height * 0.05);
    graphics.lineTo(width / 2, -height * 0.05);
    graphics.moveTo(-width * 0.2, -height / 2);
    graphics.lineTo(-width * 0.2, -height * 0.05);
    graphics.moveTo(width * 0.24, -height * 0.05);
    graphics.lineTo(width * 0.24, height / 2);
    graphics.stroke();
    graphics.fillColor = new Color(164, 150, 125, 255);
    graphics.ellipse(
      -width * 0.2,
      height * 0.2,
      width * 0.2,
      height * 0.18,
    );
    graphics.fill();
  }

  private drawHaystack(
    graphics: Graphics,
    width: number,
    height: number,
  ): void {
    graphics.fillColor = new Color(232, 177, 62, 255);
    graphics.ellipse(0, -height * 0.2, width / 2, height * 0.34);
    graphics.ellipse(0, height * 0.14, width * 0.42, height * 0.39);
    graphics.fill();
    graphics.lineWidth = 3;
    graphics.strokeColor = PALETTE.goldDark;
    for (let offset = -18; offset <= 18; offset += 12) {
      graphics.moveTo(offset, -height * 0.42);
      graphics.lineTo(offset * 0.55, height * 0.42);
    }
    graphics.stroke();
  }
}

import {
  _decorator,
  Color,
  Component,
  Graphics,
  Layers,
  Node,
  Sprite,
  SpriteFrame,
  UITransform,
} from 'cc';
import { GAME_CONFIG } from '../config/GameConfig';
import { getNextJumpVelocity } from '../core/JumpRules';
import {
  createUiNode,
  PALETTE,
} from '../presentation/ProceduralArt';

const { ccclass } = _decorator;

export interface Bounds {
  readonly left: number;
  readonly right: number;
  readonly bottom: number;
  readonly top: number;
}

@ccclass('RunnerController')
export class RunnerController extends Component {
  private groundY = 0;
  private verticalVelocity = 0;
  private grounded = true;
  private jumpsUsed = 0;
  private runTime = 0;
  private artRoot: Node | null = null;
  private artBaseY = 0;
  private presentationScale = 1;

  public initialize(groundY: number): void {
    this.node.layer = Layers.Enum.UI_2D;
    this.node.getComponent(UITransform)?.setContentSize(78, 132);
    this.groundY = groundY;
    this.drawKeloglan();
    this.reset();
  }

  public reset(): void {
    this.verticalVelocity = 0;
    this.grounded = true;
    this.jumpsUsed = 0;
    this.runTime = 0;
    this.node.setPosition(this.node.position.x, this.groundY, 0);
    this.artRoot?.setPosition(0, this.getPresentationBaseY(), 0);
    if (this.artRoot) {
      this.artRoot.angle = 0;
    }
  }

  /**
   * Replaces the lightweight vector fallback with the generated Keloğlan art.
   * The collision box intentionally stays independent of the illustration.
   */
  public applyGeneratedSprite(frame: SpriteFrame): void {
    this.artRoot?.destroy();
    this.artRoot = createUiNode('KeloglanPainting', this.node, 140, 192);
    this.artBaseY = 96;
    this.artRoot.setPosition(0, this.getPresentationBaseY(), 0);
    this.artRoot.setScale(
      this.presentationScale,
      this.presentationScale,
      1,
    );

    const sprite = this.artRoot.addComponent(Sprite);
    sprite.sizeMode = Sprite.SizeMode.CUSTOM;
    sprite.spriteFrame = frame;
  }

  public setGroundY(groundY: number): void {
    this.groundY = groundY;
    this.reset();
  }

  /**
   * Repositions the runner after a viewport change without cancelling a jump.
   * This matters on mobile browsers whose address bar changes the viewport
   * height while the player is running.
   */
  public reflow(groundY: number, x: number): void {
    const jumpOffset = this.grounded
      ? 0
      : Math.max(0, this.node.position.y - this.groundY);
    this.groundY = groundY;
    this.node.setPosition(x, groundY + jumpOffset, 0);
  }

  /**
   * Scales only the illustration. The stable, slightly smaller hitbox keeps
   * touch play forgiving and avoids orientation-dependent collision changes.
   */
  public setPresentationScale(scale: number): void {
    this.presentationScale = scale;
    this.artRoot?.setScale(scale, scale, 1);
    this.artRoot?.setPosition(0, this.getPresentationBaseY(), 0);
  }

  public jump(): boolean {
    const nextVelocity = getNextJumpVelocity(
      this.verticalVelocity,
      this.jumpsUsed,
    );
    if (nextVelocity === null) {
      return false;
    }

    this.grounded = false;
    this.jumpsUsed += 1;
    this.verticalVelocity = nextVelocity;
    return true;
  }

  public knockUp(): void {
    this.grounded = false;
    this.verticalVelocity = Math.max(
      this.verticalVelocity,
      GAME_CONFIG.hitBounceVelocity,
    );
  }

  public tick(deltaSeconds: number): void {
    this.runTime += deltaSeconds;
    let y = this.node.position.y;

    if (!this.grounded) {
      this.verticalVelocity += GAME_CONFIG.gravity * deltaSeconds;
      y += this.verticalVelocity * deltaSeconds;

      if (y <= this.groundY) {
        y = this.groundY;
        this.verticalVelocity = 0;
        this.grounded = true;
        this.jumpsUsed = 0;
      }
      this.node.setPosition(this.node.position.x, y, 0);
    }

    if (this.artRoot) {
      if (this.grounded) {
        this.artRoot.setPosition(
          0,
          this.getPresentationBaseY() +
            Math.abs(Math.sin(this.runTime * 10)) * 3,
          0,
        );
        this.artRoot.angle = Math.sin(this.runTime * 10) * 1.5;
      } else {
        this.artRoot.setPosition(0, this.getPresentationBaseY(), 0);
        this.artRoot.angle = Math.max(
          -10,
          Math.min(12, this.verticalVelocity * 0.014),
        );
      }
    }
  }

  public getBounds(): Bounds {
    const position = this.node.position;
    return {
      left: position.x - 27,
      right: position.x + 27,
      bottom: position.y + 6,
      top: position.y + 118,
    };
  }

  public getCollectBounds(): Bounds {
    const position = this.node.position;
    return {
      left: position.x - 43,
      right: position.x + 43,
      bottom: position.y + 3,
      top: position.y + 158,
    };
  }

  private drawKeloglan(): void {
    this.artRoot?.destroy();
    this.artRoot = createUiNode('KeloglanArt', this.node, 78, 132);
    this.artBaseY = 0;
    this.artRoot.setPosition(0, 0, 0);
    this.artRoot.setScale(
      this.presentationScale,
      this.presentationScale,
      1,
    );
    const graphics = this.artRoot.addComponent(Graphics);

    // Sandals and legs
    graphics.fillColor = new Color(91, 59, 42, 255);
    graphics.roundRect(-31, 2, 27, 10, 5);
    graphics.roundRect(5, 2, 27, 10, 5);
    graphics.fill();
    graphics.fillColor = PALETTE.blue;
    graphics.roundRect(-25, 10, 20, 43, 8);
    graphics.roundRect(5, 10, 20, 43, 8);
    graphics.fill();

    // Shirt and red vest
    graphics.fillColor = PALETTE.cream;
    graphics.roundRect(-32, 46, 64, 48, 16);
    graphics.fill();
    graphics.fillColor = PALETTE.red;
    graphics.roundRect(-28, 48, 22, 47, 10);
    graphics.roundRect(6, 48, 22, 47, 10);
    graphics.fill();
    graphics.fillColor = PALETTE.redDark;
    graphics.roundRect(-31, 46, 62, 8, 4);
    graphics.fill();

    // Arms
    graphics.fillColor = new Color(226, 174, 120, 255);
    graphics.circle(-34, 61, 8);
    graphics.circle(34, 61, 8);
    graphics.fill();

    // Head, ears and face
    graphics.fillColor = new Color(238, 190, 137, 255);
    graphics.circle(-27, 105, 8);
    graphics.circle(27, 105, 8);
    graphics.circle(0, 106, 31);
    graphics.fill();
    graphics.fillColor = new Color(243, 205, 157, 255);
    graphics.ellipse(0, 129, 21, 9);
    graphics.fill();

    graphics.fillColor = PALETTE.ink;
    graphics.circle(-10, 111, 3);
    graphics.circle(10, 111, 3);
    graphics.fill();
    graphics.lineWidth = 2;
    graphics.strokeColor = PALETTE.ink;
    graphics.arc(0, 102, 10, Math.PI * 1.15, Math.PI * 1.85);
    graphics.stroke();
  }

  private getPresentationBaseY(): number {
    return this.artBaseY * this.presentationScale;
  }
}

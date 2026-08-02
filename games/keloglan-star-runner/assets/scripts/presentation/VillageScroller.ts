import {
  Color,
  Graphics,
  Node,
  Sprite,
  SpriteFrame,
  UITransform,
} from 'cc';
import {
  createUiNode,
  PALETTE,
  resizeUiNode,
} from './ProceduralArt';

interface MovingDecoration {
  readonly node: Node;
  readonly parallax: number;
  readonly wrapPadding: number;
}

/**
 * Draws and scrolls a lightweight Anatolian village. Generated art can replace
 * the backdrop; the procedural version remains a robust first-import fallback.
 */
export class VillageScroller {
  private readonly baseNode: Node;
  private readonly baseGraphics: Graphics;
  private readonly paintingNode: Node;
  private readonly decorationLayer: Node;
  private decorations: MovingDecoration[] = [];
  private width = 0;
  private height = 0;
  private groundY = 0;
  private usingGeneratedPainting = false;

  public constructor(private readonly parent: Node) {
    this.baseNode = createUiNode('VillageBackdrop', parent);
    this.baseGraphics = this.baseNode.addComponent(Graphics);
    this.paintingNode = createUiNode('AnatolianVillagePainting', parent);
    this.paintingNode.active = false;
    this.decorationLayer = createUiNode('VillageDecorations', parent);
  }

  public applyGeneratedBackground(frame: SpriteFrame): void {
    const sprite =
      this.paintingNode.getComponent(Sprite) ??
      this.paintingNode.addComponent(Sprite);
    sprite.sizeMode = Sprite.SizeMode.CUSTOM;
    sprite.spriteFrame = frame;
    this.usingGeneratedPainting = true;
    this.paintingNode.active = true;
    this.layoutPainting();
    if (this.width > 0) {
      this.rebuildDecorations();
    }
  }

  public resize(width: number, height: number, groundY: number): void {
    this.width = width;
    this.height = height;
    this.groundY = groundY;
    resizeUiNode(this.baseNode, width, height);
    resizeUiNode(this.decorationLayer, width, height);
    this.drawBackdrop();
    this.layoutPainting();
    this.rebuildDecorations();
  }

  public tick(deltaSeconds: number, scrollSpeed: number): void {
    for (const decoration of this.decorations) {
      const position = decoration.node.position;
      decoration.node.setPosition(
        position.x - scrollSpeed * decoration.parallax * deltaSeconds,
        position.y,
        0,
      );
    }

    if (!this.usingGeneratedPainting) {
      this.wrapGroup('House', 230, 170);
      this.wrapGroup('Cloud', 350, 150);
    }
    this.wrapGroup('RoadDash', 180, 70);
  }

  private layoutPainting(): void {
    if (!this.usingGeneratedPainting) {
      return;
    }

    const portrait = this.height > this.width;
    // Portrait uses the same artwork as an intentional cover crop, matching
    // the richer mobile composition of the browser version. Landscape keeps
    // the full-width 16:9 painting. In both cases the road stays aligned.
    const paintingHeight = portrait
      ? Math.max(720, this.height * 1.04)
      : Math.max(720, this.width * (9 / 16));
    const paintingWidth = paintingHeight * (16 / 9);
    const focalPoint = 0.37;
    const portraitOffsetX = portrait
      ? (paintingWidth - this.width) * (0.5 - focalPoint)
      : 0;
    this.paintingNode
      .getComponent(UITransform)
      ?.setContentSize(paintingWidth, paintingHeight);
    this.paintingNode.setPosition(
      portraitOffsetX,
      this.groundY + paintingHeight * 0.336,
      0,
    );
  }

  private drawBackdrop(): void {
    const graphics = this.baseGraphics;
    const left = -this.width / 2;
    const bottom = -this.height / 2;

    graphics.clear();
    graphics.fillColor = PALETTE.skyTop;
    graphics.rect(left, bottom, this.width, this.height);
    graphics.fill();

    graphics.fillColor = PALETTE.skyBottom;
    graphics.rect(left, this.groundY - 10, this.width, this.height * 0.44);
    graphics.fill();

    // Sun
    graphics.fillColor = new Color(255, 224, 120, 255);
    graphics.circle(left + this.width * 0.76, this.height / 2 - 125, 54);
    graphics.fill();

    // Distant and near hills
    graphics.fillColor = PALETTE.hillBack;
    graphics.moveTo(left, this.groundY + 55);
    graphics.lineTo(left + this.width * 0.16, this.groundY + 190);
    graphics.lineTo(left + this.width * 0.34, this.groundY + 75);
    graphics.lineTo(left + this.width * 0.54, this.groundY + 220);
    graphics.lineTo(left + this.width * 0.77, this.groundY + 70);
    graphics.lineTo(left + this.width, this.groundY + 175);
    graphics.lineTo(left + this.width, this.groundY - 20);
    graphics.lineTo(left, this.groundY - 20);
    graphics.close();
    graphics.fill();

    graphics.fillColor = PALETTE.hillFront;
    graphics.moveTo(left, this.groundY + 20);
    graphics.lineTo(left + this.width * 0.22, this.groundY + 115);
    graphics.lineTo(left + this.width * 0.42, this.groundY + 30);
    graphics.lineTo(left + this.width * 0.67, this.groundY + 130);
    graphics.lineTo(left + this.width, this.groundY + 34);
    graphics.lineTo(left + this.width, this.groundY - 26);
    graphics.lineTo(left, this.groundY - 26);
    graphics.close();
    graphics.fill();

    // Village road and foreground
    graphics.fillColor = PALETTE.ground;
    graphics.rect(
      left,
      bottom,
      this.width,
      this.groundY - bottom + 10,
    );
    graphics.fill();
    graphics.fillColor = PALETTE.road;
    graphics.rect(
      left,
      bottom,
      this.width,
      Math.max(1, this.groundY - bottom - 38),
    );
    graphics.fill();
    graphics.fillColor = new Color(239, 205, 132, 255);
    graphics.rect(left, this.groundY - 16, this.width, 20);
    graphics.fill();
  }

  private rebuildDecorations(): void {
    for (const child of [...this.decorationLayer.children]) {
      child.destroy();
    }
    this.decorations = [];

    if (!this.usingGeneratedPainting) {
      const houseCount = Math.max(7, Math.ceil(this.width / 210) + 2);
      for (let index = 0; index < houseCount; index += 1) {
        const house = this.createHouse(index);
        house.setPosition(
          -this.width / 2 + index * 230 - 40,
          this.groundY + 4,
          0,
        );
        this.decorations.push({
          node: house,
          parallax: 0.2,
          wrapPadding: 170,
        });
      }

      const cloudCount = Math.max(4, Math.ceil(this.width / 340) + 1);
      for (let index = 0; index < cloudCount; index += 1) {
        const cloud = this.createCloud(index);
        cloud.setPosition(
          -this.width / 2 + index * 350 + 80,
          this.groundY + 285 + (index % 2) * 105,
          0,
        );
        this.decorations.push({
          node: cloud,
          parallax: 0.055,
          wrapPadding: 150,
        });
      }
    }

    const dashCount = Math.max(8, Math.ceil(this.width / 170) + 2);
    for (let index = 0; index < dashCount; index += 1) {
      const dash = createUiNode('RoadDash', this.decorationLayer, 76, 9);
      const graphics = dash.addComponent(Graphics);
      graphics.fillColor = new Color(242, 193, 96, 210);
      graphics.roundRect(-38, -4, 76, 9, 5);
      graphics.fill();
      dash.setPosition(
        -this.width / 2 + index * 180,
        this.groundY - 55,
        0,
      );
      this.decorations.push({
        node: dash,
        parallax: 1,
        wrapPadding: 70,
      });
    }
  }

  private createHouse(index: number): Node {
    const node = createUiNode('House', this.decorationLayer, 150, 160);
    const graphics = node.addComponent(Graphics);
    const wallColors = [
      new Color(245, 201, 132, 255),
      new Color(239, 170, 130, 255),
      new Color(245, 219, 162, 255),
    ];

    graphics.fillColor = wallColors[index % wallColors.length];
    graphics.roundRect(-59, 0, 118, 104, 8);
    graphics.fill();
    graphics.fillColor =
      index % 2 === 0 ? PALETTE.redDark : new Color(115, 71, 57, 255);
    graphics.moveTo(-72, 96);
    graphics.lineTo(0, 151);
    graphics.lineTo(72, 96);
    graphics.close();
    graphics.fill();

    graphics.fillColor = new Color(91, 61, 46, 255);
    graphics.roundRect(-17, 0, 34, 59, 5);
    graphics.fill();
    graphics.fillColor = new Color(119, 204, 219, 255);
    graphics.roundRect(-47, 54, 28, 27, 4);
    graphics.roundRect(19, 54, 28, 27, 4);
    graphics.fill();
    graphics.lineWidth = 2;
    graphics.strokeColor = PALETTE.cream;
    graphics.moveTo(-33, 55);
    graphics.lineTo(-33, 80);
    graphics.moveTo(33, 55);
    graphics.lineTo(33, 80);
    graphics.stroke();
    return node;
  }

  private createCloud(index: number): Node {
    const node = createUiNode('Cloud', this.decorationLayer, 150, 70);
    const graphics = node.addComponent(Graphics);
    graphics.fillColor = new Color(255, 255, 255, 205);
    graphics.circle(-42, 0, 25 + (index % 2) * 4);
    graphics.circle(-10, 14, 34);
    graphics.circle(27, 5, 28);
    graphics.circle(50, -3, 20);
    graphics.roundRect(-60, -19, 115, 35, 17);
    graphics.fill();
    return node;
  }

  private wrapGroup(name: string, spacing: number, padding: number): void {
    const group = this.decorations.filter(
      (decoration) => decoration.node.name === name,
    );
    if (group.length === 0) {
      return;
    }

    let rightmost = Math.max(
      ...group.map((decoration) => decoration.node.position.x),
    );
    for (const decoration of group) {
      if (decoration.node.position.x < -this.width / 2 - padding) {
        rightmost += spacing;
        decoration.node.setPosition(
          rightmost,
          decoration.node.position.y,
          0,
        );
      }
    }
  }
}

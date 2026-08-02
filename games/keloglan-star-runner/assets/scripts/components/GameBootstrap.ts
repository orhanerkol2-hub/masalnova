import {
  _decorator,
  Camera,
  Canvas,
  Color,
  Component,
  Layers,
  Node,
  ResolutionPolicy,
  screen,
  UITransform,
  view,
} from 'cc';
import { GAME_CONFIG } from '../config/GameConfig';
import { GameController } from './GameController';

const { ccclass } = _decorator;

interface DesignSize {
  readonly width: number;
  readonly height: number;
}

/**
 * Serialized scene entry point. Everything else is created in TypeScript so the
 * scene has no brittle Inspector references.
 */
@ccclass('GameBootstrap')
export class GameBootstrap extends Component {
  private gameController: GameController | null = null;
  private canvasTransform: UITransform | null = null;
  private camera: Camera | null = null;
  private designSize: DesignSize | null = null;

  protected override onLoad(): void {
    const size = this.applyResponsiveResolution();
    this.designSize = size;

    const canvasNode = new Node('GameCanvas');
    canvasNode.layer = Layers.Enum.UI_2D;
    this.node.addChild(canvasNode);
    this.canvasTransform = canvasNode.addComponent(UITransform);
    this.canvasTransform.setContentSize(size.width, size.height);

    const cameraNode = new Node('Camera');
    cameraNode.layer = Layers.Enum.UI_2D;
    canvasNode.addChild(cameraNode);
    cameraNode.setPosition(0, 0, 1000);
    this.camera = cameraNode.addComponent(Camera);
    this.camera.projection = Camera.ProjectionType.ORTHO;
    this.camera.orthoHeight = size.height / 2;
    this.camera.visibility = Layers.Enum.UI_2D;
    this.camera.clearColor = new Color(103, 198, 235, 255);

    const canvas = canvasNode.addComponent(Canvas);
    canvas.cameraComponent = this.camera;
    canvas.alignCanvasWithScreen = true;

    this.gameController = canvasNode.addComponent(GameController);
    this.gameController.initialize(size.width, size.height);
    screen.on('window-resize', this.handleResize, this);
  }

  protected override onDestroy(): void {
    screen.off('window-resize', this.handleResize, this);
  }

  private readonly handleResize = (): void => {
    const size = this.applyResponsiveResolution();
    if (
      this.designSize?.width === size.width &&
      this.designSize.height === size.height
    ) {
      return;
    }
    this.designSize = size;
    this.canvasTransform?.setContentSize(size.width, size.height);
    if (this.camera) {
      this.camera.orthoHeight = size.height / 2;
    }
    this.gameController?.resize(size.width, size.height);
  };

  private applyResponsiveResolution(): DesignSize {
    const windowSize = screen.windowSize;
    const viewportWidth = Math.max(1, windowSize.width);
    const viewportHeight = Math.max(1, windowSize.height);
    const previousPortrait =
      this.designSize !== null &&
      this.designSize.height > this.designSize.width;
    const portrait =
      this.designSize === null
        ? viewportHeight > viewportWidth
        : previousPortrait
          ? viewportWidth / viewportHeight < 1.05
          : viewportHeight / viewportWidth > 1.05;

    // Match the design canvas to the real viewport ratio. The clamps keep
    // ultrawide monitors and nearly square tablets inside tested layout bands.
    // A small hysteresis prevents rapid portrait/landscape flips near a square.
    const size = portrait
      ? {
          width: GAME_CONFIG.portraitWidth,
          height: Math.max(
            960,
            Math.min(
              1560,
              Math.round(
                GAME_CONFIG.portraitWidth *
                  (viewportHeight / viewportWidth),
              ),
            ),
          ),
        }
      : {
          width: Math.max(
            1024,
            Math.min(
              1920,
              Math.round(
                GAME_CONFIG.landscapeHeight *
                  (viewportWidth / viewportHeight),
              ),
            ),
          ),
          height: GAME_CONFIG.landscapeHeight,
        };

    view.setDesignResolutionSize(
      size.width,
      size.height,
      ResolutionPolicy.SHOW_ALL,
    );
    return size;
  }
}

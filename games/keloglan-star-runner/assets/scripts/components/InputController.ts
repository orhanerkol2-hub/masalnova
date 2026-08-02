import {
  _decorator,
  Component,
  EventKeyboard,
  EventMouse,
  input,
  Input,
  KeyCode,
  Node,
} from 'cc';

const { ccclass } = _decorator;

export interface InputCallbacks {
  readonly jump: () => void;
  readonly togglePause: () => void;
  readonly primaryAction: () => void;
}

@ccclass('InputController')
export class InputController extends Component {
  private callbacks: InputCallbacks | null = null;

  public startListening(callbacks: InputCallbacks): void {
    this.callbacks = callbacks;
    input.on(Input.EventType.KEY_DOWN, this.handleKeyDown, this);
    this.node.on(Node.EventType.TOUCH_START, this.handleTouchStart, this);
    this.node.on(Node.EventType.MOUSE_DOWN, this.handleMouseDown, this);
  }

  protected override onDestroy(): void {
    input.off(Input.EventType.KEY_DOWN, this.handleKeyDown, this);
    this.node.off(Node.EventType.TOUCH_START, this.handleTouchStart, this);
    this.node.off(Node.EventType.MOUSE_DOWN, this.handleMouseDown, this);
  }

  private readonly handleKeyDown = (event: EventKeyboard): void => {
    if (!this.callbacks) {
      return;
    }

    switch (event.keyCode) {
      case KeyCode.SPACE:
      case KeyCode.ARROW_UP:
      case KeyCode.KEY_W:
        this.callbacks.jump();
        break;
      case KeyCode.KEY_P:
      case KeyCode.ESCAPE:
        this.callbacks.togglePause();
        break;
      case KeyCode.ENTER:
        this.callbacks.primaryAction();
        break;
      default:
        break;
    }
  };

  private readonly handleTouchStart = (): void => {
    this.handlePointer();
  };

  private readonly handleMouseDown = (event: EventMouse): void => {
    if (event.getButton() !== EventMouse.BUTTON_LEFT) {
      return;
    }
    this.handlePointer();
  };

  private handlePointer(): void {
    if (!this.callbacks) {
      return;
    }
    this.callbacks.jump();
  }
}

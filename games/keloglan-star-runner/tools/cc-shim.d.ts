/**
 * Minimal compile-time surface used by verify-project.mjs when Cocos Creator is
 * not installed. The editor's generated temp/tsconfig.cocos.json remains the
 * authoritative source of engine types for real builds.
 */
declare module 'cc' {
  export class Vec2 {
    public x: number;
    public y: number;
  }

  export class Vec3 {
    public static readonly ONE: Vec3;
    public static readonly ZERO: Vec3;
    public x: number;
    public y: number;
    public z: number;
    public constructor(x?: number, y?: number, z?: number);
  }

  export class Color {
    public constructor(r?: number, g?: number, b?: number, a?: number);
  }

  export class Component {
    public node: Node;
    protected onLoad(): void;
    protected onDestroy(): void;
    protected update(deltaTime: number): void;
  }

  export abstract class Event {
    public propagationStopped: boolean;
  }

  export class EventTouch extends Event {}

  export class EventMouse extends Event {
    public static readonly BUTTON_LEFT: number;
    public getButton(): number;
  }

  export class EventKeyboard extends Event {
    public keyCode: KeyCode;
  }

  type ComponentConstructor<T extends Component> = new () => T;

  export class Node {
    public static readonly EventType: {
      readonly TOUCH_START: string;
      readonly TOUCH_END: string;
      readonly TOUCH_CANCEL: string;
      readonly MOUSE_DOWN: string;
      readonly MOUSE_UP: string;
      readonly MOUSE_LEAVE: string;
    };
    public readonly name: string;
    public layer: number;
    public active: boolean;
    public angle: number;
    public readonly position: Vec3;
    public readonly children: readonly Node[];
    public constructor(name?: string);
    public addChild(child: Node): void;
    public addComponent<T extends Component>(
      constructor: ComponentConstructor<T>,
    ): T;
    public getComponent<T extends Component>(
      constructor: ComponentConstructor<T>,
    ): T | null;
    public destroy(): boolean;
    public setPosition(position: Vec3): void;
    public setPosition(x: number, y: number, z?: number): void;
    public setScale(scale: Vec3): void;
    public setScale(x: number, y: number, z?: number): void;
    public on(
      eventType: string,
      callback: (...arguments_: any[]) => void,
      target?: unknown,
    ): void;
    public off(
      eventType: string,
      callback: (...arguments_: any[]) => void,
      target?: unknown,
    ): void;
  }

  export class UITransform extends Component {
    public readonly contentSize: {
      readonly width: number;
      readonly height: number;
    };
    public setContentSize(width: number, height: number): void;
  }

  export class UIOpacity extends Component {
    public opacity: number;
  }

  export class SpriteFrame {}

  export class Sprite extends Component {
    public static readonly SizeMode: { readonly CUSTOM: number };
    public spriteFrame: SpriteFrame | null;
    public sizeMode: number;
  }

  export class Graphics extends Component {
    public fillColor: Color;
    public strokeColor: Color;
    public lineWidth: number;
    public clear(): void;
    public rect(x: number, y: number, width: number, height: number): void;
    public roundRect(
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number,
    ): void;
    public circle(x: number, y: number, radius: number): void;
    public ellipse(
      x: number,
      y: number,
      radiusX: number,
      radiusY: number,
    ): void;
    public arc(
      centerX: number,
      centerY: number,
      radius: number,
      startAngle: number,
      endAngle: number,
    ): void;
    public moveTo(x: number, y: number): void;
    public lineTo(x: number, y: number): void;
    public close(): void;
    public fill(): void;
    public stroke(): void;
  }

  export class Label extends Component {
    public static readonly HorizontalAlign: { readonly CENTER: number };
    public static readonly VerticalAlign: { readonly CENTER: number };
    public static readonly Overflow: { readonly SHRINK: number };
    public string: string;
    public fontFamily: string;
    public fontSize: number;
    public lineHeight: number;
    public color: Color;
    public horizontalAlign: number;
    public verticalAlign: number;
    public overflow: number;
    public isBold: boolean;
  }

  export class Camera extends Component {
    public static readonly ProjectionType: { readonly ORTHO: number };
    public projection: number;
    public orthoHeight: number;
    public visibility: number;
    public clearColor: Color;
  }

  export class Canvas extends Component {
    public cameraComponent: Camera | null;
    public alignCanvasWithScreen: boolean;
  }

  export const Layers: {
    readonly Enum: {
      readonly UI_2D: number;
    };
  };

  export const _decorator: {
    readonly ccclass: (name: string) => ClassDecorator;
  };

  export enum KeyCode {
    ENTER = 13,
    ESCAPE = 27,
    SPACE = 32,
    ARROW_UP = 38,
    KEY_P = 80,
    KEY_W = 87,
  }

  export class Input {
    public static readonly EventType: {
      readonly KEY_DOWN: string;
    };
  }

  export const input: {
    on(
      eventType: string,
      callback: (...arguments_: any[]) => void,
      target?: unknown,
    ): void;
    off(
      eventType: string,
      callback: (...arguments_: any[]) => void,
      target?: unknown,
    ): void;
  };

  interface LocalStorageLike {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
  }

  export const sys: {
    readonly localStorage: LocalStorageLike;
  };

  type AssetConstructor<T> = new () => T;

  export const resources: {
    load<T>(
      path: string,
      type: AssetConstructor<T>,
      onComplete: (error: Error | null, asset: T | null) => void,
    ): void;
  };

  export const screen: {
    readonly windowSize: {
      readonly width: number;
      readonly height: number;
    };
    on(
      eventType: 'window-resize',
      callback: () => void,
      target?: unknown,
    ): void;
    off(
      eventType: 'window-resize',
      callback: () => void,
      target?: unknown,
    ): void;
  };

  export class ResolutionPolicy {
    public static readonly SHOW_ALL: number;
  }

  export const view: {
    setDesignResolutionSize(
      width: number,
      height: number,
      policy: number,
    ): void;
  };
}

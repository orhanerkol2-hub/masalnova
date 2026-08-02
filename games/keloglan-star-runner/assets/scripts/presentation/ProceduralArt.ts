import {
  Color,
  EventMouse,
  EventTouch,
  Graphics,
  Label,
  Layers,
  Node,
  UITransform,
  Vec3,
} from 'cc';

export const PALETTE = Object.freeze({
  skyTop: new Color(103, 198, 235, 255),
  skyBottom: new Color(201, 239, 238, 255),
  hillBack: new Color(117, 185, 120, 255),
  hillFront: new Color(78, 151, 91, 255),
  ground: new Color(219, 176, 105, 255),
  road: new Color(193, 137, 74, 255),
  cream: new Color(255, 246, 218, 255),
  ink: new Color(51, 45, 54, 255),
  red: new Color(205, 69, 60, 255),
  redDark: new Color(145, 44, 45, 255),
  blue: new Color(46, 102, 153, 255),
  gold: new Color(255, 198, 48, 255),
  goldDark: new Color(218, 139, 25, 255),
  panel: new Color(41, 48, 69, 238),
  panelLight: new Color(67, 76, 101, 255),
  white: new Color(255, 255, 255, 255),
});

export function createUiNode(
  name: string,
  parent: Node,
  width = 10,
  height = 10,
): Node {
  const node = new Node(name);
  node.layer = Layers.Enum.UI_2D;
  parent.addChild(node);
  node.addComponent(UITransform).setContentSize(width, height);
  return node;
}

export function resizeUiNode(
  node: Node,
  width: number,
  height: number,
): void {
  node.getComponent(UITransform)?.setContentSize(width, height);
}

export function createLabel(
  parent: Node,
  name: string,
  text: string,
  fontSize: number,
  width: number,
  height: number,
  color: Color = PALETTE.white,
): Label {
  const node = createUiNode(name, parent, width, height);
  const label = node.addComponent(Label);
  label.string = text;
  label.fontFamily = 'Arial';
  label.fontSize = fontSize;
  label.lineHeight = Math.round(fontSize * 1.18);
  label.color = color;
  label.horizontalAlign = Label.HorizontalAlign.CENTER;
  label.verticalAlign = Label.VerticalAlign.CENTER;
  label.overflow = Label.Overflow.SHRINK;
  return label;
}

export function drawRoundedPanel(
  graphics: Graphics,
  width: number,
  height: number,
  fill: Color,
  radius = 24,
  stroke: Color | null = null,
  lineWidth = 3,
): void {
  graphics.clear();
  graphics.fillColor = fill;
  graphics.roundRect(-width / 2, -height / 2, width, height, radius);
  graphics.fill();

  if (stroke) {
    graphics.lineWidth = lineWidth;
    graphics.strokeColor = stroke;
    graphics.roundRect(-width / 2, -height / 2, width, height, radius);
    graphics.stroke();
  }
}

/**
 * Creates a visual button without texture assets. Touch and mouse handlers are
 * both registered explicitly; a short guard prevents browsers from delivering
 * the same physical action twice.
 */
export function createButton(
  parent: Node,
  name: string,
  text: string,
  width: number,
  height: number,
  onActivate: () => void,
): Node {
  const node = createUiNode(name, parent, width, height);
  const graphics = node.addComponent(Graphics);
  drawRoundedPanel(
    graphics,
    width,
    height,
    PALETTE.red,
    height / 2,
    PALETTE.cream,
    3,
  );

  const label = createLabel(
    node,
    `${name}Label`,
    text,
    Math.min(30, height * 0.42),
    width - 28,
    height - 8,
    PALETTE.white,
  );
  label.isBold = true;

  let lastActivation = 0;
  const press = (event: EventTouch | EventMouse): void => {
    event.propagationStopped = true;
    node.setScale(new Vec3(0.97, 0.97, 1));
  };
  const release = (event: EventTouch | EventMouse): void => {
    event.propagationStopped = true;
    node.setScale(Vec3.ONE);
    const now = Date.now();
    if (now - lastActivation < 120) {
      return;
    }
    lastActivation = now;
    onActivate();
  };
  const cancel = (event: EventTouch | EventMouse): void => {
    event.propagationStopped = true;
    node.setScale(Vec3.ONE);
  };

  node.on(Node.EventType.TOUCH_START, press);
  node.on(Node.EventType.TOUCH_END, release);
  node.on(Node.EventType.TOUCH_CANCEL, cancel);
  node.on(Node.EventType.MOUSE_DOWN, press);
  node.on(Node.EventType.MOUSE_UP, release);
  node.on(Node.EventType.MOUSE_LEAVE, cancel);

  return node;
}

export function drawFivePointStar(
  graphics: Graphics,
  outerRadius: number,
  innerRadius: number,
  fill: Color = PALETTE.gold,
): void {
  graphics.clear();
  graphics.fillColor = fill;
  for (let index = 0; index < 10; index += 1) {
    const angle = Math.PI / 2 + index * (Math.PI / 5);
    const radius = index % 2 === 0 ? outerRadius : innerRadius;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (index === 0) {
      graphics.moveTo(x, y);
    } else {
      graphics.lineTo(x, y);
    }
  }
  graphics.close();
  graphics.fill();

  graphics.lineWidth = Math.max(2, outerRadius * 0.08);
  graphics.strokeColor = PALETTE.goldDark;
  graphics.stroke();
}

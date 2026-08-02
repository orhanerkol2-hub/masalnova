import { resources, SpriteFrame } from 'cc';

export interface GameArtReceiver {
  readonly background: (frame: SpriteFrame) => void;
  readonly runner: (frame: SpriteFrame) => void;
  readonly star: (frame: SpriteFrame) => void;
  readonly testi: (frame: SpriteFrame) => void;
}

const RESOURCE_PATHS = Object.freeze({
  background: 'art/anatolian-village-background/spriteFrame',
  runner: 'art/keloglan-runner/spriteFrame',
  star: 'art/anatolian-star/spriteFrame',
  testi: 'art/anatolian-testi/spriteFrame',
});

/**
 * Loads the generated game art independently. Each receiver is invoked as soon
 * as its image is available. Procedural visuals remain active if an import is
 * missing, which keeps the scene playable during Cocos' first asset import.
 */
export function loadGeneratedGameArt(receiver: GameArtReceiver): void {
  for (const [key, path] of Object.entries(RESOURCE_PATHS) as Array<
    [keyof GameArtReceiver, string]
  >) {
    resources.load(path, SpriteFrame, (error, frame) => {
      if (error || !frame) {
        console.warn(`[GameArtLoader] Could not load "${path}".`, error);
        return;
      }
      receiver[key](frame);
    });
  }
}

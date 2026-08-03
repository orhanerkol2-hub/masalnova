const playerShell = document.querySelector<HTMLElement>('[data-player-shell]');
const gameFrame = document.querySelector<HTMLIFrameElement>('[data-game-frame]');
const fullscreenTriggers = document.querySelectorAll<HTMLAnchorElement>('[data-fullscreen-trigger]');

if (playerShell && gameFrame && fullscreenTriggers.length > 0) {
  const desktopEmbed = window.matchMedia('(min-width: 821px)');
  const loadGameFrame = (): void => {
    if (!gameFrame.hasAttribute('src') && gameFrame.dataset.src) gameFrame.src = gameFrame.dataset.src;
  };

  if (desktopEmbed.matches) loadGameFrame();
  desktopEmbed.addEventListener('change', (event) => {
    if (event.matches) loadGameFrame();
  });

  const handleEmbeddedGameScroll = (event: MessageEvent): void => {
    if (
      event.source !== gameFrame.contentWindow ||
      event.origin !== window.location.origin ||
      document.fullscreenElement === playerShell ||
      event.data?.type !== 'masalnova:embedded-game-scroll' ||
      typeof event.data.deltaY !== 'number'
    ) return;

    if (Number.isFinite(event.data.deltaY) && Math.abs(event.data.deltaY) >= 1) {
      window.scrollBy({ top: event.data.deltaY, left: 0, behavior: 'auto' });
    }
  };

  const setFullscreenState = (): void => {
    const isFullscreen = document.fullscreenElement === playerShell;
    document.documentElement.classList.toggle('game-fullscreen-active', isFullscreen);
    document.body.classList.toggle('game-fullscreen-active', isFullscreen);
    if (isFullscreen) gameFrame.focus({ preventScroll: true });
  };

  const openGame = async (event: MouseEvent): Promise<void> => {
    event.preventDefault();
    const destination = (event.currentTarget as HTMLAnchorElement).href;

    if (document.fullscreenElement === playerShell) {
      gameFrame.focus({ preventScroll: true });
      return;
    }
    if (!playerShell.requestFullscreen) {
      window.location.assign(destination);
      return;
    }

    try {
      await playerShell.requestFullscreen();
      loadGameFrame();
      setFullscreenState();
    } catch {
      window.location.assign(destination);
    }
  };

  fullscreenTriggers.forEach((trigger) => trigger.addEventListener('click', openGame));
  document.addEventListener('fullscreenchange', setFullscreenState);
  window.addEventListener('message', handleEmbeddedGameScroll);
  window.addEventListener('pagehide', () => {
    window.removeEventListener('message', handleEmbeddedGameScroll);
    document.documentElement.classList.remove('game-fullscreen-active');
    document.body.classList.remove('game-fullscreen-active');
  });
}

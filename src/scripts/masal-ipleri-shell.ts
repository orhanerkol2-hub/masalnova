const playerShell = document.querySelector<HTMLElement>('[data-player-shell]');
const gameFrame = document.querySelector<HTMLIFrameElement>('[data-game-frame]');
const fullscreenTriggers = document.querySelectorAll<HTMLAnchorElement>('[data-fullscreen-trigger]');

if (playerShell && gameFrame && fullscreenTriggers.length > 0) {
  const desktopEmbed = window.matchMedia('(min-width: 821px)');
  const loadGame = (): void => {
    if (!gameFrame.hasAttribute('src') && gameFrame.dataset.src) gameFrame.src = gameFrame.dataset.src;
  };

  if (desktopEmbed.matches) loadGame();
  desktopEmbed.addEventListener('change', (event) => {
    if (event.matches) loadGame();
  });

  const setFullscreenState = (): void => {
    const isFullscreen = document.fullscreenElement === playerShell;
    document.documentElement.classList.toggle('game-fullscreen-active', isFullscreen);
    document.body.classList.toggle('game-fullscreen-active', isFullscreen);
    if (isFullscreen) gameFrame.focus({ preventScroll: true });
  };

  const openGame = async (event: MouseEvent): Promise<void> => {
    event.preventDefault();
    const destination = (event.currentTarget as HTMLAnchorElement).href;
    loadGame();

    if (!playerShell.requestFullscreen) {
      window.location.assign(destination);
      return;
    }

    try {
      await playerShell.requestFullscreen();
      setFullscreenState();
    } catch {
      window.location.assign(destination);
    }
  };

  fullscreenTriggers.forEach((trigger) => trigger.addEventListener('click', openGame));
  document.addEventListener('fullscreenchange', setFullscreenState);
  window.addEventListener('pagehide', () => {
    document.documentElement.classList.remove('game-fullscreen-active');
    document.body.classList.remove('game-fullscreen-active');
  });
}

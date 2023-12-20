/**
 * Opens a game selection screen with previews for different games.
 * @param {HTMLElement} container - The container element.
 */
export function openGameSelection(container) {
  container.innerHTML = '';
  const flappybirdDescription =
  'Navigate a bird past pipes. ' +
  'A challenging and addictive game.';
  const fruitninjahdDescription =
  'Slice fruits with a blade. ' +
  'A fast-paced action game for reflexes.';
  const duckshooterDescription =
  'Shoot ducks rapidly, don’t miss any. ' +
  'A nostalgic retro-style game.';
  const flappybird = createGamePreview('Flappy Bird', 'https://freehtml5games.org/icons/flappy-bird.png', 'https://freehtml5games.org/games/flappy-bird/index.html', container, 330, 512, flappybirdDescription);
  const fruitninjahd = createGamePreview('Fruit Ninja HD', 'https://freehtml5games.org/icons/fruit-ninja-hd.png', 'https://freehtml5games.org/games/fruit-ninja-hd/index.html', container, 640, 540, fruitninjahdDescription);
  const duckshooter = createGamePreview('Duck Shooter', 'https://freehtml5games.org/icons/duck-shooter.png', 'https://freehtml5games.org/games/duck-shooter/index.html', container, 640, 360, duckshooterDescription);

  // Append previews to the container
  container.appendChild(flappybird);
  container.appendChild(fruitninjahd);
  container.appendChild(duckshooter);
}

/**
 * Creates a game preview element with the specified properties.
 *
 * @param {string} title - The title of the game.
 * @param {string} imageUrl - The URL of the game's image.
 * @param {string} gameUrl - The URL of the game.
 * @param {HTMLElement} container - The container element.
 * @param {number} width - The width of the game container.
 * @param {number} height - The height of the game container.
 * @param {string} description - The description of the game.
 * @return {HTMLElement} - The created game preview element.
 */
function createGamePreview(
    title, imageUrl, gameUrl, container, width, height, description,
) {
  const previewContainer = document.createElement('div');
  previewContainer.className = 'game-preview-container';

  const preview = document.createElement('div');
  preview.className = 'game-preview';
  preview.title = title;
  preview.style.backgroundImage = `url(${imageUrl})`;

  // Create the description element
  const descriptionElem = document.createElement('div');
  descriptionElem.className = 'game-description';
  descriptionElem.textContent = description;

  // Event listener to load the game on click
  const loadSelectedGame = () => loadGame(gameUrl, container, width, height);
  preview.addEventListener('click', loadSelectedGame);

  // Append the preview and description to the container
  previewContainer.appendChild(preview);
  previewContainer.appendChild(descriptionElem);

  return previewContainer;
}


/**
 * Loads a game into the specified container with the given dimensions.
 * @param {string} gameUrl - The URL of the game to load.
 * @param {HTMLElement} container - The container element to load the game into.
 * @param {number} width - The width of the game iframe.
 * @param {number} height - The height of the game iframe.
 */
function loadGame(gameUrl, container, width, height) {
  const iframe = document.createElement('iframe');
  container.innerHTML = '';
  iframe.className = 'game-iframe';
  iframe.src = gameUrl;
  iframe.width = width;
  iframe.height = height;
  iframe.frameBorder = '0';
  iframe.scrolling = 'no';
  iframe.allowFullscreen = true;
  iframe.style.display = 'block';

  container.appendChild(iframe);
  height = height + 33;
  const detail = {width, height};
  const gameSelectedEvent = new CustomEvent('gameSelected', {detail});
  container.dispatchEvent(gameSelectedEvent);
}

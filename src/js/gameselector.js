/**
 * Opens a game selection screen with previews for different games.
 * @param {HTMLElement} container - The container element.
 */
export function openGameSelection(container) {
  container.innerHTML = '';
  const flappybirdDescription =
  'Navigate a bird past pipes. ' +
  'A challenging and addictive game.';
  const marioForeverDescription =  
  'Run and jump through levels. ' +  
  'A classic platforming adventure.';
  const duckshooterDescription =
  'Slice fruits with a blade. ' +
  'A fast-paced action game for reflexes.';
  const flappybird = createGamePreview('Flappy Bird', 'https://i.imgur.com/VNRuFiE.png', 'https://scratch.mit.edu/projects/18262469/embed', container, 600, 500, flappybirdDescription);
  const fruitninjahd = createGamePreview('Mario Forever', 'https://i.imgur.com/lUjUFyG.png', 'https://www.retrogames.cc/embed/45495-mario-forever-smw-edition-v1-6.html', container, 800, 600, marioForeverDescription);
  const duckshooter = createGamePreview('Fruit Ninja', '//funhtml5games.com/images/fruitninja.png', 'https://funhtml5games.com?embed=fruitninja', container, 750, 500, duckshooterDescription);

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

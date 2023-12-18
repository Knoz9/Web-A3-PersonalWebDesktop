import backImage from '../img/memory/back.png';
import image1 from '../img/memory/1.png';
import image2 from '../img/memory/2.png';
import image3 from '../img/memory/3.png';
import image4 from '../img/memory/4.png';
import image5 from '../img/memory/5.png';
import image6 from '../img/memory/6.png';
import image7 from '../img/memory/7.png';
import image8 from '../img/memory/8.png';
import flipSoundSrc from '../audio/flip.mp3';
import poofSoundSrc from '../audio/poof.mp3';

/**
 * Loads and initializes the memory game in the specified container.
 * @param {HTMLElement} container - The container element.
 */
export function loadMemoryGame(container) {
  let attempts = 0;
  const attemptsDisplay = document.createElement('div');
  const flipSound = new Audio(flipSoundSrc);
  flipSound.preload = 'auto';
  const poofSound = new Audio(poofSoundSrc);
  poofSound.preload = 'auto';
  attemptsDisplay.className = 'attempts-display';
  attemptsDisplay.textContent = `Game finished in: ${attempts} attempts`;

  const resetButton = document.createElement('button');
  resetButton.className = 'reset-button';
  resetButton.textContent = 'Reset Game';
  resetButton.addEventListener('click', resetGame);

  let isChecking = false;
  /**
   * Creates a game array for a memory game.
   * @param {number} rows - The number of rows in the game array.
   * @param {number} columns - The number of columns in the game array.
   * @return {Array} - The shuffled game array.
   */
  function createGameArray(rows, columns) {
    const totalCells = rows * columns;
    const array = [];
    for (let i = 0; i < totalCells / 2; i++) {
      array.push(i, i);
    }
    if (totalCells % 2 !== 0) {
      array.push(Math.floor(totalCells / 2));
    }
    return shuffleArray(array);
  }

  /**
   * Shuffles the elements of an array in place.
   * @param {Array} array - The array to be shuffled.
   * @return {Array} - The shuffled array.
   */
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  /**
   * Renders the game board with the given array of items and number of columns.
   * @param {Array} array - The array of items to be displayed on the game.
   * @param {number} columns - The number of columns in the game board grid.
   */
  function renderGameBoard(array, columns) {
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    grid.style.gridGap = '10px';
    container.innerHTML = '';
    container.appendChild(attemptsDisplay);
    container.appendChild(resetButton);

    array.forEach((item, index) => {
      const cell = document.createElement('div');
      if (array.length == 4) {
        cell.style.height = '180px';
        cell.style.width = '150px';
        cell.style.margin = '20px';
      }
      cell.className = 'memory-cell';
      cell.dataset.imageId = item;
      cell.dataset.index = index;
      cell.dataset.flipped = 'false';
      cell.style.border = '1px solid black';
      cell.style.minHeight = '100px';
      cell.style.backgroundImage = `url('${backImage}')`;
      cell.style.backgroundSize = 'cover';
      cell.tabIndex = 0;
      cell.addEventListener('keydown', (event) => {
        handleKeyPress(event, index, columns);
      });
      cell.addEventListener('click', () => cellClicked(index));
      grid.appendChild(cell);
    });

    container.appendChild(grid);
  }

  let firstChoice = null;
  let secondChoice = null;
  let matches = 0;

  /**
   * Handles the click event on a memory cell.
   * @param {number} index - The index of the clicked cell.
   */
  function cellClicked(index) {
    if (isChecking) return;

    const cell = container.querySelector(`.memory-cell[data-index='${index}']`);
    const imageId = cell.dataset.imageId;

    if (cell.dataset.flipped === 'false') {
      flipSound.play();
      const imageMap = [
        image1, image2, image3, image4,
        image5, image6, image7, image8,
      ];
      cell.style.backgroundImage = `url('${imageMap[parseInt(imageId)]}')`;
      cell.dataset.flipped = 'true';

      if (firstChoice === null) {
        firstChoice = index;
      } else if (secondChoice === null && index !== firstChoice) {
        secondChoice = index;
        attempts++;
        updateAttempts();
        checkForMatch();
      }
    }
  }

  /**
   * Updates the attempts display with the number of attempts.
   */
  function updateAttempts() {
    attemptsDisplay.textContent = `Finished in: ${attempts} attempts`;
  }

  /**
   * Resets the game by setting all game variables to their initial values,
   * hiding the reset button and attempts display, and updating the attempts.
   * Also recreates the size selection for the game.
   */
  function resetGame() {
    firstChoice = null;
    secondChoice = null;
    attempts = 0;
    matches = 0;
    isChecking = false;
    resetButton.style.display = 'none';
    attemptsDisplay.style.display = 'none';
    updateAttempts();
    createSizeSelection();
  }

  /**
   * Creates the size selection UI and adds event listeners to the buttons.
   */
  function createSizeSelection() {
    const sizeSelection = document.createElement('div');
    sizeSelection.className = 'size-selection';

    const sizes = [
      {label: '4x4', value: {rows: 4, columns: 4}},
      {label: '2x4', value: {rows: 2, columns: 4}},
      {label: '2x2', value: {rows: 2, columns: 2}},
    ];

    sizes.forEach((size) => {
      const button = document.createElement('button');
      button.textContent = size.label;
      button.addEventListener('click', () => {
        startGame(size.value.rows, size.value.columns);
      });
      sizeSelection.appendChild(button);
    });

    container.innerHTML = `
  <h2 class="game-title">Welcome!</h2>
  <h2 class="game-title">Please Choose Size:</h2>
    `;
    container.appendChild(sizeSelection);
  }

  /**
   * Starts the game with the specified number of rows and columns.
   * @param {number} rows - The number of rows in the game board.
   * @param {number} columns - The number of columns in the game board.
   */
  function startGame(rows, columns) {
    const gameArray = createGameArray(rows, columns);
    renderGameBoard(gameArray, columns); // Use columns as the grid size
  }

  /**
   * Focuses on the next memory cell in the container.
   * @param {number} currentIndex - The index of the current memory cell.
   * @param {number} columns - The number of columns in the memory grid.
   * @return {void}
   */
  function focusNextCell(currentIndex, columns) {
    const totalCells = container.querySelectorAll('.memory-cell').length;
    let newIndex = currentIndex + 1;

    if (newIndex >= totalCells) {
      newIndex = 0;
    }

    const targetSelector = `.memory-cell[data-index="${newIndex}"]`;
    const targetCell = container.querySelector(targetSelector);
    if (targetCell) targetCell.focus();
  }

  /**
   * Focuses on the previous cell in the memory game.
   * @param {number} currentIndex - The index of the current cell.
   * @param {number} columns - The number of columns in the memory game grid.
   * @return {void}
   */
  function focusPreviousCell(currentIndex, columns) {
    const totalCells = container.querySelectorAll('.memory-cell').length;
    let newIndex = currentIndex - 1;

    // If it's the first cell, loop to the last cell
    if (newIndex < 0) {
      newIndex = totalCells - 1;
    }

    const targetSelector = `.memory-cell[data-index="${newIndex}"]`;
    const targetCell = container.querySelector(targetSelector);
    if (targetCell) targetCell.focus();
  }


  /**
   * Handles key press events for the memory game.
   * @param {Event} event - The key press event.
   * @param {number} index - The index of the cell.
   * @param {number} columns - The number of columns in the memory game.
   */
  function handleKeyPress(event, index, columns) {
    const key = event.key;
    const cells = container.querySelectorAll('.memory-cell').length;
    const rows = Math.ceil(cells / columns);
    switch (key) {
      case 'Enter':
      case ' ':
        cellClicked(index);
        break;
      case 'ArrowRight':
        focusNextCell(index, columns);
        break;
      case 'ArrowLeft':
        focusPreviousCell(index, columns);
        break;
      case 'ArrowUp':
        focusVerticalCell(index, -columns, rows, columns);
        break;
      case 'ArrowDown':
        focusVerticalCell(index, columns, rows, columns);
        break;
    }
  }

  /**
   * Focuses on a vertical cell in a memory game grid.
   * @param {number} currentIndex - The index of the current cell.
   * @param {number} jump - The number of cells to jump vertically.
   * @param {number} rows - The number of rows in the grid.
   * @param {number} columns - The number of columns in the grid.
   */
  function focusVerticalCell(currentIndex, jump, rows, columns) {
    let newIndex = currentIndex + jump;
    if (newIndex < 0) {
      newIndex = newIndex + rows * columns;
    } else if (newIndex >= rows * columns) {
      newIndex = newIndex - rows * columns;
    }

    const selector = `.memory-cell[data-index="${newIndex}"]`;
    const targetCell = container.querySelector(selector);
    if (targetCell) targetCell.focus();
  }


  /**
   * Checks if the selected memory cells have a match.
   * If a match is found, hides the matched cells and plays a sound.
   * If all matches are found, displays the attempts and reset button.
   */
  function checkForMatch() {
    isChecking = true;
    const cells = container.querySelectorAll('.memory-cell');
    const firstCell = cells[firstChoice];
    const secondCell = cells[secondChoice];

    if (!firstCell || !secondCell) {
      return;
    }

    const firstImageId = firstCell.dataset.imageId;
    const secondImageId = secondCell.dataset.imageId;

    if (firstImageId === secondImageId) {
      // Match found
      setTimeout(() => {
        firstCell.style.visibility = 'hidden';
        secondCell.style.visibility = 'hidden';
        isChecking = false;
        poofSound.play();
      }, 1000);
      matches++;
      if (matches * 2 === cells.length) {
        setTimeout(() => {
          attemptsDisplay.style.display = 'block'; // Show attempts display
          resetButton.style.display = 'block';
        }, 1000);
      }
    } else {
      setTimeout(() => {
        firstCell.style.backgroundImage = `url('${backImage}')`;
        secondCell.style.backgroundImage = `url('${backImage}')`;
        firstCell.dataset.flipped = 'false';
        secondCell.dataset.flipped = 'false';
        isChecking = false;
      }, 1000);
    }
    firstChoice = null;
    secondChoice = null;
  }
  createSizeSelection();
}

import {openTaskManager} from './taskManager.js';
import {openYouTubeApp} from './youtubePlayer.js';
import {openChatApp} from './chat.js';
import {loadMemoryGame} from './memory.js';
import {openCalculatorApp} from './calculator.js';
import memoryGameIcon from '../img/memory.png';
import chatIcon from '../img/messages.png';
import youtubeIcon from '../img/youtube.png';
import taskManagerIcon from '../img/taskManager.png';
import calculatorIcon from '../img/calculator.png';


document.addEventListener('DOMContentLoaded', () => {
  let isFirstWindow = true;
  let wasLastWindowMoved = false;
  let nextWindowTop;
  let nextWindowLeft;
  let rowsOfWindows = 0;
  let currentZIndex = 10;
  addListener('memory-game-icon', 'Memory Game');
  addListener('chat-icon', 'Messages');
  addListener('youtube-icon', 'Youtube');
  addListener('task-icon', 'Task Manager');
  addListener('calculator-icon', 'Calculator');
  /**
   * Adds a click event listener to the element with the specified id.
   * @param {string} id - The id of the element.
   * @param {string} app - The name of the application.
   */
  function addListener(id, app) {
    const container = document.getElementById(id);
    const icon = container.querySelector('.icon');
    container.addEventListener('click', () => {
      openApplication(app);
      icon.classList.add('jumping');
    });
    icon.addEventListener('animationend', () => {
      icon.classList.remove('jumping');
    });
  }
  /**
   * Opens an application window based on the provided app name.
   * @param {string} appName - The name of the application.
   */
  function openApplication(appName) {
    let iconSrc;
    switch (appName) {
      case 'Memory Game':
        iconSrc = memoryGameIcon;
        break;
      case 'Messages':
        iconSrc = chatIcon;
        break;
      case 'Youtube':
        iconSrc = youtubeIcon;
        break;
      case 'Task Manager':
        iconSrc = taskManagerIcon;
        break;
      case 'Calculator':
        iconSrc = calculatorIcon;
        break;
    }
    const desktop = document.getElementById('desktop');
    const windowElement = document.createElement('div');
    windowElement.classList.add('window');
    windowElement.innerHTML = `
      <div class="window-header">
        <img src="${iconSrc}" alt="" class="window-icon">${appName}
        <span class="close-button"></span>
      </div>
      <div class="window-content"></div>
    `;
    const contentContainer = windowElement.querySelector('.window-content');

    desktop.appendChild(windowElement);

    switch (appName) {
      case 'Memory Game':
        loadMemoryGame(contentContainer);
        windowElement.style.zIndex = ++currentZIndex;
        updateActiveWindowTitle();
        break;
      case 'Messages':
        openChatApp(contentContainer);
        windowElement.style.zIndex = ++currentZIndex;
        updateActiveWindowTitle();
        break;
      case 'Youtube':
        openYouTubeApp(contentContainer);
        windowElement.style.width = '500px';
        windowElement.style.zIndex = ++currentZIndex;
        updateActiveWindowTitle();
        break;
      case 'Task Manager':
        openTaskManager(contentContainer);
        windowElement.style.zIndex = ++currentZIndex;
        updateActiveWindowTitle();
        break;
      case 'Calculator':
        openCalculatorApp(contentContainer);
        windowElement.style.zIndex = ++currentZIndex;
        updateActiveWindowTitle();
        break;
    }

    if (isFirstWindow || wasLastWindowMoved) {
      nextWindowTop = (desktop.offsetHeight / 2);
      nextWindowLeft = (desktop.offsetWidth / 2);

      isFirstWindow = false;
      wasLastWindowMoved = false; // Reset the flag
      rowsOfWindows = 0;
    }

    windowElement.style.top = nextWindowTop + 'px';
    windowElement.style.left = nextWindowLeft + 'px';
    // Update next window position
    nextWindowTop += 30;
    nextWindowLeft += 30;

    // Reset if position exceeds certain limits
    if (nextWindowTop > desktop.offsetHeight) {
      rowsOfWindows += 1;
      nextWindowTop = (desktop.offsetHeight / 2.5);
      nextWindowLeft = (desktop.offsetWidth / 2) + rowsOfWindows * 50;
    }
    if (nextWindowLeft > desktop.offsetWidth) {
      rowsOfWindows += 1;
      nextWindowTop = (desktop.offsetHeight / 2.5);
      nextWindowLeft = (desktop.offsetWidth / 2) + rowsOfWindows * 50;
    }

    document.getElementById('desktop').appendChild(windowElement);

    // Dragging logic
    const headerElement = windowElement.querySelector('.window-header');
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    headerElement.addEventListener('mousedown', startDragging);
    window.addEventListener('mouseup', stopDragging);

    /**
     * Starts the dragging operation of the window.
     * @param {MouseEvent} event - The mouse event that triggered the start.
     */
    function startDragging(event) {
      isDragging = true;
      offsetX = event.clientX - windowElement.offsetLeft;
      offsetY = event.clientY - windowElement.offsetTop;
      window.addEventListener('mousemove', dragWindow);
      event.preventDefault();
      windowElement.style.zIndex = ++currentZIndex; // Increment.
      updateActiveWindowTitle();
    }

    /**
     * Updates the title of the active window based on the z.
     */
    function updateActiveWindowTitle() {
      let maxZ = 0;
      let activeTitle = '';
      document.querySelectorAll('.window').forEach((window) => {
        const zIndex = parseInt(window.style.zIndex, 10) || 0;
        if (zIndex > maxZ) {
          maxZ = zIndex;
          activeTitle = window.querySelector('.window-header').textContent;
        }
      });
      document.getElementById('active-window').textContent = activeTitle;
    }

    /**
     * Stops the dragging operation.
     */
    function stopDragging() {
      if (isDragging) {
        isDragging = false;
        window.removeEventListener('mousemove', dragWindow);
      }
    }

    /**
     * Drags the window element based on the mouse movement.
     * @param {MouseEvent} event - The mouse event object.
     */
    function dragWindow(event) {
      if (isDragging) {
        windowElement.style.left = event.clientX - offsetX + 'px';
        windowElement.style.top = event.clientY - offsetY + 'px';
        wasLastWindowMoved = true; // Update the flag when the window is moved
      }
    }

    const closeButton = windowElement.querySelector('.close-button');
    closeButton.addEventListener('click', function() {
      wasLastWindowMoved = true;
      windowElement.style.zIndex = 0;
      windowElement.remove();
      updateActiveWindowTitle();
    });
  }
});

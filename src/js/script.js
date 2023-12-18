import {openTaskManager} from './taskManager.js';
import {openYouTubeApp} from './youtubePlayer.js';
import {openChatApp} from './chat.js';
import {loadMemoryGame} from './memory.js';

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
  /**
   * Adds a click event listener to the element with the specified id.
   * @param {string} id - The id of the element.
   * @param {string} app - The name of the application.
   */
  function addListener(id, app) {
    const element = document.getElementById(id);
    element.addEventListener('click', () => openApplication(app));
  }
  /**
   * Opens an application window based on the provided app name.
   * @param {string} appName - The name of the application.
   */
  function openApplication(appName) {
    let iconSrc;
    switch (appName) {
      case 'Memory Game':
        iconSrc = 'img/memory.png';
        break;
      case 'Messages':
        iconSrc = 'img/messages.png';
        break;
      case 'Youtube':
        iconSrc = 'img/youtube.png';
        break;
      case 'Task Manager':
        iconSrc = 'img/taskManager.png'; // Path to your task manager icon
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
        break;
      case 'Messages':
        openChatApp(contentContainer);
        break;
      case 'Youtube':
        openYouTubeApp(contentContainer);
        windowElement.style.width = '500px';
        break;
      case 'Task Manager':
        openTaskManager(contentContainer);
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
      windowElement.style.zIndex = 0;
      windowElement.remove();
    });
  }
});

/**
 * Opens the task manager and displays a list of grouped windows.
 * @param {HTMLElement} container - The container element.
 */
export function openTaskManager(container) {
  const appGroupStates = {};
  /**
   * Updates the task list based on the current state of the application.
   */
  function updateTaskList() {
    document.querySelectorAll('.app-group-label').forEach((label) => {
      const appName = label.textContent.split(' (')[0];
      const appList = label.nextElementSibling;
      appGroupStates[appName] = appList.style.display === 'block';
    });

    container.innerHTML = '';

    const groupedWindows = {};
    document.querySelectorAll('.window').forEach((windowElement) => {
      const header = windowElement.querySelector('.window-header');
      const appName = header.textContent.trim();
      if (!groupedWindows[appName]) {
        groupedWindows[appName] = [];
      }
      groupedWindows[appName].push(windowElement);
    });

    Object.keys(groupedWindows).forEach((appName) => {
      const appGroup = document.createElement('div');
      appGroup.className = 'app-group';

      const appGroupLabel = document.createElement('div');
      appGroupLabel.className = 'app-group-label';
      const appCount = groupedWindows[appName].length;
      appGroupLabel.textContent = `${appName} (${appCount})`;
      appGroup.appendChild(appGroupLabel);

      const appGroupCloseButton = document.createElement('button');
      appGroupCloseButton.className = 'task-close-button';
      appGroupCloseButton.textContent = 'Close All';
      appGroupCloseButton.onclick = () => {
        groupedWindows[appName].forEach((win) => win.remove());
      };
      appGroupLabel.appendChild(appGroupCloseButton);

      const appList = document.createElement('ul');
      appList.className = 'task-list';
      appList.style.display = 'none';

      groupedWindows[appName].forEach((windowElement) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${appName}.js`;

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.className = 'task-close-button';
        closeButton.onclick = () => windowElement.remove();
        listItem.appendChild(closeButton);

        appList.appendChild(listItem);
      });
      appList.style.display = appGroupStates[appName] ? 'block' : 'none';
      appGroupLabel.onclick = () => {
        const isNone = appList.style.display === 'none';
        appList.style.display = isNone ? 'block' : 'none';
      };

      appGroup.appendChild(appList);
      container.appendChild(appGroup);
    });
  }

  updateTaskList();
  setInterval(updateTaskList, 1000);
}

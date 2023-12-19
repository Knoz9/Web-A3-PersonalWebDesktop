import appleLogoSrc from '../img/applewhite.png';
document.addEventListener('DOMContentLoaded', () => {
  // Apple Logo
  const appleLogo = document.createElement('img');
  appleLogo.src = appleLogoSrc;
  appleLogo.classList.add('apple-logo');
  appleLogo.alt = 'Apple Logo';

  const statusBar = document.getElementById('status-bar');
  statusBar.appendChild(appleLogo);

  const activeWindowElement = document.createElement('div');
  activeWindowElement.id = 'active-window';
  statusBar.appendChild(activeWindowElement);

  const updateActiveWindowTitle = () => {
    let maxZ = 0;
    let activeTitle = '';
    document.querySelectorAll('.window').forEach((window) => {
      const zIndex = parseInt(window.style.zIndex, 10) || 0;
      if (zIndex > maxZ) {
        maxZ = zIndex;
        activeTitle = window.querySelector('.window-header').textContent.trim();
      }
    });
    activeWindowElement.textContent = activeTitle;
  };
  // Battery Element
  const batteryWrapper = document.createElement('div');
  batteryWrapper.id = 'battery-wrapper';
  const batteryLevel = document.createElement('div');
  batteryLevel.id = 'battery-level';
  const batteryPercentage = document.createElement('div');
  batteryPercentage.id = 'battery-percentage';
  batteryWrapper.appendChild(batteryLevel);
  document.getElementById('status-bar').appendChild(batteryWrapper);

  if (typeof navigator.getBattery === 'function') {
    navigator.getBattery().then((battery) => {
      const updateBattery = () => {
        const level = Math.round(battery.level * 100);
        batteryLevel.style.width = `${level}%`;
        batteryPercentage.textContent = `${level}%`;
        batteryLevel.style.backgroundColor = level <= 20 ? 'red' : 'white';
      };
      updateBattery();
      battery.addEventListener('chargingchange', updateBattery);
      battery.addEventListener('levelchange', updateBattery);
    });
  } else {
    // Fallback battery level - set to a default (e.g., 100%)
    batteryLevel.style.width = '100%';
    batteryPercentage.textContent = '100%';
    batteryLevel.style.backgroundColor = 'white';
  }
  batteryWrapper.appendChild(batteryPercentage);
  // Date Element
  const dateElement = document.createElement('div');
  dateElement.id = 'date';
  const clock = document.getElementById('clock');
  statusBar.insertBefore(dateElement, clock);

  const updateDate = () => {
    const now = new Date();
    const options = {weekday: 'short', day: 'numeric', month: 'short'};
    dateElement.textContent = now.toLocaleDateString('en-US', options);
  };
  // Clock
  const clockElement = document.createElement('div');
  clockElement.id = 'clock';
  document.getElementById('status-bar').appendChild(clockElement);

  const updateClock = () => {
    clockElement.textContent = new Date().toLocaleTimeString();
  };
  setInterval(() => {
    updateDate();
    updateClock();
  }, 1000);
  updateDate();
  updateClock();

  updateActiveWindowTitle(); // Initial update
});

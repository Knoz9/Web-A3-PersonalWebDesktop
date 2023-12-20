/**
 * Opens the calculator app in the specified container.
 * @param {HTMLElement} container - The container element.
 */
export function openCalculatorApp(container) {
  container.innerHTML = '';

  const display = document.createElement('input');
  display.type = 'text';
  display.readOnly = true;
  display.className = 'calculator-display';

  const keys = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C',
  ];

  const operations = ['÷', '×', '-', '+', '=']; // Define operation keys

  const keysContainer = document.createElement('div');
  keysContainer.className = 'calculator-keys';

  keys.forEach((key) => {
    const button = document.createElement('button');
    button.textContent = key;
    button.className = 'calculator-button';

    // Add 'calculator-button-op' class for operation buttons
    if (operations.includes(key)) {
      button.classList.add('op');
    }

    button.onclick = () => handleButtonClick(key, display);
    keysContainer.appendChild(button);
  });

  container.appendChild(display);
  container.appendChild(keysContainer);
}

/**
 * Handles button click event and updates the display value accordingly.
 * @param {string} key - The key value of the clicked button.
 * @param {HTMLInputElement} display - The display element.
 */
function handleButtonClick(key, display) {
  if (key === 'C') {
    display.value = '';
  } else if (key === '=') {
    try {
      let expression = display.value;
      expression = expression.replace(/÷/g, '/').replace(/×/g, '*');
      display.value = eval(expression);
    } catch {
      display.value = 'Error';
    }
  } else {
    if (display.value.length > 8) {
      return;
    } else {
      display.value += key;
    }
  }
}


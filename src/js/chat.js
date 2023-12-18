import sendSoundSrc from '../audio/sentMessage.mp3';
import receiveSoundSrc from '../audio/recievedMessage.mp3';
/**
 * Opens the chat application in the specified container.
 * If a username is stored in the local storage, it initializes the chat.
 * Otherwise, it prompts the user to enter a username and stores it in.
 * @param {HTMLElement} container - The container element.
 */
export function openChatApp(container) {
  let username = localStorage.getItem('chatUsername');
  const playSound = (soundSrc) => {
    const sound = new Audio(soundSrc);
    sound.play();
  };
  /**
   * Initializes the chat functionality.
   */
  function initializeChat() {
    const websocket = new WebSocket('wss://courselab.lnu.se/message-app/socket');
    const apiKey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd';
    const messages = [];

    websocket.onmessage = function(event) {
      const message = JSON.parse(event.data);
      if (message.type === 'message') {
        messages.push(message);
        if (messages.length > 20) {
          messages.shift();
        }
        updateMessagesDisplay();
        if (message.username !== username) {
          playSound(receiveSoundSrc);
        }
      }
    };

    container.innerHTML = '';

    const messageDisplay = document.createElement('div');
    messageDisplay.className = 'message-display';

    const messageInput = document.createElement('textarea');
    messageInput.className = 'message-input';
    messageInput.placeholder = 'iMessage';

    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    sendButton.className = 'chat-button';
    sendButton.addEventListener('click', () => {
      const message = messageInput.value.trim();
      if (message) {
        websocket.send(JSON.stringify({
          type: 'message',
          data: message,
          username: username,
          channel: 'KenanA3',
          key: apiKey,
        }));
        messageInput.value = '';
        playSound(sendSoundSrc);
      }
    });

    container.appendChild(messageDisplay);
    container.appendChild(messageInput);
    container.appendChild(sendButton);

    /**
     * Updates the display of messages.
     */
    function updateMessagesDisplay() {
      messageDisplay.innerHTML = messages.map((msg) => {
        const messageClass = msg.username === username ? 'self' : 'others';
        return (
          `<p class="${messageClass}"><b>${msg.username}:</b> ${msg.data}</p>`
        );
      }).join('');
    }
  }
  if (!username) {
    const usernameInput = document.createElement('input');
    usernameInput.placeholder = 'Enter your username';
    usernameInput.className = 'username-input';

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.className = 'chat-button';
    submitButton.addEventListener('click', () => {
      username = usernameInput.value.trim();
      if (username) {
        localStorage.setItem('chatUsername', username);
        initializeChat();
      }
    });

    container.innerHTML = '';
    container.appendChild(usernameInput);
    container.appendChild(submitButton);
  } else {
    initializeChat();
  }
}

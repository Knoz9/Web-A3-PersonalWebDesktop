# Web Personal Work Desktop

This project is a simple desktop-like interface in the browser where you can open and interact with different applications like a Memory Game, a Chat application, a YouTube player, and a Task Manager.

## Live Demo

You can view a live demo of the project here: [Live Demo](https://km-macosdesktop.netlify.app)

## Screenshots

Here are some screenshots of the desktop and its applications:

### Full screenshot of the App:

<img src="./img/app_screenshot.png" alt="app Screenshot" width="500">

Full screenshot of the app with memory game open


### Dock

<img src="./img/dock_screenshot.png" alt="Dock Screenshot" width="500">

The dock interface with application icons.

### Status bar

<img src="./img/statusbar_screenshot.png" alt="app Screenshot" width="500">

The status bar when memory game is open. We are also hovering our mouse over the battery to see the percentage.

### Memory Game

<img src="./img/memory_game_screenshot.png" alt="Memory Game Screenshot" width="300">

### Chat Application

<img src="./img/chat_app_screenshot.png" alt="Chat Application Screenshot" width="300">

### Task Manager

<img src="./img/task_manager_screenshot.png" alt="Task Manager Screenshot" width="300">

### Calculator Application

<img src="./img/calculator_screenshot.png" alt="Calculator Screenshot" width="300">

### Game Center

<img src="./img/game_center_screenshot.png" alt="Game Center Screenshot" width="300">

### YouTube Player

<img src="./img/youtube_player_screenshot.png" alt="YouTube Player Screenshot" width="300">

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

This project runs in the browser, so no special prerequisites are required.

### Installation

1. Clone the repo
   ```sh
   git clone
   ```
2. Open `index.html` in your browser

## Usage & Features

### Status bar

#### How to Use/Features:
- When an app is open, just like on macOS, the app name is displayed in the top left.

- It displays the current date and time at the far right

- It also shows the current battery percentage in an icon, and if you hover over it, we can see the percentage in numbers.

- The battery defaults to 100% if we can't read the battery due to privacy or if the device does not have a battery to read.

### Dock

#### How to Use/Features:
- Click on the icons in the dock to open the corresponding application. 

- You can drag the windows around and close them. When multiple windows are open, they stack on top of each other. 

- You can focus on any window by clicking its draggable bar, which will bring it to the front of the stack.

- Also, we have some animations in the dock, and the app name is shown when hovering over an icon.

### Memory game

The Memory Game is a classic card game where the objective is to find and match pairs of cards. 

#### How to Play

1. Click on the Memory Game icon to start the game.
2. You will be prompted to choose the size of the game grid (options include 2x2, 2x4, and 4x4).
3. Once the game grid is displayed, click on a card to reveal its image.
4. Try to find the matching card by clicking on another card.
5. The game continues until all pairs have been found.

#### Features

- The game counts the number of attempts it takes to find all pairs and displays this number when the game is finished.
- Sound effects are played when cards are flipped and when pairs are found.
- The game can be reset at the end by clicking the "Reset Game" button.
- The game can also be played using the keyboard. Press tab once to focus on the game grid, then use the arrow keys to navigate between cards. Press space or enter to flip a card.

### Chat Application

The chat application mimics the iMessage interface, displaying chat bubbles in different positions and colors based on whether the message was sent or received. It also includes sound effects for sending and receiving messages.

#### How to Use

1. Click on the Messages icon to start the chat application.
2. If a username is stored in the local storage, the chat will initialize. If not, you will be prompted to enter a username. This username will be stored in the local storage for future sessions.
3. Once the chat is initialized, you can type messages into the input field and then press enter to send them. Messages you send will appear on the right side of the chat interface in blue bubbles.
4. Messages received from others will appear on the left side of the chat interface in gray bubbles.
5. Sound effects will play when messages are sent and received.

#### Features

- The chat interface is styled to mimic iMessage, with chat bubbles appearing in different positions and colors based on whether the message was sent or received.
- Sound effects play when messages are sent and received to enhance the user experience.
- The chat application uses a WebSocket connection to send and receive messages in real time.
- The application stores the username in the local storage, so you don't have to enter it every time you open the chat.
- The chat interface includes a message display area, a message input field, and a send button. The message display area automatically updated to show new messages.
- The application keeps track of the last 20 messages and displays them in the message display area.

### Task Manager

The task manager provides an overview of all currently open windows in the application, grouped by their respective applications. It allows users to close individual windows or all windows of a specific application at once.

#### How to Use

1. Click on the Task Manager icon to open the task manager.
2. The task manager interface displays a list of all open windows, grouped by application. Each group shows the name of the application and the number of open windows.
3. Clicking on the name of an application will expand or collapse the list of open windows for that application.
4. Each window in the list has a "Close" button that can be used to close the individual window.
5. Each application group also has a "Close All" button that can be used to close all windows of that application.

#### Features

- The task manager automatically updates every second to reflect the current state of the application.
- The task manager groups open windows by application, making it easy to see how many windows each application has open.
- The task manager allows users to close individual windows or all windows of a specific application at once.
- The task manager remembers the expanded/collapsed state of each application group, so if a group was expanded the last time the task manager was updated, it will remain expanded 
in the next update.

### Calculator

The Calculator app allows users to perform basic calculations, including addition, subtraction, multiplication, and division, within the application.

#### How to Use

1. Click on the Calculator icon to open the app.
2. Use the displayed buttons to input numbers and arithmetic operations.
3. Click on the `=` button to calculate the result. The result will be displayed in the input field at the top of the calculator.
4. To start a new calculation or clear the current input, click the `C` button.

#### Features

- Supports basic operations including addition (`+`), subtraction (`-`), multiplication (`×`), and division (`÷`).
- The calculator features a grid of buttons representing digits and operations for easy input.
- Results are displayed immediately after pressing the `=` button.
-  Displays an error message in case of invalid input or calculation errors.
- A 9 character limit is in place to prevent digits from going out of frame

### Game Center

Game Center app is your destination for playing embedded HTML games directly in your web browser. With three games available, the interface automatically adjusts to the size of each game for a tailored experience.

#### How to Use

1. Click on the Game Center icon to open the app.
2. Select from the available games by clicking on their preview.
3. The game loads directly in the window, which resizes for optimal gameplay.
4. To switch games, close the game. Then, reopen Game Center and select another.

#### Features

- Includes popular titles like Flappy Bird, Mario Forever, and Fruit Ninja.
- The game window resizes according to the game's dimensions.
- Simple and intuitive interface for game selection and play. 

### YouTube Player

The YouTube player allows users to load and play YouTube videos within the application.

#### How to Use

1. Click on the YouTube Player icon to open the YouTube player.
2. Enter a YouTube video URL into the input field.
3. Click the "Load Video" button to load the video. The video will be displayed in an iframe below the input field and button.

#### Features

- The YouTube player supports any YouTube video URL. It extracts the video ID from the URL and uses it to load the video.
- The YouTube player uses an iframe to display the video, allowing users to watch the video without leaving the application.
- The iframe is initially hidden and is only displayed once a video is loaded.
- The YouTube player supports all standard YouTube video features, including autoplay, encrypted media, gyroscope, and picture-in-picture.
- The YouTube player also supports fullscreen mode (although outside of the PWD)

## Code Overview

The main script (`script.js`) listens for the `DOMContentLoaded` event and then sets up event listeners on the application icons. When an icon is clicked, it opens the corresponding application in a new window.

Each application has its own `.js` file. When an application is opened, its script is run inside the window. The status bar is also in its own `.js` file which loads the status bar seperatly from everything else.

## NOTE
All assets are owned by me except for the messages icon, desktop background, apple logo in the top left and sound files for messages. All of these are from macOS, and are used purely for educational purposes (fair use). It is to style it to look like macOS running in a browser. 

Sound effects for memory app are taken from youtube.

Games are embedded and source is from https://funhtml5games.org, https://scratch.mit.edu/ & https://www.retrogames.cc/
# ![emoji](./emojo.png) Almost Timer
 ![Timer Gamer Logo](./logo.png)

## Overview

**Almost Timer** is an interactive, fast-paced game that tests your reflexes and reaction times! Players compete on leaderboards by scoring points based on how quickly they can react to timed challenges. With real-time updates, fun animations, and a competitive edge, Timer Gamer keeps you engaged as you race against the clock! 🎮

## Table of Contents

- [ Almost Timer](#-almost-timer)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Game Concept](#game-concept)
    - [Game Mechanics](#game-mechanics)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Features](#features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Clone the Repository](#clone-the-repository)
    - [Frontend Installation](#frontend-installation)
    - [Backend Installation](#backend-installation)
  - [Usage](#usage)
  - [API Reference](#api-reference)
    - [Base URL](#base-url)
    - [Endpoints](#endpoints)
  - [Contributing](#contributing)
  - [License](#license)

## Game Concept

In **Timer Gamer**, players enter their names to compete in various timed challenges. The game generates random numbers, changing quickly, and players must respond as fast as possible. The faster you react, the better your score! Each player's high scores are displayed on a **real-time leaderboard**, making every challenge even more competitive. ⏱️

### Game Mechanics

- **Username Setup**: Players enter their names to track scores. 📝
- **Random Number Challenges**: React to rapidly changing numbers within a specific time. 🔢
- **Leaderboards**: Compete to top the high score leaderboard. 🏆

## Tech Stack

### Frontend

- **React**: For building the user interface. ⚛️
- **TypeScript**: To maintain type safety and enhance development. 💻
- **CSS3**: Custom styling and animations for a smooth user experience. 🎨
- **Vercel**: Hosting the frontend for easy deployment. 🚀

### Backend

- **Node.js**: For building scalable, server-side logic. 🌐
- **Express**: A minimal framework for API creation and routing. 🛠️
- **Prisma**: ORM for managing the database and migrations. 📊
- **Render**: Backend deployment for fast, scalable hosting. 📦

## Features

- **Dynamic Gameplay**: Players respond to fast-changing random numbers. 🎲
- **Player Profiles**: Track player scores with username input. 👤
- **Real-time Leaderboards**: Compete and track your scores against others. 📈
- **Engaging UX**: Includes animations and sound effects for a more immersive experience. 🎶

## Installation

### Prerequisites

- **Node.js** (v14 or higher) 📦
- **npm** (Node package manager) 📜

### Clone the Repository

```bash
git clone https://github.com/yourusername/timer-gamer.git
cd timer-gamer
```

### Frontend Installation

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

### Backend Installation

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database and migrations using Prisma:

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. Start the server:

   ```bash
   npm run start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173` for the frontend. 🌍
2. Enter your name to begin playing and tracking your scores. 🕹️
3. Choose from different challenges, improve your scores, and compete on the leaderboard! 🏅

## API Reference

### Base URL

`https://timer-gamer-1.onrender.com/api`

### Endpoints

- **GET /users/leaderboard/:timerKeyScore**
  - Retrieves the leaderboard for the specified timer challenge.
  - **Parameters**: 
    - `timerKeyScore`: The key representing the timer (e.g., `timer1Score`). 📊

## Contributing

We welcome contributions to **Timer Gamer**! To contribute:

1. Fork the repository. 🍴
2. Create a new branch for your feature or fix. 🌿
3. Make your changes and commit them. 💻
4. Push your branch to your forked repository. 🚀
5. Create a pull request to the main repository. 🔄

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details. 📜


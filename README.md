# 🕒 Timer Gamer

## Overview

**Timer Gamer** is an interactive game designed to challenge players by testing their quick thinking and reaction times. Players compete on leaderboards by scoring points based on how quickly they can respond to random timers. The game features an engaging user interface and real-time updates to keep the experience exciting and competitive. 🎮

## Table of Contents

- [🕒 Timer Gamer](#-timer-gamer)
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

In Timer Gamer, players enter their usernames to track their scores in various timer challenges. The game displays random numbers that change quickly, and the objective is to respond accurately before time runs out. Players can see their scores on a leaderboard, adding a competitive edge to the gameplay. ⏱️

### Game Mechanics
- Players enter their name to track their scores. 📝
- Random numbers are displayed rapidly, and players must react accordingly. 🔢
- The game maintains a leaderboard to showcase the top scores. 🏆

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces. ⚛️
- **TypeScript**: A typed superset of JavaScript for building robust applications. 💻
- **CSS**: For styling the user interface. 🎨
- **Vercel**: For hosting the frontend application. 🚀

### Backend
- **Node.js**: JavaScript runtime for building scalable server-side applications. 🌐
- **Express**: A minimal and flexible Node.js web application framework. 🏗️
- **Prisma**: An ORM for database management and migrations. 🗄️
- **Vercel**: For deploying the backend API. 📦

## Features

- User authentication through username input. 🔒
- Real-time leaderboard updates. 📈
- Dynamic number generation to enhance gameplay. 🎲
- Engaging user interface with animations and sound effects. 🎶

## Installation

### Prerequisites

- Node.js (v14 or higher) 📦
- npm (Node package manager) 📜

### Clone the Repository

```bash
git clone https://github.com/yourusername/timer-gamer.git
cd timer-gamer
```

### Frontend Installation

1. Navigate to the frontend directory:

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

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database and migrations with Prisma:

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
2. Enter your name to begin playing and track your scores. 🕹️
3. Interact with the game and compete against others on the leaderboard! 🏅

## API Reference

### Base URL

`https://timer-gamer-1.onrender.com/api`

### Endpoints

- **GET /users/leaderboard/:timerKeyScore**
  - Retrieves the leaderboard for the specified timer key.
  - **Parameters**: 
    - `timerKeyScore`: The key representing the timer (e.g., `timer1Score`). 📊

## Contributing

We welcome contributions to Timer Gamer! 🤝 To contribute:

1. Fork the repository. 🍴
2. Create a new branch for your feature or fix. 🌿
3. Make your changes and commit them. 📝
4. Push your branch to your forked repository. 📤
5. Create a pull request to the main repository. 🔄

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information. 📜


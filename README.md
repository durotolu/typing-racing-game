# Typing Racing Game 🏎️⌨️

A real-time multiplayer typing racing game where players compete against each other by typing text as fast and accurately as possible.

## Features

- Real-time multiplayer racing experience
- Live race track visualization
- Socket.io-based real-time updates
- Modern and responsive user interface

## Tech Stack

### Frontend
- React.js with TypeScript
- Socket.io-client for real-time communication
- Modern UI components
- Real-time race tracking

### Backend
- Node.js with Express
- TypeScript
- Socket.io for real-time game state management
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/typing-racing-game.git
cd typing-racing-game
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`, and the backend server will run on `http://localhost:5000`.

## Game Rules

1. Join a race room
2. Wait for other players to join
3. When the race starts, type the displayed text as quickly and accurately as possible
4. Your progress will be shown on the race track in real-time
5. First player to complete the text with acceptable accuracy wins!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
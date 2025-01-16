import { useState } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:4000'); // Ensure this matches the server URL

const JoinGame = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');

  const generateRandomId = (): string => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`; // e.g., '1689736531234-482'
  };
  
  const handleJoinGame = () => {
    if (playerName) {
      const playerId = localStorage.getItem('playerId') || generateRandomId();
      localStorage.setItem('playerId', playerId);

      // socket.emit('joinGame', playerName);
      socket.emit('joinGame', { playerId, playerName });
      navigate('/game')
    }
  };

  return (
    <div className="join-game">
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="border p-2"
      />
      <button onClick={handleJoinGame} className="text-white p-2">
        Join Game
      </button>
    </div>
  );
};

export default JoinGame;

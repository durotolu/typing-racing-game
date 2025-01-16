import { useState } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:4000');

interface Player {
  id: string;
  name: string;
  progress: number;
}


const JoinGame = ({setPlayerId, players}: {players: Player[], setPlayerId: (id: string) => void}) => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');

  const generateRandomId = (): string => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };
  
  const handleJoinGame = () => {
    if (playerName) {
      const randomId = generateRandomId();
      setPlayerId(randomId);

      socket.emit('joinGame', { playerId: randomId, playerName, car: `car${players.length + 1}` });
      navigate('/game')
    }
  };

  return (
    <div className="join-game space-y-8">
      <div>
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="border p-2"
        />
      </div>
      <button onClick={handleJoinGame} className={`text-white p-2 ${!playerName && 'opacity-60'}`} disabled={!playerName}>
        Join Game
      </button>
    </div>
  );
};

export default JoinGame;

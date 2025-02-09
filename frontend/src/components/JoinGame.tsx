import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinGame = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');
  
  const handleJoinGame = () => {
    if (playerName) {
      navigate(`/game?name=${playerName}`)
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

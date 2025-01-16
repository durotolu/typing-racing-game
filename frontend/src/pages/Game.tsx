import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import RaceTrack from '../components/RaceTrack';
import TypingArea from '../components/TypingArea';

const socket = io('http://localhost:4000');

const Game: React.FC = () => {
  const [players, setPlayers] = useState<{
    id: string;
    name: string;
    progress: number;
  }[]>([]);

  useEffect(() => {
    socket.on('updatePlayers', (data) => setPlayers(data));

    return () => {
      socket.off('updatePlayers');
    };
  }, []);

  const handleProgress = (progress: number) => {
    const playerId = localStorage.getItem('playerId');
    socket.emit('typingProgress', {playerId, progress});
  };

  return (
    <div>
      <RaceTrack players={players} />
      <TypingArea onProgress={handleProgress} />
    </div>
  );
};

export default Game;

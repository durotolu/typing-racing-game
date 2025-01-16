import { useEffect } from 'react';
import io from 'socket.io-client';
import RaceTrack from '../components/RaceTrack';
import TypingArea from '../components/TypingArea';

const socket = io('http://localhost:4000');

interface Player {
  id: string;
  name: string;
  car: "car1" | "car2" | "car3" | "car4";
  progress: number;
}

const Game = ({
  playerId, 
  players, 
  setPlayers
} : {
  playerId: string, 
  players: Player[],
  setPlayers: (players: Player[]) => void,
}) => {

  useEffect(() => {
    socket.on('updatePlayers', (data) => setPlayers(data));

    return () => {
      socket.off('updatePlayers');
    };
  }, []);

  const handleProgress = (progress: number) => {
    socket.emit('typingProgress', {playerId, progress});
  };

  return (
    <div className='w-full space-y-12'>
      {players.length >= 4 ?
        <>
          <RaceTrack players={players} playerId={playerId} />
          <TypingArea onProgress={handleProgress} />
        </>
      :
        <div className='text-2xl text-center'>Waiting for othe players...</div>
      }
    </div>
  );
};

export default Game;

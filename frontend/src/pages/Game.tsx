import { useState, useEffect } from 'react';
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
}: {
  playerId: string, 
  players: Player[],
  setPlayers: (players: Player[]) => void,
}) => {
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (players.length >= 4) {
      // Activate overlay and start countdown
      setIsOverlayActive(true);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsOverlayActive(false);
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [players.length, setIsOverlayActive, setCountdown]);

  useEffect(() => {
    socket.on('updatePlayers', (data) => setPlayers(data));

    return () => {
      socket.off('updatePlayers');
    };
  }, [setPlayers]);

  const handleProgress = (progress: number) => {
    if (!isOverlayActive) {
      socket.emit('typingProgress', { playerId, progress });
    }
  };

  return (
    <div className='w-full space-y-12'>
      {players.length >= 4 ? (
        <>
          {isOverlayActive && (
            <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center z-50">
              <div className="text-white text-4xl">
                {countdown > 0 ? countdown : 'Go!'}
              </div>
            </div>
          )}
          <RaceTrack players={players} playerId={playerId} />
          <TypingArea onProgress={handleProgress} disabled={isOverlayActive} />
        </>
      ) : (
        <div className="text-2xl text-center">Waiting for other players...</div>
      )}
    </div>
  );
};

export default Game;

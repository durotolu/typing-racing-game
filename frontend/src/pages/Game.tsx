import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import RaceTrack from '../components/RaceTrack';
import TypingArea from '../components/TypingArea';
import { useNavigate, useSearchParams } from 'react-router-dom';

const socket = io('http://localhost:4000');

interface Player {
  id: string;
  name: string;
  car: "car1" | "car2" | "car3" | "car4";
  progress: number;
}

const generateRandomId = (): string => {
  return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

const Game = ({
  playerId, 
  players, 
  setPlayers,
  setPlayerId,
}: {
  playerId: string, 
  players: Player[],
  setPlayers: (players: Player[]) => void,
  setPlayerId: (id: string) => void,
}) => {
  const [isOverlayActive, setIsOverlayActive] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const firstExecution = useRef(true);

  const name = searchParams.get('name');
  const length = searchParams.get('length');

  useEffect(() => {
    if (players.length >= 4 && !isGameOver) {
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
  }, [players.length]);

  useEffect(() => {
    if (firstExecution.current) {
      firstExecution.current = false; // Prevent further execution
      const randomId = generateRandomId();
      setPlayerId(randomId);
      socket.emit('joinGame', { playerId: randomId, playerName: name, car: `car${length}` });
    }
  
    socket.on('updatePlayers', (data: Player[]) => {
      setPlayers(data);
    });
  
    socket.on('gameOver', ({ winner }) => {
      setIsGameOver(true);
      setWinner(winner?.name);
  
      // Countdown logic here
      let countdownTimer = 5;
      const interval = setInterval(() => {
        console.log(`New game starts in: ${countdownTimer} seconds`);
        countdownTimer--;
  
        if (countdownTimer < 0) {
          clearInterval(interval);
          handleNewGame();
        }
      }, 1000);
    });
  
    return () => {
      socket.off('updatePlayers');
      socket.off('gameOver');
    };
  }, []);

  const handleProgress = (progress: number) => {
    if (!isOverlayActive && !isGameOver) {
      socket.emit('typingProgress', { playerId, progress });
    }
  };

  const handleNewGame = () => {
    // Reset state for a new game
    setIsGameOver(false);
    setWinner(null);
    setPlayers([]);
    socket.connect(); // Reconnect the socket for a new game
    navigate('/')
  };

  return (
    <div className='w-full space-y-12'>
      {isGameOver && (
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="text-4xl font-bold">Game Over!</div>
          <div className="text-2xl">Winner: {winner}</div>
        </div>
      )}
      {players.length >= 4 || isGameOver ? (
        <>
          {isOverlayActive && (
            <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center z-50">
              <div className="text-white text-4xl">
                {countdown > 0 ? countdown : 'Go!'}
              </div>
            </div>
          )}
          <RaceTrack players={players} playerId={playerId} />
          <TypingArea onProgress={handleProgress} disabled={isOverlayActive || isGameOver} />
        </>
      ) : (
        <div className="text-2xl text-center">Waiting for other players...</div>
      )}
    </div>
  );
};

export default Game;

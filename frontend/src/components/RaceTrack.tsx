import React from 'react';
import Car1 from '../assets/car1.jpg';
import Car2 from '../assets/car2.jpg';
import Car3 from '../assets/car1.jpg';
import Car4 from '../assets/car1.jpg';

interface Player {
  id: string;
  name: string;
  car: "car1" | "car2" | "car3" | "car4";
  progress: number;
}

const cars = {
  car1: Car1,
  car2: Car2,
  car3: Car3,
  car4: Car4,
}

const RaceTrack: React.FC<{ players: Player[], playerId: string }> = ({ players, playerId }) => {
  return (
    <div className="space-y-4 w-full">
      {players.map((player, index) => (
        <div key={index} className='flex w-full items-center'>
          <div className="w-[200px] top-1 text-sm">{player.name} {playerId === player.id && "(Me)"}</div>
          <div className="relative w-full flex h-8 border bg-gray-200" style={{ display: "flex"}}>
            <div
              className="absolute h-12 w-12"
              style={{ left: `${player.progress}%`, position: "relative" }}
            >
              <img src={cars[player.car]} alt={player.car} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RaceTrack;

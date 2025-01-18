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
    <div className="space-y-4 w-full bg-gray-800 p-6 rounded-lg">
      {players.map((player, index) => (
        <div key={index} className='flex w-full items-center gap-4'>
          <div className="w-[150px] text-sm text-white font-semibold">
            {player.name} {playerId === player.id && "(Me)"}
          </div>
          <div className="relative flex-1">
            {/* Race Lane */}
            <div className="h-12 bg-gray-700 rounded-lg border-2 border-yellow-500 relative overflow-hidden">
              {/* Lane Markers */}
              <div className="absolute inset-0 flex">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 border-r border-dashed border-yellow-500/30"
                  />
                ))}
              </div>
              
              {/* Finish Line */}
              <div className="absolute right-0 h-full w-4 bg-[repeating-linear-gradient(45deg,black,black_10px,white_10px,white_20px)]" />
              
              {/* Car */}
              <div
                className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 w-12 h-12 flex items-center justify-center"
                style={{ left: `${player.progress}%` }}
              >
                <img 
                  src={cars[player.car]} 
                  alt={player.car} 
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RaceTrack;

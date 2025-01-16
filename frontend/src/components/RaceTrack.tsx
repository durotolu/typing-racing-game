import React from 'react';

interface Player {
  id: string;
  name: string;
  progress: number;
}

const RaceTrack: React.FC<{ players: Player[] }> = ({ players }) => {
  const playerId = localStorage.getItem('playerId') 
  return (
    <div className="space-y-4">
      {players.map((player, index) => (
        <div key={index} className="relative flex h-8 border bg-gray-200" style={{ display: "flex"}}>
          <div className="absolute left-2 top-1 text-sm">{player.name} ({playerId === player.id && "Me"})</div>
          <div
            className="absolute h-8 w-8 bg-red-500"
            style={{ left: `${player.progress}%`, position: "relative" }}
          >
            car
          </div>
        </div>
      ))}
    </div>
  );
};

export default RaceTrack;

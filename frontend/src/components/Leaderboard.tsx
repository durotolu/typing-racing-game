import React from 'react';

interface Player {
  id: string;
  name: string;
  progress: number;
}

interface LeaderboardProps {
  players: Player[];
  playerId: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ players, playerId }) => {
  const sortedPlayers = [...players].sort((a, b) => b.progress - a.progress);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm">
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      <div className="space-y-2">
        {sortedPlayers.map((player, index) => (
          <div 
            key={player.id}
            className={`flex justify-between items-center p-2 rounded ${
              player.id === playerId ? 'bg-blue-100' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{index + 1}.</span>
              <span>{player.name}</span>
            </div>
            <span className="text-gray-600">{Math.round(player.progress)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard; 
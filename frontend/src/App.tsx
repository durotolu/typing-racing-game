import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import './App.css';

const App: React.FC = () => {
  const [playerId, setPlayerId] = useState('');
  const [players, setPlayers] = useState<{
    id: string;
    name: string;
    car: "car1" | "car2" | "car3" | "car4";
    progress: number;
  }[]>([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home players={players} />} />
        <Route path="/game" element={<Game playerId={playerId} setPlayers={setPlayers} players={players} setPlayerId={setPlayerId} />} />
      </Routes>
    </Router>
  );
};

export default App;

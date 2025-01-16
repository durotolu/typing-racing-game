import React from 'react';
import JoinGame from '../components/JoinGame';

const Home: React.FC = () => {

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">Typing Race Game</h1>
      <JoinGame />
    </div>
  );
};

export default Home;

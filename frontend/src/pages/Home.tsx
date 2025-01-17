import JoinGame from '../components/JoinGame';

interface Player {
  id: string;
  name: string;
  progress: number;
}

const Home = ({ players}: {players: Player[] }) => {

  return (
    <div className="text-center space-y-20">
      <h1 className="text-4xl font-bold">Typing Race Game</h1>
      <JoinGame players={players} />
    </div>
  );
};

export default Home;

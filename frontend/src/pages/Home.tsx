import JoinGame from '../components/JoinGame';

interface Player {
  id: string;
  name: string;
  progress: number;
}

const Home = ({setPlayerId, players}: {players: Player[], setPlayerId: (id: string) => void}) => {

  return (
    <div className="text-center space-y-20">
      <h1 className="text-4xl font-bold">Typing Race Game</h1>
      <JoinGame setPlayerId={setPlayerId} players={players} />
    </div>
  );
};

export default Home;

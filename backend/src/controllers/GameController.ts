import { Server } from 'socket.io';
import { gameService } from '../services/GameService';

export const setupGameHandlers = (io: Server): void => {
  io.on('connection', (socket) => {

    // Handle player joining
    socket.on('joinGame', ({ playerId, playerName, car }) => {
      gameService.addPlayer(playerId, playerName, car);
      io.emit('updatePlayers', gameService.getPlayers());
    });

    socket.on('typingProgress', ({ playerId, progress }) => {
      gameService.updateProgress(playerId, progress);

      // Check if any player reached 100 progress
      const winner = gameService.checkWinner();
      if (winner) {
        io.emit('gameOver', { winner });
        gameService.resetGame();
      } else {
        io.emit('updatePlayers', gameService.getPlayers());
      }
    });

    // Handle player disconnect
    socket.on('disconnect', () => {
      gameService.resetGame()
      io.emit('updatePlayers', gameService.getPlayers());
      console.log(`User disconnected: ${socket.id}`);
    });

    // Handle player disconnect
    socket.on('getPlayers', () => {
      io.emit('playersData', gameService.getPlayers());
    });
  });
};

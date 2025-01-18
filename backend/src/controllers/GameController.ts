import { Server } from 'socket.io';
import { gameService } from '../services/GameService';

export const setupGameHandlers = (io: Server): void => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle player joining
    socket.on('joinGame', ({ playerId, playerName, car }) => {
      gameService.addPlayer(playerId, playerName, car);
      // Send both players and current sentence
      io.emit('updatePlayers', gameService.getPlayers());
      io.emit('updateSentence', gameService.getCurrentSentence());
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
      gameService.removePlayer(socket.id);
      io.emit('updatePlayers', gameService.getPlayers());
      console.log(`User disconnected: ${socket.id}`);
    });

    // Handle get players request
    socket.on('getPlayers', () => {
      io.emit('playersData', gameService.getPlayers());
      io.emit('updateSentence', gameService.getCurrentSentence());
    });
  });
};

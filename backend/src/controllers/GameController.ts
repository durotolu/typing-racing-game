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

      // First emit the progress update
      io.emit('updatePlayers', gameService.getPlayers());

      // Then check for winner and emit game over if needed
      const winner = gameService.checkWinner();
      if (winner) {
        // Small delay to ensure progress update is rendered
        setTimeout(() => {
          io.emit('gameOver', { winner });
          gameService.resetGame();
        }, 100);
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

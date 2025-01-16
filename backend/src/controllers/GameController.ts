import { Server } from 'socket.io';
import { gameService } from '../services/GameService';

export const setupGameHandlers = (io: Server): void => {
  io.on('connection', (socket) => {

    // Handle player joining
    socket.on('joinGame', ({ playerId, playerName, car }) => {
      gameService.addPlayer(playerId, playerName, car);
      io.emit('updatePlayers', gameService.getPlayers());
    });

    // Handle typing progress
    socket.on('typingProgress', ({ playerId, progress }) => {
      gameService.updateProgress(playerId, progress);
      io.emit('updatePlayers', gameService.getPlayers());
    });

    // Handle player disconnect
    socket.on('disconnect', () => {
      gameService.removePlayer(socket.id);
      io.emit('updatePlayers', gameService.getPlayers());
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

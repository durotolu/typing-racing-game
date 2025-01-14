import { Server } from 'socket.io';
import { gameService } from '../services/GameService';

export const setupGameHandlers = (io: Server): void => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle player joining
    socket.on('joinGame', (playerName: string) => {
      gameService.addPlayer(socket.id, playerName);
      io.emit('updatePlayers', gameService.getPlayers());
    });

    // Handle typing progress
    socket.on('typingProgress', (progress: number) => {
      gameService.updateProgress(socket.id, progress);
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

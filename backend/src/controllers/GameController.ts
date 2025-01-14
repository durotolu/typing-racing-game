import { Server } from 'socket.io';

let players: { [key: string]: { name: string; progress: number } } = {};

export const setupGameHandlers = (io: Server) => {
  io.on('connection', (socket) => {
    socket.on('joinGame', (playerName: string) => {
      players[socket.id] = { name: playerName, progress: 0 };
      io.emit('updatePlayers', players);
    });

    socket.on('typingProgress', (progress: number) => {
      if (players[socket.id]) {
        players[socket.id].progress = progress;
        io.emit('updatePlayers', players);
      }
    });

    socket.on('disconnect', () => {
      delete players[socket.id];
      io.emit('updatePlayers', players);
    });
  });
};

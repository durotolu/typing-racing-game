import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { setupGameHandlers } from './controllers/GameController';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

setupGameHandlers(io);

httpServer.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

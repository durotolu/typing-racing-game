import { io, Socket } from 'socket.io-client';
import { Player } from '../types/game.types';

interface SocketEvents {
  updatePlayers: (players: Player[]) => void;
  gameOver: (data: { winner: Player }) => void;
}

class SocketService {
  private socket!: Socket;
  private static instance: SocketService;
  private isConnected: boolean = false;

  private constructor() {
    this.initializeSocket();
  }

  private initializeSocket() {
    this.socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000', {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      autoConnect: true
    });
    
    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('Socket connected:', this.socket.id);
    });

    this.socket.on('connect_error', (error) => {
      this.isConnected = false;
      console.error('Socket connection error:', error);
    });

    this.socket.on('disconnect', (reason) => {
      this.isConnected = false;
      console.log('Socket disconnected:', reason);
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, reconnect manually
        this.socket.connect();
      }
    });
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public async joinGame(playerName: string): Promise<void> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      
      if (!this.socket.id) {
        throw new Error('Socket ID not available');
      }

      this.socket.emit('joinGame', { playerId: this.socket.id, playerName });
    } catch (error) {
      console.error('Failed to join game:', error);
      throw error;
    }
  }

  public updateProgress(progress: number): void {
    if (this.socket.id) {
      this.socket.emit('typingProgress', { playerId: this.socket.id, progress });
    }
  }

  public onEvent<K extends keyof SocketEvents>(
    event: K,
    callback: (data: Parameters<SocketEvents[K]>[0]) => void
  ): void {
    this.socket.on(event as string, callback as (args: Parameters<SocketEvents[K]>[0]) => void);
  }

  public offEvent<K extends keyof SocketEvents>(event: K): void {
    this.socket.off(event);
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        resolve();
        return;
      }

      const timeout = setTimeout(() => {
        reject(new Error('Connection timeout'));
      }, 5000);

      this.socket.once('connect', () => {
        clearTimeout(timeout);
        resolve();
      });

      this.socket.once('connect_error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });

      if (!this.socket.connected) {
        this.socket.connect();
      }
    });
  }

  public getId(): string | undefined {
    return this.socket.id;
  }

  public isSocketConnected(): boolean {
    return this.isConnected;
  }
}

export const socketService = SocketService.getInstance(); 
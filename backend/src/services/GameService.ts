import { Player } from '../models/Player';

class GameService {
  private players: { [key: string]: Player } = {};

  // Add a new player to the game
  addPlayer(id: string, name: string, car: string): void {
    this.players[id] = { id, name, progress: 0, car };
  }

  // Remove a player from the game
  removePlayer(id: string): void {
    delete this.players[id];
  }

  // Update a player's progress
  updateProgress(id: string, progress: number): void {
    if (this.players[id]) {
      this.players[id].progress = progress;
    }
  }

  // Get all players
  getPlayers(): Player[] {
    return Object.values(this.players);
  }
}

export const gameService = new GameService();

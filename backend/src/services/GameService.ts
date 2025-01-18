import { Player } from '../models/Player';

// Array of sample sentences for the game
const SAMPLE_SENTENCES = [
  'The quick brown fox jumps over the lazy dog.',
  'Pack my box with five dozen liquor jugs.',
  'How vexingly quick daft zebras jump!',
  'The five boxing wizards jump quickly.',
  'Sphinx of black quartz, judge my vow.',
];

class GameService {
  private players: { [key: string]: Player } = {};
  private currentSentence: string = '';

  // Add a new player to the game
  addPlayer(id: string, name: string, car: string): void {
    // If this is the first player, generate a new sentence
    if (Object.keys(this.players).length === 0) {
      this.currentSentence = this.generateNewSentence();
    }
    this.players[id] = { id, name, progress: 0, car };
  }

  // Remove a player from the game
  removePlayer(id: string): void {
    delete this.players[id];
    // If no players left, reset the sentence
    if (Object.keys(this.players).length === 0) {
      this.currentSentence = '';
    }
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

  // Get current sentence
  getCurrentSentence(): string {
    return this.currentSentence;
  }

  // Generate a new random sentence
  private generateNewSentence(): string {
    const randomIndex = Math.floor(Math.random() * SAMPLE_SENTENCES.length);
    return SAMPLE_SENTENCES[randomIndex];
  }

  // Check for a winner
  checkWinner(): Player | null {
    const winner = Object.values(this.players).find((player) => player.progress >= 100);
    return winner || null;
  }

  resetGame() {
    this.players = {};
    this.currentSentence = '';
  }
}

export const gameService = new GameService();

import { Injectable } from '@nestjs/common';
import { Match } from './interfaces/match.interface';
import { Player } from '../player/player.service';
import { RankingService } from '../ranking/ranking.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MatchService {
  constructor (private readonly RankingService: RankingService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  private async getPlayerById(id: string): Promise<Player | undefined> {
    const players: Player[] = this.RankingService.getRanking();
    return players.find(player => player.id === id);
  }

  async setMatch(match: Match) {

    const player1 = await this.getPlayerById(match.winner);
    const player2 = await this.getPlayerById(match.loser);

    if (!player1 || !player2) {
      throw new Error("Joueur introuvable");
    }

    const K = 32; // Coefficient de mise à jour Elo
    const expectedScore1 = 1 / (1 + Math.pow(10, (player2.rank - player1.rank) / 400));
    const expectedScore2 = 1 - expectedScore1;

    // Mise à jour des classements
    player1.rank += K * (1 - expectedScore1); // Victoire
    player2.rank += K * (0 - expectedScore2); // Défaite
    this.eventEmitter.emit('match.updated', { winner: player1, loser: player2 });
    return {
      winner: {
        id: player1.id,
        rank: Math.round(player1.rank),
      },
      loser: {
        id: player2.id,
        rank: Math.round(player2.rank),
      },
    };
  }
}


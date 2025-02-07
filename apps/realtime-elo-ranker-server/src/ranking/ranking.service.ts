import { Injectable } from '@nestjs/common';
import { PlayersService } from 'src/player/player.service';

@Injectable()
export class RankingService {
  constructor (private readonly PlayerService: PlayersService){}

  getRanking() {
    return this.PlayerService.findAll();
  }
}
import { Injectable } from '@nestjs/common';
import { Player } from './player/interfaces/player.interface';

@Injectable()
export class AppService {
  private readonly players: Player[] = [];


  getHello(): string {
    return 'Hello World!';
  }

  getPlayers() {
    return this.players;
  }
}
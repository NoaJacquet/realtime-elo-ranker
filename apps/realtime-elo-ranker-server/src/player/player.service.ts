import { Injectable } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { EventEmitterService } from '../event-emitter/event-emitter.service';

@Injectable()
export class PlayersService {
  private readonly players: Player[] = [];
  constructor(private readonly eventEmitter: EventEmitterService) {}

  create(player: Player) {
    player.rank = 1000;
    this.players.push(player);
    this.eventEmitter.emit('ranking.update', player);
  }

  findAll(): Player[] {
    return this.players;
  }
}

export { Player };
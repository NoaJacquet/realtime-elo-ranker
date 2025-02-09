import { Controller, Get, Sse } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Player } from '../player/interfaces/player.interface';
import { fromEvent, map, Observable } from 'rxjs';
import { EventEmitterService } from '../event-emitter/event-emitter.service';

@Controller()
export class RankingController {
  constructor(private readonly rankingService: RankingService,
    private readonly eventEmitter: EventEmitterService
  ) {}


  @Get('api/ranking')
  async findAll(): Promise<Player[]> {
    return this.rankingService.getRanking();
  }
  
  @Get('api/ranking/events')
  @Sse()
  getRankingEvents(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter.getEventEmitter(), 'ranking.update').pipe(
      map((player: Player) => {
        return <MessageEvent>{
          data: JSON.stringify({
            type: 'RankingUpdate',
            player: player,
          })
        }
      })
    );
  }
}
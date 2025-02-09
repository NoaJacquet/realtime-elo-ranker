import { RankingService } from './ranking.service';
import { Player } from 'src/player/interfaces/player.interface';
import { Observable } from 'rxjs';
import { EventEmitterService } from 'src/event-emitter/event-emitter.service';
export declare class RankingController {
    private readonly rankingService;
    private readonly eventEmitter;
    constructor(rankingService: RankingService, eventEmitter: EventEmitterService);
    findAll(): Promise<Player[]>;
    getRankingEvents(): Observable<MessageEvent>;
}

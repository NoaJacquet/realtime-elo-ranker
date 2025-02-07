import { Match } from './interfaces/match.interface';
import { RankingService } from 'src/ranking/ranking.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class MatchService {
    private readonly RankingService;
    private readonly eventEmitter;
    constructor(RankingService: RankingService, eventEmitter: EventEmitter2);
    private getPlayerById;
    setMatch(match: Match): Promise<{
        winner: {
            id: string;
            rank: number;
        };
        loser: {
            id: string;
            rank: number;
        };
    }>;
}

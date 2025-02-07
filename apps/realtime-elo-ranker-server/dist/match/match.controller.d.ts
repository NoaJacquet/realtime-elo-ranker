import { MatchService } from './match.service';
import { Match } from './interfaces/match.interface';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    create(match: Match): Promise<{
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

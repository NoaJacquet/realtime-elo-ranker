import { PlayersService } from 'src/player/player.service';
export declare class RankingService {
    private readonly PlayerService;
    constructor(PlayerService: PlayersService);
    getRanking(): import("src/player/player.service").Player[];
}

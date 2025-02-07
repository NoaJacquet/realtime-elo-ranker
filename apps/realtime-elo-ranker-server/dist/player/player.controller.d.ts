import { PlayersService } from './player.service';
import { Player } from './interfaces/player.interface';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    create(player: Player): Promise<void>;
}

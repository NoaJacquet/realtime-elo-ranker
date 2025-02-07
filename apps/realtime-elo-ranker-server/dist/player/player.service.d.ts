import { Player } from './interfaces/player.interface';
import { EventEmitterService } from 'src/event-emitter/event-emitter.service';
export declare class PlayersService {
    private readonly eventEmitter;
    private readonly players;
    constructor(eventEmitter: EventEmitterService);
    create(player: Player): void;
    findAll(): Player[];
}
export { Player };

import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './player.service';
import { EventEmitterService } from '../event-emitter/event-emitter.service';
import { Player } from './interfaces/player.interface';

describe('PlayersService', () => {
  let playersService: PlayersService;
  let eventEmitterService: EventEmitterService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: EventEmitterService,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    playersService = moduleRef.get<PlayersService>(PlayersService);
    eventEmitterService = moduleRef.get<EventEmitterService>(EventEmitterService);
  });

  describe('create', () => {
    it('should add a player with default rank 1000 and emit an event', () => {
      const player: Player = { id: '1', rank: 0 };
      const emitSpy = jest.spyOn(eventEmitterService, 'emit');
      
      playersService.create(player);

      expect(playersService.findAll()).toContainEqual({ id: '1', rank: 1000 });
      expect(emitSpy).toHaveBeenCalledWith('ranking.update', { id: '1', rank: 1000 });
    });
  });

  describe('findAll', () => {
    it('should return all players', () => {
      const player1: Player = { id: '1', rank: 1000 };
      const player2: Player = { id: '2', rank: 1200 };
      
      playersService.create(player1);
      playersService.create(player2);
      
      expect(playersService.findAll()).toEqual([
        { id: '1', rank: 1000 },
        { id: '2', rank: 1000 },
      ]);
    });
  });
});

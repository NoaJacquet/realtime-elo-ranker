import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { EventEmitterService } from '../event-emitter/event-emitter.service';
import { of } from 'rxjs';
import { EventEmitter } from 'events'; // Importer EventEmitter de Node.js

describe('RankingController', () => {
  let controller: RankingController;
  let rankingService: RankingService;
  let eventEmitterService: EventEmitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [
        {
          provide: RankingService,
          useValue: {
            getRanking: jest.fn().mockResolvedValue([{ id: 1, name: 'Player 1' }]),
          },
        },
        {
          provide: EventEmitterService,
          useValue: {
            getEventEmitter: jest.fn().mockReturnValue(new EventEmitter()), // Retourner un EventEmitter valide
          },
        },
      ],
    }).compile();

    controller = module.get<RankingController>(RankingController);
    rankingService = module.get<RankingService>(RankingService);
    eventEmitterService = module.get<EventEmitterService>(EventEmitterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all players from findAll()', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, name: 'Player 1' }]);
  });
  
});

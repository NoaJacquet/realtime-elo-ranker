import { Test, TestingModule } from '@nestjs/testing';
import { RankingService } from './ranking.service';
import { PlayersService } from '../player/player.service';

describe('RankingService', () => {
  let service: RankingService;
  let playersService: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        {
          provide: PlayersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Player 1' }]), // Simule la méthode findAll
          },
        },
      ],
    }).compile();

    service = module.get<RankingService>(RankingService);
    playersService = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return players from getRanking()', async () => {
    const result = await service.getRanking();
    expect(result).toEqual([{ id: 1, name: 'Player 1' }]); // Vérifie si les joueurs sont renvoyés correctement
    expect(playersService.findAll).toHaveBeenCalled(); // Vérifie si findAll a été appelé
  });
});

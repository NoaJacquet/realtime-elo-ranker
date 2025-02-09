import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { Match } from './interfaces/match.interface';

describe('MatchController', () => {
  let controller: MatchController;
  let matchService: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [
        {
          provide: MatchService,
          useValue: {
            setMatch: jest.fn().mockResolvedValue({
              winner: { id: '1', rank: 1516 },
              loser: { id: '2', rank: 1484 },
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<MatchController>(MatchController);
    matchService = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a match and return updated player ranks', async () => {
    const match: Match = { winner: '1', loser: '2' , draw : false};

    const result = await controller.create(match);

    expect(result).toEqual({
      winner: { id: '1', rank: 1516 },
      loser: { id: '2', rank: 1484 },
    });

    // Vérifier que la méthode setMatch du service a été appelée
    expect(matchService.setMatch).toHaveBeenCalledWith(match);
  });
});

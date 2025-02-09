import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { RankingService } from '../ranking/ranking.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Match } from './interfaces/match.interface';

describe('MatchService', () => {
  let service: MatchService;
  let rankingService: RankingService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        {
          provide: RankingService,
          useValue: {
            getRanking: jest.fn().mockReturnValue([
              { id: '1', name: 'Player 1', rank: 1500 },
              { id: '2', name: 'Player 2', rank: 1500 },
            ]),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MatchService>(MatchService);
    rankingService = module.get<RankingService>(RankingService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update player ranks and emit an event on match', async () => {
    const match: Match = { winner: '1', loser: '2', draw: false };

    const result = await service.setMatch(match);

    // Vérifier les nouveaux classements des joueurs
    expect(result.winner.rank).toBe(1516); // Calcul basé sur Elo
    expect(result.loser.rank).toBe(1484);

    // Vérifier que l'événement a été émis
    expect(eventEmitter.emit).toHaveBeenCalledWith('match.updated', expect.any(Object));
  });

  it('should throw error if players are not found', async () => {
    const match: Match = { winner: '1', loser: '3', draw: false };

    // Simuler qu'un joueur n'est pas trouvé
    rankingService.getRanking = jest.fn().mockReturnValue([{ id: '1', name: 'Player 1', rank: 1500 }]);

    await expect(service.setMatch(match)).rejects.toThrowError('Joueur introuvable');
  });
});

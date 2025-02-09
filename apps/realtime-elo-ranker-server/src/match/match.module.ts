import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { RankingModule } from '../ranking/ranking.module';
@Module({
  imports: [RankingModule],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}

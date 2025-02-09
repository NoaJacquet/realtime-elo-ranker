import { Module } from '@nestjs/common';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { PlayerModule } from 'src/player/player.module';
import { CustomEventEmitterModule } from 'src/event-emitter/event-emitter.module';

@Module({
  imports: [PlayerModule, CustomEventEmitterModule],
  controllers: [RankingController],
  providers: [RankingService],
  exports: [RankingService],  
})
export class RankingModule {}
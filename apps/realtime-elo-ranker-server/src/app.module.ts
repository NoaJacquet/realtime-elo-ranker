import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { RankingModule } from './ranking/ranking.module';
import { MatchModule } from './match/match.module';
import { CustomEventEmitterModule } from './event-emitter/event-emitter.module';
import { EventEmitterService } from './event-emitter/event-emitter.service';

@Module({
  imports: [PlayerModule, RankingModule, MatchModule, CustomEventEmitterModule],
  controllers: [AppController],
  providers: [AppService, EventEmitterService],
})
export class AppModule {}

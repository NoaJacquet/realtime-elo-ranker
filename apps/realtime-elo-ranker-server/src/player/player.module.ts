import { Module } from '@nestjs/common';
import { PlayersController } from './player.controller';
import { PlayersService } from './player.service';
import { CustomEventEmitterModule } from 'src/event-emitter/event-emitter.module';

@Module({
  imports: [CustomEventEmitterModule],
  controllers: [PlayersController],
  providers: [PlayersService ],
  exports: [PlayersService],
})
export class PlayerModule {}

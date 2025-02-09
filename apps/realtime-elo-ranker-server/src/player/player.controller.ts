
import { Controller, Post, Body } from '@nestjs/common';
import { PlayersService } from './player.service';
import { Player } from './interfaces/player.interface';

@Controller()
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('api/player')
  async create(@Body() player: Player) {
    this.playersService.create(player);
  }
}

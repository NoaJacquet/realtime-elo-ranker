
import { Body, Controller, Post } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from './interfaces/match.interface';

@Controller()
export class MatchController {
  constructor(private readonly matchService: MatchService) {}


  @Post('api/match')
  async create(@Body() match: Match ) {
    return await this.matchService.setMatch(match);
  }
}

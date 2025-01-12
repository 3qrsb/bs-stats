import { Controller, Get, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get('players')
  getPlayerLeaderboard(@Query('country') country: string) {
    return this.leaderboardService.getPlayerLeaderboard(country);
  }
}

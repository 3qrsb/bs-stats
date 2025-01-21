import { Controller, Get, Query, Param } from '@nestjs/common';
import { PlayerRankingService } from './services/player-ranking.service';
import { ClubRankingService } from './services/club-ranking.service';
import { BrawlerRankingService } from './services/brawler-ranking.service';

// Parent endpoint
@Controller('leaderboard')
export class LeaderboardController {
  constructor(
    private readonly playerRankingService: PlayerRankingService,
    private readonly clubRankingService: ClubRankingService,
    private readonly brawlerRankingService: BrawlerRankingService,
  ) {}

  // Endpoint for player rankings
  @Get('players')
  async getPlayerLeaderboard(@Query('country') country: string) {
    return this.playerRankingService.getPlayerLeaderboard(country);
  }

  // Endpoint for club rankings
  @Get('clubs')
  async getClubLeaderboard(@Query('country') country: string) {
    return this.clubRankingService.getClubLeaderboard(country);
  }

  // Endpoint for brawler rankings
  @Get('brawlers/:brawlerId')
  async getBrawlerLeaderboard(
    @Param('brawlerId') brawlerId: number,
    @Query('country') country: string,
  ) {
    return this.brawlerRankingService.getBrawlerLeaderboard(brawlerId, country);
  }
}

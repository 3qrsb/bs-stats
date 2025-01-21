import { Module } from '@nestjs/common';
import { LeaderboardController } from './leaderboard.controller';
import { PlayerRankingService } from './services/player-ranking.service';
import { ClubRankingService } from './services/club-ranking.service';
import { BrawlerRankingService } from './services/brawler-ranking.service';
import { ApiService } from './services/api.service';

@Module({
  controllers: [LeaderboardController],
  providers: [
    PlayerRankingService,
    ClubRankingService,
    BrawlerRankingService,
    ApiService,
  ],
})
export class LeaderboardModule {}

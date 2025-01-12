import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { BrawlStarsModule } from './brawl-stars/brawl-stars.module';
import { LeaderboardService } from './leaderboard/leaderboard.service';
import { LeaderboardController } from './leaderboard/leaderboard.controller';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    BrawlStarsModule,
    LeaderboardModule,
  ],
  providers: [LeaderboardService],
  controllers: [LeaderboardController],
})
export class AppModule {}

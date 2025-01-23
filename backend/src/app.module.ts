import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { BrawlStarsModule } from './brawl-stars/brawl-stars.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ClubModule } from './club/club.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    BrawlStarsModule,
    LeaderboardModule,
    ClubModule,
  ],
})
export class AppModule {}

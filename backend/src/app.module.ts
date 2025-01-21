import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { BrawlStarsModule } from './brawl-stars/brawl-stars.module';
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
})
export class AppModule {}

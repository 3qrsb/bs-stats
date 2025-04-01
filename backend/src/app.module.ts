import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PlayerModule } from './player/player.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ClubModule } from './club/club.module';
import { BattleLogModule } from './battlelog/battlelog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PlayerModule,
    LeaderboardModule,
    ClubModule,
    BattleLogModule,
  ],
})
export class AppModule {}

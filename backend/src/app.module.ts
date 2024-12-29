import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { BrawlStarsModule } from './brawl-stars/brawl-stars.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    BrawlStarsModule,
  ],
})
export class AppModule {}

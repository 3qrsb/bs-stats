import { Module } from '@nestjs/common';
import { BrawlStarsService } from './brawl-stars.service';
import { BrawlStarsController } from './brawl-stars.controller';

@Module({
  providers: [BrawlStarsService],
  controllers: [BrawlStarsController],
})
export class BrawlStarsModule {}

import { Controller, Get, Param } from '@nestjs/common';
import { BrawlStarsService } from './brawl-stars.service';
import { PlayerTagDto } from './dto/player-tag.dto';

@Controller('brawl-stars')
export class BrawlStarsController {
  constructor(private readonly brawlStarsService: BrawlStarsService) {}

  @Get('players/:tag')
  async getPlayerInfo(@Param() tag: PlayerTagDto) {
    return this.brawlStarsService.getPlayerInfo(tag.tag);
  }
}

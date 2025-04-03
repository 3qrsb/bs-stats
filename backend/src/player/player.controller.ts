import { Controller, Get, Param } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerTagDto } from './dto/player-tag.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('validate/:tag')
  async validatePlayer(@Param() tag: PlayerTagDto) {
    return this.playerService.validatePlayerTag(tag.tag);
  }

  @Get(':tag')
  async getPlayerInfo(@Param() tag: PlayerTagDto) {
    return this.playerService.getPlayerInfo(tag.tag);
  }
}

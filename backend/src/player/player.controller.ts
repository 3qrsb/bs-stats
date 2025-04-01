import { Controller, Get, Param } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerTagDto } from './dto/player-tag.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get(':tag')
  async getPlayerInfo(@Param() tag: PlayerTagDto) {
    return this.playerService.getPlayerInfo(tag.tag);
  }
}

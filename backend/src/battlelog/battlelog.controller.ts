import { Controller, Get, Param } from '@nestjs/common';
import { BattleLogService } from './battlelog.service';

@Controller('battlelog')
export class BattleLogController {
  constructor(private readonly battlelogService: BattleLogService) {}

  @Get(':tag')
  async getBattleLog(@Param('tag') tag: string) {
    return this.battlelogService.getBattleLog(tag);
  }
}

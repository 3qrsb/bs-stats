import { Module } from '@nestjs/common';
import { BattleLogController } from './battlelog.controller';
import { BattleLogService } from './battlelog.service';

@Module({
  controllers: [BattleLogController],
  providers: [BattleLogService],
})
export class BattleLogModule {}

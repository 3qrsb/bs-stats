import { Module } from '@nestjs/common';
import { BrawlstarsModule } from './brawlstars/brawlstars.module';

@Module({
  imports: [BrawlstarsModule],
})
export class AppModule {}

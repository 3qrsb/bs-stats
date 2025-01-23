import { Controller, Get, Param } from '@nestjs/common';
import { ClubService } from './club.service';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get(':tag')
  async getClubInfo(@Param('tag') tag: string) {
    return this.clubService.getClubInfo(decodeURIComponent(tag));
  }
}

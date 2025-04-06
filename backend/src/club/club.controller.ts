import { Controller, Get, Param } from '@nestjs/common';
import { ClubService } from './club.service';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get('validate/:tag')
  async validateClub(@Param('tag') tag: string) {
    return this.clubService.validateClubTag(decodeURIComponent(tag));
  }

  @Get(':tag')
  async getClubInfo(@Param('tag') tag: string) {
    return this.clubService.getClubInfo(decodeURIComponent(tag));
  }
}

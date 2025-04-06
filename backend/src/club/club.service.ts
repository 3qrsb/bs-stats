import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ClubService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('API_KEY');
    this.baseUrl = this.configService.get<string>('API_BASE_URL');
  }

  async getClubInfo(tag: string): Promise<any> {
    const formattedTag = encodeURIComponent(
      tag.startsWith('#') ? tag : `#${tag}`,
    );
    const url = `${this.baseUrl}/clubs/${formattedTag}`;
    const headers = { Authorization: `Bearer ${this.apiKey}` };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Failed to fetch club info',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateClubTag(
    tag: string,
  ): Promise<{ valid: boolean; name?: string }> {
    try {
      const clubInfo = await this.getClubInfo(tag);
      return { valid: true, name: clubInfo.name };
    } catch {
      return { valid: false };
    }
  }
}

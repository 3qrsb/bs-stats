import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class LeaderboardService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('API_KEY');
    this.baseUrl = this.configService.get<string>('API_BASE_URL');
  }

  async getPlayerLeaderboard(country?: string): Promise<any> {
    const endpoint = country
      ? `/rankings/${country}/players`
      : `/rankings/global/players`;
    const url = `${this.baseUrl}${endpoint}`;
    const headers = { Authorization: `Bearer ${this.apiKey}` };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Failed to fetch leaderboard',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

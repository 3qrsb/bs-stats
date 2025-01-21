import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiService } from './api.service';

@Injectable()
export class PlayerRankingService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private readonly apiService: ApiService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('API_KEY');
    this.baseUrl = this.configService.get<string>('API_BASE_URL');
  }

  async getPlayerLeaderboard(country?: string): Promise<any> {
    const endpoint = country
      ? `/rankings/${country}/players`
      : `/rankings/global/players`;
    const url = `${this.baseUrl}${endpoint}`;
    return this.apiService.fetchData(url, this.apiKey);
  }
}

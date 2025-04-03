import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PlayerService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('apiKey');
    this.baseUrl = this.configService.get<string>('baseUrl');
  }

  async getPlayerInfo(playerTag: string): Promise<any> {
    const sanitizedTag = sanitizePlayerTag(playerTag);
    const url = `${this.baseUrl}/players/${encodeURIComponent(sanitizedTag)}`;
    const headers = { Authorization: `Bearer ${this.apiKey}` };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Failed to fetch player info',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validatePlayerTag(
    playerTag: string,
  ): Promise<{ valid: boolean; name?: string }> {
    try {
      const data = await this.getPlayerInfo(playerTag);
      return { valid: true, name: data.name };
    } catch {
      return { valid: false };
    }
  }
}

function sanitizePlayerTag(tag: string): string {
  return tag.startsWith('#') ? tag.toUpperCase() : `#${tag.toUpperCase()}`;
}

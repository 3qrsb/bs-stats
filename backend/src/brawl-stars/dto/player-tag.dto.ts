import { IsString, Matches } from 'class-validator';

export class PlayerTagDto {
  @IsString()
  @Matches(/^[A-Z0-9]+$/, {
    message: 'Player tag must contain only uppercase letters and numbers',
  })
  tag: string;
}

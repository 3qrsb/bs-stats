import { IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class PlayerTagDto {
  @IsString()
  @Matches(/^[A-Z0-9]+$/, {
    message: 'Player tag must contain only uppercase letters and numbers',
  })
  @Transform(({ value }) => {
    return value.startsWith('#')
      ? value.substring(1).toUpperCase()
      : value.toUpperCase();
  })
  tag: string;
}

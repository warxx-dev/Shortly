import { IsString } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  readonly originalLink: string;

  @IsString()
  readonly code: string;
}

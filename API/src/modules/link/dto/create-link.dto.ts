import { IsOptional, IsString } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  readonly originalLink: string;

  @IsString()
  @IsOptional()
  readonly code: string;

  @IsString()
  @IsOptional()
  readonly email: string;
}

import { IsString, IsNotEmpty } from 'class-validator';

export class GoogleLoginDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}

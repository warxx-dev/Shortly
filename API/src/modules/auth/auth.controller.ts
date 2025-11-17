import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import * as express from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { GoogleLoginDto } from './dto/googleLoginDto';
import { User } from '../user/entities/user.entity';
import { type AuthRequest } from './interfaces/auth.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Result } from 'src/utils';
import { AuthError, AuthSuccessData } from './types';
import { Cookies } from '../../decorators/cookies.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body() registerData: RegisterDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const result: Result<AuthSuccessData, AuthError> =
      await this.authService.register(registerData);

    if (result.isFailure) return result;

    res.cookie('access_token', result.getData()?.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return result;
  }

  @Post('google')
  async google(
    @Body() googleLoginData: GoogleLoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    try {
      const result = await this.authService.google(googleLoginData);

      res.cookie('access_token', result.getData()?.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return Result.success(result.getData()?.user);
    } catch (error) {
      Result.failure(error);
    }
  }

  @Get('me')
  async me(@Cookies() token: string | undefined): Promise<User | null> {
    if (!token) {
      return null;
    }

    const result = await this.authService.validateToken(token);
    return result.getData();
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });
    return { message: 'Logged out successfully' };
  }
}

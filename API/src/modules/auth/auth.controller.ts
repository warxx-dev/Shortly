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
import { LoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';
import { GoogleLoginDto } from './dto/googleLoginDto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/entities/user.entity';
import { type AuthRequest } from './interfaces/auth.interface';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

interface LoginResponse {
  access_token: string;
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: AuthRequest): LoginResponse {
    return this.authService.login(req.user);
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('logout')
  // logout(@Req() req) {
  //   return req.logout();
  // }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {
    // return this.authService.login(req.user);
  }

  // @UseGuards(GoogleAuthGuard)
  // @Post('google/callback')
  // googleCallback(@Req() req: AuthRequest, @Res() res: express.Response) {
  //   const response = this.authService.login(req.user);
  //   res.cookie('access_token', response.access_token, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  //   });
  //   res.redirect(`http://localhost:5173`);
  // }

  // @Post('register')
  // async register(
  //   @Body() registerData: RegisterDto,
  //   @Res({ passthrough: true }) res: express.Response,
  // ) {
  //   const result = await this.authService.register(registerData);

  //   // Set JWT as HTTP-only cookie
  //   res.cookie('access_token', result.access_token, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  //   });

  //   return result.user;
  // }

  // @Post('login')
  // async login(
  //   @Body() loginData: LoginDto,
  //   @Res({ passthrough: true }) res: express.Response,
  // ) {
  //   const result = await this.authService.login(loginData);

  //   // Set JWT as HTTP-only cookie
  //   res.cookie('access_token', result.access_token, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  //   });

  //   return result.user;
  // }

  @Post('google')
  async google(
    @Body() googleLoginData: GoogleLoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    console.log('Google login request received:', googleLoginData);
    try {
      const result = await this.authService.google(googleLoginData);
      console.log('Google login successful:', result);
      // Set JWT as HTTP-only cookie
      res.cookie('access_token', result.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return result.user;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }
}

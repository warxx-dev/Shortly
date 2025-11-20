import * as express from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { GoogleLoginDto } from './dto/googleLoginDto';
import { User } from '../user/entities/user.entity';
import { type AuthRequest } from './interfaces/auth.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: AuthRequest, res: express.Response): {
        access_token: string;
    };
    register(registerData: RegisterDto, res: express.Response): Promise<import("./types").AuthSuccessData>;
    google(googleLoginData: GoogleLoginDto, res: express.Response): Promise<import("./types").AuthSuccessData | undefined>;
    me(cookies: Record<string, string | undefined>): Promise<User | null>;
    logout(res: express.Response): {
        message: string;
    };
}

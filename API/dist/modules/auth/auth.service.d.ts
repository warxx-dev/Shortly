import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { GoogleLoginDto } from './dto/googleLoginDto';
import { AuthUser } from './interfaces/user.interface';
import { RegisterDto } from './dto/registerDto';
import { Result } from '../../utils';
import { AuthError, AuthSuccessData } from './types';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    private readonly userRepository;
    private readonly googleClient;
    constructor(jwtService: JwtService, userService: UserService, userRepository: Repository<User>);
    validateUser(email: string, pass: string): Promise<Partial<User> | null>;
    login(user: AuthUser): {
        access_token: string;
    };
    register(resgisterData: RegisterDto): Promise<Result<AuthSuccessData, AuthError>>;
    google(googleLoginDto: GoogleLoginDto): Promise<Result<AuthSuccessData, AuthError>>;
    validateToken(token: string): Promise<Result<User, AuthError>>;
}

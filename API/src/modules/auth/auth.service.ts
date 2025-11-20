import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { GoogleLoginDto } from './dto/googleLoginDto';
import { OAuth2Client } from 'google-auth-library';
import { AuthUser } from './interfaces/user.interface';
import { RegisterDto } from './dto/registerDto';
import * as bcrypt from 'bcryptjs';
import { Result } from '../../utils';
import { AuthError, AuthSuccessData } from './types';

@Injectable()
export class AuthService {
  private readonly googleClient: OAuth2Client;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const result = await this.userService.findByEmail(email);
    console.log(`Validating user: ${email}`); // --- IGNORE ---
    console.log(`Password received: "${pass}"`); // --- IGNORE ---
    if (result.isSuccess) {
      const user = result.getData();
      console.log(`User found:`, user); // --- IGNORE ---
      if (user && user.password) {
        console.log(`Stored hash: ${user.password}`); // --- IGNORE ---
        const isPasswordValid = await bcrypt.compare(pass, user.password);
        console.log(`Password valid: ${isPasswordValid}`); // --- IGNORE ---
        if (isPasswordValid) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...restData } = user;
          console.log(`User ${email} validated successfully`); // --- IGNORE ---
          return restData;
        }
      }
    }
    return null;
  }

  login(user: AuthUser) {
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    resgisterData: RegisterDto,
  ): Promise<Result<AuthSuccessData, AuthError>> {
    try {
      const { email, password, name } = resgisterData;
      console.log('Register - Raw password received:', `"${password}"`); // --- DEBUG ---
      console.log('Register - Password length:', password.length); // --- DEBUG ---

      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        return Result.failure('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Register - Hashed password:', hashedPassword); // --- DEBUG ---

      const result = await this.userService.create({
        email: email,
        password: hashedPassword,
        name: name,
      });

      return result.fold(
        (user) => {
          const payload = {
            email: user.email,
          };

          return Result.success({
            access_token: this.jwtService.sign(payload),
            user: user,
          });
        },
        (error) => {
          return Result.failure(error);
        },
      );
    } catch (error) {
      return Result.failure(error as Error);
    }
  }

  async google(
    googleLoginDto: GoogleLoginDto,
  ): Promise<Result<AuthSuccessData, AuthError>> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: googleLoginDto.token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        return Result.failure('Invalid Google token');
      }

      const { email, name, picture } = payload;

      let user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        user = this.userRepository.create({
          email,
          name,
          picture,
        });
        await this.userRepository.save(user);
      } else {
        if (!user.picture && picture) {
          await this.userService.update(email!, { picture });
        }
      }

      const jwtPayload = { email: user.email };
      const accessToken = this.login(jwtPayload);

      return Result.success({
        access_token: accessToken.access_token,
        user,
      });
    } catch (e) {
      return Result.failure(e);
    }
  }

  async validateToken(token: string): Promise<Result<User, AuthError>> {
    try {
      const decoded: { email: string } = this.jwtService.verify(token);
      const result = await this.userService.findByEmail(decoded.email);
      return result.fold(
        (user) => Result.success(user),
        (error) => Result.failure(error),
      );
    } catch (e) {
      return Result.failure(e);
    }
  }
}

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
import bcrypt from 'node_modules/bcryptjs';
import { Result } from 'src/utils';
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
    const user = await this.userService.findOne(email);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: AuthUser) {
    const payload = { sub: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    resgisterData: RegisterDto,
  ): Promise<Result<AuthSuccessData, AuthError>> {
    try {
      const { email, password, name } = resgisterData;

      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        return Result.failure('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userService.create({
        email: email,
        password: hashedPassword,
        name: name,
      });

      const payload = {
        sub: user.email,
      };
      return Result.success({
        access_token: this.jwtService.sign(payload),
        user,
      });
    } catch (error) {
      return Result.failure(error);
    }
  }

  // async login(loginData: LoginDto) {
  //   const { email, password } = loginData;

  //   const user = await this.userRepository.findOne({ where: { email } });

  //   if (!user) {
  //     throw new Error('User not found');
  //   }

  //   const isPasswordValid = await bcrypt.compare(password, user.password);

  //   if (!isPasswordValid) {
  //     throw new Error('Invalid password');
  //   }
  //   const payload = {
  //     sub: user.id,
  //     email: user.email,
  //   };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //     user: {
  //       id: user.id,
  //       name: user.name,
  //       email: user.email,
  //       image: user.picture,
  //     },
  //   };
  // }

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
      const decoded: { sub: string } = this.jwtService.verify(token);
      const user = await this.userService.findOne(decoded.sub);
      return Result.success(user);
    } catch (e) {
      return Result.failure(e);
    }
  }
}

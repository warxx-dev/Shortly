import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/registerDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/loginDto';
import { JwtService } from '@nestjs/jwt';
import { GoogleLoginDto } from './dto/googleLoginDto';
import { OAuth2Client } from 'google-auth-library';
import { AuthUser } from './interfaces/user.interface';
import { CreateUserDto } from '../user/dto';

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

  // async validateGoogleUser(googleUser: CreateUserDto): Promise<User> {
  //   const user = await this.userService.findOne(googleUser.email);
  //   if (user) return user;
  //   return await this.userService.create(googleUser);
  // }

  // async register(resgisterData: RegisterDto) {
  //   const { email, password, name } = resgisterData;

  //   const existingUser = await this.userRepository.findOne({
  //     where: { email },
  //   });

  //   if (existingUser) {
  //     throw new Error('Email already exists');
  //   }

  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const user = await this.userService.create({
  //     email: email,
  //     password: hashedPassword,
  //     name: name,
  //   });

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

  async google(googleLoginDto: GoogleLoginDto) {
    try {
      console.log('Starting Google token verification...');

      const ticket = await this.googleClient.verifyIdToken({
        idToken: googleLoginDto.token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      console.log('Google token verified successfully');

      const payload = ticket.getPayload();
      if (!payload) {
        throw new Error('Invalid Google token');
      }

      const { sub: googleId, email, name, picture } = payload;
      console.log('Extracted payload:', { googleId, email, name });

      let user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        user = this.userRepository.create({
          email,
          googleId,
          name,
          picture,
        });
        await this.userRepository.save(user);
        console.log('New user created:', user);
      } else {
        if (!user.googleId) {
          user.googleId = googleId;
        }
        if (!user.name && name) {
          user.name = name;
        }
        if (!user.picture && picture) {
          user.picture = picture;
        }
        await this.userRepository.save(user);
        console.log('Existing user updated:', user);
      }

      console.log('Creating JWT...');
      const jwtPayload = { email: user.email };
      const accessToken = this.login(jwtPayload);

      console.log('Google login completed successfully');
      return {
        access_token: accessToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.picture,
        },
      };
    } catch (e) {
      console.error('Google verification error:', e);
      throw new UnauthorizedException(
        'Google authentication failed: ' + e.message,
      );
    }
  }
}

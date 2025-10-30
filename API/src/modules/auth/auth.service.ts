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

  async register(resgisterData: RegisterDto) {
    const { email, password, name } = resgisterData;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.create({
      email: email,
      password: hashedPassword,
      name: name,
    });

    const payload = {
      sub: user.id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.picture,
      },
    };
  }

  async login(loginData: LoginDto) {
    const { email, password } = loginData;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.picture,
      },
    };
  }

  async google(googleLoginDto: GoogleLoginDto) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: googleLoginDto.token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new Error('Invalid Google token');
      }

      const { sub: googleId, email, name, picture } = payload;

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
      }

      const jwtPayload = {
        sub: user.id,
        email: user.email,
      };

      return {
        access_token: this.jwtService.sign(jwtPayload),
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.picture,
        },
      };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Google authentication failed');
    }
  }
}

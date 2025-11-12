import { Inject, Injectable } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleConfig from '../config/google.config';
import { AuthService } from '../auth.service';
import { Profile } from 'passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: googleConfiguration.clientID!,
      clientSecret: googleConfiguration.clientSecret!,
      callbackURL: googleConfiguration.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    console.log('Google profile:', profile);
    const googleUser = {
      email: profile.emails![0].value,
      name: profile.displayName,
      picture: profile.photos![0].value,
      password: '',
    };
    // const user = await this.authService.validateGoogleUser(googleUser);

    // done(null, user);
  }
}

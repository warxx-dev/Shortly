import { User } from 'src/modules/user/entities/user.entity';

export type AuthSuccessData = {
  access_token: string;
  user: User;
};

export type AuthError = string;

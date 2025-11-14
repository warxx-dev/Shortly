import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserData: CreateUserDto) {
    const result = await this.userService.create(createUserData);
    return result.fold(
      (user) => user,
      (error) => {
        if (typeof error === 'string') {
          if (error.includes('not found')) {
            throw new NotFoundException(error);
          }
          throw new InternalServerErrorException(error);
        }

        if (error instanceof Error) {
          throw new InternalServerErrorException(
            'Error creating user due to a system failure.',
          );
        }

        throw new InternalServerErrorException('An unknown error occurred.');
      },
    );
  }

  @Get()
  async findAll() {
    const result = await this.userService.findAll();
    return result.fold(
      (users) => users,
      (error) => {
        if (typeof error === 'string') {
          if (error.includes('not found')) {
            throw new NotFoundException(error);
          }
          throw new InternalServerErrorException(error);
        }

        if (error instanceof Error) {
          throw new InternalServerErrorException(
            'Error retrieving users due to a system failure.',
          );
        }

        throw new InternalServerErrorException('An unknown error occurred.');
      },
    );
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    const result = await this.userService.findByEmail(email);
    return result.fold(
      (user) => user,
      (error) => {
        if (typeof error === 'string') {
          if (error.includes('not found')) {
            throw new NotFoundException(error);
          }
          throw new InternalServerErrorException(error);
        }

        if (error instanceof Error) {
          throw new InternalServerErrorException(
            'Error retrieving user due to a system failure.',
          );
        }

        throw new InternalServerErrorException('An unknown error occurred.');
      },
    );
  }

  @Patch(':email')
  async update(
    @Param('email') email: string,
    @Body() updateUserData: UpdateUserDto,
  ) {
    const result = await this.userService.update(email, updateUserData);
    return result.fold(
      (user) => user,
      (error) => {
        if (typeof error === 'string') {
          if (error.includes('not found')) {
            throw new NotFoundException(error);
          }
          throw new InternalServerErrorException(error);
        }

        if (error instanceof Error) {
          throw new InternalServerErrorException(
            'Error updating user due to a system failure.',
          );
        }

        throw new InternalServerErrorException('An unknown error occurred.');
      },
    );
  }

  @Delete(':email')
  async remove(@Param('email') email: string) {
    const result = await this.userService.remove(email);
    return result.fold(
      (message) => message,
      (error) => {
        if (typeof error === 'string') {
          if (error.includes('not found')) {
            throw new NotFoundException(error);
          }
          throw new InternalServerErrorException(error);
        }

        if (error instanceof Error) {
          throw new InternalServerErrorException(
            'Error deleting user due to a system failure.',
          );
        }

        throw new InternalServerErrorException('An unknown error occurred.');
      },
    );
  }
}

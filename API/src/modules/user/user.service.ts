import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'node_modules/bcryptjs/umd/types';
import { Result } from 'src/utils';
import { UserError } from './types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create({
    name,
    email,
    password,
  }: CreateUserDto): Promise<Result<User, UserError>> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser)
        return Result.failure('User with this email already exists');

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      await this.userRepository.save(newUser);

      return Result.success(newUser);
    } catch (error) {
      return Result.failure(error as Error);
    }
  }

  async findAll(): Promise<Result<User[], UserError>> {
    try {
      const users = await this.userRepository.find();
      if (users.length === 0) return Result.failure('Users not found');
      return Result.success(users);
    } catch (error) {
      return Result.failure(error as Error);
    }
  }

  async findByEmail(email: string): Promise<Result<User, UserError>> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        return Result.failure(`User with email ${email} not found`);
      }

      return Result.success(user);
    } catch (error) {
      return Result.failure(error as Error);
    }
  }

  async update(
    email: string,
    updateData: UpdateUserDto,
  ): Promise<Result<User, UserError>> {
    try {
      const userToUpdate = await this.userRepository.findOne({
        where: { email },
      });
      if (!userToUpdate) {
        return Result.failure(`User with email ${email} not found`);
      }

      await this.userRepository.update(email, updateData);

      const userUpdated = await this.userRepository.findOne({
        where: { email },
      });

      if (!userUpdated) {
        return Result.failure('Updated user could not be retrieved');
      }

      return Result.success(userUpdated);
    } catch (error) {
      return Result.failure(error as Error);
    }
  }

  async remove(email: string): Promise<Result<string, UserError>> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return Result.failure(`User with email ${email} not found`);
    }

    await this.userRepository.delete(email);

    const deletedUser = await this.userRepository.findOne({ where: { email } });

    if (deletedUser) return Result.failure('Error ocurred while deleting user');

    return Result.success('User deleted successfully');
  }
}

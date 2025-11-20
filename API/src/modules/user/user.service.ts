import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Result } from '../../utils';
import { UserError } from './types';
import { LinkService } from '../link/link.service';
import { Link } from '../link/entities/link.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => LinkService))
    private readonly linkService: LinkService,
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

      const newUser = this.userRepository.create({
        name: name,
        email: email,
        password: password,
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

  async addLinkToUser(
    email: string,
    code: string,
  ): Promise<Result<Link, UserError>> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        return Result.failure(`User with email ${email} not found`);
      }

      const linkResult = await this.linkService.getLinkByCode(code);

      return linkResult.fold(
        async (link) => {
          user.links.push(link);
          await this.userRepository.save(user);
          return Result.success(link);
        },
        // eslint-disable-next-line @typescript-eslint/require-await
        async (error) => {
          if (typeof error === 'string')
            return Result.failure<Link, UserError>(error);
          return Result.failure<Link, UserError>(error);
        },
      );
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

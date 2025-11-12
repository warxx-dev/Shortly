import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create({ email, password }: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      email: email,
      password: password,
    });

    await this.userRepository.save(newUser);

    return newUser;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async update(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return await this.userRepository.update(email, updateUserDto);
  }

  async remove(email: string): Promise<DeleteResult> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return await this.userRepository.delete(email);
  }
}

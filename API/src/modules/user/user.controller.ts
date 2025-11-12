import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserData: CreateUserDto) {
    return this.userService.create(createUserData);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserData: UpdateUserDto) {
    return this.userService.update(email, updateUserData);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserEntity } from '../../../user/entities/user.entity';
import { LoginDto, UserDto } from '../../../user/dto/user.dto';
import { UserService } from '../../../user/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    console.log('git test');
    return await this.userService.getAllUsers();
  }
  @Get(':id')
  async userById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() data: UserDto, country: any) {
    return await this.userService.register(data, country);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() data: LoginDto) {
    return await this.userService.login(data);
  }
}

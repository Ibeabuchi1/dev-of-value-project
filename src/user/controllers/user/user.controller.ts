import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto, UpdateDto, UserDto } from '../../../user/dto/user.dto';
import { UserService } from '../../../user/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @Get(':id')
  async userById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() data: UserDto) {
    return await this.userService.register(data);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() data: LoginDto) {
    return await this.userService.login(data);
  }

  @Put('update/:id')
  @UsePipes(ValidationPipe)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateDto,
  ) {
    return await this.userService.updateUserbyId(id, body);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
}

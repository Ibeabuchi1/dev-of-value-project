import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto, UpdateDto, UserDto } from '../../../user/dto/user.dto';
import { UserService } from '../../../user/services/user/user.service';

// @ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: 'Users Lists Returned Successfully.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async getAllUsers(@Query('page') page: number) {
    return await this.userService.getAllUsers(page);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User Returned Successfully.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async userById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Post('register')
  @ApiCreatedResponse({ description: 'User Successfully Created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UsePipes(ValidationPipe)
  async register(@Body() data: UserDto) {
    return await this.userService.register(data);
  }

  @Post('login')
  @ApiOkResponse({ description: 'User Logged In Successfully.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UsePipes(ValidationPipe)
  async login(@Body() data: LoginDto) {
    return await this.userService.login(data);
  }

  @Put('update/:id')
  @ApiOkResponse({ description: 'User Updated Successfully.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UsePipes(ValidationPipe)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateDto,
  ) {
    return await this.userService.updateUserbyId(id, body);
  }

  @Delete('delete/:id')
  @ApiOkResponse({ description: 'User Deleted Successfully.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
}

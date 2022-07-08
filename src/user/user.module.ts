import { Module } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CountryEntity } from '../country/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CountryEntity])],
  providers: [UserService],
  controllers: [UserController],
  // exports: [UserService],
})
export class UserModule {}

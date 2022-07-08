import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { CountryController } from './controllers/country/country.controller';
import { CountryEntity } from './entities/country.entity';
import { CountryService } from './services/country/country.service';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity, UserEntity]), HttpModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}

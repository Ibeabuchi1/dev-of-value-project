import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CountryModule } from './country/country.module';
import { DatabaseModule } from './database/database.module';
import 'dotenv/config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        // host: configService.get('HOST'), //process.env.HOST,
        port: +configService.get<number>('DB_PORT') || 3306, //parseInt(process.env.DB_PORT),
        username: 'root', //configService.get('USERNAME'), //process.env.USERNAME,
        password: configService.get('PASSWORD'), //process.env.PASSWORD,
        database: configService.get('DATABASE'), //process.env.DATABASE,
        entities: ['dist/**/*.entity.js'],

        synchronize: false,
      }),
    }),
    UserModule,
    CountryModule,
    // DatabaseModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'developersDb',
        entities: ['dist/**/*.entity.js'],

        synchronize: false,
      }),
    }),
    UserModule,
    CountryModule,
  ],
})
export class AppModule {}

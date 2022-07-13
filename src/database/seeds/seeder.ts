import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { CountryEntity } from 'src/country/entities/country.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { UserSeeder } from './user.seeder';

seeder({
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
    TypeOrmModule.forFeature([UserEntity, CountryEntity]),
  ],
}).run([UserSeeder]);

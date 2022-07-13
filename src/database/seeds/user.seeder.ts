import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { CountryEntity } from 'src/country/entities/country.entity';
import { CountryService } from 'src/country/services/country/country.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(CountryEntity)
    private readonly countryService: CountryService,
  ) {}

  seed(): Promise<any> {
    const userSeed = DataFactory.createForClass(UserEntity).generate(50);
    // const countrySeed = DataFactory.createForClass(CountryEntity).generate(50);
    return this.userRepo.insert(userSeed);
  }

  drop(): Promise<any> {
    return this.userRepo.delete({});
  }
}

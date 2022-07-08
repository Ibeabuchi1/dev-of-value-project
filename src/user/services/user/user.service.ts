import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, UserDto, UserRO } from '../../../user/dto/user.dto';
import { UserEntity } from '../../../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { CountryEntity } from 'src/country/entities/country.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(CountryEntity)
    private readonly countryRepo: Repository<CountryEntity>,
  ) {}

  async getAllUsers(): Promise<UserRO[]> {
    return await this.userRepo.find({ relations: ['countries'] });
  }

  async register(data: UserDto, country: CountryEntity): Promise<UserRO> {
    const { email } = data;
    let user = await this.userRepo.findOneBy({ email });
    if (user) {
      throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST);
    }
    user = this.userRepo.create({
      ...data,
      user_id: uuid.v4(),
      countries: country,
    });
    return this.userRepo.save(user);
  }

  async login({ email }: LoginDto): Promise<UserRO> {
    const user = await this.userRepo.findOneBy({ email });
    if (user) {
      return user.toResponseObject();
    }
    throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
  }

  async getUserById(id: number): Promise<UserRO> {
    const getUser = await this.userRepo.findOneBy({ id });
    if (getUser) {
      return getUser;
    }
    throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
  }
}

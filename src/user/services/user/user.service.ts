import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LoginDto,
  UpdateDto,
  UserDto,
  UserRO,
} from '../../../user/dto/user.dto';
import { UserEntity } from '../../../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { CountryService } from '../../../country/services/country/country.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly countryService: CountryService,
  ) {}

  async getAllUsers(page = 1): Promise<UserRO[]> {
    const allUsers = await this.userRepo.find({
      relations: ['country'],
      take: 10,
      skip: 10 * (page - 1),
    });
    return allUsers;
  }

  async register(data: UserDto): Promise<UserEntity> {
    const { email } = data;
    const user = await this.userRepo.findOneBy({ email });
    if (user) {
      throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST);
    }

    const country = await this.countryService.findCountry(data.country_id);
    if (!country) {
      throw new HttpException('Country Not Found', HttpStatus.NOT_FOUND);
    }

    return this.userRepo.save(
      this.userRepo.create({
        user_id: uuid.v4(),
        ...data,
        country,
      }),
    );
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

  async updateUserbyId(id: number, body: UpdateDto): Promise<UserRO[]> {
    const user = await this.userRepo.find({
      where: { id },
      relations: ['country'],
    });
    if (user) {
      await this.userRepo.update(id, body);
      return user;
    }
    throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
  }

  async delete(id: number) {
    const user = await this.userRepo.delete({ id });
    if (!user.affected) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }
    return { msg: 'Deleted' };
  }
}

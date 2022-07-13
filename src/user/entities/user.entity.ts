import { CountryEntity } from '../../country/entities/country.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as uuid from 'uuid';
import { UserRO } from '../dto/user.dto';
import { Factory } from 'nestjs-seeder';
import { randomInt } from 'crypto';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: uuid.v4() })
  user_id: string;

  @Factory((faker) => faker.name.firstName())
  @Column()
  first_name: string;

  @Factory((faker) => faker.name.lastName())
  @Column()
  last_name: string;

  @Factory((faker) => faker.phone.number())
  @Column()
  phone: string;

  @Factory((faker) => faker.internet.email())
  @Column()
  email: string;

  @Factory((faker) => faker.name.gender(true))
  @Column()
  sex: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @Column({ default: true })
  status: boolean;

  toResponseObject(): UserRO {
    const { first_name, last_name, phone, email, sex, status } = this;
    const responseObject: any = {
      first_name,
      last_name,
      phone,
      email,
      sex,

      status: (this.status = true),
    };

    return responseObject;
  }
  @Factory(() => randomInt(1, 242))
  @ManyToOne(() => CountryEntity, (country) => country.users)
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;
}

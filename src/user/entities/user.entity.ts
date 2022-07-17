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

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: uuid.v4() })
  user_id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

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

  @ManyToOne(() => CountryEntity, (country) => country.users)
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;
}

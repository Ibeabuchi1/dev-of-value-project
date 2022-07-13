import { UserEntity } from '../../user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('countries')
export class CountryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country_code: string;

  @Column()
  country_name: string;

  @Column()
  short_code: string;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.country)
  users: UserEntity;
}

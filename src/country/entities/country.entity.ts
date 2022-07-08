import { UserEntity } from '../../user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToOne(() => UserEntity, (user: UserEntity) => user.countries)
  users: UserEntity;
}

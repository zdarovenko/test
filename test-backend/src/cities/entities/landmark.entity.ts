import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { City } from '@cities/entities/city.entity';

@Entity()
export class Landmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @ManyToOne(() => City, (city) => city.landmarks)
  city: City;
}

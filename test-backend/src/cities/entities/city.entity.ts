import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Landmark } from '@cities/entities/landmark.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('varchar', { length: 255, nullable: false })
  name_native: string;

  @Column('varchar', { length: 255, nullable: false })
  country: string;

  @Column('varchar', { length: 255, nullable: false })
  continent: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: false })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: false })
  longitude: number;

  @Column('int', { nullable: false })
  population: number;

  @Column('int', { nullable: false })
  founded: number;

  @OneToMany(() => Landmark, (landmark) => landmark.city)
  landmarks: Landmark[];
}

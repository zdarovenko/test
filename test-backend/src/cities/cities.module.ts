import { Module } from '@nestjs/common';
import { CitiesController } from '@cities/cities.controller';
import { CitiesService } from '@cities/cities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from '@cities/entities/city.entity';
import { Landmark } from '@cities/entities/landmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, Landmark])],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [TypeOrmModule],
})
export class CitiesModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsOrder, FindManyOptions } from 'typeorm';
import { City } from './entities/city.entity';
import { CityResponse } from './city-response';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async findAll(order?: FindOptionsOrder<City>): Promise<CityResponse> {
    const findParams: FindManyOptions = { relations: ['landmarks'] };

    if (order) findParams.order = order;

    const cities = await this.cityRepository.find(findParams);

    return {
      cities: cities.map((city) => ({
        ...city,
        landmarks: city.landmarks.map((landmark) => landmark.name),
      })),
    };
  }
}

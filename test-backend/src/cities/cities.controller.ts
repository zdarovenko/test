import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from '@cities/cities.service';
import { CityResponse } from '@cities/city-response';

type OrderBy = 'name' | 'name_native' | 'population' | 'founded' | 'country' | 'continent';
type Ordering = 'ASC' | 'DESC';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  async findAll(
    @Query('order_by') order_by?: OrderBy,
    @Query('ordering') ordering?: Ordering,
  ): Promise<CityResponse> {
    if (order_by) {
      return this.citiesService.findAll({ [order_by]: ordering || 'ASC' });
    }

    return this.citiesService.findAll();
  }
}

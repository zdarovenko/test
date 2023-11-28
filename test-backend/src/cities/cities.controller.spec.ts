import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CityResponse } from './city-response';
import { CitiesService } from './cities.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { City } from '@cities/entities/city.entity';
import { Repository } from 'typeorm';

describe('CitiesController', () => {
  let controller: CitiesController;
  let citiesService: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        CitiesService,
        {
          provide: getRepositoryToken(City),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
    citiesService = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cities', async () => {
      const citiesResponse: CityResponse = {
        cities: [
          {
            id: 1,
            name: '1',
            name_native: '1 native',
            country: '11',
            continent: '111',
            latitude: 111.111111,
            longitude: 222.222222,
            population: 1111111,
            founded: 1111,
            landmarks: ['1111'],
          },
          {
            id: 2,
            name: '2',
            name_native: '2 native',
            country: '22',
            continent: '222',
            latitude: 222.222222,
            longitude: 333.333333,
            population: 2222222,
            founded: 2222,
            landmarks: ['2222'],
          },
        ],
      };

      jest
        .spyOn(citiesService, 'findAll')
        .mockImplementation(async () => citiesResponse);

      const result = await controller.findAll();
      expect(result).toEqual(citiesResponse);
    });

    it('should return an array of cities with ordering', async () => {
      const citiesResponse: CityResponse = {
        cities: [
          {
            id: 1,
            name: '1',
            name_native: '1 native',
            country: '11',
            continent: '111',
            latitude: 111.111111,
            longitude: 222.222222,
            population: 1111111,
            founded: 1111,
            landmarks: ['1111'],
          },
          {
            id: 2,
            name: '2',
            name_native: '2 native',
            country: '22',
            continent: '222',
            latitude: 222.222222,
            longitude: 333.333333,
            population: 2222222,
            founded: 2222,
            landmarks: ['2222'],
          },
        ],
      };

      jest
        .spyOn(citiesService, 'findAll')
        .mockImplementation(async () => citiesResponse);

      const result = await controller.findAll('name', 'DESC');
      expect(result).toEqual(citiesResponse);
    });
  });
});

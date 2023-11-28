import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';
import { Repository, FindOptionsOrder } from 'typeorm';

describe('CitiesService', () => {
  let service: CitiesService;
  let repository: Repository<City>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesService,
        {
          provide: getRepositoryToken(City),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
    repository = module.get<Repository<City>>(getRepositoryToken(City));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cities', async () => {
      const mockCities: City[] = [
        { id: 1, name: '1', name_native: '1 native', country: '11', continent: '111', latitude: 111.111111, longitude: 222.222222, population: 1111111, founded: 1111, landmarks: [{id: 1, name: '1111', city: this}] },
        { id: 2, name: '2', name_native: '2 native', country: '22', continent: '222', latitude: 222.222222, longitude: 333.333333, population: 2222222, founded: 2222, landmarks: [{id: 2, name: '2222', city: this}] },
      ];

      jest.spyOn(repository, 'find').mockImplementation(async () => mockCities);

      const result = await service.findAll();
      expect(result).toEqual({
        cities: mockCities.map((city) => ({
          ...city,
          landmarks: city.landmarks.map((landmark) => landmark.name),
        })),
      });
    });

    it('should return an array of cities with ordering', async () => {
      const mockCities: City[] = [
        { id: 1, name: '1', name_native: '1 native', country: '11', continent: '111', latitude: 111.111111, longitude: 222.222222, population: 1111111, founded: 1111, landmarks: [{id: 1, name: '1111', city: this}] },
        { id: 2, name: '2', name_native: '2 native', country: '22', continent: '222', latitude: 222.222222, longitude: 333.333333, population: 2222222, founded: 2222, landmarks: [{id: 2, name: '2222', city: this}] },
      ];

      const order: FindOptionsOrder<City> = { name: 'ASC' };

      jest.spyOn(repository, 'find').mockImplementation(async () => mockCities);

      const result = await service.findAll(order);
      expect(result).toEqual({
        cities: mockCities.map((city) => ({
          ...city,
          landmarks: city.landmarks.map((landmark) => landmark.name),
        })),
      });
    });
  });
});

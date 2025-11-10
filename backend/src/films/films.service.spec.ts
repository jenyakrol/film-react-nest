import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsRepository } from './repositories/PostgreSQL/films.repository';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService, FilmsRepository],
    })
      .overrideProvider(FilmsRepository)
      .useValue({
        findById: jest.fn(),
        findAll: jest.fn(),
        findOneAndTakePlace: jest.fn(),
      })
      .compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FilmsRepository } from './films.repository';

describe('FilmsRepository', () => {
  let provider: FilmsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsRepository,
        {
          provide: 'FilmRepository',
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: 'ScheduleRepository',
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    provider = module.get<FilmsRepository>(FilmsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

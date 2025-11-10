import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsRepository } from '@/films/repositories/PostgreSQL/films.repository';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, FilmsRepository],
    })
      .overrideProvider(FilmsRepository)
      .useValue({
        findById: jest.fn(),
        findAll: jest.fn(),
        findOneAndTakePlace: jest.fn(),
      })
      .compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

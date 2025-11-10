import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({ findAll: jest.fn(), findSchedule: jest.fn() })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Должен найти все фильмы', () => {
    controller.getfilms();

    expect(service.findAll).toHaveBeenCalled();
  });

  it('Должен найти конкретное расписание', () => {
    const id = 'sdfu-2fyu-vuhi-1239847';

    controller.getSchedule(id);

    expect(service.findSchedule).toHaveBeenCalledWith(id);
  });
});

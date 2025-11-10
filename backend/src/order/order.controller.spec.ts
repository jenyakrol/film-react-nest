import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PostOrderRequestDTO } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        takePlace: jest.fn(),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Должен создать заказ', () => {
    const order: PostOrderRequestDTO = {
      phone: '+7 (911) 132-55-33',
      email: 'something@something.com',
      tickets: [
        {
          film: 'aiuv-ysd12ui-fgvyauid-sv1123',
          session: 'soifvu-sduifghvuis-122-shfiujh',
          daytime: new Date('06-11-2025').toISOString(),
          row: 4,
          seat: 3,
          price: 330,
        },
      ],
    };

    controller.postOrder(order);

    expect(service.takePlace).toHaveBeenLastCalledWith(order);
  });
});

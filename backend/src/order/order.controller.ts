import { Body, Controller, Post } from '@nestjs/common';
import { PostOrderRequestDTO, PostOrderResponseDTO } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  postOrder(@Body() body: PostOrderRequestDTO): Promise<PostOrderResponseDTO> {
    return this.orderService.takePlace(body);
  }
}

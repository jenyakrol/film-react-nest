import { Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/films/films.repository';
import {
  PostOrderRequestDTO,
  PostOrderResponseDTO,
  TicketDTO,
  TicketResponseDTO,
} from './dto/order.dto';
import { ISession } from 'src/films/interfaces/film.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async takePlace(body: PostOrderRequestDTO): Promise<PostOrderResponseDTO> {
    const { tickets } = body;

    const films = await Promise.all(
      tickets.map(async ({ film, session, row, seat }) =>
        this.filmsRepository.findOneAndTakePlace(
          film,
          session,
          `${row}:${seat}`,
        ),
      ),
    );

    const sessions = tickets.map(({ film, session }) =>
      films.find((f) => f.id === film).schedule.find((s) => s.id === session),
    );

    const items = tickets.map((ticket) => this.toTicketDTO(ticket, sessions));

    return { total: 2, items };
  }

  private toTicketDTO(
    ticket: TicketDTO,
    sessions: ISession[],
  ): TicketResponseDTO {
    const { film, session, row, seat } = ticket;
    const { daytime, price } = sessions.find((s) => s.id === session);
    const id = randomUUID();

    return { film, session, row, seat, daytime, price, id };
  }
}

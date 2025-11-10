import { Injectable } from '@nestjs/common';
import {
  PostOrderRequestDTO,
  PostOrderResponseDTO,
  TicketDTO,
  TicketResponseDTO,
} from './dto/order.dto';
import { IFilm, ISession } from 'src/films/interfaces/film.interface';
import { randomUUID } from 'crypto';
import { FilmsRepository } from 'src/films/repositories/PostgreSQL/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async takePlace(body: PostOrderRequestDTO): Promise<PostOrderResponseDTO> {
    const { tickets } = body;

    const films: IFilm[] = [];
    for (const { film, session, row, seat } of tickets) {
      const newFilm = await this.filmsRepository.findOneAndTakePlace(
        film,
        session,
        `${row}:${seat}`,
      );
      films.push(newFilm);
    }

    const sessions = tickets.map(({ session }, index) =>
      films[index].schedule.find((s) => s.id === session),
    );

    const items = tickets.map((ticket) => this.toTicketDTO(ticket, sessions));

    return { total: items.length, items };
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

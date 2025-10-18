import { Injectable } from '@nestjs/common';
import {
  GetFilmDTO,
  GetFilmsDTO,
  GetScheduleDTO,
  SessionDTO,
} from './dto/films.dto';
import { IFilm, ISession } from './interfaces/film.interface';
import { FilmsRepository } from './repositories/PostgreSQL/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<GetFilmsDTO> {
    const films = await this.filmsRepository.findAll();

    const items = films.map((film) => this.toFilmDTO(film));

    return { total: items.length, items };
  }

  async findSchedule(id: string): Promise<GetScheduleDTO> {
    const { schedule } = await this.filmsRepository.findById(id);

    const items = schedule.map((session) => this.toSessionDTO(session));

    return { total: items.length, items };
  }

  private toFilmDTO(film: IFilm): GetFilmDTO {
    const {
      id,
      rating,
      director,
      tags,
      title,
      about,
      description,
      image,
      cover,
    } = film;

    return new GetFilmDTO({
      id,
      rating,
      director,
      tags,
      title,
      about,
      description,
      image,
      cover,
    });
  }

  private toSessionDTO(session: ISession): SessionDTO {
    const { id, daytime, hall, rows, seats, price, taken } = session;

    return new SessionDTO({
      id,
      daytime,
      hall: `${hall}`,
      rows,
      seats,
      price,
      taken,
    });
  }
}

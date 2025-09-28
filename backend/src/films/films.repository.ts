import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Film } from './models/film.model';
import { IFilm } from './interfaces/film.interface';

@Injectable()
export class FilmsRepository {
  async findById(id: string): Promise<IFilm> {
    const film = await Film.findOne({ id });

    if (!film) throw new NotFoundException('Film not found');

    return film;
  }

  findAll(): Promise<IFilm[]> {
    return Film.find({});
  }

  async findOneAndTakePlace(
    id: string,
    sessionId: string,
    position: `${number}:${number}`,
  ): Promise<IFilm> {
    const film = await Film.findOne({ id });

    if (!film) throw new NotFoundException('Film not found');

    const session = film.schedule.find((s) => s.id === sessionId);

    if (session.taken.includes(position))
      throw new ConflictException('Place is alreadey taken');

    film.schedule.find((s) => s.id === sessionId).taken = [
      ...session.taken,
      position,
    ];

    const newFilm = film.save();

    return newFilm;
  }
}

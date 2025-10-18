import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IFilmsRepository } from 'src/films/interfaces/films-repository.interface';
import { Film } from 'src/films/models/MongoDB/film.model';

@Injectable()
export class FilmsRepository implements IFilmsRepository {
  async findById(id: string) {
    const film = await Film.findOne({ id });

    if (!film) throw new NotFoundException('Film not found');

    return film;
  }

  findAll() {
    return Film.find({});
  }

  async findOneAndTakePlace(
    id: string,
    sessionId: string,
    position: `${number}:${number}`,
  ) {
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

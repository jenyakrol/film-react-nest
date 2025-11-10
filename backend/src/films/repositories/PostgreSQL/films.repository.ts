import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilmsRepository } from 'src/films/interfaces/films-repository.interface';
import { Film } from 'src/films/models/PostgreSQL/film.model';
import { Schedule } from 'src/films/models/PostgreSQL/schedule.model';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsRepository implements IFilmsRepository {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findById(id: string) {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });

    if (!film) throw new NotFoundException('Film not found');

    return film;
  }

  findAll() {
    return this.filmRepository.find();
  }

  async findOneAndTakePlace(
    id: string,
    sessionId: string,
    position: `${number}:${number}`,
  ) {
    const film = await this.filmRepository.findOneBy({ id });
    if (!film) throw new NotFoundException('Film not found');

    const session = await this.scheduleRepository.findOneBy({ id: sessionId });
    if (session.taken.includes(position))
      throw new ConflictException('Place is alreadey taken');

    session.taken.push(position);

    await this.scheduleRepository.save(session);

    const newFilm = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });

    return newFilm;
  }
}

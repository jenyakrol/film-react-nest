import { IFilm } from '../../films/interfaces/film.interface';

export interface IFilmsRepository {
  findById: (id: string) => Promise<IFilm>;
  findAll: () => Promise<IFilm[]>;
  findOneAndTakePlace: (
    id: string,
    sessionId: string,
    position: `${number}:${number}`,
  ) => Promise<IFilm>;
}

import { IFilm } from 'src/films/interfaces/film.interface';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Schedule } from './schedule.model';

@Entity('films')
export class Film implements IFilm {
  @PrimaryColumn()
  id: string;

  @Column()
  rating: number;

  @Column()
  director: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedule: Schedule[];
}

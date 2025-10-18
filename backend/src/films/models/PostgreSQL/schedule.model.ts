import { ISession } from 'src/films/interfaces/film.interface';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Film } from './film.model';

@Entity('schedules')
export class Schedule implements ISession {
  @PrimaryColumn()
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

  @Column('simple-array')
  taken: `${number}:${number}`[];

  @ManyToOne(() => Film, (film) => film.schedule)
  film: Film;
}

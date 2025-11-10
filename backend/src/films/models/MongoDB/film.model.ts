import mongoose from 'mongoose';
import { IFilm } from '../../../films/interfaces/film.interface';

const filmSchema = new mongoose.Schema<IFilm>({
  id: { type: String },
  rating: { type: Number },
  director: { type: String },
  tags: [{ type: String }],
  title: { type: String },
  about: { type: String },
  description: { type: String },
  image: { type: String },
  cover: { type: String },
  schedule: {
    type: [
      {
        id: { type: String },
        daytime: { type: String },
        hall: { type: Number },
        rows: { type: Number },
        seats: { type: Number },
        price: { type: Number },
        taken: {
          type: [
            {
              type: String,
              match: [/^\d+:\d+$/, 'Неправильный формат места'],
              unique: true,
            },
          ],
          unique: true,
        },
      },
    ],
  },
});

export const Film = mongoose.model<IFilm>('film', filmSchema);

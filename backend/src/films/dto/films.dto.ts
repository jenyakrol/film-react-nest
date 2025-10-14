export class SessionDTO {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];

  constructor(data: Partial<SessionDTO>) {
    Object.assign(this, data);
  }
}

export class GetScheduleDTO {
  total: number;
  items: SessionDTO[];
}

export class GetFilmDTO {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;

  constructor(data: Partial<GetFilmDTO>) {
    Object.assign(this, data);
  }
}

export class GetFilmsDTO {
  total: number;
  items: GetFilmDTO[];
}

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { FilmsRepository } from './films/repositories/PostgreSQL/films.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films/models/PostgreSQL/film.model';
import { Schedule } from './films/models/PostgreSQL/schedule.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_DRIVER as 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'films',
      entities: [Film, Schedule],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Film, Schedule]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsService, OrderService, FilmsRepository],
})
export class AppModule {}

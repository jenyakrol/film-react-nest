import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetFilmsDTO, GetScheduleDTO } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getfilms(): Promise<GetFilmsDTO> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  getSchedule(@Param('id') id: string): Promise<GetScheduleDTO> {
    return this.filmsService.findSchedule(id);
  }
}

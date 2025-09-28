import { Type } from 'class-transformer';
import {
  IsEmail,
  IsISO8601,
  IsNumber,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class TicketDTO {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsISO8601()
  daytime: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

export class TicketResponseDTO extends TicketDTO {
  id: string;
}

export class PostOrderRequestDTO {
  @IsPhoneNumber()
  phone: string;
  @IsEmail()
  email: string;
  @ValidateNested({ each: true })
  @Type(() => TicketDTO)
  tickets: TicketDTO[];
}

export class PostOrderResponseDTO {
  total: number;
  items: TicketResponseDTO[];
}

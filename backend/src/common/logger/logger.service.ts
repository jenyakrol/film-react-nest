import { Injectable, LoggerService as DefaultLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DevLogger } from './dev-logger/dev-logger';
import { JsonLogger } from './json-logger/json-logger';
import { TskvLogger } from './tskv-logger/tskv-logger';

@Injectable()
export class LoggerService implements DefaultLogger {
  private readonly logger: DefaultLogger;

  constructor(private configService: ConfigService) {
    const loggerName = configService.get('logger');

    switch (loggerName) {
      case 'json':
        this.logger = new JsonLogger();
        break;
      case 'tskv':
        this.logger = new TskvLogger();
        break;
      case 'dev':
      default:
        this.logger = new DevLogger();
    }
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }
}

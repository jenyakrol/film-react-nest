import { Test, TestingModule } from '@nestjs/testing';
import { JsonLogger } from './json-logger';

describe('JsonLogger', () => {
  let provider: JsonLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonLogger],
    }).compile();

    provider = module.get<JsonLogger>(JsonLogger);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('Вызов log', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    provider.log('something');

    expect(console.log).toHaveBeenLastCalledWith(
      JSON.stringify({ level: 'log', message: 'something' }),
    );

    provider.log('something else', 'optional1', 'optional2');

    expect(console.log).toHaveBeenLastCalledWith(
      JSON.stringify({
        level: 'log',
        message: 'something else',
        optionalParams: ['optional1', 'optional2'],
      }),
    );
  });

  it('Вызов warn', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    provider.warn('something');

    expect(console.warn).toHaveBeenLastCalledWith(
      JSON.stringify({ level: 'warn', message: 'something' }),
    );

    provider.warn('something else', 'optional1', 'optional2');

    expect(console.warn).toHaveBeenLastCalledWith(
      JSON.stringify({
        level: 'warn',
        message: 'something else',
        optionalParams: ['optional1', 'optional2'],
      }),
    );
  });

  it('Вызов error', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    provider.error('something');

    expect(console.error).toHaveBeenLastCalledWith(
      JSON.stringify({ level: 'error', message: 'something' }),
    );

    provider.error('something else', 'optional1', 'optional2');

    expect(console.error).toHaveBeenLastCalledWith(
      JSON.stringify({
        level: 'error',
        message: 'something else',
        optionalParams: ['optional1', 'optional2'],
      }),
    );
  });
});

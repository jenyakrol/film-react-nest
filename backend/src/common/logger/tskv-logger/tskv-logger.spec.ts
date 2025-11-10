import { Test, TestingModule } from '@nestjs/testing';
import { TskvLogger } from './tskv-logger';

describe('TskvLogger', () => {
  let provider: TskvLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TskvLogger],
    }).compile();

    provider = module.get<TskvLogger>(TskvLogger);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('Вызов log', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    provider.log('something');

    expect(console.log).toHaveBeenLastCalledWith(
      'level=log\tmessage="something"\n',
    );

    provider.log('something else', 'optional1', 'optional2');

    expect(console.log).toHaveBeenLastCalledWith(
      'level=log\tmessage="something else"\toptionalParams=["optional1","optional2"]\n',
    );
  });

  it('Вызов warn', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    provider.warn('something');

    expect(console.warn).toHaveBeenLastCalledWith(
      'level=warn\tmessage="something"\n',
    );

    provider.warn('something else', 'optional1', 'optional2');

    expect(console.warn).toHaveBeenLastCalledWith(
      'level=warn\tmessage="something else"\toptionalParams=["optional1","optional2"]\n',
    );
  });

  it('Вызов error', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    provider.error('something');

    expect(console.error).toHaveBeenLastCalledWith(
      'level=error\tmessage="something"\n',
    );

    provider.error('something else', 'optional1', 'optional2');

    expect(console.error).toHaveBeenLastCalledWith(
      'level=error\tmessage="something else"\toptionalParams=["optional1","optional2"]\n',
    );
  });
});

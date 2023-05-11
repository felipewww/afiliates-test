import { Test, TestingModule } from '@nestjs/testing';
import { TokenProvider } from './token.provider';

describe('PasswordValidatorService', () => {
  let service: TokenProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenProvider],
    }).compile();

    service = module.get<TokenProvider>(TokenProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

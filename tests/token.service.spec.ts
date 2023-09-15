import { TokenGenerator } from '../app/utils/token/generateToken';
import { TokensService } from '../app/service/token.service';
import * as booksMock from './tokens.mock';

const tokenGenerator = new TokenGenerator();
const tokensService = new TokensService();

describe('POST - Tokenizarion', () => {
  test('probando un metodo', () => {
    const result = tokenGenerator.generateToken();
    const expected = expect(result?.length).toBe(16);

    expect(result).toStrictEqual(expected);
  });
});

describe('POST - Tokenizarion', () => {
  test('probando metodo validations', () => {
    const result = tokensService.validations(booksMock.create);
    const expected = true;

    expect(result).toStrictEqual(expected);
  });
});

import { APIGatewayEvent } from 'aws-lambda';
import { Service } from 'typedi';
import { MessageUtil, parseValidationErrors } from '../utils/message';
import { TokensService } from '../service/token.service';
import { CreateTokenDTO } from '../model/dto/createTokenDTO';
import { validate } from 'class-validator';

@Service()
export class TokensController {
  constructor(private tokensService: TokensService) {}

  async tokenization (event: APIGatewayEvent) {
    try {
      if (event.headers['Authorization'] !== 'Bearer pk_test_LsRBKejzCOEEWOsw') {
        throw new Error('Token inconrrecto.');
      }

      const params: CreateTokenDTO = JSON.parse(event.body);

      const dtoValidation = await validate(params);

      if (dtoValidation && dtoValidation?.length > 0) {
        const errors = parseValidationErrors(dtoValidation);
        return MessageUtil.error(404, errors);
      }

      const result = await this.tokensService.createToken(params);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  async findData (event: APIGatewayEvent) {
    try {
      if (event.headers['Authorization'] !== 'Bearer pk_test_LsRBKejzCOEEWOsw') {
        throw new Error('Token del header inconrrecto.');
      }
      const result = await this.tokensService.findData(event.pathParameters.token);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }
}

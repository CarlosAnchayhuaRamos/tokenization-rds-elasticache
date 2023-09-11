import { APIGatewayEvent, Context } from 'aws-lambda';
import { Model } from 'mongoose';
import { Service } from "typedi";
import { MessageUtil } from '../utils/message';
import { TokensService } from '../service/token.service';
import { CreateTokenDTO } from '../model/dto/createTokenDTO';

@Service()
export class TokensController {
  constructor(private tokensService: TokensService) {}

  // /**
  //  * Create book
  //  * @param {*} event
  //  */
  async tokenization (event: APIGatewayEvent) {
    const params: CreateTokenDTO = JSON.parse(event.body);

    try {
      console.log("controller");
      
      const result = await this.tokensService.createToken(params);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

}
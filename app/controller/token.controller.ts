import { APIGatewayEvent, Context } from 'aws-lambda';
import { Model } from 'mongoose';
import { Service } from "typedi";
import { MessageUtil, parseValidationErrors } from '../utils/message';
import { TokensService } from '../service/token.service';
import { CreateTokenDTO } from '../model/dto/createTokenDTO';
import { validate } from "class-validator";

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

      console.log(params);

      console.log("-------------------validaciones--------------------");
      // Validate the ReceiptNotification object using class-validator library
      const dtoValidation = await validate(params);
      console.log(dtoValidation);
      
      if (dtoValidation && dtoValidation.length > 0) {
        // If there are validation errors, return an error message
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

}
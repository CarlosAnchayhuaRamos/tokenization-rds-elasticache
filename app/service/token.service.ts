import { Model } from 'mongoose';
import { CreateTokenDTO } from '../model/dto/createTokenDTO';
import { Connection, Repository } from 'typeorm';
import { Tokens } from '../model/entities/token.entity';
import { Service } from "typedi";


@Service()
export class TokensService {
  constructor() {}

  /**
   * Create book
   * @param params
   */
  async createToken (params: CreateTokenDTO): Promise<object> {
    try {
      console.log("services");
      // const result = await this.books.create({
      //   name: params.name,
      //   id: params.id,
      // });

      const result = params
      return result;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }
}

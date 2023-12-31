import { TokenGenerator } from '../utils/token/generateToken';
import { CreateTokenDTO } from '../model/dto/createTokenDTO';
import { Tokens } from '../model/entities/token.entity';
import { Service } from 'typedi';
import { myDataSource } from '../model/postgresql-db';
import { client } from '../model/cache-manager';

@Service()
export class TokensService {
  constructor(
  ) {}

  /**
   * Create book
   * @param params
   */
  async createToken (param: CreateTokenDTO): Promise<object> {
    try {
      const esValido = this.validations(param);
      if (!esValido) {
        throw new Error('Los datos ingresados son inconrrectos, revisalos por favor!');
      }

      const repository = myDataSource.getRepository(Tokens);
      const result = await repository.findOne({
        where: [
          {
            email: param.email,
            card_number: param.cardNumber,
            cvv: param.cvv,
            expiration_year: param.expirationYear,
            expiration_month: param.expirationMonth,
          }],
      });

      if (!result) {
        throw new Error('Tarjeta no encontrada.');
      }

      const tokenGenerator = new TokenGenerator();
      const token = tokenGenerator.generateToken();

      await client.connect();

      const data = JSON.stringify(result);

      await client.set(token, data, { EX: 900 });

      await client.quit();

      return { token };

    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  validations(objeto) {
    if (!objeto || typeof objeto !== 'object') {
      return false;
    }

    const { email, card_number, cvv, expiration_year, expiration_month } = objeto;

    if (typeof email !== 'string'
    || email?.length < 5
    || email?.length > 100
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return false;
    }

    if (typeof cvv !== 'number'
    || (cvv < 100 || cvv > 9999)
    || (cvv.toString()?.length !== 3
    && cvv.toString()?.length !== 4)) {
      return false;
    }
    if (typeof card_number !== 'number'
    || (card_number.toString()?.length < 13
    || card_number.toString()?.length > 16)
    || !this.luhnValidation(card_number)) {
      return false;
    }

    const yearActual = new Date().getFullYear();
    if (typeof expiration_year !== 'number'
      || expiration_year.toString()?.length !== 4
      || expiration_year < yearActual
      || expiration_year > yearActual + 5) {
      return false;
    }

    if (typeof expiration_month !== 'number'
      || (expiration_month < 1
      || expiration_month > 12)
      || (expiration_month.toString()?.length !== 1
      && expiration_month.toString()?.length !== 2)) {
      return false;
    }
    return true;
  }

  luhnValidation(numeroTarjeta: number): boolean {
    const digits = numeroTarjeta.toString().split('').map(Number);
    let sum = 0;
    let alt = false;

    for (let i = digits?.length - 1; i >= 0; i = i - 1) {
      let curr = digits[i];
      if (alt) {
        curr *= 2;
        if (curr > 9) {
          curr -= 9;
        }
      }
      sum += curr;
      alt = !alt;
    }

    return sum % 10 === 0;
  }

  /**
   * Create book
   * @param params
   */
  async findData (param: string): Promise<object> {
    try {
      if (await !this.validarToken(param)) {
        throw new Error('Token invalido.');
      }

      await client.connect();

      const value = await client.get(param);

      console.log('value');
      console.log(value);

      const objeto = JSON.parse(value);

      await client.quit();

      if (!objeto) {
        throw new Error('Token vencido o no encontrado.');
      }

      return {
        email: objeto.email,
        card_number: objeto.card_number,
        expiration_year: objeto.expiration_year,
        expiration_month: objeto.expiration_month,
      };

    } catch (err) {
      console.error(err);

      throw err;
    }
  }

  validarToken(cadena) {
    // Verifica si la cadena contiene solo letras mayúsculas, minúsculas o números
    const regex = /^[A-Za-z0-9]{16}$/;
    // Comprueba si la cadena tiene 16 caracteres y cumple con la expresión regular
    return regex.test(cadena);
  }
}

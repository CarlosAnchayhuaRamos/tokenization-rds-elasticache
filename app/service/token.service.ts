import { TokenGenerator } from '../utils/token/generateToken';
import { CreateTokenDTO } from '../model/dto/createTokenDTO';
import { Repository } from 'typeorm';
import Container from "typedi";
import { Tokens } from '../model/entities/token.entity';
import { Service } from "typedi";
import { myDataSource } from '../model/postgresql-db';

// const dataSource = Container.get(myDataSource);

@Service()
export class TokensService {
  constructor(
  ) {}

  /**
   * Create book
   * @param params
   */
  async createToken (param: CreateTokenDTO): Promise<object> {
    const creatToken = param;
    try {
      console.log(creatToken);
      const repository = myDataSource.getRepository(Tokens)
      const result = await repository.findOne({
        where: [
            { 
              email: param.email,
              card_number: param.card_number,
              cvv: param.cvv, expiration_year: param.expiration_year,
              expiration_month: param.expiration_month 
            }
        ],
      });
      console.log(result);
      

      if(!result){
        throw new Error("Los datos ingresados son inconrrectos.");
      }

      const tokenGenerator = new TokenGenerator();
      const token = tokenGenerator.generateToken();
      console.log('Token generado:', token);

      return {token};
      
    } catch (err) {
      console.error(err);

      throw err;
    }
  }

  luhnValidation(numeroTarjeta: string): boolean {
    // Paso 1: Invertir el número de tarjeta
    const numeroInvertido = numeroTarjeta.split('').reverse().join('');
  
    // Paso 2: Inicializar variables
    let sumaDigitos = 0;
    let doble = false;
  
    // Paso 3: Recorrer cada dígito
    for (let i = 0; i < numeroInvertido.length; i++) {
      const digito = parseInt(numeroInvertido[i], 10);
  
      // Paso 4: Si es un dígito par, duplicarlo
      if (doble) {
        let digitoDoble = digito * 2;
  
        // Si el resultado es mayor o igual a 10, sumar los dígitos
        if (digitoDoble >= 10) {
          digitoDoble = digitoDoble - 9;
        }
  
        sumaDigitos += digitoDoble;
      } else {
        sumaDigitos += digito;
      }
  
      // Alternar entre duplicar y no duplicar para el siguiente dígito
      doble = !doble;
    }
  
    // Paso 5: La tarjeta es válida si la suma total es un múltiplo de 10
    return sumaDigitos % 10 === 0;
  }
}

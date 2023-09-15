import {
  IsEmail,
  Length,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateTokenDTO {
  @Expose()
  @IsEmail()
  @Length(5, 100)
  email: string;

  @Expose()
  @Length(13, 16)
  cardNumber: number;

  @Expose()
  @Length(3, 4)
  cvv: number;

  @Expose()
  @Length(4, 4)
  expirationYear: string;

  @Expose()
  @Length(1, 2)
  expirationMonth: string;
}

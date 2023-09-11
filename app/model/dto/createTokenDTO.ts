import {
  IsEmail,
  Length,
} from 'class-validator';

export class CreateTokenDTO {
  @IsEmail()
  @Length(5, 100)
  email: string;

  @Length(13, 16)
  card_number: number;

  @Length(3, 4)
  cvv: number;

  @Length(4, 4)
  expiration_year: string;

  @Length(1, 2)
  expiration_month: string;
}
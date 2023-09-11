
import "reflect-metadata";
import { Handler, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
import Container from "typedi";
import { DbService } from '../app/model/postgresql-db';

dotenv.config({
  path: dotenvPath,
});

// import { books } from './model';
// import { BooksController } from './controller/books';
// const booksController = new BooksController(books);

import { TokensController } from './controller/token.controller';
const tokensController = Container.get(TokensController);

const dbService = new DbService();
// export const create: Handler = (event: any, context: Context) => {
//   return booksController.create(event, context);
// };

// export const update: Handler = (event: any) => booksController.update(event);

// export const find: Handler = () => booksController.find();

// export const findOne: Handler = (event: any, context: Context) => {
//   return booksController.findOne(event, context);
// };

// export const deleteOne: Handler = (event: any) => booksController.deleteOne(event);

export const tokenization: Handler = async (event: any, context: Context) => {
  console.log("handler");
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log("conectando");
    await dbService.connect();
    console.log("conectado");
    const response = tokensController.tokenization(event);
    // await dbService.disconnect();

    return response;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al conectar a la base de datos' }),
    };
  }
};

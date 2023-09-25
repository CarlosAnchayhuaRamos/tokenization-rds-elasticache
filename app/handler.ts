
import 'reflect-metadata';
import { Handler, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
import { Container } from 'typedi';
import { myDataSource } from '../app/model/postgresql-db';

dotenv.config();

import { TokensController } from './controller/token.controller';
const tokensController = Container.get(TokensController);

// const dbService = new myDataSource();
export const tokenization: Handler = async (event: any, context: Context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    await myDataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });
    const response = await tokensController.tokenization(event);
    await myDataSource.destroy();
    console.log('Data Source has finalized!');
    return response;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al conectar a la base de datos' }),
    };
  }
};

export const findData: Handler = async (event: any, context: Context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    await myDataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });
    const response = await tokensController.findData(event);
    await myDataSource.destroy();
    console.log('Data Source has finalized!');

    return response;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al conectar a la base de datos' }),
    };
  }
};

import { DataSource, Connection, createConnection, Repository } from 'typeorm';
import { Tokens } from '../model/entities/token.entity'; // Importa tus entidades aquí

// export class DbService {
//   private connection: Connection;

//   async connect(): Promise<void> {
//     this.connection = await createConnection({
//       type: 'postgres',
//       host: 'database-1.chzoewnvixcm.us-east-1.rds.amazonaws.com',
//       port: 5432, // El puerto predeterminado de PostgreSQL
//       username: 'postgres',
//       password: 'postgres',
//       database: 'database-1',
//       entities: [Tokens], // Lista de entidades que has definido
//       synchronize: false, // Establece esto en 'false' en producción
//     });
//   }

//   getEntity1Repository(): Repository<Tokens> {
//     return this.connection.getRepository(Tokens);
//   }

//   async disconnect(): Promise<void> {
//     await this.connection.close();
//   }
// }

export class DbService {

  async connect(): Promise<void> {
    const myDataSource = new DataSource({
      type: 'postgres',
      host: 'database-1.chzoewnvixcm.us-east-1.rds.amazonaws.com',
      port: 5432, // El puerto predeterminado de PostgreSQL
      username: 'postgres',
      password: 'postgres',
      database: 'database-1',
      entities: [Tokens], // Lista de entidades que has definido,
      logging: true,
      synchronize: true,
    });

    const connection = myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    });
    
    return connection;

  }
    
  // const myDataSource = new DataSource({
  //   type: 'postgres',
  //   host: 'database-1.chzoewnvixcm.us-east-1.rds.amazonaws.com',
  //   port: 5432, // El puerto predeterminado de PostgreSQL
  //   username: 'postgres',
  //   password: 'postgres',
  //   database: 'database-1',
  //   entities: [Tokens], // Lista de entidades que has definido,
  //   logging: true,
  //   synchronize: true,
  // })
  
  // const connection = myDataSource
  // .initialize()
  // .then(() => {
  //     console.log("Data Source has been initialized!")
  // })
  // .catch((err) => {
  //     console.error("Error during Data Source initialization:", err)
  // });
  
  // export = connection;
}


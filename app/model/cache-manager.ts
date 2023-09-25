import { createClient  } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

export const client  = createClient({
  url: 'redis://testingredis2.vs1sss.clustercfg.memorydb.us-east-1.amazonaws.com:6379',
  socket: { tls: false },
});

client.on('error', err => console.log('Redis Client Error', err));

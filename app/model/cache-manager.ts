import { createClient  } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

export const client  = createClient({
  url: process.env.EC_URL,
  socket: { tls: false },
});

client.on('error', err => console.log('Redis Client Error', err));

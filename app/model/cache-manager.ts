import { createClient  } from 'redis';

export const client  = createClient({
  url: 'clusterforlambdatest.vs1sss.cfg.use1.cache.amazonaws.com:11211'
});

client.on('error', err => console.log('Redis Client Error', err));
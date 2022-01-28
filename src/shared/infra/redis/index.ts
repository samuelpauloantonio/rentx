import * as redis from 'redis';

const clientRedis = redis.createClient(
    process.env.REDIS_PORT,
    process.env.REDIS_HOST,
);

clientRedis.on('ready', function () {
    console.log('Redis server is ready ');
});
clientRedis.on('error', err => console.log('Redis Client Error', err));

export { clientRedis };

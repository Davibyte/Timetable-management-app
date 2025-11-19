const redis = require('redis');

let redisClient;

const connectRedis = async () => {
  try {
    redisClient = redis.createClient({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
    });

    redisClient.on('error', (err) => {
      console.error('Redis error:', err);
    });

    redisClient.on('connect', () => {
      console.log('Redis connected successfully');
    });

    redisClient.on('ready', () => {
      console.log('Redis is ready');
    });

    redisClient.on('end', () => {
      console.log('Redis connection ended');
    });

    await redisClient.connect();
  } catch (error) {
    console.error('Redis connection error:', error.message);
    console.log('Continuing without Redis cache');
  }
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };
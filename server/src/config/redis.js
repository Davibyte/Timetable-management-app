const redis = require('redis');

let redisClient;

const connectRedis = async () => {
    try {
        redisClient = redis.createClient({
            socket: {
                host: process.env.REDIS_HOST || 'localhost',
                port: process.env.REDIS_PORT || 6379
            },
            password: process.env.REDIS_PASSWORD || undefined
        });

        redisClient.on('error', (err) => {
            console.error('Redis Error:', err);
        });

        redisClient.on('connect', () => {
            console.log('Redis Connected');
        });

        await redisClient.connect();
    } catch (error) {
        console.error('Redis Connection Error:', error);
    }
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };
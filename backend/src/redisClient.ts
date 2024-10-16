import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || '';

if (!process.env.REDIS_URL) {
	throw new Error('REDIS_URL environment variable is not set.');
}

const redisClient = new Redis(REDIS_URL);

export default redisClient;

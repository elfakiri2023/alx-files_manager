import { promisify } from 'util';
import { createClient } from 'redis';

class RedisClient {
	constructor() {

		this.client = createClient();
		this.client.on('error', (err) => {
			console.error(err);
		});

		// promisify the functions
		this.getAsync = promisify(this.client.get).bind(this.client);
		this.setAsync = promisify(this.client.set).bind(this.client);
		this.delAsync = promisify(this.client.del).bind(this.client);
	}

	isAlive() {
		if (this.client.connected) {
			return true;
		}
		return false;
	}

	async set(key, value, duration) {
		return await this.setAsync(key, value, 'EX', duration);
	}

	async get(key) {
		return await this.getAsync(key);
	}

	async del(key) {
		return await this.delAsync(key);
	}
}

const redisClient = new RedisClient();
module.exports = redisClient;

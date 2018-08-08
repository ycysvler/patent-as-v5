const Redis = require('ioredis');
const config = require('../../config/config');

module.exports = class RedisHelper {
    constructor() {
        this.redis = new Redis(config.redis); 
    }

    set(key, value){
        this.redis.set(key, value);
    }
     
    get(key){
        let self = this;
        return new Promise((resolve, reject) => {
            try {
                self.redis.get(key, function (err, result) {  
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });  
            } catch (err) {
                reject(err)
            }
        });
    }
}

/**
 * Created by VLER on 2018/7/1.
 */
let moment = require('moment');
let uuid = require('uuid');
let RedisHelper = require('../models/redis/redis.js');
let getMongoPool = require('../models/mongo/pool.js');

module.exports = class InstanceLogic {

    /**
     * 获取正在运行的实例
     * @return {object}          ？？
     */
    instances() {
        return new Promise(async (resolve, reject) => {
            try {
                let Instance = getMongoPool('ha').Instance;
                Instance.find({}, function (err, items) {
                    if (!err) {
                        resolve(items);
                    } else {
                        reject(err);
                    }
                }); 
            } catch (err) {
                reject(err)
            }
        });
    }

    heart() {
        return new Promise(async (resolve, reject) => {
            try { 
                let redis = new RedisHelper(); 
                let str  = await redis.get('instances'); 
                let instances = JSON.parse(str);
                resolve(instances);
                 
            } catch (err) {
                reject(err)
            }
        });
    }

    agents(){
        return new Promise((resolve, reject) => {
            try {
                let Agent = getMongoPool('ha').Agent;

                Agent.find({}, function (err, items) {
                    if (!err) {
                        resolve(items);
                    } else {
                        reject(err);
                    }
                });
            } catch (err) {
                reject(err)
            }
        });
    }
};

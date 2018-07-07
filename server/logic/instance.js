/**
 * Created by VLER on 2018/7/1.
 */
let moment = require('moment');
let uuid = require('uuid');

let getMongoPool = require('../models/mongo/pool.js');

module.exports = class InstanceLogic {

    /**
     * 获取正在运行的实例
     * @return {object}          ？？
     */
    list() {
        return new Promise((resolve, reject) => {
            try {
                let Instance = getMongoPool('ha').Instance;

                Instance.find({package: 'CloudAtlas.Search.Worker'}, function (err, instances) {
                    if (!err) {
                        resolve(instances);
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
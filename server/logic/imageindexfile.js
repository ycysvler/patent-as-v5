/**
 * Created by VLER on 2018/7/1.
 */
let moment = require('moment');
let uuid = require('uuid');

let getMongoPool = require('../models/mongo/pool.js');

module.exports = class ImageIndexLogic {

    /**
     * 获取图片索引列表
     * @return {array}          外观类型列表
     */
    list(imagetypes, featuretypes) {
        return new Promise((resolve, reject) => {
            try {
                let Item = getMongoPool('patent').ImageIndexFile;

                Item.find()
                    .where('type').in(imagetypes)
                    .where('feature_type').in(featuretypes)
                    .exec(function (err, items) {
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
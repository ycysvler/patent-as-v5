/**
 * Created by VLER on 2018/7/1.
 */
let moment = require('moment');
let uuid = require('uuid');
var path = require('path');
let fs = require('fs');

let getMongoPool = require('../models/mongo/pool.js');

module.exports = class ImageLogic {

    /**
     * 获取任务列表数据
     * @return {array}          外观类型列表
     */
    getSource(name) {
        return new Promise((resolve, reject) => {
            let doc = getMongoPool('patent').Image;
            doc.findOne({name: name},'source',  function (err, Item) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Item.source);
                }
            });
        });
    }
};
/**
 * Created by VLER on 2018/7/1.
 */
let moment = require('moment');
let uuid = require('uuid');
var path = require('path');
let fs = require('fs');

let getMongoPool = require('../models/mongo/pool.js');

module.exports = class PatentLogic {

    /**
     * 获取任务列表数据
     * @return {array}          外观类型列表
     */
    single(ap_num) {
        return new Promise((resolve, reject) => {
            let doc = getMongoPool('patent').Patent;
            doc.findOne({ap_num: ap_num},  function (err, Item) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Item);
                }
            });
        });
    }

    /**
     * 添加图片
     * @return {array}          外观类型列表
     */
    add(data) {
        return new Promise((resolve, reject) => {
            let Image = getMongoPool('patent').Image;
            let image = new Image(data);
            image.save(function (err, item) {
                if (err) {
                    reject(err);
                } else {
                    resolve(item.name);
                }
            });
        });
    }

    /**
     * 获取图片状态
     * @query  {string} name    图片名称
     * @return {number}         图片状态
     */
    getState(name) {
        return new Promise((resolve, reject) => {
            let doc = getMongoPool('patent').Image;
            doc.findOne({name: name}, 'state', function (err, Item) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Item.state);
                }
            });
        });
    }
};
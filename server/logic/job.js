/**
 * Created by VLER on 2018/7/1.
 */
let moment = require('moment');
let uuid = require('uuid');
var path = require('path');
let fs = require('fs');

let getMongoPool = require('../models/mongo/pool.js');

module.exports = class JobLogic {

    /**
     * 获取任务列表数据
     * @return {array}          外观类型列表
     */
    list(userid, jobtype, keyword) {
        return new Promise((resolve, reject) => {
            try {
                let Item = getMongoPool('patent').Job;

                Item.find(
                    { "jobtype": jobtype},
                    function (err, item) {
                        if (!err) {
                            resolve(item);
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
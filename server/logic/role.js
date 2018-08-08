/**
 * Created by VLER on 2018/6/30.
 */
let moment = require('moment');
let uuid = require('uuid');
var path = require('path');
let fs = require('fs');

let getMongoPool = require('../models/mongo/pool.js');

module.exports = class RoleLogic {
     

    /**
     * 获取单个信息
     * @param  {string} id       ID
     * @return {object}          信息
     */
    single(rolename) {
        return new Promise((resolve, reject) => {
            try {
                let Role = getMongoPool('patent').Role;

                Role.findOne({"rolename":rolename}, function (err, item) {
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

    list(){
        return new Promise((resolve, reject) => {
            try {
                let Role = getMongoPool('patent').Role;

                Role.find({}, function (err, item) {
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

    /**
     * 添加用户
     * @param  {object} data     用户数据
     * @return {object}          用户信息
     */
    add(data){
        return new Promise((resolve, reject) => {
            try {
                let Role = getMongoPool('patent').Role;
                let item = new Role(data);

                item.save(function (err, item) {
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

    /**
     * 删除任务
     * @return {array}
     */
    remove(ids) {
        return new Promise((resolve, reject) => {
            try {
                let Role = getMongoPool('patent').Role;
                Role.remove({"_id": {$in: ids}}, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                }); 
            } catch (err) {
                reject(err)
            }
        });
    }

};

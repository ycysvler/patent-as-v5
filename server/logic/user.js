/**
 * Created by VLER on 2018/6/30.
 */
let moment = require('moment');
let uuid = require('uuid');
var path = require('path');
let fs = require('fs');

let getMongoPool = require('../models/mongo/pool.js');

module.exports = class UserLogic {
    /**
     * 用户登录
     * @param  {string} username 用户名
     * @param  {string} password 密码
     * @return {object}          用户信息
     */
    login(username, password) {
        return new Promise((resolve, reject) => {
            try {
                let User = getMongoPool('patent').User;

                User.findOne({"username":username,"password":password}, function (err, item) {
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
     * 获取单个用户信息
     * @param  {string} userid   用户ID
     * @return {object}          用户信息
     */
    single(userid) {
        return new Promise((resolve, reject) => {
            try {
                let User = getMongoPool('patent').User;

                User.findOne({"userid":userid}, function (err, item) {
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
                let User = getMongoPool('patent').User;
                let item = new User(data);

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
};
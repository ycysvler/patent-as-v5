/**
 * Created by VLER on 2018/7/1.
 */
let moment = require('moment');
let uuid = require('uuid');
var path = require('path');
let fs = require('fs');
let gm = require('gm').subClass({imageMagick:true});
let getMongoPool = require('../models/mongo/pool.js');

module.exports = class ImageLogic {

    /**
     * 获取任务列表数据
     * @return {array}          外观类型列表
     */
    getSource(name, type) {
        type = type ? type : 'source'; 

        return new Promise((resolve, reject) => {
            let doc = getMongoPool('patent').Image;
            doc.findOne({name: name}, type, function (err, Item) {
                if (err) {
                    reject(err);
                } else {
                    if(Item[type])
                        resolve(Item[type]);
                    else{
                        resolve(null);
                    }
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

    getColour(name) {
        return new Promise((resolve, reject) => {
            let doc = getMongoPool('patent').Image;
            doc.findOne({name: name}, 'colour', function (err, Item) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Item.colour);
                }
            });
        });
    }

    getNamesByCode(code){
        return new Promise((resolve, reject) => {
            let doc = getMongoPool('patent').Image;
            doc.find({code: code}, {_id:0, name:1}, function (err, Items) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Items);
                }
            });
        });
    }

    updateSource(name, source){
        return new Promise((resolve, reject) => {
            let doc = getMongoPool('patent').Image;
            doc.update({name: name}, {$set:{source:source}}, function (err, Items) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Items);
                }
            });
        });
    }

    getCropImage(name, type, width, height, x, y) {
        let self = this;
        type = type ? type : 'source';
 
        return new Promise(async (resolve, reject) => {
	    let doc = getMongoPool('patent').Image;
            doc.findOne({name: name}, type, function (err, Item) {
                if (err) {
            	    reject(err);
                } else {
                    //resolve(Item[type]);
                    gm(Item[type])
                        .crop(width, height, x, y)
                        .toBuffer('JPEG',async (err, buffer) => {
                            await self.updateSource(name, buffer);
                            if (err)
                                console.log('err', err);
                                
                            resolve({name:name, colour:Item.colour});
                        });
                }
            });
            
        });
     }
};

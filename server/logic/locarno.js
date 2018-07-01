/**
 * Created by VLER on 2018/6/30.
 */
let moment = require('moment');
let uuid = require('uuid');
var path = require('path');
let fs = require('fs');

let getMongoPool = require('../models/mongo/pool.js');

module.exports = class LocarnoLogic {

    /**
     * 获取外观类型树
     * @return {array}          外观类型tree
     */
    async getTypes(){
        let data = await this.list();
        let root = {"value":"0"};
        this.nodeAdapter(data, root);
        return root.children;
    }

    /**
     * 获取外观类型数据
     * @return {array}          外观类型列表
     */
    list(){
        return new Promise((resolve, reject) => {
            try {
                let Item = getMongoPool('patent').LocarnoType;

                Item.find({}, function (err, item) {
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
     * 列表数据转换为tree数据
     * @param  {array} list     外观类型列表
     * @param  {object} node    root根节点
     * @return {array}          转换后的Tree
     */
    nodeAdapter(list, node){
        node.children = [];
        for(let i in list){
            let item = list[i];
            if(item.parentid===node.value){
                let n = {
                    "label": item.typeid + ' (' + item.description + ')',
                    "value":  item.typeid,
                    "key":  item.typeid,
                    "rebuilding": false
                };
                node.children.push(n);
                this.nodeAdapter(list, n);
            }
        }
    }
};
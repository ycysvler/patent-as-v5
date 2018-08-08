/**
 * redis 消息中心
 *
 * Created by zhanghongqing on 2018/7/2.
 */
const Redis = require('ioredis');
const config = require('../config/config');
/**
 * 获取log实例
 * @param  {string}     name    日志名称，同时用于日志文件名
 * @return {object}             日志对象
 */
class MessageCenter {
    constructor() {
        this.redis = new Redis(config.redis);
        this.sub = new Redis(config.redis);
        this.pub = new Redis(config.redis);

        this.sub.on('message', this.onMessage.bind(this));

        this.sub.subscribe('Log',
            'Feature:BuildFeature',
            'State:StateChange',
            'HeartBeat:TimeChange',
            'Search:ProgressChange',
            'Search:Complete',
            (err, count) => {
                console.log('redis subscribe > ', err, count);
            }
        );
    }

    getHeartBeats(){
        return this.instances;
    }

    onMessage(channel, message) {
       if(channel === "HeartBeat:TimeChange"){
           //console.log('onHeartBeat >',channel, message);
           
           message = JSON.parse(message);
           let instances = this.instances ? this.instances : {};
           let instance = instances[message.instanceid] ? instances[message.instanceid] : {};
           instance = {'package' : message.package, 'time' : message.time};
           instances[message.instanceid] = instance;
           this.instances = instances; 
 
           this.redis.set('instances', JSON.stringify(this.instances));

           //console.log('instances', this.instances);
       }else{
           console.log('onMessage >',channel, message);
       }
    }

    publish(type, message){
        this.pub.publish(type, JSON.stringify(message));
    }
}

const mscenter = new MessageCenter();
module.exports = mscenter;

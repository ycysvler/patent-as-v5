/**
 * 全局配置文件
 *
 * Created by zhanghongqing on 2018/6/29.
 */

module.exports = {
    // mongodb 相关配置
    mongodb: {
        uri: 'mongodb://patent.mongodb/',
        // options: {
        //     server: {socketOptions: {keepAlive: 1}},
        //     replset: {socketOptions: {keepAlive: 1}}
        // }
    },

    // mysql 相关配置
    mysql: {
        host: '10.10.220.104',
        port: 9306,
        user: 'admin',
        password: 'admin',
        database: 'URCS_EOS'
    },

    // redis 相关配置
    redis: {
        host: 'patent.redis',
        port: 6379,
        password:'123456'
    },

    // server 相关配置
    server:{
        port: 3000                          // 服务启动端口号
    },

    app:{
        entid:'ent_20170808220894'          // 目前先沿用entid这个设计，后期优化
    }
};

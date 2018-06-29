/**
 * 全局配置文件
 *
 * Created by zhanghongqing on 2018/6/29.
 */

module.exports = {
    // mongodb 相关配置
    mongodb: {
        uri: 'mongodb://10.10.22.205/',
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
        host: '127.0.0.1',
        port: 6379
    },

    // server 相关配置
    server:{
        port: 3000                          // 服务启动端口号
    }
};
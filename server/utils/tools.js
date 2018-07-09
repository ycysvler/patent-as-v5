/**
 * 一些常用的工具类
 *
 * Created by zhanghongqing on 2018/6/28.
 */

const logger = require('./logger');                             // 引用日志组建
const log = logger('app');                                      // 日志

class tools {
    /**
     * 检查必填参数
     * @param  {object} ctx     上下文
     * @param  {array} fields   需要的字段
     * @return {boolean}        是否全部满足
     */
    required(ctx, fields) {
        let ok = true, message = '';

        fields.forEach((item) => {                              // 循环判断field是否存在
            if ((ctx.request.body[item] === undefined) &&
                (ctx.request.query[item] === undefined) &&
                (ctx.params[item] === undefined)) {
                message += '[' + item + '] parameter is missing! ';
                ok = false;
            }
        });

        if (!ok) {
            ctx.status = 400;                                   // 设置状态吗
            ctx.body = {code: ctx.status, message: message};    // 设置消息体
            // 记录日志
            log.warn({'type': 'required', 'path': ctx.path, 'body': ctx.request.body}, message);
        }
        return ok;
    }

    /**
     * sleep
     * @param  {number} time  sleep时间
     */
    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}

module.exports = new tools();
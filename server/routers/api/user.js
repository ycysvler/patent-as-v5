/**
 * 用户操作
 *
 * Created by VLER on 2018/6/30.
 */
const User = require('../../logic/user');
const tools = require('../../utils/tools');

const userLogic = new User();

module.exports = function (router) {
    /**
     * 用户登录
     * @param  {string} username 用户名
     * @param  {string} password 密码
     * @return {object}          用户信息
     */
    router.post('/system/login', async(ctx) => {
        let ok = tools.required(ctx, ['username', 'password']);

        if (ok) {
            let item = await userLogic.login(ctx.request.body.username, ctx.request.body.password);
            console.log(item);
            ctx.body = item;
        }
    });
    /**
     * 添加用户
     * @param  {object} data     用户数据
     * @return {object}          用户信息
     */
    router.post('/system/users', async(ctx) => {
        let item = await userLogic.add(ctx.request.body);
        ctx.body = item;
    });
};
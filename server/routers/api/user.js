/**
 * 用户操作
 *
 * Created by VLER on 2018/6/30.
 */
const UserLogic = require('../../logic/user');
const tools = require('../../utils/tools');

const logic = new UserLogic();

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
            let item = await logic.login(ctx.request.body.username, ctx.request.body.password);
            ctx.body ={code:200, data:item} ;
        }
    });
    /**
     * 添加用户
     * @param  {object} data     用户数据
     * @return {object}          用户信息
     */
    router.post('/system/users', async(ctx) => {
        let item = await logic.add(ctx.request.body);
        ctx.body = item;
    });

    /**
     * 用户菜单
     * @query  {object} userid   用户ID
     * @return {object}          菜单信息
     */
    router.get('/system/menu', async(ctx) => {
        let ok = tools.required(ctx, ['userid']);
        if (ok) {
            let userid = ctx.request.query.userid;
            let item = await logic.single(ctx.request.query.userid);
            if (item === null) {
                ctx.body = {code: 404, message: 'user [' + userid + '] is missing!'};
            } else {
                ctx.body = {code: 200, data: item.menus};
            }
        }
    });

    router.get('/system/users', async(ctx) => {
        let ok = true;
        if (ok) { 
            let item = await logic.list();
            if (item === null) {
                ctx.body = {code: 404, message: 'users is null!'};
            } else {
                ctx.body = {code: 200, data: item};
            }
        }
    });
};

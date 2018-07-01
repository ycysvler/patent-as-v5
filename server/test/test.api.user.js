/**
 * 代码覆盖率单元测试
 * istanbul cover _mocha .
 *
 * cnpm install -g istanbul             // 覆盖率工具
 * cnpm install -g mocha                // 单元测试组建
 * cnpm install --save-dev supertest    // http 测试组建
 * cnpm install --save-dev chai         // 断言工具
 *
 * */

const supertest = require('supertest');
const chai = require('chai');
const assert = require('assert');
const config = require('../config/config');

const expect = chai.expect;

const request = supertest('http://localhost:' + config.server.port);



describe('# 系统接口', function () {
    describe('# 用户接口 - 用户登录', function () {

        it('> 正确验证 - 登录返回用户信息', (done)=> {
            request
                .post('/patent/api/system/login')
                .send({"username": "admin", "password": "admin"})
                .set('Accept', 'application/json')
                .expect(200)
                .end((err, res) => {
                    // 断言判断结果是否为object类型
                    expect(res.body).to.be.an('object');
                    expect(res.body.data).any.keys('userid', 'username', 'cname');
                    done();
                });
        });
        it('> 异常验证 - 缺少username参数', (done)=> {
            request
                .post('/patent/api/system/login')
                .send({"password": "admin"})
                .expect(400)
                .end((err, res) => {
                    // 断言判断结果是否为object类型
                    expect(res.body).to.be.an('object');
                    expect(res.body).any.keys('code','message');
                    done();
                });
        });
        it('> 异常验证 - 缺少password参数', (done)=> {
            request
                .post('/patent/api/system/login')
                .send({"username": "admin"})
                .expect(400)
                .end((err, res) => {
                    // 断言判断结果是否为object类型
                    expect(res.body).have.all.keys('code','message');
                    done();
                });
        });
    });

    describe('# 用户接口 - 系统菜单', function () {

        it('> 正确验证 - 返回用户菜单', (done)=> {
            request
                .get('/patent/api/system/menu?userid=4dd3562851d641b09f78e074d672a221')
                .expect(200)
                .end((err, res) => {
                    // 断言判断结果是否为object类型
                    expect(res.body).to.be.an('object');
                    expect(res.body.code).is.equal(200);
                    expect(res.body.data).length.above(4);
                    done();
                });
        });
        it('> 异常验证 - 缺少userid参数', (done)=> {
            request
                .get('/patent/api/system/menu')
                .expect(200)
                .end((err, res) => {
                    // 断言判断结果是否为object类型
                    expect(res.body).to.be.an('object');
                    expect(res.body.code).is.equal(400);
                    expect(res.body.message).equal('[userid] parameter is missing! ');
                    done();
                });
        });
    });
});
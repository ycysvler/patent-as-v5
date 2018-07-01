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



describe('# 业务接口', function () {


    describe('# 任务 - 任务列表', function () {

        it('> 正确验证 - 返回任务列表', (done)=> {
            request
                .get('/patent/api/locarno/job?userid=4dd3562851d641b09f78e074d672a221&jobtype=0&keyword=')
                .expect(200)
                .end((err, res) => {
                    // 断言判断结果是否为object类型
                    expect(res.body).to.be.an('object');
                    expect(res.body.code).is.equal(200);
                    expect(res.body.data).length.above(4);
                    done();
                });
        });
        it('> 异常验证 - 查询参数检查', (done)=> {
            request
                .get('/patent/api/locarno/job')
                .expect(400)
                .end((err, res) => {
                    // 断言判断结果是否为object类型
                    expect(res.body).to.be.an('object');
                    expect(res.body.code).is.equal(400);
                    expect(res.body.message).equal('[userid] parameter is missing! [jobtype] parameter is missing! ');
                    done();
                });
        });
    });
});
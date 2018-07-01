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
const config = require('../config/config');

const expect = chai.expect;

const request = supertest('http://localhost:' + config.server.port);

describe('# 系统接口', function () {
    describe('# 外观接口 - 外观类型列表', function () {

        it('> 正确验证 - 获取到外观类型列表', (done)=> {
            request
                .get('/patent/api/locarno/nodes')
                .expect(200)
                .end((err, res) => {
                    // 断言判断结果是否为object类型
                    expect(res.body).to.be.an('object');
                    expect(res.body.code).is.equal(200);
                    expect(res.body.data).length.above(10);
                    done();
                });
        });

    });
});
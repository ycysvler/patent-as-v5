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

describe('# 业务接口', function () {
    describe('# 图像 - 获取图像数据', function () {

        it('> 正确验证 - 获取到外观类型列表', (done)=> {
            request
                .get('/patent/api/images/data/a5c54ee0-260a-11e8-bfca-532943794545.jpg')
                .expect(200)
                .end((err, res) => {
                    // 断言判断结果是否为object类型
                    done();
                });
        });

    });
});
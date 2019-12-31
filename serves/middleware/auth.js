module.exports = options => {
    const assert = require('http-assert')//assert(params, statusCode, errMessage) 抛出异常
    const AdminUser = require('../models/AdminUser')
    const jwt = require('jsonwebtoken')
    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop();
        assert(token, 401, 'token不存在,请先登录')

        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '无效的jwt token,请先登录')

        req.user = AdminUser.findById(id)
        assert(req.user, 401, '请先登录')
        await next()
    }
}
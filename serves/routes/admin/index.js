module.exports = app => {

    // 通用CRUD接口
    const express = require('express')
    const assert = require('http-assert')//assert(params, statusCode, errMessage) 抛出异常
    const AdminUser = require('../../models/AdminUser')
    const jwt = require('jsonwebtoken')
    const router = express.Router({
        mergeParams: true
    })
    app.set('secret', 'qeq9ewe1u0euqweioqwew1ewe1u0euqwei');

    // 查询所有
    router.get('/', async (req, res) => {
        const queryOptions = {}
        console.log('model===>', req.Model.modelName)
        console.log('user===>', req.user)
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const datas = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(datas)
    })
    // 查询指定ID的信息
    router.get('/:id', async (req, res) => {
        const data = await req.Model.findById(req.params.id)
        res.send(data)
    })
    // 创建
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        assert(model, 422, '添加失败')

        res.status(200).send({
            message: '添加成功'
        })
    })
    // 更新
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        assert(model, 422, '修改失败')

        res.status(200).send({
            message: '修改成功'
        })
    })
    // 删除
    router.delete('/:id',async (req, res) => {
        await req.Model.findByIdAndRemove(req.params.id)
        res.status(200).send({
            message: '删除成功'
        })
    });
    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    // 资源中间件
    const resourceMiddleware = require('../../middleware/resource')

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    // 上传文件
    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})

    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file;
        file.url = `http://localhost:4000/uploads/${file.filename}`
        res.send(file)
    })

    // 登录接口
    app.post('/admin/api/login', async (req, res) => {
        const {username, password} =  req.body
        // 用户校验
        const user = await AdminUser.findOne({username}).select('+password')
        assert(user, 422, '用户不存在')
        // 密码校验
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')

        // 返回token
        
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, app.get('secret'))

        res.send({token})
    })
    // 通用处理异常报错函数中间件
    app.use(async(err, req, res, next) => {
        res.status(err.statusCode || 500).send(
            {
                message: err.message
            }
        )
    })









    /*const express = require('express')
    const router = express.Router()
    const jwt = require('jsonwebtoken')
    const Category = require('../../models/Category')
    app.use(express.json())
    
    // token生成
    // const token = jwt.sign()
    
    // 查询所有分类
    router.get('/categories', async (req, res) => {
        const datas = await Category.find().populate('parent').limit(10)
        res.send(datas)
    })
    // 查询指定ID的信息
    router.get('/categories/:id', async (req, res) => {
        const data = await Category.findById(req.params.id)
        res.send(data)
    })
    // 创建分类
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        if (!model) {
            return res.status(422).send({
                message: '添加失败'
            })
        }
        res.status(200).send({
            message: '添加成功'
        })
    })
    // 更新分类
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        if (!model) {
            return res.status(422).send({
                message: '修改失败'
            })
        }
        res.status(200).send({
            message: '修改成功'
        })
    })
    // 删除分类
    router.delete('/categories/:id',async (req, res) => {
        await Category.findByIdAndRemove(req.params.id)
        res.status(200).send({
            message: '删除成功'
        })
    });

    app.use('/admin/api', router)
    */
}
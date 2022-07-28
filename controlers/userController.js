const {User} = require('../models/models')
const ApiError = require('../error/ApiErrors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role,Phone,FIO) => {
    return jwt.sign(
        {id, email, role,Phone,FIO},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, FIO, Phone} = req.body
        if (!email || !password || !Phone) {
            return next(ApiError).badRequest('Якийсь із данних введений неправильно')
        }
        const candidateEmail = await User.findOne({where: {email}})
        if (candidateEmail) {
            return next(ApiError.badRequest('Користувач з данним email вже існує'))
        }
        const candidatePhone = await User.findOne({where: {Phone}})
        if (candidatePhone) {
            return next(ApiError.badRequest('Користувач з данним номером телефона вже існує'))
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = await User.create({email, Phone, role, FIO, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role, user.FIO, user.Phone)
        return res.json({token})


    }

    async login(req, res, next) {
const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if (!user) {
            return next(ApiError.internal('Користувача з таким email не існує'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal('Неправильний пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role, user.FIO, user.Phone)
   return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.FIO, req.user.Phone)
        return res.json({token})
    }
    async getAll(req,res ){
        const user = await  User.findAll()
        return res.json(user)
    }
}

module.exports = new UserController()
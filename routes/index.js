const Router = require('express')
const router = new Router()
const declarationRouter = require('./declarationRouter')
const cityRouter = require('./cityRouter')
const typeOrendRouter = require('./typeOrendRouter')
const userRouter = require('./userRouter')


router.use('/user', userRouter)
router.use('/city', cityRouter)
router.use('/typeOrend', typeOrendRouter)
router.use('/declaration', declarationRouter)

module.exports = router
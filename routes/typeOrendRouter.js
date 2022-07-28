const Router = require('express')
const router = new Router()
const typeOrendController = require('../controlers/typeOrendController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'),typeOrendController.create)
router.get('/',typeOrendController.getAll)




module.exports = router
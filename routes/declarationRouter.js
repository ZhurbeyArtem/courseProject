const Router = require('express')
const router = new Router()
const declarationController = require('../controlers/declarationController')

router.post('/',declarationController.create)
router.get('/',declarationController.getAll)
router.get('/:id',declarationController.getOne)
router.delete('/:id',declarationController.deletePost)


module.exports = router
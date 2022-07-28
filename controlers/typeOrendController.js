const {typeOrend} = require('../models/models')
const ApiError = require('../error/ApiErrors')


class typeOrendController {
    async create(req, res) {
        const {name} = req.body
        const type = await typeOrend.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await typeOrend.findAll()
        return res.json(types)
    }
}

module.exports = new typeOrendController()

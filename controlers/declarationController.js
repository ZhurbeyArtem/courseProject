const uuid = require('uuid')
const path = require('path');
const {Declarations, DeclarationInfo} = require('../models/models')
const ApiError = require('../error/ApiErrors');


class declarationController {
    async create(req, res, next) {
       try{
           let {title, price, description, typeOrendId, cityId, info,userId} = req.body
           const {image} = req.files
           let fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
           const declaration = await Declarations.create({title, price, description, typeOrendId, image:fileName, cityId, userId})

           if (info) {
               info = JSON.parse(info)
               info.forEach(i =>
                   DeclarationInfo.create({
                       title: i.title,
                       description: i.description,
                     declarationId: declaration.id
                   })
               )
           }

           return res.json(declaration)
       }catch (e){
       next(ApiError.badRequest(e.message))
       }
    }

    async getAll(req, res) {
let {cityId,typeOrendId, limit , page} = req.query
        page = page  || 1
        limit = limit || 9
        let offset = page * limit - limit // отступ
        let declarations;
            if(!cityId && !typeOrendId){
                declarations = await Declarations.findAndCountAll({limit, offset})
            }
            if(cityId && !typeOrendId){
                declarations = await Declarations.findAndCountAll({where:{cityId} , limit, offset})
            }
            if(!cityId && typeOrendId){
                declarations = await Declarations.findAndCountAll({where:{typeOrendId}, limit, offset})
            }
            if(cityId && typeOrendId){
                declarations = await Declarations.findAndCountAll({where:{cityId, typeOrendId}, limit, offset})
            }
            return res.json(declarations)
    }

    async getOne(req, res) {
const {id} = req.params
        const declaration = await Declarations.findOne({
            where:{id},
            include: [{model: DeclarationInfo, as: 'info'}]
        })
        return res.json(declaration)
    }

    async deletePost(req, res){
        try{
            const declaration = await Declarations.destroy({where:{id:req.params.id}})
            if (!declaration){
                res.status(404).json('Немає такого поста')
            }
            return res.json('Успішне видалення')}
            catch (e){
            res.json('помилка')
            }

    }
}


module.exports = new declarationController()
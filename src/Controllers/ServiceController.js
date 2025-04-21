const { randomUUID } = require('crypto')
const { Op } = require('sequelize')
// const { GeneranteCodeUnique } = require('../utils/GeneranteCodeUnique')
const Service = require('../database/models/Service')

class ServiceController {
    async create (req,res){
        const service = req.body
        const id = randomUUID()
        const pre_service = await Service.build({...service, id})
        try {
            await pre_service.validate()
            pre_service.save()
            return res.status(200).json({ msg: 'Serviço criado com sucesso' })
        } catch {
            return res.status(400).json({ msg: 'Erro ao criar servico' })
        }

    }
    async index (req,res){
        try{
            const list_services = await Service.findAll({
                attributes:['id','service']
            })
            return res.json(list_services)
        }catch{
            return res.status(400).json({ msg: 'Erro ao Buscar Servicos' })
        }     
    }
    async delete (req,res){
        const { id } = req.params

        try{

            await Service.destroy({
                where: {
                    id: id,
                },
            });

            return res.status(200).json({ msg: 'Registro deletado com sucesso' })

        }catch{
            return res.status(400).json({ msg: 'Erro ao deletar o registro' })

        }
    }
}

module.exports = { ServiceController }

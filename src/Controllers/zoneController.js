const { randomUUID } = require('crypto')
const { Op } = require('sequelize')
const Zone = require('../database/models/Zone')
const { GeneranteCodeUnique } = require('../utils/GeneranteCodeUnique')


class ZoneController {

    async create(req,res){
        const zone = req.body

        const id = randomUUID()

        const uid = new GeneranteCodeUnique(id,'zone')
        
        const pre_zone = {
            ...zone,
            uid:uid.toGenerate(),
            id
        }

        try {
            const build_zone = await Zone.build(pre_zone)
            build_zone.save()
            return res.status(200).json(build_zone)
        }catch{

            return res.status(404).json({msg:'error para salvar area'})

        }
        
    }
    async index (req,res){
     
        try{
            const zones = await Zone.findAll({
                attributes:['id','zone','type','uid']
            })
            
            return res.status(200).json(zones)
        } catch{
            return res.status(400).json({error:'Error em buscar áreas'})
        }
        
    }
    async show(req,res){
        const {zone,type} = req.query
        
        let fillter = {};

        if(zone == '' && type != ''){
            fillter = {
                type:type
            }
        }else if (zone != '' && type == '') {
            fillter = {
                [Op.or]: [{
                    zone: zone
                }, {
                    uid: zone
                },
            ]}
        }else {
            fillter = {
            }
        }
        try{
            const zones = await Zone.findAll({
                where: fillter,
                attributes:['id','zone','type','uid']
            })
            return res.json(zones)

        }catch {
            return res.status(400).json({error:'Error em buscar áreas'})
        }
     
    }
    async delete (req,res){
        const { id } = req.params

        try{

            await Zone.destroy({
                where: {
                    id: id,
                },
            });

            return res.status(200).json({ msg: 'Registro deletado com sucesso' })

        }catch{
            return res.status(400).json({ msg: 'Erro ao deletar o registro' })

        }
        
        

    }
    async update(req,res){
        const {id,zone,type} = req.body
        
        try{
            await Zone.update(
                { 
                    zone:zone , 
                    type:type
                },
                {
                    where: {
                        id: id,
                    },
                },
            );
    
            return res.status(200).json({msg:"Atualizado com sucesso"})  

        }catch{
            return res.status(200).json({msg:"Error ao atualizar o registro"})  

        }
    }
}


module.exports = {ZoneController}

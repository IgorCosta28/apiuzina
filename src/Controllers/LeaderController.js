const { randomUUID } = require('crypto')
const { Op } = require('sequelize')
const { GeneranteCodeUnique } = require('../utils/GeneranteCodeUnique')

const { LeaderContactOne, LeaderContactTwo } = require('../database/models/LeaderContactOneAndTwo')
const Leader = require('../database/models/Leader')
const Zone = require('../database/models/Zone')
const LeaderAddress = require('../database/models/LeaderAddress')

class LeaderController {
    async create(req, res) {

        const { name, cpf, email, birth, leaders_address, leaders_contact_one, leaders_contact_two } = req.body

        const id = randomUUID()

        const uid = new GeneranteCodeUnique(id, 'leader')

        const pre_leader = {
            name,
            cpf,
            email,
            birth,
            id,
            uid: uid.toGenerate()
        }

        const build_leader = await Leader.build(pre_leader)
        const build_leader_address = await LeaderAddress.build({ ...leaders_address, leader_id: id })
        const build_leader_contact_one = await LeaderContactOne.build({ ...leaders_contact_one, leader_id: id })
        const build_leader_contact_two = await LeaderContactTwo.build({ ...leaders_contact_two, leader_id: id })

        try {

            await build_leader.validate()
            await build_leader_address.validate()
            await build_leader_contact_one.validate()
            await build_leader_contact_two.validate()

            build_leader.save()
            build_leader_address.save()
            build_leader_contact_one.save()
            build_leader_contact_two.save()

            return res.status(200).json({ msg: 'lider criado com sucesso' })

        } catch {
            return res.status(404).json({ msg: 'Error para salvar lider' })

        }

    }

    async index(req, res) {
        try {
            let list_leaders = await Leader.findAll({
                attributes: ['name', 'uid', 'cpf', 'email', 'id', 'birth'],
                include: [
                {
                    model: LeaderAddress,
                    attributes: ['street', 'home', 'quatrain', 'district', 'city']
                },
                {
                    model: LeaderContactOne,
                    attributes: ['phone', 'mode'],

                },
                {
                    model: LeaderContactTwo,
                    attributes: ['phone', 'mode'],

                }]
            })
            return res.json(list_leaders)
        } catch {
            return res.status(404).json({ msg: 'Nao foi possivel buscar os dados' })
        }




    }

    async show(req, res) {
        
        let fillter = {}

        const {input } = req.query

        if ( input != ""){
            fillter = {
                [Op.or]: 
                    [{
                        name: input
                    },
                    {
                        uid:input
                    } ,
                    {
                        cpf: input
                    }
                ]
            }
        }else {
            fillter = {}
        }
        

        const list_leaders = await Leader.findAll({
            where:fillter,
            attributes: ['name', 'uid', 'email', 'id', 'birth'],
            include: [
            {
                model: LeaderAddress,
                attributes: ['street', 'home', 'quatrain', 'district', 'city']
            },
            {
                model: LeaderContactOne,
                attributes: ['phone', 'mode'],

            },
            {
                model: LeaderContactTwo,
                attributes: ['phone', 'mode'],

            }]
        })

        return res.json(list_leaders)
    }

    async delete(req, res) {

        const { id } = req.params

        await Leader.destroy({
            where: {
                id: id,
            },
        });
        try{


            return res.status(200).json({ msg: 'Registro deletado com sucesso' })

        }catch{
            return res.status(400).json({ msg: 'Erro ao deletar o registro' })

        }

    }

    async update(req, res) {

        const { name, id, email, cpf , birth, leaders_address, leaders_contact_one, leaders_contact_two } = req.body
        
        try{

            await Leader.update(
                {   name: name , 
                    email:email,
                    cpf:cpf,
                    birth:birth,
                },
                {
                  where: {
                    id: id
                  },
                },
             );
            
    
            await LeaderAddress.update(
                leaders_address,
                {
                    where:{
                        leader_id:id
                    }
                }
            )
    
            await LeaderContactOne.update(
                leaders_contact_one,
                {
                    where:{
                        leader_id:id
                    }
                }
            )
    
            await LeaderContactTwo.update(
                leaders_contact_two,
                {
                    where:{
                        leader_id:id
                    }
                }
            )

            return res.status(200).json({ msg: 'Registro atualizado com sucesso' })

        } catch {
            return res.status(400).json({ msg: 'Erro ao atualizar o registro' })
        }
    }
}

module.exports = { LeaderController }
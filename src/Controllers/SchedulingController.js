const { randomUUID } = require('crypto')
const { Op, Model } = require('sequelize')
const { GeneranteCodeUnique } = require('../utils/GeneranteCodeUnique');

const Scheduling = require('../database/models/Scheduling');
const Citizen = require('../database/models/Citizen');
const Leader = require('../database/models/Leader');
const CitizenAddress = require('../database/models/CitizenAddress');
const Service = require('../database/models/Service');
const { log } = require('console');
const { CitizenContactOne, CitizenContactTwo } = require('../database/models/CitizenContactOneAndTwo');

class SchedulingController {
    async create(req, res) {
        const { service_id, date, leader_id, citizen_id, registry_id, presence } = req.body
        

        const service = await Service.findByPk(service_id)

        const id = randomUUID()

        const pre_scheduling_ = {
            id,
            date,
            leader_id,
            citizen_id,
            presence,
            service: service.dataValues.service
        }


        const pre_scheduling = await Scheduling.build(pre_scheduling_)

        try {
            await pre_scheduling.validate()
            pre_scheduling.save()
            return res.status(200).json({ msg: 'Agendamento criado com sucesso' })
        } catch {
            return res.status(404).json({ msg: 'Error para salvar agendamento' })
        }

    }

    async index(req, res) {

        const list_date = await Scheduling.findAll({
            attributes: ['date']
        })

        return res.status(200).json(list_date)


    }
    async show(req, res) {

        const { date } = req.query

        const list_date = await Scheduling.findAll({
            where: {
                date: date
            },
            attributes: ['id', 'date', 'service', 'presence'],
            include: [
                {
                    model: Citizen,
                    attributes: ['name', 'birth', 'cpf'],
                    include: [
                        //{
                        //     model:CitizenAddress,
                        //     attributes:['district']
                        // },
                        {
                            model: CitizenContactOne,
                            attributes: ['phone', 'mode']
                        },
                        {
                            model: CitizenContactTwo,
                            attributes: ['phone', 'mode']
                        }]
                },
                {
                    model: Leader,
                    attributes: ['name']
                }

            ]
        })

        return res.status(200).json(list_date)


    }
    async update(req, res) {
        const { id } = req.params

        try {
            await Scheduling.update(

                {
                    presence: true
                },

                {
                    where: {
                        id: id
                    }
                }
            )

            return res.status(200).json({ msg: 'Registro atualizado com sucesso' })

        } catch {
            return res.status(400).json({ msg: 'Erro ao atualizar o registro' })
        }
    }
    async delete(req, res) {
        const { id } = req.params

        try{

            await Scheduling.destroy({
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

module.exports = { SchedulingController }

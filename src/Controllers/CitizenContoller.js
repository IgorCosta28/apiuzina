const { randomUUID } = require('crypto')
const { Op } = require('sequelize')

const { GeneranteCodeUnique } = require('../utils/GeneranteCodeUnique')

const Citizen = require('../database/models/Citizen')
const CitizenAddress = require('../database/models/CitizenAddress')
const { CitizenContactOne, CitizenContactTwo } = require('../database/models/CitizenContactOneAndTwo')

// const Lider = require('../database/models/liders')
// const Cidadao = require('../database/models/Cidadao')
// const Endereco_Cidadao = require('../database/models/Endereco_Cidadao')
// const { Telefone_Cidadao_1, Telefone_Cidadao_2 } = require('../database/models/Telefone_Cidadao')
// const Area = require('../database/models/Area')


class CitizenController{
    async create(req,res){
        const { name,cpf, rg,birth, citizens_address, citizens_contact_one, citizens_contact_two } = req.body
        
        const id = randomUUID()

        const pre_citizen = {
            name,
            cpf, 
            rg,
            birth,
            id
        }

        const build_citizen = await Citizen.build(pre_citizen)
        const build_citizen_address = await CitizenAddress.build({ ...citizens_address, citizen_id: id })
        const build_citizen_contact_one = await CitizenContactOne.build({ ...citizens_contact_one, citizen_id: id })
        const build_citizen_contact_two = await CitizenContactTwo.build({ ...citizens_contact_two, citizen_id: id })

        try {

            await build_citizen.validate()
            await build_citizen_address.validate()
            await build_citizen_contact_one.validate()
            await build_citizen_contact_two.validate()

            build_citizen.save()
            build_citizen_address.save()
            build_citizen_contact_one.save()
            build_citizen_contact_two.save()

            return res.status(200).json({ msg: 'Cidadão criado com sucesso' })

        } catch {
            return res.status(404).json({ msg: 'Error para salvar Cidadão' })

        }
    }
    async index(req, res){
        try {
            let list_citizen = await Citizen.findAll({
                attributes: ['name', 'rg', 'cpf', 'id', 'birth'],
                include: [
                {
                    model: CitizenAddress,
                    attributes: ['street', 'home', 'quatrain','district', 'city']
                },
                {
                    model: CitizenContactOne,
                    attributes: ['phone', 'mode'],

                },
                {
                    model: CitizenContactTwo,
                    attributes: ['phone', 'mode'],

                }]
            })
            return res.json(list_citizen)
        } catch {
            return res.status(404).json({ msg: 'Nao foi possivel buscar os dados' })
        }
      
    }
    async show(req, res){

        let fillter = {}

        const {input } = req.query

        if ( input != ""){
            fillter = {
                [Op.or]: 
                    [{
                        name: {[Op.like]:`%${input}%`}
                    },
                    {
                        rg:input
                    } ,
                    {
                        cpf: input
                    }
                ]
            }
        }else {
            fillter = {}
        }
        

        let list_citizen = await Citizen.findAll({
            where:fillter,
            attributes: ['name', 'rg', 'cpf', 'id', 'birth'],
            include: [
            {
                model: CitizenAddress,
                attributes: ['street', 'home', 'quatrain','district', 'city']
            },
            {
                model: CitizenContactOne,
                attributes: ['phone', 'mode'],

            },
            {
                model: CitizenContactTwo,
                attributes: ['phone', 'mode'],

            }]
        })


        return res.json(list_citizen)

        
    }

    async update(req, res){

        const {id, name,cpf, rg,birth, citizens_address, citizens_contact_one, citizens_contact_two } = req.body


        try{

            await Citizen.update(
                {   name: name, 
                    rg:rg,
                    cpf:cpf,
                    birth:birth,
                },
                {
                  where: {
                    id: id
                  },
                },
             );
            
    
            await CitizenAddress.update(
                citizens_address,
                {
                    where:{
                        leader_id:id
                    }
                }
            )
    
            await CitizenContactOne.update(
                citizens_contact_one,
                {
                    where:{
                        leader_id:id
                    }
                }
            )
    
            await CitizenContactTwo.update(
                citizens_contact_two,
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

    async delete(req, res){
        const { id } = req.params

        try{

            await Citizen.destroy({
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

// const CidadaoController = {
//     Edite: async (req,res) => {
//         const { id, nome, codigo_lider, codigo_area, nascimento, cidadao_endereco, cidadao_telefones_1, cidadao_telefones_2 } = req.body
//         let prop_cidadao;
        
//         const {lougradoro, casa, quadra,bairro,cidade} = cidadao_endereco

//         if(codigo_lider != ''){
//             const [lider] = await Lider.findAll({
//                 attributes:['id','codigo_area','id_area'],
//                 where:{
//                     codigo:codigo_lider
//                 }
//             })

//             prop_cidadao = {
//                 codigo_area:lider.codigo_area,
//                 codigo_lider:codigo_lider,
//                 id_area:lider.id_area,
//                 id_lider:lider.id
//             }
//         }else {
//             prop_cidadao = {
//                 codigo_area:'',
//                 codigo_lider:'',
//                 id_area:null,
//                 id_lider:null
//             }
//         }

//         await Endereco_Cidadao.update(
//             {lougradoro:lougradoro, casa:casa, quadra:quadra,bairro:bairro, cidade:cidade},
//             {
//                 where:{
//                     id_cidadao:id
//                 }
//             }
//         )

//         await Telefone_Cidadao_1.update(
//             {
//                 numero:cidadao_telefones_1.numero,
//                 modo:cidadao_telefones_1.modo
//             },
//             {
//                 where:{
//                     id_cidadao:id
//                 }
//             }
//         )

//         await Telefone_Cidadao_2.update(
//             {
//                 numero:cidadao_telefones_2.numero,
//                 modo:cidadao_telefones_2.modo
//             },
//             {
//                 where:{
//                     id_cidadao:id
//                 }
//             }
//         )

//         await Cidadao.update({
//             nome:nome,
//             nascimento:nascimento,
//             ...prop_cidadao
//         },{
//             where:{
//                 id:id
//             }
//         })

//         return res.status(200).json({msg:'ok'})            


        
//      },
//     Create: async (req, res) => {
//         const { nome, codigo_lider, codigo_area, nascimento, cidadao_endereco, cidadao_telefones_1, cidadao_telefones_2 } = req.body
//         let liderBody;
    

//         if (codigo_lider != '') {
//             const [lider] = await Lider.findAll({

//                 where: {
//                     codigo: codigo_lider
//                 }
//             })

//             liderBody = {
//                 codigo_lider: codigo_lider,
//                 id_lider: lider.dataValues.id,
//                 id_area: lider.dataValues.id_area,
//                 codigo_area: lider.dataValues.codigo_area,
//             }

//         } else {
//             liderBody = {
//                 codigo_lider: '',
//                 id_lider: null,
//                 id_area: null,
//                 codigo_area: '',
//             }
//         }

//         const listCidadao = await Cidadao.findAll()

//         const cidadao_object = {
//             nome: nome,
//             nascimento: nascimento,
//             id: randomUUID(),
//             codigo: `C${listCidadao.length + 1}`,
//             ...liderBody
//         }

//         const pre_data_cidadao = Cidadao.build(cidadao_object)
//         const pre_data_endereco = Endereco_Cidadao.build({ ...cidadao_endereco, id_cidadao: cidadao_object.id })
//         const pre_data_telefone_1 = Telefone_Cidadao_1.build({ ...cidadao_telefones_1, id_cidadao: cidadao_object.id })
//         const pre_data_telefone_2 = Telefone_Cidadao_2.build({ ...cidadao_telefones_2, id_cidadao: cidadao_object.id })

//         try {
//             await pre_data_cidadao.validate()
//             await pre_data_endereco.validate()
//             await pre_data_telefone_1.validate()
//             await pre_data_telefone_2.validate()


//             pre_data_cidadao.save()
//             pre_data_endereco.save()
//             pre_data_telefone_1.save()
//             pre_data_telefone_2.save()

//             return res.status(200).json({ msg: 'registro salvo' })
//         } catch {
//             return res.status(404).json({ error: 'Error ao salvar os Dados' })
//         }

//     },
//     List: async (req, res) => {
//         const { fill } = req.params
//         let listcidadao;

//         if (!(Object.entries(req.query).length == 0)) {

//         } else {
//             if (fill === 'all') {
//                 listcidadao = await Cidadao.findAll({
//                     attributes: ['nome', 'codigo', 'codigo_lider', 'codigo_area','id', 'nascimento'],
//                     include: [
//                         {
//                             model: Endereco_Cidadao,
//                             attributes: ['lougradoro', 'casa', 'quadra', 'bairro', 'cidade']

//                         },
//                         {
//                             model: Telefone_Cidadao_1,
//                             attributes: ['numero', 'modo']
//                         },
//                         {
//                             model: Telefone_Cidadao_2,
//                             attributes: ['numero', 'modo']

//                         },
//                         {
//                             model: Lider,
//                             attributes: ['nome', 'codigo', 'id']
//                         }, {
//                             model: Area,
//                             attributes: ['area', 'tipo', 'codigo', 'id']
//                         }
//                     ]
//                 })
//             } else {

//                 listcidadao = await Lider.findAll({
//                     where: {
//                         codigo:fill
//                     },
//                     include:{
//                         model: Cidadao,
//                         include:[{
//                             model:Endereco_Cidadao,
//                             attributes: ['lougradoro', 'casa', 'quadra', 'bairro', 'cidade']

//                         },{
//                             model:Telefone_Cidadao_1,
//                             attributes: ['numero', 'modo']

//                         },{
//                             model:Telefone_Cidadao_2,
//                             attributes: ['numero', 'modo']

//                         },{
//                             model:Area
//                         }]
//                     }
//                 })

//             }
//         }

//         return res.status(200).json(listcidadao)
//     },
//     Delete: async (req,res) => {

//         const { id } = req.params
        
//         await Cidadao.destroy({
//             where: {
//                 id: id,
//             },
//         });

//         return res.status(200).json({ msg: 'deletado' })
//     }
// }

module.exports = { CitizenController }
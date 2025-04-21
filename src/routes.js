
const express = require('express')
const { AreaController } = require('./Controllers/AreaController.js')
const { LiderController } = require('./Controllers/LiderController.js')
const { CidadaoController } = require('./Controllers/CitizenContoller.js')

const routes = express.Router()

routes.get('/',(req,res)=>{
    return res.json({msg:'Hello'})
})

//rotas do cidadao
routes.get('/cidadao/:fill', CidadaoController.List)
routes.get('/cidadao', CidadaoController.List)
routes.post('/cidadao/create', CidadaoController.Create)
routes.post('/cidadao/update', CidadaoController.Edite)
routes.delete('/cidadao/:id', CidadaoController.Delete)


module.exports = routes


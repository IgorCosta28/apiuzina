const { Router } = require("express")
const { ServiceController } = require("../Controllers/ServiceController")

const serviceRoutes = Router()

const service = new ServiceController()

serviceRoutes.get('/', service.index)
serviceRoutes.post('/create', service.create)
serviceRoutes.delete('/:id', service.delete)

module.exports = { serviceRoutes }
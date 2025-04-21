const { Router } = require("express")
const { CitizenController } = require("../Controllers/CitizenContoller")

const citizenRoutes = Router()

const citizen = new CitizenController()

citizenRoutes.get('/show', citizen.show)
citizenRoutes.get('/', citizen.index)
citizenRoutes.post('/create', citizen.create)
citizenRoutes.post('/update', citizen.update)
citizenRoutes.delete('/:id', citizen.delete)

module.exports = { citizenRoutes}
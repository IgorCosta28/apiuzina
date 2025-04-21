const { Router } = require("express")
const { SchedulingController } = require("../Controllers/SchedulingController")

const schedulingRoutes = Router()

const scheduling = new SchedulingController()

schedulingRoutes.get('/show', scheduling.show)
schedulingRoutes.get('/', scheduling.index)
schedulingRoutes.post('/create', scheduling.create)
schedulingRoutes.post('/update/:id', scheduling.update)
schedulingRoutes.delete('/:id', scheduling.delete)

module.exports = { schedulingRoutes}
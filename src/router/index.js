const { Router } = require('express')
const { leaderRoutes } = require('./leader.routes')
const { citizenRoutes } = require('./citizen.routes')
const { schedulingRoutes } = require('./scheduling.routes')
const { serviceRoutes } = require('./service.routes')

const router = Router()

router.use('/leader',leaderRoutes)
router.use('/citizen',citizenRoutes)
router.use('/scheduling',schedulingRoutes)
router.use('/service',serviceRoutes)

module.exports = {router}
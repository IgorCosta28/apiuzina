const {Router} = require('express')
const { ZoneController } = require('../Controllers/zoneController')
const zoneRoutes = Router()

const zones = new ZoneController()

zoneRoutes.get('/',zones.index)
zoneRoutes.get('/show',zones.show)
zoneRoutes.post('/create',zones.create)
zoneRoutes.post('/update', zones.update)
zoneRoutes.delete('/:id',zones.delete)

module.exports = {zoneRoutes}
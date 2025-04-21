const { Router } = require("express")
const { LeaderController } = require("../Controllers/LeaderController")

const leaderRoutes = Router()

const leader = new LeaderController()

leaderRoutes.get('/show/:zone', leader.show)
leaderRoutes.get('/', leader.index)
leaderRoutes.post('/create', leader.create)
leaderRoutes.post('/update', leader.update)
leaderRoutes.delete('/:id', leader.delete)

module.exports = { leaderRoutes}
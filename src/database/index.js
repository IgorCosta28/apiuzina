const { Sequelize } = require("sequelize");
const connectdb = require('../config/connect.js')

const Connect = new Sequelize(connectdb)

module.exports = Connect
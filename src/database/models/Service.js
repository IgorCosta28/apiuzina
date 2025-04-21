const { DataTypes } = require("sequelize");
const Connect = require("..");

const Service = Connect.define('services', {
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
    },
    service:{
        type:DataTypes.STRING,
        allowNull:false
    }
})



module.exports = Service
const { DataTypes } = require("sequelize");
const Connect = require("..");

const Scheduling = Connect.define('schedulings', {
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
    },
    date:{
        type:DataTypes.STRING,
        allowNull:false
    },
    service:{
        type:DataTypes.STRING,
        allowNull:false
    },
    presence:{
        type:DataTypes.BOOLEAN
    }
})

module.exports = Scheduling
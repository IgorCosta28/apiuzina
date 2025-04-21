const { DataTypes } = require("sequelize");
const Connect = require("..");

const Zone = Connect.define('zones', {
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
    },
    zone:{
       type:DataTypes.STRING,
       allowNull:false
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    uid:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = Zone
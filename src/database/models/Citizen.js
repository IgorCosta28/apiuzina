const { DataTypes } = require("sequelize");
const Connect = require("..");

const { CitizenContactOne,CitizenContactTwo } = require("./CitizenContactOneAndTwo");
const CitizenAddress = require("./CitizenAddress");
const { isVoidValue } = require("../../utils/functions");

const Scheduling = require("./Scheduling");

const Citizen = Connect.define('citizens', {
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
    },
    name:{
       type:DataTypes.STRING,
       allowNull:false,
    },

    cpf:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    rg:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    birth:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

Citizen.hasMany(Scheduling,{
    foreignKey:'citizen_id'
})
Scheduling.belongsTo(Citizen)

Citizen.hasOne(CitizenAddress,{
    foreignKey:'citizen_id'
})

Citizen.hasOne(CitizenContactOne,{
    foreignKey:'citizen_id'
})

Citizen.hasOne(CitizenContactTwo,{
    foreignKey:'citizen_id'
})

module.exports = Citizen
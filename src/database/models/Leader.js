const { DataTypes } = require("sequelize");
const Connect = require("..");
const LeaderAddress = require("./LeaderAddress");
const {LeaderContactOne, LeaderContactTwo} = require("./LeaderContactOneAndTwo");
const Scheduling = require("./Scheduling");

const Leader = Connect.define('leaders', {
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
    },
    cpf:{
        type:DataTypes.STRING,
       allowNull:false
    },
    name:{
       type:DataTypes.STRING,
       allowNull:false
    },
    birth:{
        type:DataTypes.STRING
    },
    uid:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

Leader.hasMany(Scheduling,{
    foreignKey:'leader_id'
})
Scheduling.belongsTo(Leader)

Leader.hasOne(LeaderAddress,{
    foreignKey:'leader_id'
})

Leader.hasOne(LeaderContactOne,{
    constraints:true,
    foreignKey:'leader_id'
})

Leader.hasOne(LeaderContactTwo,{
    constraints:true,
    foreignKey:'leader_id'
})

module.exports = Leader
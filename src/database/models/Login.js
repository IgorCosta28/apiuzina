const { DataTypes } = require("sequelize");
const Connect = require("..");

const Login = Connect.define('logins', {
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
    },
    cpf:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

Login.hasMany(Scheduling,{
    foreignKey:'registry_id'
})
Scheduling.belongsTo(Login)

module.exports = Login
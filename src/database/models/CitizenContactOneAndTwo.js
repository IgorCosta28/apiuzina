const { DataTypes } = require("sequelize");
const Connect = require("..");

const CitizenContactOne = Connect.define('citizens_contact_ones', {
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mode: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const CitizenContactTwo = Connect.define('citizens_contact_twos', {
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mode: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = { CitizenContactOne, CitizenContactTwo }
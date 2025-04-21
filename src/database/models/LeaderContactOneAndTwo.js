const { DataTypes } = require("sequelize");
const Connect = require("..");

const LeaderContactOne = Connect.define('leaders_contact_ones', {
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mode: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
const LeaderContactTwo = Connect.define('leaders_contact_twos', {
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mode: {
    type: DataTypes.STRING,
    allowNull: false
  }
})


module.exports = { LeaderContactOne, LeaderContactTwo }
const { DataTypes } = require("sequelize");
const Connect = require("..");
const { isVoidValue } = require("../../utils/functions");

const LeaderAddress = Connect.define('leaders_addresses', {
  street: {
    type: DataTypes.STRING,
    allowNull: null,
    validate: {
      is(value) {
        isVoidValue(value)
      }
    }
  },
  home: {
    type: DataTypes.STRING,
    allowNull: null,
    validate: {
      is(value) {
        isVoidValue(value)
      }
    }
  },
  quatrain: {
    type: DataTypes.STRING,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is(value) {
        isVoidValue(value)
      }
    }
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is(value) {
        isVoidValue(value)
      }
    }
  }
})

module.exports = LeaderAddress
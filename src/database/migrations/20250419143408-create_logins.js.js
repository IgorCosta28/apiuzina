'use strict';

const { QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('logins',{
      id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:Sequelize.STRING
      },
      cpf:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      password:{
        allowNull:false,
        type:Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('logins')
  }
};

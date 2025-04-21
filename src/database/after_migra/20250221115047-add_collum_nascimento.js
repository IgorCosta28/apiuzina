'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('lideres','nascimento',{
      type:Sequelize.STRING,
      allowNull:false
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('lideres','nascimento')
  
  }
};

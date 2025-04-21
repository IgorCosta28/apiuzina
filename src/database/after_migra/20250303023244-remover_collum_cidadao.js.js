'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.removeColumn('cidadoes','email')
  },

  async down (queryInterface, Sequelize) {
    // return queryInterface.addColumn('cidadoes','email',{
    //     type: Sequelize.STRING,
    //     allowNull:false
    // })
  },
};

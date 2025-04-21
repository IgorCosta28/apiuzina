'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('zones',{
      id:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false,
      },
      zone:{
        type:Sequelize.STRING,
        allowNull:false
      },
      type:{
        type:Sequelize.STRING,
        allowNull:false
      },
      uid: {
        type:Sequelize.STRING,
        allowNull:false
      },
      created_at:{
        type:Sequelize.DATE,
        allowNull:false
      },
      updated_at:{
        type:Sequelize.DATE,
        allowNull:false
      }
     })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('zones')
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('cidadao_telefones_2s',{
      id:{
        autoIncrement: true,
        primaryKey:true,
        type:Sequelize.INTEGER,
        allowNull:false
      },
      numero:{
        type:Sequelize.STRING,
        allowNull:false
      },
      modo:{
        type:Sequelize.STRING,
        allowNull:false
      },
      id_cidadao:{
        type:Sequelize.STRING,
        allowNull:false,
        references:{
          model:'cidadoes',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
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
    await queryInterface.dropTable('cidadao_telefones_2s');
  }
};

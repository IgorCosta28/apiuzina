'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('cidadoes',{
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      id_lider:{
        type:Sequelize.STRING,
        references:{
          model:'lideres',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'
      },
      nascimento:{
        type:Sequelize.STRING,
        allowNull:false
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      codigo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      codigo_lider: {
        allowNull: false,
        type: Sequelize.STRING
      },
      codigo_area: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_area: {
        type:Sequelize.STRING,
        references:{
          model:'zones',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false
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
    await queryInterface.dropTable('cidadoes');
  }
};

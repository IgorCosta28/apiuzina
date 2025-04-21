'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('cidadao_enderecos',{
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
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
      lougradoro:{
        type:Sequelize.STRING,
        allowNull:false
      },
      casa:{
        type:Sequelize.STRING,
        defaultValue:'S/N'
      },
      quadra:{
        type: Sequelize.STRING,
        defaultValue:'S/Q'
      },
      bairro:{
        type:Sequelize.STRING,
        allowNull:false
      },
      cidade:{
        type:Sequelize.STRING,
        allowNull:false,
        defaultValue:'Marituba'
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
    await queryInterface.dropTable('cidadao_enderecos');
  }
};

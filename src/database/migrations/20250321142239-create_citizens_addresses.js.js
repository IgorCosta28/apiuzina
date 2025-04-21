'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('citizens_addresses',{
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
      }, 
      citizen_id:{
        type:Sequelize.STRING,
        allowNull:false,
        references:{
          model:'citizens',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },   
      street:{
        type:Sequelize.STRING,
        allowNull:false
      },
      home:{
        type:Sequelize.STRING,
      },
      quatrain:{
        type: Sequelize.STRING,
      },
      district:{
        type:Sequelize.STRING,
        allowNull:false
      },
      city:{
        type:Sequelize.STRING,
        allowNull:false,
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
    await queryInterface.dropTable('citizens_addresses')
  }
};

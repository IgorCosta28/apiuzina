'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('leaders_addresses',{
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
      }, 
      leader_id:{
        type:Sequelize.STRING,
        allowNull:false,
        references:{
          model:'leaders',
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
    return queryInterface.dropTable('leaders_addresses')
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('leaders_contact_ones',{
      id:{
        autoIncrement: true,
        primaryKey:true,
        type:Sequelize.INTEGER,
        allowNull:false
      },
      phone:{
        type:Sequelize.STRING,
        allowNull:false
      },
      mode:{
        type:Sequelize.STRING,
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
    return queryInterface.dropTable('leaders_contact_ones')
    
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('schedulings',{
      id:{
        allowNull:false,
        primaryKey:true,
        type:Sequelize.STRING
      },
      date:{
        allowNull:false,
        type:Sequelize.STRING
      },
      presence:{
        type:Sequelize.BOOLEAN
      },
      service:{
        allowNull:false,
        type:Sequelize.STRING
      },
      leader_id:{
        type:Sequelize.STRING,
        allowNull:false,
        references:{
          model:'leaders',
          key:'id'
        },
        //onUpdate:'CASCADE',
        // onDelete:'CASCADE'
      },
      citizen_id:{
        type:Sequelize.STRING,
        allowNull:false,
        references:{
          model:'citizens',
          key:'id'
        },
        //onUpdate:'CASCADE',
        // onDelete:'CASCADE'
      },
      // registry_id:{
      //   type:Sequelize.STRING,
      //   allowNull:false,
      //   references:{
      //     model:'logins',
      //     key:'id'
      //   },
      //   onUpdate:'CASCADE',
      //   // onDelete:'CASCADE'
      // },
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
    await queryInterface.dropTable('schedulings')
  }
};

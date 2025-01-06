'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fee_type: {
        type: Sequelize.STRING
      },
      // application_category: {
      //   type: Sequelize.ARRAY(Sequelize.STRING), // Define as an array of strings
      //   allowNull: true,
      // },
      account_type: {
        type: Sequelize.STRING
      },
      // application_type: {
      //   type: Sequelize.ARRAY(Sequelize.STRING), // Define as an array of strings
      //   allowNull: true,
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false, 
        type: Sequelize.DATE
      } 
    });
  },
  async down(queryInterface, ) {
    await queryInterface.dropTable('fees');
  }
};
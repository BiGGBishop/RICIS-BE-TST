'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('adminstaffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      full_name: {
        type: Sequelize.STRING
      },
      ref_number: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      userroleId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'userroles',   // Name of the userrole table
          key: 'id',
        },
        onDelete: 'SET NULL', 
      },
      user_status: {
        type: Sequelize.ENUM("pending", "approved", "rejected", "suspended"), // Define ENUM with the possible values
        allowNull: true, // You can also make it required by using allowNull: false
        defaultValue: "pending", // Set the default value
      },
      payment_status: {
        type: Sequelize.ENUM("unpaid", "paid"), // Define ENUM with the possible values
        allowNull: true, // You can also make it required by using allowNull: false
        defaultValue: "unpaid", // Set the default value
      },
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
  async down(queryInterface,) {
    await queryInterface.dropTable('adminstaffs');
  }
};
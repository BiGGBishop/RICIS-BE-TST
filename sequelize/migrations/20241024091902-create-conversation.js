'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('conversations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      adminId: {
        type: Sequelize.INTEGER,
        references: {
          model: "adminstaffs", // Name of the admnstatffs table
          key: "id",
        },
        onDelete: "SET NULL", // What to do if the referenced users is deleted
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users", // Name of the users table
          key: "id",
        },
        onDelete: "SET NULL", // What to do if the referenced users is deleted
        allowNull: true,
      },
      applicationId:  {
        type: Sequelize.INTEGER,
        references: {
          model: "applications", // Name of the users table
          key: "id",
        },
        onDelete: "SET NULL", // What to do if the referenced users is deleted
        allowNull: true,
      },
      message: {
        type: Sequelize.STRING
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
  async down(queryInterface, ) {
    await queryInterface.dropTable('conversations');
  }
};
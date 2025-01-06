'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classificationMerges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      classificationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "classifications",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      classificationIncidentalId: {
        type: Sequelize.INTEGER,
        references: {
          model: "classifications",
          key: "id",
        },
        onDelete: "SET NULL",
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
    await queryInterface.dropTable('ClassificationMerges');
  }
};
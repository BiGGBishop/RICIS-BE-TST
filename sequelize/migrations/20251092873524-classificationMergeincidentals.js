'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classificationIncidentalMerges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      classificationMergeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "classificationMerges",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      incidentalClassificationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "classifications",
          key: "id",
        },
        onDelete: "CASCADE",
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('classificationIncidentalMerges');
  }
};
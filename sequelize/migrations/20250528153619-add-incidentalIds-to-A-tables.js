'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tables = [
      'RenewalForms',
    ];

    for (const table of tables) {
      await queryInterface.addColumn(table, 'incidentalIds', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = [
      'RenewalForms',
    ];

    for (const table of tables) {
      await queryInterface.removeColumn(table, 'incidentalIds');
    }
  },
};
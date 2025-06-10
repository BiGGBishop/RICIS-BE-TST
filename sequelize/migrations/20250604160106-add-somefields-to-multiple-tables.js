'use strict';

const tables = [
  'RenewalForms',
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (const table of tables) {
      await queryInterface.addColumn(table, 'incidentalFees', {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        after: 'id', // Optional, if your dialect (like MySQL) supports it
      });
      await queryInterface.addColumn(table, 'statutoryFees', {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        after: 'incidentalFees', // Optional
      });
      await queryInterface.addColumn(table, 'totalAmount', {
        type: Sequelize.DECIMAL(10, 2), 
        allowNull: true,
        defaultValue: 0.00,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    for (const table of tables) {
      await queryInterface.removeColumn(table, 'incidentalFees');
      await queryInterface.removeColumn(table, 'statutoryFees');
      await queryInterface.removeColumn(table, 'totalAmount');
    }
  },
};

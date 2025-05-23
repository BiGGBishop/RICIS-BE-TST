'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Transactions', 'status', {
      type: Sequelize.ENUM('pending', 'completed', 'failed'),
      allowNull: false,
      defaultValue: 'pending',
    });
    await queryInterface.addColumn('Transactions', 'confimedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Transactions', 'status');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Transactions_status";');
    await queryInterface.removeColumn('Transactions', 'confimedAt');
  }
};

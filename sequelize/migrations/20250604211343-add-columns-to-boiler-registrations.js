'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('boiler_registrations', 'object_use', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('boiler_registrations', 'installationDateStart', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('boiler_registrations', 'installationDateCompletion', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('boiler_registrations', 'newOrUsed', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('boiler_registrations', 'company_responsible_charge', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('boiler_registrations', 'declaration_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('boiler_registrations', 'object_use');
    await queryInterface.removeColumn('boiler_registrations', 'installationDateStart');
    await queryInterface.removeColumn('boiler_registrations', 'installationDateCompletion');
    await queryInterface.removeColumn('boiler_registrations', 'newOrUsed');
    await queryInterface.removeColumn('boiler_registrations', 'company_responsible_charge');
    await queryInterface.removeColumn('boiler_registrations', 'declaration_date');
  }
};
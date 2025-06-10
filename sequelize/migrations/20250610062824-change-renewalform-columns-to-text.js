'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.changeColumn('RenewalForms', 'personnel_leia', {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
      queryInterface.changeColumn('RenewalForms', 'personnel_nagobin', {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
      queryInterface.changeColumn('RenewalForms', 'company_leia', {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
      queryInterface.changeColumn('RenewalForms', 'company_nagobin', {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.changeColumn('RenewalForms', 'personnel_leia', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn('RenewalForms', 'personnel_nagobin', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn('RenewalForms', 'company_leia', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn('RenewalForms', 'company_nagobin', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },
};
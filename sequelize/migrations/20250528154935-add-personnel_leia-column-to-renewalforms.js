'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('RenewalForms', 'personnel_leia', {
      type: Sequelize.STRING, // Adjust as needed
      allowNull: true
    });

    await queryInterface.addColumn('RenewalForms', 'personnel_nagobin', {
      type: Sequelize.STRING, // Adjust as needed
      allowNull: true
    });
    
    await queryInterface.addColumn('RenewalForms', 'company_leia', {
      type: Sequelize.STRING, // Adjust as needed
      allowNull: true
    });
    
    await queryInterface.addColumn('RenewalForms', 'company_nagobin', {
      type: Sequelize.STRING, // Adjust as needed
      allowNull: true
    });

    await queryInterface.addColumn("RenewalForms", "certificate", {
      type: Sequelize.JSONB,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('RenewalForms', 'personnel_leia');
    await queryInterface.removeColumn('RenewalForms', 'personnel_nagobin');
    await queryInterface.removeColumn('RenewalForms', 'company_leia');
    await queryInterface.removeColumn('RenewalForms', 'company_nagobin');
    await queryInterface.removeColumn("RenewalForms", "certificate");
  }
};

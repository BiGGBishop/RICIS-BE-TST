'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('LiftingEquipmentRegistrations', 'application_type', {
      type: Sequelize.ENUM('New Application', 'Re-application'),
      allowNull: true,
    });

    await queryInterface.addColumn('RenewalForms', 'application_type', {
      type: Sequelize.ENUM('New Application', 'Re-application'),
      allowNull: true,
    });

    await queryInterface.addColumn('boiler_registrations', 'application_type', {
      type: Sequelize.ENUM('New Application', 'Re-application'),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('LiftingEquipmentRegistrations', 'application_type');
    await queryInterface.removeColumn('RenewalForms', 'application_type');
    await queryInterface.removeColumn('boiler_registrations', 'application_type');

    // Drop ENUM type if needed (PostgreSQL-specific)
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_LiftingEquipmentRegistrations_application_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_RenewalForms_application_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_boiler_registrations_application_type";');
  }
};

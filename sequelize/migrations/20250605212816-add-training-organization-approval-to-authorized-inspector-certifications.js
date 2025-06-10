'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('AuthorizedInspectorCertifications', 'training_organization_approval', {
      type: Sequelize.STRING,
      allowNull: true, // Set to false if this field is required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('AuthorizedInspectorCertifications', 'training_organization_approval');
  }
};
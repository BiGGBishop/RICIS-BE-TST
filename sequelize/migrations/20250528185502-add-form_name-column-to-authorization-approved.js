'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('AuthorizationApproveds', 'form_name', {
      type: Sequelize.TEXT, // Adjust as needed
      allowNull: true
    });
    await queryInterface.addColumn('AuthorizationApproveds', 'remark', {
      type: Sequelize.TEXT, // Adjust as needed
      allowNull: true
    });
    await queryInterface.addColumn('AuthorizationApproveds', 'feedback', {
      type: Sequelize.TEXT, // Adjust as needed
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('AuthorizationApproveds', 'form_name');
    await queryInterface.removeColumn('AuthorizationApproveds', 'remark');
    await queryInterface.removeColumn('AuthorizationApproveds', 'feedback');
  }
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('users', 'company_role');
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('users', 'company_role', {
        type: Sequelize.STRING,
      });
    }
  };
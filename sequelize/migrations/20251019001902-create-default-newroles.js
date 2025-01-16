"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('userroles', [
        { name: 'admin', createdAt: new Date(), updatedAt: new Date() },
        { name: 'staff', createdAt: new Date(), updatedAt: new Date() },
        { name: 'user', createdAt: new Date(), updatedAt: new Date() },
      ]);
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('userroles', null, {});
    },
  };
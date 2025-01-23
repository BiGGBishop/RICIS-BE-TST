'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

  },
  async down (queryInterface, Sequelize) {
    
   // await queryInterface.removeColumn("CompetencyCertificationFormLiftOperator", "form_name");
    //await queryInterface.removeColumn("AuthorizationManufacturers", "form_name");
  }
};
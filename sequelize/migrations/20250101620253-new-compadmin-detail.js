'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = bcrypt.hashSync('ric-hull123', 10);

    await queryInterface.bulkInsert('adminstaffs', [
      {
        email: 'cmbaneme@hullinspections.net',
        password: hashedPassword,
        full_name: 'C. Mbaneme',
        ref_number: "REF-CMB001",
        userroleId: 1,
        user_status: 'approved',
        payment_status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'ucheduaka@yahoo.co.uk',
        password: hashedPassword,
        full_name: 'Uche Duaka',
        ref_number: "REF-UCH002",
        userroleId: 1,
        user_status: 'approved',
        payment_status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adminstaffs', {
      email: {
        [Sequelize.Op.in]: [
          'cmbaneme@hullinspections.net',
          'ucheduaka@yahoo.co.uk'
        ]
      }
    });
  }
};

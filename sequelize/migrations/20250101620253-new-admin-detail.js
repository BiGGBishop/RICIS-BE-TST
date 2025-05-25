'use strict';
const bcrypt = require("bcryptjs")

//const { userRepo } = require("../../repositories/userRepo");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      const hashedPassword = bcrypt.hashSync('FMT-ech123', 10);

    await queryInterface.bulkInsert('adminstaffs', [{
      email: 'oladimejid@gmail.com',
      password: hashedPassword,
      full_name: 'Default Admin',
      ref_number: "DEVTHING",
      userroleId: 1,
      user_status: 'approved',
      payment_status: 'paid',
      createdAt: new Date(), 
      updatedAt: new Date()  
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adminstaffs', { email: 'oladimejid@gmail.com' });
  }
};
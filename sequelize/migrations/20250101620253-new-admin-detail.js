'use strict';
const bcrypt = require("bcryptjs")

//const { userRepo } = require("../../repositories/userRepo");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /*const adminRole = await userRepo.findRole({ name: 'admin' });
    if (!adminRole) {
      console.error("Admin role not found. Please create the 'admin' role first.");
      return;
    }*/
      const hashedPassword = bcrypt.hashSync('admin2025', 10);

    await queryInterface.bulkInsert('adminstaffs', [{
      email: 'admin@ricis.com',
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
    await queryInterface.bulkDelete('adminstaffs', { email: 'admin@ricis.com' });
  }
};
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reports", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
        allowNull: true,
      },
      inspection_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      Company_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      equipment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      serial_no: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      report: {
        type: Sequelize.TEXT, // Assuming a file path or URL
        allowNull: true,
      },
      certificate_image: {
        type: Sequelize.TEXT, // Assuming a file path or URL
        allowNull: true,
      },
      
      certificate_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      expiry_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      appStatus: {
				type: Sequelize.ENUM("pending", "approved", "rejected", "suspended"),
			  },
       paymentStatus:{ type: Sequelize.ENUM("paid","unpaid"),},

      is_draft: {
          type: Sequelize.BOOLEAN,                  
          defaultValue: false,
          allowNull: true,
          },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reports");
  },
};
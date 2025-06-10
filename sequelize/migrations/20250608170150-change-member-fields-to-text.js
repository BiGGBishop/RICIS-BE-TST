"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("TrainingOrganizationForm", "member_nagobin", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.changeColumn("TrainingOrganizationForm", "member_leia", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.changeColumn("TrainingOrganizationForm", "member_indt", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("TrainingOrganizationForm", "member_nagobin", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });

    await queryInterface.changeColumn("TrainingOrganizationForm", "member_leia", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });

    await queryInterface.changeColumn("TrainingOrganizationForm", "member_indt", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },
};

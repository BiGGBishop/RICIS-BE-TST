'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Make userId nullable
    await queryInterface.changeColumn('feedbacks', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // Add adminId foreign key
    await queryInterface.addColumn('feedbacks', 'adminId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'adminstaffs', // 👈 adjust if your admin table is named differently
        key: 'id'
      },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('feedbacks', 'adminId');

    await queryInterface.changeColumn('feedbacks', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
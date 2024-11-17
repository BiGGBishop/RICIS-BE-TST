'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      classification_name: {
        type: Sequelize.STRING
      },
      categoryId:  {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories', //naame of the category table
          key: 'id',
        },
        allowNull: true,
        onDelete: 'SET NULL',
      },
      subcategoryId:  {
        type: Sequelize.INTEGER,
        references: {
          model: 'subcategories', // naame of the subcategory table
          key: 'id',
        },
        allowNull: true,
        onDelete: 'SET NULL',
      },
      restricted:  {
        defaultValue:false,
        type: Sequelize.BOOLEAN
      },
      // fees:[ 
      //   {
      //     feeId: {
      //       type: Sequelize.INTEGER,
      //       references: {
      //         model: "fees", // Name of the fee table
      //         key: "id",
      //       },
      //       onDelete: "SET NULL", // What to do if the referenced categories is deleted
      //       allowNull: true,
      //     },
      //     amount: Sequelize.INTEGER,

      //   }
      // ],
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, ) {
    await queryInterface.dropTable('classifications');
  }
};
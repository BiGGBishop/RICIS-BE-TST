"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define the many-to-one relationship
      SubCategories.belongsTo(models.Categories, {
        foreignKey: "categoryId", // Foreign key in the SubCategory table
        as: "categories", // Alias to access the parent category
      });

      // SubCategory has many classifications
      SubCategories.hasMany(models.Classification, {
        foreignKey: "subcategoryId",
        as: "classifications",
      });
      // SubCategory has many classifications
      SubCategories.hasMany(models.Application, {
        foreignKey: "subcategoryId",
        as: "applications",
      });
    }
  }
  SubCategories.init(
    {
      name: DataTypes.STRING,
      categoryId: {
        // Foreign key field
        type: DataTypes.INTEGER,
        references: {
          model: "Categories", // Refers to Category model
          key: "id", // Category's primary key
        },
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "SubCategories",
      tableName: "subcategories",
    }
  );
  return SubCategories;
};

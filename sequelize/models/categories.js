"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define the one-to-many relationship
      Categories.hasMany(models.SubCategories, {
        foreignKey: "categoryId", // Foreign key in the SubCategory table
        as: "subcategories", // Alias to access related subcategories
      });
       // Category has many classifications
       Categories.hasMany(models.Classification, {
      foreignKey: 'categoryId',
      as: 'classifications',
    });
      // Category has many applications
      Categories.hasMany(models.Application, {
        foreignKey: 'categoryId',
        as: 'applications',          
      });
    }
  }
  Categories.init(
    {
      name: DataTypes.STRING,
      application_type: DataTypes.STRING,
    },
    {
      
      sequelize,
      modelName: "Categories",
      tableName: "categories",
    }
  );
  return Categories;
};

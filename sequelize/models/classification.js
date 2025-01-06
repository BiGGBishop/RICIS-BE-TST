"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Classification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Classification belongs to a category
      Classification.belongsTo(models.Categories, {
        foreignKey: "categoryId",
        as: "category", // Alias
      });

      // Classification belongs to a subcategory
      Classification.belongsTo(models.SubCategories, {
        foreignKey: "subcategoryId",
        as: "subcategory", // Alias
      });

      // Define the many-to-many relationship with Fee through ClassificationFees
      Classification.belongsToMany(models.Fee, {
        through: models.ClassificationFees,
        foreignKey: "classificationId",
        as: "fees",
      });
      Classification.hasMany(models.ClassificationFees, {
        foreignKey: "classificationId",
        as: "classificationFees",
      });

      Classification.hasMany(models.Application, {
        foreignKey: "classificationId",
        as: "classification",
      });
    }
  }
  Classification.init(
    {
      classification_name: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "categories", // Name of the categories table
          key: "id",
        },
        onDelete: "SET NULL", // What to do if the referenced categories is deleted
        allowNull: true,
      },
      subcategoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "subcategories", // Name of the categories table
          key: "id",
        },
        onDelete: "SET NULL", // What to do if the referenced categories is deleted
        allowNull: true,
      },
      has_incidental: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      form_type: DataTypes.STRING,

      classification_number: DataTypes.INTEGER,


      restricted: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      // application_fee: DataTypes.INTEGER,
      // incidental_fee: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Classification",
      tableName: "classifications",
    }
  );
  return Classification;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Define the many-to-many relationship with Classification through ClassificationFees
      Fee.belongsToMany(models.Classification, {
        through: models.ClassificationFees,
        foreignKey: "feeId",
        as: "classifications",
      });

      // Fee has many applications
      Fee.hasMany(models.Application, {
        foreignKey: "feeId",
        as: "applications",
      });
    }
  }
  Fee.init(
    {
      fee_type: DataTypes.STRING,
      application_category:  {
        type: DataTypes.ARRAY(DataTypes.STRING), // Define as an array of strings
        allowNull: true,
      },
      account_type: DataTypes.STRING,
      application_type: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Define as an array of strings
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Fee",
      tableName: "fees",
    }
  );
  return Fee;
};

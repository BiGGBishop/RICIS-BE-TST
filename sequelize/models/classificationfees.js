'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassificationFees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       // Define associations with Classification and Fee
       ClassificationFees.belongsTo(models.Classification, {
        foreignKey: "classificationId",
        as: "classification",
      });
      ClassificationFees.belongsTo(models.Fee, {
        foreignKey: "feeId",
        as: "fee",
      });
    }
  }
  ClassificationFees.init({
    
    amount: DataTypes.INTEGER,
    classificationId: {
      type: DataTypes.INTEGER,
      references: {
        model: "classifications",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    feeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "fees",
        key: "id",
      },
      onDelete: "SET NULL",
    },
  }, {
    sequelize,
    modelName: 'ClassificationFees',
    tableName: 'classificationfees',
  });
  return ClassificationFees;
};
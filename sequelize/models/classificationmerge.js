"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes)=>{
  class ClassificationMerge extends Model {
    static associate(models) {
      ClassificationMerge.belongsTo(models.Classification, {
        foreignKey: "classificationId",
        as: "classification",
        onDelete: "SET NULL",
      });
      ClassificationMerge.hasMany(models.ClassificationIncidentalMerge,{
        foreignKey: "classificationMergeId",
        as: "incidentalClassifications",
      });
    }
  }

  ClassificationMerge.init(
    {
      classificationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "classifications",
          key: "id",
        },
        onDelete: "SET NULL",
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ClassificationMerge",
      tableName: "classificationMerges",
    }
  );

  return ClassificationMerge;
};
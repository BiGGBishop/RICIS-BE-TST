"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ClassificationMerge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ClassificationMerge belongs to a primary Classification (classificationId)
      ClassificationMerge.belongsTo(models.Classification, {
        foreignKey: "classificationId",
        as: "classification",
        onDelete: "SET NULL",
      });

      // ClassificationMerge belongs to an incidental Classification (classificationIncidentalId)
      ClassificationMerge.belongsTo(models.Classification, {
        foreignKey: "classificationIncidentalId",
        as: "incidentalClassification",
        onDelete: "SET NULL",
      });
    }
  }

  ClassificationMerge.init(
    {
      classificationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "classifications", // Table name for classifications
          key: "id",
        },
        onDelete: "SET NULL", // Nullify if the associated classification is deleted
        allowNull: true,
      },
      classificationIncidentalId: {
        type: DataTypes.INTEGER,
        references: {
          model: "classifications", // Table name for classifications
          key: "id",
        },
        onDelete: "SET NULL", // Nullify if the associated classification is deleted
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
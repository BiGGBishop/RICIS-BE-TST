"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ClassificationIncidentalMerge extends Model {
    static associate(models) {
      ClassificationIncidentalMerge.belongsTo(models.ClassificationMerge, {
        foreignKey: "classificationMergeId",
        as: "classificationMerge",
      });

      ClassificationIncidentalMerge.belongsTo(models.Classification, {
        foreignKey: "incidentalClassificationId",
        as: "incidentalClassification",
      });
    }
  }

  ClassificationIncidentalMerge.init(
    {
      classificationMergeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "classificationMerges",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      incidentalClassificationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "classifications",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "ClassificationIncidentalMerge",
      tableName: "classificationIncidentalMerges",
    }
  );

  return ClassificationIncidentalMerge;
};
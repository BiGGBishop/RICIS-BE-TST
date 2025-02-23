"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      Feedback.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      // Generic association to any form
      Feedback.belongsTo(models.TrainingOrganizationForm, {
        foreignKey: "formId",
        as: "trainingForm",
        scope: {
          formType: 'TrainingOrganizationForm'
        }
      });


      Feedback.belongsTo(models.BoilerRegistration, {
        foreignKey: "formId",
        as: "boilerRegistrationForm",
        constraints: false,
        scope: {
          formType: 'BoilerRegistration'
        }
      });

      Feedback.belongsTo(models.LiftingEquipmentRegistration, {
        foreignKey: "formId",
        as: "liftingEquipmentRegistration",
        constraints: false,
         scope: {
          formType: 'LiftingEquipmentRegistration'
        }
      });

      Feedback.belongsTo(models.ApprovedInspectionAgency, {
        foreignKey: "formId",
        as: "approvedInspectionAgency",
        constraints: false,
         scope: {
          formType: 'ApprovedInspectionAgency'
        }
      });

      Feedback.belongsTo(models.CompetencyCertificationLifting, {
        foreignKey: "formId",
        as: "competencyCertificationLifting",
        constraints: false,
         scope: {
          formType: 'CompetencyCertificationLifting'
        }
      });
      Feedback.belongsTo(models.CompetencyCertificationWelder, {
        foreignKey: "formId",
        as: "competencyCertificationWelder",
        constraints: false,
         scope: {
          formType: 'CompetencyCertificationWelder'
        }
      });
      Feedback.belongsTo(models.CompetencyCertificationFormBoiler, {
        foreignKey: "formId",
        as: "competencyCertificationFormBoiler",
        constraints: false,
         scope: {
          formType: 'CompetencyCertificationFormBoiler'
        }
      });
      Feedback.belongsTo(models.BoilerRegistration, {
        foreignKey: "formId",
        as: "boilerRegistration",
        constraints: false,
         scope: {
          formType: 'BoilerRegistration'
        }
      });
      Feedback.belongsTo(models.CompetencyCertificationFormLiftOperator, {
        foreignKey: "formId",
        as: "competencyCertificationFormLiftOperator",
        constraints: false,
         scope: {
          formType: 'CompetencyCertificationFormLiftOperator'
        }
      });
      Feedback.belongsTo(models.RenewalForm, {
        foreignKey: "formId",
        as: "renewalForm",
        constraints: false,
         scope: {
          formType: 'RenewalForm'
        }
      });
      Feedback.belongsTo(models.OperatorCertification, {
        foreignKey: "formId",
        as: "OperatorCertification",
        constraints: false,
         scope: {
          formType: 'OperatorCertification'
        }
      });
      Feedback.belongsTo(models.AuthorizationApproved, {
        foreignKey: "formId",
        as: "AuthorizationApproved",
        constraints: false,
         scope: {
          formType: 'AuthorizationApproved'
        }
      });
    }
  }

  Feedback.init(
    {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userroleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      formId: { // Generic form ID
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      formType: { // Store the form type (e.g., 'TrainingOrganizationForm')
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isAdmin: { // Flag to indicate if the feedback is from an admin
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Feedback",
      tableName: "feedbacks",
    }
  );
  return Feedback;
};
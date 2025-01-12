'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AuthorizationApproved extends Model {
    static associate(models) {
      AuthorizationApproved.belongsTo(models.Classification, {
        foreignKey: "classificationId",
        as: "classification",
      });
    }
  }

  AuthorizationApproved.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      subcategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      classificationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      incidentalClassificationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      paymentStatus: {
        type: DataTypes.ENUM('unpaid', 'paid'),
        allowNull: false,
      },
      appStatus: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected', 'suspended'),
        allowNull: false,
      },
      boilerServiceClassification: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      typeOfService: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      liftingServiceClassification: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicationType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      certificationReview: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      exemption: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyCac: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      companyEmployee: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      companyMembership: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyQuality: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyCompetence: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyCompetenceLine: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyIncidentalLine: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      
      companyContactPerson: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyTelephone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyMembershipNagobin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nagobinDocument: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      companyMembershipLeia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      leiaDocument: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      managerName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      managerAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      managerDob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      managerEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      managerTelephone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nameSchool: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateAdmitted: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      dateCompleted: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      qualification: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      institution: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateIssue: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      nameCompany: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      joinDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      existDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      inspectorName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      inspectorAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      inspectorDob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      inspectorEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      inspectorTelephone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      professionalInstitution: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      professionalDoi: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      professionalExpireDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      experienceCompanyName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      experienceJoinDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      experienceExistDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      companyResponsibleCharge: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyResponsibleChargeDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      companyQualityManuel: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      operationalProcedures: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      companyDocumentation: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      documentationSupervisor: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      isoCertification: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      feeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'AuthorizationApproved',
      tableName: 'AuthorizationApproveds',
      timestamps: true,
    }
  );

  return AuthorizationApproved;
};
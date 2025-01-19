"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AuthorizationManufacturer extends Model {
    static associate(models) {
      AuthorizationManufacturer.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }

  AuthorizationManufacturer.init(
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      categoryId: DataTypes.INTEGER,
      subcategoryId: DataTypes.INTEGER,
      classificationId: DataTypes.INTEGER,
      incidentalClassificationId: DataTypes.INTEGER,
      paymentStatus: {
        type: DataTypes.ENUM("unpaid", "paid"),
        allowNull: false,
        defaultValue: "unpaid",
      },
      appStatus: {
        type: DataTypes.ENUM("pending", "approved", "rejected", "suspended"),
        allowNull: false,
        defaultValue: "pending",
      },
      boilerServiceClassification: DataTypes.STRING,
      typeService: DataTypes.STRING,
      liftingServiceClassification: DataTypes.STRING,
      applicationType: DataTypes.STRING,
      certificationReview: DataTypes.BOOLEAN,
      exemption: DataTypes.BOOLEAN,
      companyName: DataTypes.STRING,
      companyAddress: DataTypes.STRING,
      companyCac: DataTypes.STRING,
      companyYear: DataTypes.DATE,
      companyEmployee: DataTypes.INTEGER,
      companyMembership: DataTypes.STRING,
      companyQuality: DataTypes.STRING,
      companyCompetence: DataTypes.STRING,
      companyCompetenceLine: DataTypes.STRING,
      companyIncidentalLine: DataTypes.STRING,
      companyContactPerson: DataTypes.STRING,
      companyTelephone: DataTypes.STRING,
      companyEmail: DataTypes.STRING,
      companyMembershipNagobin:{
        type: DataTypes.TEXT,
        allowNull: true
      },
      companyMembershipLeia:{
        type: DataTypes.TEXT,
        allowNull: true
      },
      managerName: DataTypes.STRING,
      managerAddress: DataTypes.STRING,
      managerDob: DataTypes.DATE,
      managerEmail: DataTypes.STRING,
      managerTelephone: DataTypes.STRING,
      nameSchool: DataTypes.STRING,
      dateAdmitted: DataTypes.DATE,
      dateCompleted: DataTypes.DATE,
      qualification: DataTypes.STRING,
      professionalInstitution: DataTypes.STRING,
      professionalDoi: DataTypes.DATE,
      professionalExpireDate: DataTypes.DATE,
      experienceJoinDate: DataTypes.DATE,
      experienceExistDate: DataTypes.DATE,
      companyResponsibleCharge: DataTypes.STRING,
      companyResponsibleChargeDate: DataTypes.DATE,
      companyQualityManual: DataTypes.TEXT,
      operationalProcedures: DataTypes.TEXT,
      companyDocumentation: DataTypes.TEXT,
      documentationQuality: DataTypes.TEXT,
      designerDocumentation: DataTypes.TEXT,
      weldingDocumentation: DataTypes.TEXT,
      ndtDocumentation: DataTypes.TEXT,
      indtDocumentation: DataTypes.TEXT,
      isoCertification: DataTypes.TEXT,
      feeId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AuthorizationManufacturer",
    }
  );

  return AuthorizationManufacturer;
};

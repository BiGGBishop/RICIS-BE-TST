"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("AuthorizationManufacturers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categoryId: Sequelize.INTEGER,
      subcategoryId: Sequelize.INTEGER,
      classificationId: Sequelize.INTEGER,
      incidentalClassificationId: Sequelize.INTEGER,
      paymentStatus: {
        type: Sequelize.ENUM("unpaid", "paid"),
        allowNull: false,
        defaultValue: "unpaid",
      },
      appStatus: {
        type: Sequelize.ENUM("pending", "approved", "rejected", "suspended"),
        allowNull: false,
        defaultValue: "pending",
      },
      boilerServiceClassification: Sequelize.STRING,
      typeService: Sequelize.STRING,
      liftingServiceClassification: Sequelize.STRING,
      applicationType: Sequelize.STRING,
      certificationReview: Sequelize.BOOLEAN,
      exemption: Sequelize.BOOLEAN,
      companyName: Sequelize.STRING,
      companyAddress: Sequelize.STRING,
      companyCac: Sequelize.STRING,
      companyYear: Sequelize.DATE,
      companyEmployee: Sequelize.INTEGER,
      companyMembership: Sequelize.STRING,
      companyQuality: Sequelize.STRING,
      companyCompetence: Sequelize.STRING,
      companyCompetenceLine: Sequelize.STRING,
      companyIncidentalLine: Sequelize.STRING,
      companyContactPerson: Sequelize.STRING,
      companyTelephone: Sequelize.STRING,
      companyEmail: Sequelize.STRING,
      companyMembershipNagobin:{
        type: Sequelize.TEXT,
        allowNull: true
      },
      companyMembershipLeia:{
        type: Sequelize.TEXT,
        allowNull: true
      },
      managerName: Sequelize.STRING,
      managerAddress: Sequelize.STRING,
      managerDob: Sequelize.DATE,
      managerEmail: Sequelize.STRING,
      managerTelephone: Sequelize.STRING,
      nameSchool: Sequelize.STRING,
      dateAdmitted: Sequelize.DATE,
      dateCompleted: Sequelize.DATE,
      qualification: Sequelize.STRING,
  
      professionalInstitution: Sequelize.STRING,
      professionalDoi: Sequelize.DATE,
      professionalExpireDate: Sequelize.DATE,
      experienceCompanyName: Sequelize.STRING,
      experienceJoinDate: Sequelize.DATE,
      experienceExistDate: Sequelize.DATE,
      companyResponsibleCharge: Sequelize.STRING,
      companyResponsibleChargeDate: Sequelize.DATE,
      companyQualityManual: Sequelize.TEXT,
      operationalProcedures: Sequelize.TEXT,
      companyDocumentation: Sequelize.TEXT,
      documentationQuality: Sequelize.TEXT,
      designerDocumentation: Sequelize.TEXT,
      weldingDocumentation: Sequelize.TEXT,
      ndtDocumentation: Sequelize.TEXT,
      indtDocumentation: Sequelize.TEXT,
      isoCertification: Sequelize.TEXT,
      feeId: Sequelize.INTEGER,
      status: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("AuthorizationManufacturers");
  },
};

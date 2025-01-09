// Migration for AuthorizationApproved table
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AuthorizationApproveds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      subcategoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      classificationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      incidentalClassificationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
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
      boilerServiceClassification: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      typeOfService: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      liftingServiceClassification: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      applicationType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      certificationReview: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      exemption: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyCac: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyYear: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyEmployee: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      companyMembership: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyQuality: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyCompetence: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyCompetenceLine: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyIncidentalLine: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyContactPerson: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyTelephone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyMembershipNagobin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      companyMembershipLeia: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      managerName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      managerAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      managerDob: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      managerEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      managerTelephone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nameSchool: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dateAdmitted: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      dateCompleted: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      qualification: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      institution: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dateIssue: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      expirationDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      nameCompany: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      joinDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      existDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      inspectorName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      inspectorAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      inspectorDob: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      inspectorEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      inspectorTelephone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      professionalInstitution: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      professionalDoi: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      professionalExpireDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      experienceCompanyName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      experienceJoinDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      experienceExistDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      companyResponsibleCharge: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyResponsibleChargeDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      companyQualityManuel: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      operationalProcedures: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      companyDocumentation: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      documentationSupervisor: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      isoCertification: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      feeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('AuthorizationApproveds');
  },
};

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
      BoilerServiceClassification: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      TypeOfService: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      LiftingServiceClassification: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ApplicationType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      certification_review: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      exemption: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_cac: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_year: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_employee: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      company_membership: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_quality: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_competence: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_competence_line: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_incidental_line: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_contact_person: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_telephone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_membership_nagobin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      nagobin_document: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_membership_leia: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      leia_document: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      manager_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      manager_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      manager_dob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      manager_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      manager_telephone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name_school: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date_admitted: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      date_completed: {
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
      date_issue: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      expiration_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      name_company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      join_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      exist_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      inspector_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      inspector_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      inspector_dob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      inspector_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      inspector_telephone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      professional_institution: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      professional_doi: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      professional_expire_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      experience_company_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      experience_join_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      experience_exist_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      company_responsible_charge: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_responsible_charge_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      company_quality_manuel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      operational_procedures: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_documentation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      documentation_supervisor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      iso_certification: {
        type: DataTypes.STRING,
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
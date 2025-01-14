const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AuthorizedInspectorCertification extends Model {
    static associate(models) {
      AuthorizedInspectorCertification.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  AuthorizedInspectorCertification.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
        allowNull: true,
      },
      date_received: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      form_number: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "RICS-A-03"
      },
      certification_type: {
        type: DataTypes.ENUM("Non-Nuclear", "Nuclear"),
        allowNull: false,
      },
      certification_class: {
        type: DataTypes.ENUM("Class 1", "Class 2", "Class 3"),
        allowNull: false,
      },
      endorsement: {
        type: DataTypes.ENUM("R", "N"),
        allowNull: true,
      },
      application_type: {
        type: DataTypes.ENUM("New Application", "Re-application"),
        allowNull: false,
      },
      training_start_date: {
        type: DataTypes.DATE,
      },
      training_completion_date: {
        type: DataTypes.DATE,
      },
      documentation_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      exemption_requested: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      employer_name: {
        type: DataTypes.STRING,
      },
      employer_physical_address: {
        type: DataTypes.TEXT,
      },
      employer_authorization_number: {
        type: DataTypes.STRING,
      },
      employer_quality_certifications: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      employer_contact_person: {
        type: DataTypes.STRING,
      },
      employer_contact_telephone: {
        type: DataTypes.STRING,
      },
      employer_contact_email_address: {
        type: DataTypes.STRING,
      },
      training_organization_name: {
        type: DataTypes.STRING,
      },
      training_method: {
        type: DataTypes.ENUM("Online", "Class Room", "Field"),
      },
      training_organization_registration_number: {
        type: DataTypes.STRING,
      },
      training_facility_location: {
        type: DataTypes.STRING,
      },
      training_organization_quality_certifications: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      training_organization_contact_person: {
        type: DataTypes.STRING,
      },
      training_organization_telephone: {
        type: DataTypes.STRING,
      },
      training_organization_email: {
        type: DataTypes.STRING,
      },
      applicant_name: {
        type: DataTypes.STRING,
      },
      applicant_address: {
        type: DataTypes.TEXT,
      },
      applicant_date_of_birth: {
        type: DataTypes.DATE,
      },
      applicant_email_address: {
        type: DataTypes.STRING,
      },
      applicant_telephone_number: {
        type: DataTypes.STRING,
      },
      competence_category: {
        type: DataTypes.STRING,
      },
      competence_line_number: {
        type: DataTypes.STRING,
      },
      incidental_line_number: {
        type: DataTypes.STRING,
      },
      high_school: {
        type: DataTypes.JSONB,
      },
      polytechnic: {
        type: DataTypes.JSONB,
      },
      university: {
        type: DataTypes.JSONB,
      },
      professional_qualification: {
        type: DataTypes.JSONB,
      },
      experience: {
        type: DataTypes.JSONB,
      },
      applicant_declaration_name: {
        type: DataTypes.STRING,
      },
      applicant_declaration_date: {
        type: DataTypes.DATE,
      },
      employer_responsible_charge_name: {
        type: DataTypes.STRING,
      },
      employer_responsible_charge_date: {
        type: DataTypes.DATE,
      },
      exam_registration_number: {
        type: DataTypes.STRING,
      },
      director_of_factories: {
        type: DataTypes.STRING,
      },
      director_signature_date: {
        type: DataTypes.DATE,
      },
      uploaded_documents: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      sequelize,
      modelName: "AuthorizedInspectorCertification",
      tableName: "AuthorizedInspectorCertifications",
      timestamps: true,
    }
  );

  return AuthorizedInspectorCertification;
};
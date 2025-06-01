const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CompetencyCertificationFormLiftOperator extends Model {
    static associate(models) {
      // Define associations here
      CompetencyCertificationFormLiftOperator.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      CompetencyCertificationFormLiftOperator.belongsTo(models.Fee, {
        foreignKey: "feeId",
        as: "fee",
      });
      CompetencyCertificationFormLiftOperator.belongsTo(models.Classification, {
        foreignKey: "classificationId",
        as: "classification",
      });
      CompetencyCertificationFormLiftOperator.belongsTo(models.SubCategories, {
        foreignKey: "subcategoryId",
        as: "subcategory",
      });
      CompetencyCertificationFormLiftOperator.belongsTo(models.Categories, {
        foreignKey: "categoryId",
        as: "category",
      });
    }
  }

  CompetencyCertificationFormLiftOperator.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
        allowNull: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "categories",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      subcategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "subcategories",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      classificationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "classifications",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      incidentalIds:{
				type: DataTypes.ARRAY(DataTypes.INTEGER)
			},
			totalAmount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true,
			defaultValue: 0.00
			},
      feeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "fees",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      
      paymentStatus: {
        type: DataTypes.ENUM("unpaid", "paid"),
        defaultValue: "unpaid",
      },
      appStatus: {
        type: DataTypes.ENUM("pending", "approved", "rejected", "suspended"),
        defaultValue: "pending",
      },
      form_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      form_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
	  type_of_certification:{
		type: DataTypes.ENUM("Technical Authority", "Appointed Person", "Approved Person"),
	  },
      category_of_certification: {
        type: DataTypes.ENUM(
          "Class A",
          "Class B",     
          "Class C",
          "Class D",
          "Class E",
          "Class F",
          "Class G"
        ),
      },
      application_type: {
        type: DataTypes.ENUM("New Application", "Re-application"),
      },
      available_for_documentation_review: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      exemption_request: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
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
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
        allowNull: true,
      },
      competence_line: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      incidental_line: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      High_school: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      polytechnic: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      university: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      professional_qualification_institution: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date_of_issue: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      professional_expiration_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      experience_name_of_company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_declaration_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      company_responsible_charge: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      joining_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      exit_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      applicant_cv: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      higher_education_certificate: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      leia_experience: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      training_certificate: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      other_certificate: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      employement_letter: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_draft: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      remark: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      feedback: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      certificate: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "CompetencyCertificationFormLiftOperator",
      tableName: "CompetencyCertificationFormLiftOperator",
      timestamps: true,
    }
  );

  return CompetencyCertificationFormLiftOperator;
};
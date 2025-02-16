const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CompetencyCertificationLifting extends Model {
        static associate(models) {
          CompetencyCertificationLifting.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
          });
          CompetencyCertificationLifting.belongsTo(models.Fee, {
            foreignKey: "feeId",
            as: "fee",
          });
          CompetencyCertificationLifting.belongsTo(models.Classification, {
            foreignKey: "classificationId",
            as: "classification",
          });
          CompetencyCertificationLifting.belongsTo(models.SubCategories, {
            foreignKey: "subcategoryId",
            as: "subcategory",
          });
          CompetencyCertificationLifting.belongsTo(models.Categories, {
            foreignKey: "categoryId",
            as: "category",
          });
        
        }
      }
    
      CompetencyCertificationLifting.init(
        {
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
            onDelete: 'SET NULL',
            allowNull: true,
          },
          categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'categories',
              key: 'id',
            },
            onDelete: 'SET NULL',
          },
          subcategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'subcategories',
              key: 'id',
            },
            onDelete: 'SET NULL',
          },
          classificationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'classifications',
              key: 'id',
            },
            onDelete: 'SET NULL',
          },
          feeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'fees',
              key: 'id',
            },
            onDelete: 'SET NULL',
          },
          date_received: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          paymentStatus: {
            type: DataTypes.ENUM('unpaid', 'paid'),
            defaultValue: 'unpaid',
          },
          appStatus: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected', 'suspended'),
            defaultValue: 'pending',
          },
          form_number: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          form_name: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          type_of_certification: {
            type: DataTypes.ENUM(
              'Approved Lift Installer',
              'Work Equipment Operator',
              'Rigger Signaler',
              'Forklift Operator',
              'Scaffolding Technician',
              'Abseiling Technician'
            ),
          },
          Class_Certification: {
            type: DataTypes.ENUM('Class A','Class B', 'Class 1','Class 2'),
          },
          application_type: {
            type: DataTypes.ENUM('New Application', 'Re-Application'),
          },
          training_start_date: {
            type: DataTypes.DATE,
          },
          training_completion_date: {
            type: DataTypes.DATE,
          },
          documentation_available: {
            type: DataTypes.STRING,
            defaultValue: true,
          },
          exemption_requested: {
            type: DataTypes.STRING,
            defaultValue: true,
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
            type: DataTypes.ENUM('Online', 'Class Room', 'Field'),
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
          },
          competence_line_number: {
            type: DataTypes.STRING,
          },
          incidental_line_number: {
            type: DataTypes.STRING,
          },
         High_school : {
            type: DataTypes.JSONB,
          },
          polytechnic: {
            type: DataTypes.JSONB,
          },
          university: {
            type: DataTypes.JSONB,
          },
          professional_qualification_institution: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          date_of_issue: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          expiry_date: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          experience_name_of_company: {
            type: DataTypes.STRING,
          },
          joining_date: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          exit_date: {
            type: DataTypes.DATE,
            allowNull: true,
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
          applicant_cv: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          higher_education_certifications: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          leia_certificate: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          training_certificate: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          employment_letter: {
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
        },
        {
          sequelize,
          modelName: 'CompetencyCertificationLifting',
          tableName: 'CompetencyCertificationLiftings',
          timestamps: true,
        }
      );

    return CompetencyCertificationLifting;
};
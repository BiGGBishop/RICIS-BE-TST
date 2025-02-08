const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class OperatorCertification extends Model {
		static associate(models) {
      // Define associations here
      OperatorCertification.belongsTo(models.User, {
				foreignKey: "user_id", // This will create the foreign key in the 'User' table
				as: "user", // Alias for the association
			});
		}
	}

	OperatorCertification.init(
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
					model: "users", // Name of the users table
					key: "id",
				},
				onDelete: "SET NULL", // What to do if the referenced users is deleted
				allowNull: true,
			},
			// Application Information
			categoryId:{
				type: DataTypes.INTEGER,
				allowNull: false, 
				references: {
				  model: 'categories',
				  key: 'id',
				},
				onDelete: 'SET NULL',	
			},
			subcategoryId:{
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'subcategories',
					key: 'id',
				},
				onDelete: 'SET NULL',
				
			},
			classificationId:{
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
				  model: 'classifications',
				  key: 'id',
				},
				onDelete: 'SET NULL',
			},
			feeId:{
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'fees',
					key: 'id',
				},
				onDelete: 'SET NULL',
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
			certification_type: DataTypes.ENUM(
				"Lifting Equipment Operator",
				"Lifting Equipment Operator Assistance",
				"Forklift Operator",
				"Passenger Lift Technician"
			),
			certification_class: DataTypes.ENUM(
				"Below 50 tons",
				"51 – 100 tons",
				"Above 100 tons"
			),
			application_type: DataTypes.ENUM("New Application", "Re-Application"),
			available_for_documentation_review: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			  },
			  exemption_request: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
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
			  },
			  competence_line_number: {
				type: DataTypes.STRING,
			  },
			  incidental_line_number: {
				type: DataTypes.STRING,
			  },
			// Education
			High_school: {
				type: DataTypes.JSONB,
				allowNull:true
			  },
			  polytechnic: {
				type: DataTypes.JSONB,
				allowNull:true
			  },
			  university: {
				type: DataTypes.JSONB,
				allowNull:true
			  },
			  professional_qualification_institution:{
				type: DataTypes.STRING,
				allowNull: true,
              },
         
			  date_of_issue: {
				type:DataTypes.DATE,
				allowNull: true
			  },
			  expiry_date: {
				type:DataTypes.DATE,
				allowNull: true
			  },
			  experience_name_of_company: DataTypes.STRING,
			  joining_date: {
				type:DataTypes.STRING,
				allowNull: true
			  },
			  exit_date:{
				type: DataTypes.DATE,
                allowNull: true
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
			modelName: "OperatorCertification",
			tableName: "OperatorCertifications",
			timestamps: true,
		}
	);

	return OperatorCertification;
};

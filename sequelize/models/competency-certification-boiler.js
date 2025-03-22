const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class CompetencyCertificationFormBoiler extends Model {
		static associate(models) {
     
			CompetencyCertificationFormBoiler.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
			  });
			  CompetencyCertificationFormBoiler.belongsTo(models.Fee, {
				foreignKey: "feeId",
				as: "fee",
			  });
			  CompetencyCertificationFormBoiler.belongsTo(models.Classification, {
				foreignKey: "classificationId",
				as: "classification",
			  });
			  CompetencyCertificationFormBoiler.belongsTo(models.SubCategories, {
				foreignKey: "subcategoryId",
				as: "subcategory",
			  });
			  CompetencyCertificationFormBoiler.belongsTo(models.Categories, {
				foreignKey: "categoryId",
				as: "category",
			  });
		}
	}

	CompetencyCertificationFormBoiler.init(
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
				type: DataTypes.ARRAY(DataTypes.ARRAY)
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
			  date_received: {
				type: DataTypes.DATE,
				allowNull: true,
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
				"Power Engineer",
				"Refrigeration Engineer",
        		"Power Technician",
        		"Refrigeration Technician",
        		"Design Engineer",
        		"Welding Engineer"
			),
      certification_class: DataTypes.ENUM(
				"Class 1",
				"Class 2",
				"Class 3",
			),
			application_type: {
				type: DataTypes.ENUM("New Application", "Re-application"),
				allowNull: true
			},
			training_start_date: {
			  type: DataTypes.DATE,
			  allowNull:true
			},
			training_completion_date: {   
				type: DataTypes.DATE,
				allowNull:true
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
				type: DataTypes.STRING,
				allowNull:true
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
			  High_school: {
				type: DataTypes.JSONB
			/*	name_of_school:{
					type:DataTypes.STRING,
					allowNull: true,
				},
				date_admitted:{
					type:DataTypes.DATE,
					allowNull: true,
				},
				date_completed:{
					type: DataTypes.DATE,
					allowNull: true,

				},
				qualification:{
					type:DataTypes.STRING,
					allowNull: true,
				}*/
			},
			polytechnic: {
				type: DataTypes.JSONB
				/*name_of_school:{
					type:DataTypes.STRING,
					allowNull: true,
				},
				date_admitted:{
					type:DataTypes.DATE,
					allowNull: true,
				},
				date_completed:{
					type: DataTypes.DATE,
					allowNull: true,
				},
				qualification:{
					type:DataTypes.STRING,
					allowNull: true,
				}*/
			},
			university: {
				type: DataTypes.JSONB
				/*name_of_school:{
					type:DataTypes.STRING,
					allowNull: true,
				},
				date_admitted:{
					type:DataTypes.DATE,
					allowNull: true,
				},
				date_completed:{
					type: DataTypes.DATE,
					allowNull: true,
				},
				qualification:{
					type:DataTypes.STRING,
					allowNull: true,
				}*/
			},
		
			professional_qualification_institution: DataTypes.STRING,
			date_of_issue: DataTypes.DATE,
			expiry_date: DataTypes.DATE
			,
			
			experience_name_of_company:DataTypes.STRING,
			joining_date: DataTypes.STRING,
			exit_date: DataTypes.DATE
			,
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
			  director_of_factories: {
				type: DataTypes.STRING,
				allowNull:true
			  },
			  director_signature_date: {
				type: DataTypes.DATE,
				allowNull: true
			  },
			  applicant_cv: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			higher_education_certifications: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			
			training_certificate: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			training_organization_approval: {
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
			  modelName: "CompetencyCertificationFormBoiler",
			  tableName: "CompetencyCertificationFormBoiler",
			  timestamps: true,
			}
		  );
  

	return CompetencyCertificationFormBoiler;
};
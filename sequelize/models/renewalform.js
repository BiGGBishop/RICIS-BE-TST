const { Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class RenewalForm extends Model {
		static associate(models) {
			RenewalForm.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
			  });
			  RenewalForm.belongsTo(models.Fee, {
				foreignKey: "feeId",
				as: "fee",
			  });
			  RenewalForm.belongsTo(models.Classification, {
				foreignKey: "classificationId",
				as: "classification",
			  });
			  RenewalForm.belongsTo(models.SubCategories, {
				foreignKey: "subcategoryId",
				as: "subcategory",
			  });
			  RenewalForm.belongsTo(models.Categories, {
				foreignKey: "categoryId",
				as: "category",
			  });
		}
	}

	RenewalForm.init(
		{
			// Application Details
			user_id: {
				type: DataTypes.INTEGER,
				references: {
				  model: "users",
				  key: "id",
				},
				onDelete: "SET NULL",
				allowNull: true,
			  },
			  
			application_type: DataTypes.ENUM("Fresh Application", "Renewal Application"),
			  categoryId:{
						type: DataTypes.INTEGER,
						allowNull: true, 
						references: {
						  model: 'categories',
						  key: 'id',
						},
						onDelete: 'SET NULL',	
					},
					subcategoryId:{
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'subcategories',
							key: 'id',
						},
						onDelete: 'SET NULL',
						
					},
					classificationId:{
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
						  model: 'classifications',
						  key: 'id',
						},
						onDelete: 'SET NULL',
					},
					incidentalIds:{
						type: DataTypes.ARRAY(DataTypes.INTEGER)
					},
					feeId:{
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'fees',
							key: 'id',
						},
						onDelete: 'SET NULL',
					},
			totalAmount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true,
			defaultValue: 0.00
			},
			incidentalFees: {
			type: DataTypes.FLOAT,
			allowNull: true
			},
			statutoryFees: {
			type: DataTypes.FLOAT,
			allowNull: true
			},
					date_received: {
					  type:  DataTypes.DATE,
					  allowNull: true
					},
					paymentStatus: {
					  type: DataTypes.ENUM("unpaid", "paid"),
					  defaultValue:"unpaid"
					   
					  },
					  appStatus: {
					  type: DataTypes.ENUM("pending", "approved", "rejected", "suspended"),
					   defaultValue:"pending"
					  },
					form_number:{
					  type: DataTypes.STRING,
					  allowNull: true,
					} ,
					form_name:{
					  type: DataTypes.STRING,
					  allowNull: true,
					},

			// Service Classification
			service_classification: {
				type: DataTypes.ENUM(
					"Equipment Reinstallation",
					"Certificate of Competence",
					"Certificate of Authorization",
				),
				allowNull: true
			},
			object_use: {
				type: DataTypes.ENUM(
					"Personnel",
					"Material",
				),
				allowNull: true
			},
			

			// Document Check
			documents_available: {
				type: DataTypes.STRING,
				allowNull:true
			},
			exemption_requested: {
				type: DataTypes.STRING,
				allowNull: true
			},


			// Company Information
			company_name: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  company_physical_address: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  cac_registration_number: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			year_of_commencing_business: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  number_of_employees: {
				type: DataTypes.STRING, // Consider INTEGER if it's strictly a number
				allowNull: true,
			  },
			  membership_of_other_professional_bodies: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  quality_certifications_of_company: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  certificate_number_of_previous_authorization: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  date_of_issue: {
				type: DataTypes.DATE, 
				allowNull: true,
			  },
			  expiring_date: {
				type: DataTypes.DATE, 
				allowNull: true,
			  },
			  reason_for_renewal_reinstatement: {
				type: DataTypes.STRING,
				allowNull: true,
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
			  contact_person: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  telephone: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  email_address: {
				type: DataTypes.STRING,
				allowNull: true,
			  },


			  //application personnel
			  personnel_name: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  personnel_physical_address: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  personnel_cac_registration_number: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			personnel_year_of_commencing_business: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  personnel_number_of_employees: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			 personnel_membership_of_other_professional_bodies: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  personnel_quality_certifications_of_company: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  personnel_certificate_number_of_previous_authorization: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  personnel_date_of_issue: {
				type: DataTypes.DATE, 
				allowNull: true,
			  },
			 personnel_expiring_date: {
				type: DataTypes.DATE, 
				allowNull: true,
			  },
			  personnel_reason_for_renewal_reinstatement: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			 personnel_competence_category: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  personnel_competence_line: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  personnel_incidental_line: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  personnel_contact_person: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  personnel_telephone: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  personnel_email_address: {
				type: DataTypes.STRING,
				allowNull: true,
			  },
			  personnel_leia:{
				type: DataTypes.TEXT,
                allowNull: true,
              },
              personnel_nagobin:{
				type: DataTypes.TEXT,
                allowNull: true,
              },
			  company_leia:{
				type: DataTypes.TEXT,
                allowNull: true,
              },
              company_nagobin:{
				type: DataTypes.TEXT,
                allowNull: true,
              },
			  
			// Declaration
			responsible_charge_name:{
				type: DataTypes.STRING,
                allowNull: true,
			},
			declaration_date:{
				type: DataTypes.DATE,
                allowNull: true,
			},
		

			// Uploaded Documents
			company_documentation: {
				type: DataTypes.TEXT,
				allowNull: true,
			  },
			supervisor_documentation:{
				type: DataTypes.TEXT,
				allowNull: true,
			  },
			inspector_documentation:{
				type: DataTypes.TEXT,
				allowNull: true,
			  },
			log_book: {
				type: DataTypes.TEXT,
				allowNull: true,
			  },
			application_letter: {
				type: DataTypes.TEXT,
				allowNull: true,
			  },
			
			is_draft: {
				type: DataTypes,
				defaultValue: false,
			},
			certificate:{
				type: DataTypes.JSONB,
				allowNull: true,
			}
		},
		{
			sequelize,
			modelName: "RenewalForm",
			tableName: "RenewalForms",
			timestamps: true,
		}
	);

	return RenewalForm;
};

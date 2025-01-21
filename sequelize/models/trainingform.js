"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class TrainingOrganizationForm extends Model {
		static associate(models) {
      // Define associations here if required in the future
      TrainingOrganizationForm.belongsTo(models.User, {
				foreignKey: "userId", // This will create the foreign key in the 'User' table
				as: "user", // Alias for the association
			});
		}
	}

	TrainingOrganizationForm.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: "users", // Name of the users table
					key: "id",
				},
				onDelete: "SET NULL", // What to do if the referenced users is deleted
				allowNull: false,
			},
			
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
            date_received: {
              type:  DataTypes.DATE,
              allowNull: true
            },
			form_number:{
				type: DataTypes.STRING,
				allowNull: true,
			} ,

			//Boiler pressure categories
			boiler_pressure_categories:{
				type:DataTypes.ENUM(
					"Authorized Insepector",
					"Design Engineer",
					"Power Engineer",
					"Welding Engineer",
					"Refrigerator Engineer",
					"Boiler & Pressure Vessel Operator",
					"Pressure Welder",
					"Refrigeration Technician"
				)
			},

			//Lifting equipment category
			lifting_equipment_category: DataTypes.ENUM(
				"Approved Person",
				"Lift Technician",
				"Crane Operator",
				"Forklift Operator",
				"Work Equipment Operator",
				"Rigger",
				"Scaffolding Technician",
				"Abseiling Technician"
			),
			
			

			//lifting equipemnt categories
			

			application_type:{
				type:DataTypes.ENUM(
					"New Application",
					"Re-Application"
				)
			},
			

			//document fo review
			available_for_documentation_review: DataTypes.BOOLEAN,
			exemption_request: DataTypes.BOOLEAN,

			//company information
			company_name: DataTypes.STRING,
			cac_registration_number:DataTypes.STRING,
			physical_address: DataTypes.TEXT,
			year_of_commencing_business: DataTypes.STRING,
			number_of_employee: DataTypes.INTEGER,


			member_nagobin:{
				type:DataTypes.TEXT,
				allowNull: true
			},
			member_leia:{
				type:DataTypes.TEXT,
				allowNull: true
			},
			member_indt:{
				type:DataTypes.TEXT,
				allowNull: true
			},

			//technical supervisor
			member_other_bodies: DataTypes.STRING,
			quality_certification: DataTypes.TEXT,
			competence_category: DataTypes.STRING,
			competence_line: DataTypes.STRING,
			incidental_line: DataTypes.STRING,
			contact_person: DataTypes.STRING,
			telephone: DataTypes.STRING,
			email_address: DataTypes.STRING,
			technical_supervisor_name: DataTypes.STRING,
			technical_supervisor_address: DataTypes.TEXT,
			technical_supervisor_email: DataTypes.STRING,
			technical_supervisor_date_of_birth: DataTypes.DATE,
			technical_supervisor_phonenumber: DataTypes.STRING,

			//Education
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
			professional_expiration_date:DataTypes.DATE,
			experience_name_of_company:DataTypes.STRING,
			  company_declaration_date:DataTypes.DATE,
			  company_responsible_charge:DataTypes.STRING,
			joining_date: DataTypes.STRING,
			exit_date: DataTypes.DATE,                                                  
			
			//date_sign: DataTypes.DATE,
			//approval_category: DataTypes.STRING,
			//approval_class: DataTypes.STRING,
			//training_approval_number_ngtan: DataTypes.STRING,
			//director_of_factories: DataTypes.TEXT,
			//date_sign_director_of_factories: DataTypes.DATE,
			companyQualityManual: DataTypes.TEXT,
			operationalProcedures: DataTypes.TEXT,
			companyDocumentation: DataTypes.TEXT,
			documentationQuality: DataTypes.TEXT,
			designerDocumentation: DataTypes.TEXT,
			weldingDocumentation: DataTypes.TEXT,
			ndtDocumentation: DataTypes.TEXT,
			indtDocumentation: DataTypes.TEXT,
			isoCertification: DataTypes.TEXT,
			is_draft: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: "TrainingOrganizationForm",
			tableName: "TrainingOrganizationForm",
			timestamps: true,
		}
	);

	return TrainingOrganizationForm;
};
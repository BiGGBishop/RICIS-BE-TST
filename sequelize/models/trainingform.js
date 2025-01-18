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
				allowNull: true,
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
				)
			},

			
			authorized_inspector: DataTypes.BOOLEAN,
			design_engineer: DataTypes.BOOLEAN,
			power_engineer: DataTypes.BOOLEAN,
			welding_engineer: DataTypes.BOOLEAN,
			refrigerator_engineer: DataTypes.BOOLEAN,
			boiler_and_pressure_vessel_operator: DataTypes.BOOLEAN,
			pressure_welder: DataTypes.BOOLEAN,
			refrigeration_technician: DataTypes.BOOLEAN,

			//lifting equipemnt categories
			approved_person: DataTypes.BOOLEAN,
			lift_technician: DataTypes.BOOLEAN,
			crane_operator: DataTypes.BOOLEAN,
			forklift_operator: DataTypes.BOOLEAN,
			work_equipment_operator: DataTypes.BOOLEAN,
			rigger: DataTypes.BOOLEAN,
			scaffolding_technician: DataTypes.BOOLEAN,
			abseiling_technician: DataTypes.BOOLEAN,

			//application_type
			new_application: DataTypes.BOOLEAN,
			re_application: DataTypes.BOOLEAN,

			//document fo review
			available_for_documentation_review: DataTypes.BOOLEAN,
			exemption_request: DataTypes.BOOLEAN,

			//company information
			company_name: DataTypes.STRING,
			physical_address: DataTypes.TEXT,
			year_of_commencing_business: DataTypes.STRING,
			number_of_employee: DataTypes.INTEGER,


			member_nagobin:{
				type:DataTypes.STRING,
				allowNull: true
			},
			member_leia:{
				type:DataTypes.STRING,
				allowNull: true
			},
			member_indt:{
				type:DataTypes.STRING,
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
			high_school: DataTypes.STRING,
			polytechnic: DataTypes.STRING,
			university: DataTypes.STRING,
			// professional_qualification: DataTypes.ARRAY(DataTypes.STRING),
			professional_qualification: DataTypes.JSONB,
			// professional_qualification_institution: DataTypes.ARRAY(DataTypes.STRING),
			professional_qualification_institution: DataTypes.JSONB,
			// experience: DataTypes.ARRAY(DataTypes.TEXT),
			experience: DataTypes.JSONB,
			//name_of_user: DataTypes.STRING,
			company_responsible_charge: DataTypes.STRING,
			date_sign: DataTypes.DATE,
			//approval_category: DataTypes.STRING,
			//approval_class: DataTypes.STRING,
			//training_approval_number_ngtan: DataTypes.STRING,
			//director_of_factories: DataTypes.TEXT,
			//date_sign_director_of_factories: DataTypes.DATE,
			documents_uploaded: DataTypes.ARRAY(DataTypes.STRING),
			is_draft: {
				type: DataTypes,
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
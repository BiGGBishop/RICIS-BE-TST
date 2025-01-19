const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class BoilerRegistration extends Model {
		static associate(models) {
			BoilerRegistration.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
			});
		}
	}

	BoilerRegistration.init(
		{
			
			// User Details
			user_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "users",
					key: "id",
				},
				onDelete: "SET NULL",
				allowNull: true,
			},
			// Form Details
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
			type_of_installation: {
				type: DataTypes.ENUM(
					"Boiler",
					"Pressure Vessel",
					"Heating",
					"Other"
				)
			},
			
		
			installation_type:{
				type:DataTypes.ENUM(
					"New Installation",
					"Existing Installation"
				)
			},



			form_type: {
				type:DataTypes.STRING,
				allowNull:true,
			},
			data_reports_available: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			variance_requested: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},

			// Company Performing Installation
			installer_name: DataTypes.STRING,
			installer_address: DataTypes.TEXT,
			installer_authorization_number: DataTypes.STRING,
			installer_quality_certifications: DataTypes.STRING,
			installer_contact_person: DataTypes.STRING,
			installer_contact_telephone: DataTypes.STRING,
			installer_contact_email: DataTypes.STRING,

			// Boiler/Pressure Vessel Owner Information
			owner_name: DataTypes.STRING,
			manufacturing_process: DataTypes.STRING,
			factory_registration_number: DataTypes.STRING,
			owner_location: DataTypes.TEXT,
			owner_quality_certifications: DataTypes.STRING,
			owner_contact_person: DataTypes.STRING,
			owner_contact_telephone: DataTypes.STRING,
			owner_contact_email: DataTypes.STRING,

			// Equipment Information
			manufacturer: DataTypes.STRING,
			manufacture_year:DataTypes.DATE,
			place_of_manufacture: DataTypes.STRING, 
			code_of_construction: DataTypes.STRING,
			intended_use: DataTypes.STRING, // "New" or "Used"
			inspection_agency: DataTypes.STRING,
			inspection_authorization_number: DataTypes.STRING,
			hydro_test_date: DataTypes.DATE,
			hydro_test_pressure: DataTypes.STRING,
			design_pressure: DataTypes.STRING,
			mawp_mdmt: DataTypes.STRING, // Maximum Allowable Working Pressure / Minimum Design Metal Temperature
			equipment_type: DataTypes.STRING,
			equipment_distinctive_number: DataTypes.STRING,
			operating_medium: DataTypes.STRING,
			equipment_category: DataTypes.STRING,
			equipment_sub_category: DataTypes.STRING,
			equipment_classification: DataTypes.STRING,
			equipment_line_number: DataTypes.STRING,
			equipment_incidental_number: DataTypes.STRING,
			manufacturers_data_report: {
                type: DataTypes.TEXT,
                allowNull: true, 
            },
            construction_drawings: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            design_calculation: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            test_parameters_data: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            accreditation_documents: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            installation_plan: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            quality_assurance_program: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
			is_draft: {
				type: DataTypes,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: "BoilerRegistration",
			tableName: "boiler_registrations",
			timestamps: true,
		}
	);

	return BoilerRegistration;
};

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class BoilerRegistration extends Model {
		static associate(models) {
			BoilerRegistration.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
			  });
		  BoilerRegistration.belongsTo(models.Classification, {
			foreignKey: "classificationId",
			as: "classification",
		  });
		  BoilerRegistration.belongsTo(models.Categories, {
			foreignKey: "categoryId",
			as: "category",
		});
		BoilerRegistration.belongsTo(models.SubCategories, {
			foreignKey: "subcategoryId",
			as: "subcategory",
		});
	  
		BoilerRegistration.belongsTo(models.Fee, {
			foreignKey: "feeId",
			as: "fee",
		});
		}
	}

	BoilerRegistration.init(
		{
			
			user_id: {
				type: DataTypes.INTEGER,
				references: {
				  model: "users",
				  key: "id",
				},
				onDelete: "SET NULL",
				allowNull: true,
			  },
			  
			application_type:{
				type:DataTypes.ENUM(
					"New Application",
					"Re-Application"
				),
				defaultValue:"New Application"
			},
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
			type_of_installation: {
				type: DataTypes.ENUM(
					"Boiler",
					"Pressure Vessel",
					"Heating",
					"Other"
				),
				allowNull: true
			},
			
		
			installation_type:{
				type:DataTypes.ENUM(
					"New Installation",
					"Existing Installation"
				),
				allowNull: true
			},



			form_type: {
				type:DataTypes.STRING,
				allowNull:true,
			},
			data_reports_available: {
				type: DataTypes.STRING,
				allowNull:true
			},
			variance_requested: {
				type: DataTypes.STRING,
				allowNull: true
			},

			// Company Performing 
			installer_name: {
				type: DataTypes.STRING,
				allowNull: true
			},
			installer_address: {
				type: DataTypes.TEXT,
				allowNull: true
			},
			installer_authorization_number: {
				type: DataTypes.STRING,
				allowNull: true
			},
			installer_quality_certifications: {
				type: DataTypes.STRING,
				allowNull: true
			},
			installer_contact_person: {
				type: DataTypes.STRING,
				allowNull: true
			},
			installer_contact_telephone: {
				type: DataTypes.STRING,
				allowNull: true
			},
			installer_contact_email: {
				type: DataTypes.STRING,
				allowNull: true
			},
			
			// Boiler/Pressure Vessel Owner Information
			owner_name: {
				type: DataTypes.STRING,
				allowNull: true
			},
			manufacturing_process: {
				type: DataTypes.STRING,
				allowNull: true
			},
			factory_registration_number: {
				type: DataTypes.STRING,
				allowNull: true
			},
			owner_location: {
				type: DataTypes.TEXT,
				allowNull: true
			},
			owner_quality_certifications: {
				type: DataTypes.STRING,
				allowNull: true
			},
			owner_contact_person: {
				type: DataTypes.STRING,
				allowNull: true
			},
			owner_contact_telephone: {
				type: DataTypes.STRING,
				allowNull: true
			},
			owner_contact_email: {
				type: DataTypes.STRING,
				allowNull: true
			},
			
			// Equipment Information
			manufacturer: {
				type: DataTypes.STRING,
				allowNull: true
			},
			manufacture_year: {
				type: DataTypes.DATE,
				allowNull: true
			},
			place_of_manufacture: {
				type: DataTypes.STRING,
				allowNull: true
			},
			code_of_construction: {
				type: DataTypes.STRING,
				allowNull: true
			},
			intended_use: {
				type: DataTypes.STRING,
				allowNull: true
			},
			inspection_agency: {
				type: DataTypes.STRING,
				allowNull: true
			},
			inspection_authorization_number: {
				type: DataTypes.STRING,
				allowNull: true
			},
			hydro_test_date: {
				type: DataTypes.DATE,
				allowNull: true
			},
			hydro_test_pressure: {
				type: DataTypes.STRING,
				allowNull: true
			},
			design_pressure: {
				type: DataTypes.STRING,
				allowNull: true
			},
			mawp_mdmt: {
				type: DataTypes.STRING,
				allowNull: true
			},
			equipment_type: {
				type: DataTypes.STRING,
				allowNull: true
			},
			equipment_distinctive_number: {
				type: DataTypes.STRING,
				allowNull: true
			},
			operating_medium: {
				type: DataTypes.STRING,
				allowNull: true
			},
			equipment_category: {
				type: DataTypes.STRING,
				allowNull: true
			},
			equipment_sub_category: {
				type: DataTypes.STRING,
				allowNull: true
			},
			equipment_classification: {
				type: DataTypes.STRING,
				allowNull: true
			},
			equipment_line_number: {
				type: DataTypes.STRING,
				allowNull: true
			},
			equipment_incidental_number: {
				type: DataTypes.STRING,
				allowNull: true
			},

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
			certificate:{
				type: DataTypes.JSONB,
				allowNull: true,
			}
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

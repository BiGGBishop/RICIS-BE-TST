const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class ApprovedInspectionAgency extends Model {
		static associate(models) {
			ApprovedInspectionAgency.belongsTo(models.User, {
				foreignKey: "user_id", // This will create the foreign key in the 'User' table
				as: "user", // Alias for the association
			});
		}
	}

	ApprovedInspectionAgency.init(
		{
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
			incidentalIds:{
				type: DataTypes.ARRAY(DataTypes.INTEGER)
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
			paymentStatus: {
				type: DataTypes.ENUM("unpaid", "paid"),
				defaultValue:"unpaid",
			   allowNull: true
			  },
			  appStatus: {
				type: DataTypes.ENUM("pending", "approved", "rejected", "suspended"),
			   defaultValue:"pending",
			   allowNull: true
			  },
			form_number:{ 
				type: DataTypes.STRING,
				allowNull: true,
			} ,
			form_type: DataTypes.STRING,
			totalAmount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true,
			defaultValue: 0.00
			},
			boiler_pressure_vessel_category: DataTypes.STRING,
			type_of_service: DataTypes.ENUM("Nuclear", "Non-Nuclear"),
			service_classification: DataTypes.ARRAY(DataTypes.STRING),
			lifting_equipment_category: DataTypes.STRING,
			lifting_service_classification: DataTypes.ARRAY(DataTypes.STRING),
			application_type: DataTypes.ENUM("New Application", "Re-Application"),
			documentation_available: DataTypes.BOOLEAN,
			exemption_requested: DataTypes.BOOLEAN,

			// Company Information
			company_name: DataTypes.STRING,
			physical_address: DataTypes.TEXT,
			cac_registration_number: DataTypes.STRING,
			year_commencing_business: DataTypes.INTEGER,
			number_of_employees: DataTypes.INTEGER,
			membership_nagobin: DataTypes.BOOLEAN,
			membership_leia: DataTypes.BOOLEAN,
			other_professional_bodies: DataTypes.ARRAY(DataTypes.STRING),
			quality_certifications: DataTypes.ARRAY(DataTypes.STRING),
			competence_category: DataTypes.STRING,
			competence_line_number: DataTypes.STRING,
			incidental_line_number: DataTypes.STRING,
			contact_person: DataTypes.STRING,
			contact_telephone: DataTypes.STRING,
			contact_email: DataTypes.STRING,

			// Prospective Supervisor / Technical Manager
			supervisor_name: DataTypes.STRING,
			supervisor_address: DataTypes.TEXT,
			supervisor_date_of_birth: DataTypes.DATE,
			supervisor_email: DataTypes.STRING,
			supervisor_telephone: DataTypes.STRING,
			supervisor_education: DataTypes.ARRAY(DataTypes.JSONB),
			supervisor_professional_qualifications: DataTypes.ARRAY(DataTypes.JSONB),
			supervisor_experience: DataTypes.ARRAY(DataTypes.JSONB),

			// Approved Inspector
			inspector_name: DataTypes.STRING,
			inspector_address: DataTypes.TEXT,
			inspector_date_of_birth: DataTypes.DATE,
			inspector_email: DataTypes.STRING,
			inspector_telephone: DataTypes.STRING,
			inspector_education: DataTypes.ARRAY(DataTypes.JSONB),
			inspector_professional_qualifications: DataTypes.ARRAY(DataTypes.JSONB),
			inspector_experience: DataTypes.ARRAY(DataTypes.JSONB),

			// Declaration
			responsible_charge: DataTypes.STRING,
			declaration_date: DataTypes.DATE,

			// Official Use
			applicant_declarationname: DataTypes.STRING,
			applicant_declaration_date: DataTypes.DATE,
			application_status: DataTypes.STRING,
			authorization_number: DataTypes.STRING,
			director_facto: DataTypes.STRING,
			director_signature: DataTypes.STRING,
			director_signature_date: DataTypes.DATE,
			approval_category: DataTypes.STRING,
			approval_class: DataTypes.STRING,
			// Documents Uploaded
			documents_uploaded: DataTypes.ARRAY(DataTypes.STRING),
			is_draft: {
				type: DataTypes,
				defaultValue: false,
			}, 
		},
		{
			sequelize,
			modelName: "ApprovedInspectionAgency",
			tableName: "ApprovedInspectionAgencies",
			timestamps: true,
		}
	);
                                                     
	return ApprovedInspectionAgency;
};      
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class ManufacturerRepairer extends Model {
		static associate(models) {
      // Define associations here, if necessary
	  ManufacturerRepairer.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      ManufacturerRepairer.belongsTo(models.Fee, {
        foreignKey: "feeId",
        as: "fee",
      });
      ManufacturerRepairer.belongsTo(models.Classification, {
        foreignKey: "classificationId",
        as: "classification",
      });
      ManufacturerRepairer.belongsTo(models.SubCategories, {
        foreignKey: "subcategoryId",
        as: "subcategory",
      });
      ManufacturerRepairer.belongsTo(models.Categories, {
        foreignKey: "categoryId",
        as: "category",
      });
		}
	}

	ManufacturerRepairer.init(
		{
			// Application Information
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
			certification_type: DataTypes.ENUM(
				"Boiler & Pressure Vessel",
				"Lifting Equipment"
			),
			service_classification: DataTypes.ENUM(
				"Class A",
				"Class B",
				"Class C",
				"Class D",
				"Class E",
				"Class F",
				"Class G"
			),
			application_type: DataTypes.ENUM("New Application", "Re-Application"),
			documentation_available: DataTypes.BOOLEAN,
			exemption_requested: DataTypes.BOOLEAN,
			form_type: DataTypes.STRING,

			// Company Information
			company_name: DataTypes.STRING,
			company_address: DataTypes.TEXT,
			company_cac_registration_number: DataTypes.STRING,
			year_of_commencement: DataTypes.INTEGER,
			number_of_employees: DataTypes.INTEGER,
			nagobin_membership: DataTypes.BOOLEAN,
			leia_membership: DataTypes.BOOLEAN,
			indt_membership: DataTypes.BOOLEAN,
			other_memberships: DataTypes.ARRAY(DataTypes.STRING),
			quality_certifications: DataTypes.ARRAY(DataTypes.STRING),
			competence_category: DataTypes.STRING,
			competence_line_number: DataTypes.STRING,
			incidental_line_number: DataTypes.STRING,
			contact_person_name: DataTypes.STRING,
			contact_person_email: DataTypes.STRING,
			contact_person_phone: DataTypes.STRING,

			// Quality Manager Information
			quality_manager_name: DataTypes.STRING,
			quality_manager_address: DataTypes.TEXT,
			quality_manager_date_of_birth: DataTypes.DATE,
			quality_manager_email: DataTypes.STRING,
			quality_manager_phone: DataTypes.STRING,

			// Education
			education_details: DataTypes.ARRAY(DataTypes.JSONB), // [{ name: "", date_admitted: "", date_completed: "", qualification: "" }]

			// Professional Qualification
			professional_qualifications: DataTypes.ARRAY(DataTypes.JSONB), // [{ institution: "", date_issued: "", expiration_date: "" }]

			// Experience
			experience_details: DataTypes.ARRAY(DataTypes.JSONB), // [{ company: "", joining_date: "", exit_date: "" }]

			// Declaration
			responsible_charge_name: DataTypes.STRING,
			declaration_date: DataTypes.DATE,

			// Official Use
			approval_category: DataTypes.STRING,
			approval_class: DataTypes.STRING,
			contractor_number: DataTypes.STRING,
			director_of_factories: DataTypes.STRING,
			director_signature_date: DataTypes.DATE,

			// Uploaded Documents
			uploaded_documents: DataTypes.ARRAY(DataTypes.STRING), // ["Quality Manual", "Operational Procedures", ...]
			is_draft: {
				type: DataTypes,
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
		},
		{
			sequelize,
			modelName: "ManufacturerRepairer",
			tableName: "ManufacturerRepairers",
			timestamps: true,
		}
	);

	return ManufacturerRepairer;
};

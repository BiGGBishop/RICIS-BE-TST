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
			date_received: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			form_number: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			type_of_installation: {
				type: DataTypes.STRING, // e.g., "Boiler" or "Pressure Vessel"
				allowNull: false,
			},
			object_use: {
				type: DataTypes.STRING, // e.g., "Power", "Process", "Heating", "Other"
			},
			installation_dates: {
				type: DataTypes.JSON, // { start: "date", completion: "date" }
			},
			form_type: DataTypes.STRING,
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
			installer_quality_certifications: DataTypes.ARRAY(DataTypes.STRING),
			installer_contact_person: DataTypes.STRING,
			installer_contact_telephone: DataTypes.STRING,
			installer_contact_email: DataTypes.STRING,

			// Boiler/Pressure Vessel Owner Information
			owner_name: DataTypes.STRING,
			manufacturing_process: DataTypes.STRING,
			factory_registration_number: DataTypes.STRING,
			owner_location: DataTypes.TEXT,
			owner_quality_certifications: DataTypes.ARRAY(DataTypes.STRING),
			owner_contact_person: DataTypes.STRING,
			owner_contact_telephone: DataTypes.STRING,
			owner_contact_email: DataTypes.STRING,

			// Equipment Information
			manufacturer: DataTypes.STRING,
			manufacture_year_and_place: DataTypes.STRING, // Year and Place
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

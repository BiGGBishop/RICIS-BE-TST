const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class RenewalForm extends Model {
		static associate(models) {
			RenewalForm.belongsTo(models.User, {
				foreignKey: "userId",
				as: "user",
			});
		}
	}

	RenewalForm.init(
		{
			// Application Details
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: "users",
					key: "id",
				},
				onDelete: "SET NULL",
				allowNull: true,
			},
			date_received: DataTypes.DATE,
			form_number: DataTypes.STRING,
			form_type: DataTypes.STRING,
			// Service Classification
			equipment_registration: DataTypes.BOOLEAN,
			certificate_of_competence: DataTypes.BOOLEAN,
			certificate_of_authorization: DataTypes.BOOLEAN,

			// Document Check
			documentation_available: DataTypes.BOOLEAN,
			exemption_requested: DataTypes.BOOLEAN,

			// Company Information
			company_name: DataTypes.STRING,
			company_address: DataTypes.TEXT,
			company_cac_registration_number: DataTypes.STRING,
			year_of_commencement: DataTypes.INTEGER,
			number_of_employees: DataTypes.INTEGER,
			nagobin_membership: DataTypes.BOOLEAN,
			leia_membership: DataTypes.BOOLEAN,
			other_memberships: DataTypes.ARRAY(DataTypes.STRING),
			quality_certifications: DataTypes.ARRAY(DataTypes.STRING),
			previous_authorization_certificate_number: DataTypes.STRING,
			previous_authorization_date_of_issue: DataTypes.DATE,
			previous_authorization_expiry_date: DataTypes.DATE,
			renewal_reason: DataTypes.TEXT,

			// Competence Details
			competence_category: DataTypes.STRING,
			competence_line_number: DataTypes.STRING,
			incidental_line_number: DataTypes.STRING,
			contact_person_name: DataTypes.STRING,
			contact_person_email: DataTypes.STRING,
			contact_person_phone: DataTypes.STRING,

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
			uploaded_documents: DataTypes.ARRAY(DataTypes.STRING),
			is_draft: {
				type: DataTypes,
				defaultValue: false,
			},
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

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class OperatorCertification extends Model {
		static associate(models) {
      // Define associations here
      OperatorCertification.belongsTo(models.User, {
				foreignKey: "userId", // This will create the foreign key in the 'User' table
				as: "user", // Alias for the association
			});
		}
	}

	OperatorCertification.init(
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
			// Application Information
			date_received: DataTypes.DATE,
			form_number: DataTypes.STRING,
			form_type: DataTypes.STRING,
			certification_type: DataTypes.ENUM(
				"Lifting Equipment Operator",
				"Lifting Equipment Operator Assistance",
				"Forklift Operator",
				"Passenger Lift Technician"
			),
			certification_class: DataTypes.ENUM(
				"Below 50 tons",
				"51 – 100 tons",
				"Above 100 tons"
			),
			application_type: DataTypes.ENUM("New Application", "Re-Application"),
			documentation_available: DataTypes.BOOLEAN,
			exemption_requested: DataTypes.BOOLEAN,

			// Training Information
			training_start_date: DataTypes.DATE,
			training_completion_date: DataTypes.DATE,
			training_method: DataTypes.ENUM("Online", "Classroom", "Field"),
			training_organization_name: DataTypes.STRING,
			training_organization_registration_number: DataTypes.STRING,
			training_organization_location: DataTypes.STRING,
			training_organization_quality_certifications: DataTypes.ARRAY(
				DataTypes.STRING
			),
			training_organization_contact_person: DataTypes.STRING,
			training_organization_contact_email: DataTypes.STRING,
			training_organization_contact_phone: DataTypes.STRING,

			// Employer Information
			employer_name: DataTypes.STRING,
			employer_address: DataTypes.TEXT,
			employer_quality_certifications: DataTypes.ARRAY(DataTypes.STRING),
			employer_contact_person: DataTypes.STRING,
			employer_contact_phone: DataTypes.STRING,
			employer_contact_email: DataTypes.STRING,

			// Applicant Information
			applicant_name: DataTypes.STRING,
			applicant_address: DataTypes.TEXT,
			applicant_date_of_birth: DataTypes.DATE,
			applicant_email: DataTypes.STRING,
			applicant_phone: DataTypes.STRING,
			competence_category: DataTypes.STRING,
			competence_line_number: DataTypes.STRING,
			incidental_line_number: DataTypes.STRING,

			// Education
			education_details: DataTypes.ARRAY(DataTypes.JSONB), // [{ name: "High School", date_admitted: "", date_completed: "", qualification: "" }, ...]

			// Professional Qualification
			professional_qualifications: DataTypes.ARRAY(DataTypes.JSONB), // [{ institution: "", date_issued: "", expiration_date: "" }, ...]

			// Experience
			experience_details: DataTypes.ARRAY(DataTypes.JSONB), // [{ company: "", joining_date: "", exit_date: "" }, ...]

			// Declaration
			applicant_declaration_name: DataTypes.STRING,
			applicant_declaration_date: DataTypes.DATE,
			responsible_charge: DataTypes.STRING,
			declaration_date: DataTypes.DATE,

			// Official Use
			exam_registration_number: DataTypes.STRING,
			certification_class_accepted: DataTypes.STRING,
			director_of_factories: DataTypes.STRING,
			director_signature_date: DataTypes.DATE,

			// Uploaded Documents
			uploaded_documents: DataTypes.ARRAY(DataTypes.STRING), // ["Curriculum Vitae", "Education Certifications", ...]
		},
		{
			sequelize,
			modelName: "OperatorCertification",
			tableName: "OperatorCertifications",
			timestamps: true,
		}
	);

	return OperatorCertification;
};

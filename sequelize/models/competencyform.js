const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class CompetencyCertificationForm extends Model {
		static associate(models) {
      // Define associations if needed
      CompetencyCertificationForm.belongsTo(models.User, {
				foreignKey: "userId", // This will create the foreign key in the 'User' table
				as: "user", // Alias for the association
			});
		}
	}

	CompetencyCertificationForm.init(
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
			form_type: DataTypes.STRING,
			technical_authority: DataTypes.BOOLEAN,
			appointed_person: DataTypes.BOOLEAN,
			approved_person: DataTypes.BOOLEAN,
			classA: DataTypes.BOOLEAN,
			classB: DataTypes.BOOLEAN,
			classC: DataTypes.BOOLEAN,
			classD: DataTypes.BOOLEAN,
			classE: DataTypes.BOOLEAN,
			new_application: DataTypes.BOOLEAN,
			re_application: DataTypes.BOOLEAN,
			training_start_date: DataTypes.DATE,
			training_completion_date: DataTypes.DATE,
			documentation_available_for_review: DataTypes.BOOLEAN,
			exemption_requested: DataTypes.BOOLEAN,
			employer_name: DataTypes.STRING,
			employer_physical_address: DataTypes.TEXT,
			employer_authorization_number: DataTypes.STRING,
			employer_contact_person: DataTypes.STRING,
			employer_contact_telephone: DataTypes.STRING,
			employer_contact_email_address: DataTypes.STRING,
			employer_quality_certifications: DataTypes.ARRAY(DataTypes.STRING),
			training_organization_name: DataTypes.STRING,
			training_method: DataTypes.STRING,
			training_organization_approval_number: DataTypes.STRING,
			training_facility_location: DataTypes.STRING,
			training_organization_quality_certifications: DataTypes.ARRAY(
				DataTypes.STRING
			),
			training_organization_contact_person: DataTypes.STRING,
			training_organization_telephone: DataTypes.STRING,
			training_organization_email: DataTypes.STRING,
			applicant_name: DataTypes.STRING,
			applicant_address: DataTypes.TEXT,
			applicant_date_of_birth: DataTypes.DATE,
			applicant_email_address: DataTypes.STRING,
			applicant_telephone_number: DataTypes.STRING,
			competence_category: DataTypes.STRING,
			competence_line_number: DataTypes.STRING,
			incidental_line_number: DataTypes.STRING,
			high_school: DataTypes.JSONB,
			polytechnic: DataTypes.JSONB,
			university: DataTypes.JSONB,
			professional_qualification: DataTypes.JSONB,
			experience: DataTypes.JSONB,
			applicant_declaration_name: DataTypes.STRING,
			applicant_declaration_date: DataTypes.DATE,
			employer_responsible_charge_name: DataTypes.STRING,
			employer_responsible_charge_date: DataTypes.DATE,
			is_draft: {
				type: DataTypes,
				defaultValue: false
			}
		},
		{
			sequelize,
			modelName: "CompetencyCertificationForm",
			tableName: "CompetencyCertificationForm",
			timestamps: true,
		}
  );
  

	return CompetencyCertificationForm;
};

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CompetencyCertificationLifting extends Model {
        static associate(models) {
            CompetencyCertificationLifting.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
            });
        }
    }

    CompetencyCertificationLifting.init(
        {
            user_id:{
                type: DataTypes.INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
                onDelete: "SET NULL",
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
            // Type of Certification (Multiple Select)
            approved_lift_installer: DataTypes.BOOLEAN,
            work_equipment_operator: DataTypes.BOOLEAN,
            rigger_signaler: DataTypes.BOOLEAN,
            scaffolding_technician: DataTypes.BOOLEAN,
            abseiling_technician: DataTypes.BOOLEAN,

            // Class of Certification (Multiple Select)
            class_of_classification: DataTypes.ENUM("Class a","Class b", "Class 1", "Class 2"),
            

            application_type: DataTypes.ENUM("New Application", "Re-Application"),
            training_start_date: DataTypes.DATE,
            training_completion_date: DataTypes.DATE,
            documentation_available: DataTypes.BOOLEAN,
            exemption_requested: DataTypes.BOOLEAN,

            // Employer Information
            employer_name: DataTypes.STRING,
            employer_address: DataTypes.TEXT,
            employer_quality_certifications: DataTypes.ARRAY(DataTypes.STRING),
            employer_contact_person: DataTypes.STRING,
            employer_contact_phone: DataTypes.STRING,
            employer_contact_email: DataTypes.STRING,

            // Training Organization Information
            training_organization_name: DataTypes.STRING,
            training_method: DataTypes.ENUM("Online", "Classroom", "Field"),
            training_organization_registration_number: DataTypes.STRING,
            training_organization_location: DataTypes.STRING,
            training_organization_quality_certifications: DataTypes.ARRAY(
                DataTypes.STRING
            ),
            training_organization_contact_person: DataTypes.STRING,
            training_organization_contact_email: DataTypes.STRING,
            training_organization_contact_phone: DataTypes.STRING,

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
            high_school: DataTypes.JSONB,
            polytechnic: DataTypes.JSONB,
            university: DataTypes.JSONB,

            // Professional Qualification
            professional_qualifications: DataTypes.ARRAY(DataTypes.JSONB),

            // Experience
            experience_details: DataTypes.ARRAY(DataTypes.JSONB),

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
            uploaded_documents: DataTypes.ARRAY(DataTypes.STRING),
        },
        {
            sequelize,
            modelName: "CompetencyCertificationLifting",
            tableName: "CompetencyCertificationLiftings",
            timestamps: true,
        }
    );

    return CompetencyCertificationLifting;
};
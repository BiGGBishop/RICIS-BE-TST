"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AuthorizationManufacturer extends Model {
    static associate(models) {
		AuthorizationManufacturer.belongsTo(models.User, {
			foreignKey: "user_id",
			as: "user",
		  });
	  AuthorizationManufacturer.belongsTo(models.Categories, {
		foreignKey: "categoryId",
		as: "category",
		});
		AuthorizationManufacturer.belongsTo(models.SubCategories, {
			foreignKey: "subcategoryId",
			as: "subcategory",
		});
		AuthorizationManufacturer.belongsTo(models.Classification, {
			foreignKey: "classificationId",
			as: "classification",
		});
		AuthorizationManufacturer.belongsTo(models.Fee, {
			foreignKey: "feeId",
			as: "fee",
		});   
    }
  }

  AuthorizationManufacturer.init(
    {
			user_id:{
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
			incidentalClassificationId:{
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
			paymentStatus: {
				type: DataTypes.ENUM("unpaid", "paid"),
				allowNull: false,
				defaultValue: "unpaid",
			  },
			  appStatus: {
				type: DataTypes.ENUM("pending", "approved", "rejected", "suspended"),
				allowNull: false,
				defaultValue: "pending",
			  },
			
      boiler_service_classification:{
		type:DataTypes.ENUM(
				"Class A",
				"Class B",
				"Class C",
        		"Class D",
				"Class E",
				"Class F",
				"Class G"	
			),
			defaultValue:"Class A"
		},
		form_name:{
			type: DataTypes.STRING,
			allowNull: true,
		},

      type_of_service:{                                             
				type: DataTypes.ENUM("Nuclear","Non-Nuclear"),
				defaultValue:"Nuclear"
			},
      lifting_service_classification:{
		type:DataTypes.ENUM(
        "Manufacture Crane",
        "Manufacturer Lifting Accessory ",
		"Manufacturer Lift & Escalator",
		"Repairer", 
		"Installer Crane",
		 "Installer Class A",
		 "Installer Class B"
      ),
	  defaultValue:"Manufacture Crane"
	},
			application_type: {
				type: DataTypes.ENUM("New Application", "Re-application"),
				defaultValue:"New Application"
			},                                                                                                                        
			available_for_documentation_review: {
				type:DataTypes.BOOLEAN,
				allowNull:true
			},
			exemption_request:{
				type:DataTypes.BOOLEAN,
				allowNull:"true"
			},

			//company information
			company_name: DataTypes.STRING,
			cac_registration_number:DataTypes.STRING,
			physical_address: DataTypes.TEXT,
			year_of_commencing_business: DataTypes.STRING,
			number_of_employee: DataTypes.INTEGER,


			member_nagobin:{
				type:DataTypes.TEXT,
				allowNull: true
			},                                                                  
			member_leia:{
				type:DataTypes.TEXT,
				allowNull: true
			},
			member_indt:{
				type:DataTypes.TEXT,
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
			technical_supervisor_date_of_birth:{
			type:DataTypes.DATE,
			allowNull:"true"
			},
			technical_supervisor_phonenumber: DataTypes.STRING,

			//Education
			High_school: {
				type: DataTypes.JSONB
			/*	name_of_school:{
					type:DataTypes.STRING,
					allowNull: true,
				},
				date_admitted:{
					type:DataTypes.DATE,
					allowNull: true,
				},
				date_completed:{
					type: DataTypes.DATE,
					allowNull: true,

				},
				qualification:{
					type:DataTypes.STRING,
					allowNull: true,
				}*/
			},
			polytechnic: {
				type: DataTypes.JSONB
				/*name_of_school:{
					type:DataTypes.STRING,
					allowNull: true,
				},
				date_admitted:{
					type:DataTypes.DATE,
					allowNull: true,
				},
				date_completed:{
					type: DataTypes.DATE,
					allowNull: true,
				},
				qualification:{
					type:DataTypes.STRING,
					allowNull: true,
				}*/
			},
			university: {
				type: DataTypes.JSONB
				/*name_of_school:{
					type:DataTypes.STRING,
					allowNull: true,
				},
				date_admitted:{
					type:DataTypes.DATE,
					allowNull: true,
				},
				date_completed:{
					type: DataTypes.DATE,
					allowNull: true,
				},
				qualification:{
					type:DataTypes.STRING,
					allowNull: true,
				}*/
			},
		                              
			professional_qualification_institution: DataTypes.STRING,
			date_of_issue:{ 
				type:DataTypes.DATE,
				allowNull:"true"
			},
			professional_expiration_date:{
				type:DataTypes.DATE,
				allowNull:"true"
			},
			experience_name_of_company:DataTypes.STRING,
			  company_declaration_date:{
				type:DataTypes.DATE,
				allowNull:"true"
			  },
			  company_responsible_charge:DataTypes.STRING,
			joining_date: DataTypes.STRING,
			exit_date:{
				type:DataTypes.DATE,
				allowNull:"true"
			},                                                  
			
			//date_sign: DataTypes.DATE,
			//approval_category: DataTypes.STRING,
			//approval_class: DataTypes.STRING,
			//training_approval_number_ngtan: DataTypes.STRING,
			//director_of_factories: DataTypes.TEXT,
			//date_sign_director_of_factories: DataTypes.DATE,
			companyQualityManual: DataTypes.TEXT,
			operationalProcedures: DataTypes.TEXT,
			companyDocumentation: DataTypes.TEXT,
			documentationQuality: DataTypes.TEXT,
			designerDocumentation: DataTypes.TEXT,
			weldingDocumentation: DataTypes.TEXT,
			ndtDocumentation: DataTypes.TEXT,
			indtDocumentation: DataTypes.TEXT,
			isoCertification: DataTypes.TEXT,
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
			},
    {
      sequelize,
      modelName: "AuthorizationManufacturer",
    }
  );

  return AuthorizationManufacturer;
};
 
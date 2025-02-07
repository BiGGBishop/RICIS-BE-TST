'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AuthorizationApproved extends Model {
    static associate(models) {
		AuthorizationApproved.belongsTo(models.User, {
			foreignKey: "user_id",
			as: "user",
		  });
      AuthorizationApproved.belongsTo(models.Classification, {
        foreignKey: "classificationId",
        as: "classification",
      });
	  AuthorizationApproved.belongsTo(models.Categories, {
        foreignKey: "categoryId",
        as: "category",
    });
    AuthorizationApproved.belongsTo(models.SubCategories, {
        foreignKey: "subcategoryId",
        as: "subcategory",
    });
  
    AuthorizationApproved.belongsTo(models.Fee, {
        foreignKey: "feeId",
        as: "fee",
    });
    }
  }

  AuthorizationApproved.init(
    {
      user_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "users", // Name of the users table
					key: "id",
				},
				onDelete: "SET NULL", // What to do if the referenced users is deleted
				allowNull: false,
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

			
			boiler_pressure_classification:{
				type:DataTypes.ENUM(
				  "Class I",
				"Class II",
				"Class III",
				"Class IV",
				"Class V",
				),
				defaultValue:"Class I"
			},

			
			lifting_equipment_classification: {
			type:DataTypes.ENUM(
			"Class VI",
			"Class VII",
			"Class VIII",
			"Class IX",
			"Class X"
			),
			defaultValue:""
		},
			
      type_of_services:{
				type:DataTypes.ENUM(
					"Nuclear",
					"Non-Nuclear"
				),
				defaultValue:"Nuclear"
			},		

			application_type:{
				type:DataTypes.ENUM(
					"New Application",
					"Re-Application"
				),
				defaultValue:"New Application"
			},
			
			available_for_documentation_review:{
				type: DataTypes.BOOLEAN,
				allowNull:true
			},
			exemption_request:{
				type:DataTypes.BOOLEAN,
				allowNull:true

			},

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
			},
			technical_supervisor_phonenumber: DataTypes.STRING,

			supervisor_high_school: {
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
			supervisor_polytechnic: {
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
		supervisor_university: {
				type: DataTypes.JSONB
				/*name_of_school:{     
					type:DataTypes.DATE,        
					allowNull: true
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
		                               
			supervisor_professional_qualification_institution: DataTypes.STRING,
			supervisor_date_of_issue:{
				type:DataTypes.DATE,
				allowNull:true
			},
			supervisor_professional_expiration_date:{
				type:DataTypes.DATE,
				allowNull:true
			},
			supervisor_experience_name_of_company:DataTypes.STRING,
			supervisor_joining_date: DataTypes.STRING,
      supervisor_exit_date:DataTypes.STRING,



      //approved inspector
      approved_inspector_name: DataTypes.STRING,
      approved_inspector_address: DataTypes.TEXT,
      approved_inspector_email: DataTypes.STRING,
      approved_inspector_date_of_birth:{
		type:DataTypes.DATE,
		allowNull:true
	},
      approved_inspector_phonenumber: DataTypes.STRING,

			//Education
		  inspector_high_school: {
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
			inspector_polytechnic: {
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
      inspector_university: {
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
		                              
		inspector_professional_qualification_institution: DataTypes.STRING,
		inspector_date_of_issue:{
			type:DataTypes.DATE,
			allowNull:true
		}, 
		inspector_professional_expiration_date:{
			type:DataTypes.DATE,
			allowNull:true
		},
		inspector_experience_name_of_company:DataTypes.STRING,
		inspector_joining_date: DataTypes.STRING,
    inspector_exit_date:DataTypes.STRING,
    company_declaration_date:{
		type:DataTypes.DATE,
		allowNull:true
	},
	company_responsible_charge:DataTypes.STRING,                                               
		companyQualityManual: {
        type: DataTypes.TEXT,                                                                                     
        allowNull: true,
      },             
      operationalProcedures: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      companyDocumentation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
     
      documentationSupervisor: {
        type: DataTypes.TEXT,
        allowNull: true,
      },             

      documentationInspector: {
        type: DataTypes.TEXT,
        allowNull: true,
      },       
      isoCertification: {
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
      modelName: 'AuthorizationApproved',
      tableName: 'AuthorizationApproveds',
      timestamps: true,
    }
  );

  return AuthorizationApproved;
};
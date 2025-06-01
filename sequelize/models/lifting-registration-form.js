const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LiftingEquipmentRegistration extends Model {
    static associate(models) {
      LiftingEquipmentRegistration.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      LiftingEquipmentRegistration.belongsTo(models.Fee, {
        foreignKey: "feeId",
        as: "fee",
      });
      LiftingEquipmentRegistration.belongsTo(models.Classification, {
        foreignKey: "classificationId",
        as: "classification",
      });
      LiftingEquipmentRegistration.belongsTo(models.SubCategories, {
        foreignKey: "subcategoryId",
        as: "subcategory",
      });
      LiftingEquipmentRegistration.belongsTo(models.Categories, {
        foreignKey: "categoryId",
        as: "category",
      });
    }
  }

  LiftingEquipmentRegistration.init(
    {
      // Application Details
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
        allowNull: true,
      },
			application_type: DataTypes.ENUM("Fresh Application", "Renewal Application"),
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
			classificationId:{
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
				  model: 'classifications',
				  key: 'id',
				},
				onDelete: 'SET NULL',
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
      
     
      type_of_installation:{
        type:DataTypes.ENUM("Lifts", "Escalator", "Hoist"),
        allowNull: true
      },
      type_of_facility:{
        type:DataTypes.STRING,
      },
      object_use:{
        type: DataTypes.ENUM("Personnel", "Material", "Other"),
        allowNull: true
      },
      installation_type: {
       type: DataTypes.ENUM("New Installation", "Existing Installation"),
       allowNull: true
      },
      installation_start_date:{
        type: DataTypes.DATE,
        allowNull: true
      },
      installation_completion_date:{
        type: DataTypes.DATE,
        allowNull: true
      },
      data_reports_available:{
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull:true
      } ,
      variance_requested:{
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull:true
      },

      // Company Performing Installation
      installer_name:{
        type:DataTypes.STRING,
        allowNull: true
      }, 
      installer_address:{
        type: DataTypes.TEXT,
        allowNull: true

      },
      installer_authorization_number:{
        type: DataTypes.STRING,
        allowNull: true,
      }, 
      installer_quality_certifications:{
        type: DataTypes.STRING,
        allowNull: true
      },
      installer_contact_person: {
        type: DataTypes.STRING,
        allowNull: true
      },
      installer_contact_telephone:{
        type: DataTypes.STRING,
        allowNull: true
      }, 

      installer_contact_email:{
        type: DataTypes.STRING,
        allowNull:true
      },

      // Lifting Equipment Owner Information
      owner_name:{
        type: DataTypes.STRING,
        allowNull: true
      },
      nature_of_manufacturing:{
        type: DataTypes.STRING,
        allowNull: true
      } ,
      factory_registration_number:{
        type: DataTypes.STRING,
        allowNull: true
      },
      location_of_facility:{
        type: DataTypes.TEXT,
        allowNull: true
      },
      owner_quality_certifications:{
        type: DataTypes.STRING,
        allowNull: true
      },
      owner_contact_person:{
        type: DataTypes.STRING,
        allowNull: true
      },
      owner_contact_telephone:{
        type: DataTypes.STRING,
        allowNull: true
      },
      owner_contact_email:{
        type: DataTypes.STRING,
        allowNull: true
      },

      // Equipment Information
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: true
      },
      manufacture_year_and_place: {
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
      equipment_condition: {
        type: DataTypes.ENUM("New", "Used"),
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
      date_of_test: {
        type: DataTypes.DATE,
        allowNull: true
      },
      tested_capacity: {
        type: DataTypes.STRING,
        allowNull: true
      },
      design_capacity: {
        type: DataTypes.STRING,
        allowNull: true
      },
      swl: {
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
      operating_environment: {
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
      equipment_owner: {
        type: DataTypes.STRING,
        allowNull: true
      },

      // Declaration
      company_responsible_charge:{
        type: DataTypes.STRING,
        allowNull: true
      },

      declaration_date:{
        type: DataTypes.DATE,
        allowNull: true
      },

      // Uploaded Documents
      manufacturers_report_certificate: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    construction_drawings_lifting_equipment: {
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
    accreditation_documents_manufacturer: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    installation: {
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
      modelName: "LiftingEquipmentRegistration",
      tableName: "LiftingEquipmentRegistrations",
      timestamps: true,
    }
  );

  return LiftingEquipmentRegistration;
};
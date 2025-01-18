const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LiftingEquipmentRegistration extends Model {
    static associate(models) {
      LiftingEquipmentRegistration.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  LiftingEquipmentRegistration.init(
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
      type_of_installation: DataTypes.ENUM("Lifts", "Escalator", "Hoist"),
      type_of_facility: DataTypes.STRING,
      object_use: DataTypes.ENUM("Personnel", "Material", "Other"),
      object_use_other: DataTypes.STRING, // For "Other" object use
      installation_type: DataTypes.ENUM("New Installation", "Existing Installation"),
      installation_start_date: DataTypes.DATE,
      installation_completion_date: DataTypes.DATE,
      data_reports_available: DataTypes.BOOLEAN,
      variance_requested: DataTypes.BOOLEAN,

      // Company Performing Installation
      installer_name: DataTypes.STRING,
      installer_address: DataTypes.TEXT,
      installer_authorization_number: DataTypes.STRING,
      installer_quality_certifications: DataTypes.ARRAY(DataTypes.STRING),
      installer_contact_person: DataTypes.STRING,
      installer_contact_telephone: DataTypes.STRING,
      installer_contact_email: DataTypes.STRING,

      // Lifting Equipment Owner Information
      owner_name: DataTypes.STRING,
      nature_of_facility: DataTypes.STRING,
      factory_registration_number: DataTypes.STRING,
      owner_location: DataTypes.TEXT,
      owner_quality_certifications: DataTypes.ARRAY(DataTypes.STRING),
      owner_contact_person: DataTypes.STRING,
      owner_contact_telephone: DataTypes.STRING,
      owner_contact_email: DataTypes.STRING,

      // Equipment Information
      manufacturer: DataTypes.STRING,
      manufacture_year_and_place: DataTypes.STRING,
      code_of_construction: DataTypes.STRING,
      intended_use: DataTypes.STRING,
      equipment_condition: DataTypes.ENUM("New", "Used"),
      inspection_agency: DataTypes.STRING,
      inspection_authorization_number: DataTypes.STRING,
      date_of_test: DataTypes.DATE,
      tested_capacity: DataTypes.STRING,
      design_capacity: DataTypes.STRING,
      swl: DataTypes.STRING,
      equipment_type: DataTypes.STRING,
      equipment_distinctive_number: DataTypes.STRING,
      operating_environment: DataTypes.STRING,
      equipment_category: DataTypes.STRING,
      equipment_sub_category: DataTypes.STRING,
      equipment_classification: DataTypes.STRING,
      equipment_line_number: DataTypes.STRING,
      equipment_incidental_number: DataTypes.STRING,
      equipment_owner: DataTypes.STRING,

      // Declaration
      responsible_charge_name: DataTypes.STRING,
      declaration_date: DataTypes.DATE,

      // Official Use
      application_category: DataTypes.STRING,
      registered_number: DataTypes.STRING,
      director_of_factories: DataTypes.STRING,
      director_signature_date: DataTypes.DATE,

      // Uploaded Documents
      uploaded_documents: DataTypes.ARRAY(DataTypes.STRING),
      is_draft: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
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
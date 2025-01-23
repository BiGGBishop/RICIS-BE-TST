"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  
  up: async (queryInterface, Sequelize) => {

   
  
    await queryInterface.createTable("AuthorizationManufacturers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categoryId: Sequelize.INTEGER,
      subcategoryId: Sequelize.INTEGER,
      classificationId: Sequelize.INTEGER,
      incidentalClassificationId: Sequelize.INTEGER,
      feeId:{
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'fees',
					key: 'id',
				},
				onDelete: 'SET NULL',            
			},
      paymentStatus: {
        type: Sequelize.ENUM("unpaid", "paid"),
        defaultValue:"unpaid"
       
      },
      appStatus: {
        type: Sequelize.ENUM("pending", "approved", "rejected", "suspended"),
       defaultValue:"pending"
      },
      boiler_service_classification: {
        type: Sequelize.ENUM(
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
      form_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type_of_service: {
        type: Sequelize.ENUM("Nuclear", "Non-Nuclear"),
        defaultValue:"Nuclear"
       
      },
      lifting_service_classification: {
        type: Sequelize.ENUM(
         "Manufacture Crane",
    "Manufacturer Lifting Accessory",
    "Manufacturer Lift & Escalator",
    "Repairer",
    "Installer Crane",
    "Installer Class A",
    "Installer Class B"
        ),
        defaultValue:"Manufacture Crane"
        
      },
      application_type: {
        type: Sequelize.ENUM("New Application","Re-application"),
        defaultValue:"New Application"
       
      },
      available_for_documentation_review: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      exemption_request: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cac_registration_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      physical_address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      year_of_commencing_business: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      number_of_employee: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      member_nagobin: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      member_leia: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      member_indt: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      member_other_bodies: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quality_certification: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      competence_category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      competence_line: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      incidental_line: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contact_person: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      telephone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      technical_supervisor_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      technical_supervisor_address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      technical_supervisor_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      technical_supervisor_date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      technical_supervisor_phonenumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      High_school: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      polytechnic: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      university: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      professional_qualification_institution: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_of_issue: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      professional_expiration_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      experience_name_of_company: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      company_declaration_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      company_responsible_charge: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      joining_date: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      exit_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      companyQualityManual: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      operationalProcedures: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      companyDocumentation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      documentationQuality: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      designerDocumentation: {
        type: Sequelize.TEXT,                                 
        allowNull: true,
      },
      weldingDocumentation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ndtDocumentation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      indtDocumentation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      isoCertification: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_draft: {
        type: Sequelize.BOOLEAN,                  
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
                                                                                                                                                        
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("AuthorizationManufacturers");
   
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AuthorizationApproveds', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      subcategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'subcategories',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      classificationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'classifications',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      feeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'fees',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      date_received: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      form_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      boiler_pressure_classification: {
        type: Sequelize.ENUM(
          'Class I',
          'Class II',
          'Class III',
          'Class IV',
          'Class V'
        ),
      },
      lifting_equipment_classification: {
        type: Sequelize.ENUM(
          'Class VI',
          'Class VII',
          'Class VIII',
          'Class IX',
          'Class X'
        ),
      },
      type_of_service: {
        type: Sequelize.ENUM(
          'Nuclear',
          'Non-Nuclear'
        ),
      },
      application_type: {
        type: Sequelize.ENUM(
          'New Application',
          'Re-Application'
        ),
      },
      available_for_documentation_review: {
        type: Sequelize.BOOLEAN,
      },
      exemption_request: {
        type: Sequelize.BOOLEAN,
      },
      company_name: {
        type: Sequelize.STRING,
      }, 
      cac_registration_number: {
        type: Sequelize.STRING,
      },
      physical_address: {
        type: Sequelize.TEXT,
      },
      year_of_commencing_business: {
        type: Sequelize.STRING,
      },
      number_of_employee: {
        type: Sequelize.INTEGER,
      },
      member_nagobin: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      member_leia: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    
      member_other_bodies: {
        type: Sequelize.STRING,
      },
      quality_certification: {
        type: Sequelize.TEXT,
      },
      competence_category: {
        type: Sequelize.STRING,
      },
      competence_line: {
        type: Sequelize.STRING,
      },
      incidental_line: {
        type: Sequelize.STRING,
      },
      contact_person: {
        type: Sequelize.STRING,
      },
      telephone: {
        type: Sequelize.STRING,
      },
      email_address: {
        type: Sequelize.STRING,
      },
      technical_supervisor_name: {
        type: Sequelize.STRING,
      },
      technical_supervisor_address: {
        type: Sequelize.TEXT,
      },
      technical_supervisor_email: {
        type: Sequelize.STRING,
      },
      technical_supervisor_date_of_birth: {
        type: Sequelize.DATE,
      },
      technical_supervisor_phonenumber: {
        type: Sequelize.STRING,
      },
      supervisor_high_school: {
        type: Sequelize.JSONB,
      },
      supervisor_polytechnic: {
        type: Sequelize.JSONB,
      },
      supervisor_university: {
        type: Sequelize.JSONB,
      },
      supervisor_professional_qualification_institution: {
        type: Sequelize.STRING,
      },
      supervisor_date_of_issue: {
        type: Sequelize.DATE,
      },
      supervisor_professional_expiration_date: {
        type: Sequelize.DATE,
      },
      supervisor_experience_name_of_company: {
        type: Sequelize.STRING,
      },                                                                                    
      supervisor_joining_date: {
        type: Sequelize.STRING,
      },
      supervisor_exit_date:{
        type: Sequelize.STRING,
      },
      approved_inspector_name: {
        type: Sequelize.STRING,
      },
      approved_inspector_address: {
        type: Sequelize.TEXT,
      },
      approved_inspector_email: {
        type: Sequelize.STRING,
      },
      approved_inspector_date_of_birth: {
        type: Sequelize.DATE,
      },
      approved_inspector_phonenumber: {
        type: Sequelize.STRING,
      },
      inspector_high_school: {
        type: Sequelize.JSONB,
      },
      inspector_polytechnic: {
        type: Sequelize.JSONB,
      },
      inspector_university: {
        type: Sequelize.JSONB,
      },
      inspector_professional_qualification_institution: {
        type: Sequelize.STRING,
      },
      inspector_date_of_issue: {
        type: Sequelize.DATE,
      },
      inspector_professional_expiration_date: {
        type: Sequelize.DATE,
      },
      inspector_experience_name_of_company: {
        type: Sequelize.STRING,
      },
      inspector_joining_date: {
        type: Sequelize.STRING,
      },
      inspector_exit_date: {
        type: Sequelize.STRING,
      },
      company_declaration_date: {
        type: Sequelize.DATE,
      },
      company_responsible_charge: {
        type: Sequelize.STRING,
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
     
      documentationSupervisor: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      documentationInspector: {
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AuthorizationApproveds');
  },
};

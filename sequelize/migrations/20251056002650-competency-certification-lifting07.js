"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("CompetencyCertificationLiftings", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
                onDelete: "SET NULL",
                allowNull: true,
            },
            date_received: Sequelize.DATE,
            form_number: {
              type: Sequelize.STRING,
              defaultValue: "RICS-A-07"
            },
            // Type of Certification (Multiple Select)
            approved_lift_installer: {
                type: Sequelize.BOOLEAN,
            },
            work_equipment_operator: {
                type: Sequelize.BOOLEAN,
            },
            rigger_signaler: {
                type: Sequelize.BOOLEAN,
            },
            scaffolding_technician: {
                type: Sequelize.BOOLEAN,
            },
            abseiling_technician: {
                type: Sequelize.BOOLEAN,
            },

            // Class of Certification (Multiple Select)
            class_a: {
                type: Sequelize.BOOLEAN,
            },
            class_b: {
                type: Sequelize.BOOLEAN,
            },
            class_1: {
                type: Sequelize.BOOLEAN,
            },
            class_2: {
                type: Sequelize.BOOLEAN,
            },
            application_type: {
                type: Sequelize.ENUM("New Application", "Re-Application"),
            },
            training_start_date: Sequelize.DATE,
            training_completion_date: Sequelize.DATE,
            documentation_available: Sequelize.BOOLEAN,
            exemption_requested: Sequelize.BOOLEAN,

            // Employer Information
            employer_name: Sequelize.STRING,
            employer_address: Sequelize.TEXT,
            employer_quality_certifications: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            employer_contact_person: Sequelize.STRING,
            employer_contact_phone: Sequelize.STRING,
            employer_contact_email: Sequelize.STRING,

            // Training Organization Information
            training_organization_name: Sequelize.STRING,
            training_method: {
                type: Sequelize.ENUM("Online", "Classroom", "Field"),
            },
            training_organization_registration_number: Sequelize.STRING,
            training_organization_location: Sequelize.STRING,
            training_organization_quality_certifications: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            training_organization_contact_person: Sequelize.STRING,
            training_organization_contact_email: Sequelize.STRING,
            training_organization_contact_phone: Sequelize.STRING,

            // Applicant Information
            applicant_name: Sequelize.STRING,
            applicant_address: Sequelize.TEXT,
            applicant_date_of_birth: Sequelize.DATE,
            applicant_email: Sequelize.STRING,
            applicant_phone: Sequelize.STRING,
            competence_category: Sequelize.STRING,
            competence_line_number: Sequelize.STRING,
            incidental_line_number: Sequelize.STRING,

            // Education
            high_school: {
                type: Sequelize.JSONB,
            },
            polytechnic: {
                type: Sequelize.JSONB,
            },
            university: {
                type: Sequelize.JSONB,
            },

            // Professional Qualification
            professional_qualifications: {
                type: Sequelize.ARRAY(Sequelize.JSONB),
            },

            // Experience
            experience_details: {
                type: Sequelize.ARRAY(Sequelize.JSONB),
            },

            // Declaration
            applicant_declaration_name: Sequelize.STRING,
            applicant_declaration_date: Sequelize.DATE,
            responsible_charge: Sequelize.STRING,
            declaration_date: Sequelize.DATE,

            // Official Use
            exam_registration_number: Sequelize.STRING,
            certification_class_accepted: Sequelize.STRING,
            director_of_factories: Sequelize.STRING,
            director_signature_date: Sequelize.DATE,

            // Uploaded Documents
            uploaded_documents: {
                type: Sequelize.ARRAY(Sequelize.STRING),
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
        await queryInterface.dropTable("CompetencyCertificationLiftings");
    },
}
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("RenewalForms", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
                onDelete: "SET NULL",
                allowNull: true,
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'categories',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            subcategoryId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'subcategories',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            classificationId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'classifications',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            feeId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'fees',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            date_received: {
                type: Sequelize.DATE,
                allowNull: true
            },
            paymentStatus: {
                type: Sequelize.ENUM("unpaid", "paid"),
                defaultValue: "unpaid"

            },
            appStatus: {
                type: Sequelize.ENUM("pending", "approved", "rejected", "suspended"),
                defaultValue: "pending"
            },
            form_number: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            form_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            // Service Classification
            service_classification: {
                type: Sequelize.ENUM(
                    "Equipment Reinstallation",
                    "Certificate of Competence",
                    "Certificate of Authorization",
                ),
                allowNull: true
            },
            object_use: {
                type: Sequelize.ENUM(
                    "Personnel",
                    "Material",
                ),
                allowNull: true
            },


            // Document Check
            documents_available: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            exemption_requested: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },


            // Company Information
            company_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            company_physical_address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            cac_registration_number: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            year_of_commencing_business: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            number_of_employees: {
                type: Sequelize.INTEGER, // Consider INTEGER if it's strictly a number
                allowNull: true,
            },
            membership_of_other_professional_bodies: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            quality_certifications_of_company: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            certificate_number_of_previous_authorization: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            date_of_issue: {
                type: Sequelize.DATE, // Consider DATE if you want to store actual dates
                allowNull: true,
            },
            expiring_date: {
                type: Sequelize.DATE, // Consider DATE if you want to store actual dates
                allowNull: true,
            },
            reason_for_renewal_reinstatement: {
                type: Sequelize.STRING,
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


            //application personnel
            personnel_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            personnel_physical_address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            personnel_cac_registration_number: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            personnel_year_of_commencing_business: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            personnel_number_of_employees: {
                type: Sequelize.INTEGER, // Consider INTEGER if it's strictly a number
                allowNull: true,
            },
            personnel_membership_of_other_professional_bodies: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            personnel_quality_certifications_of_company: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            personnel_certificate_number_of_previous_authorization: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            personnel_date_of_issue: {
                type: Sequelize.DATE, // Consider DATE if you want to store actual dates
                allowNull: true,
            },
            personnel_expiring_date: {
                type: Sequelize.DATE, // Consider DATE if you want to store actual dates
                allowNull: true,
            },
            personnel_reason_for_renewal_reinstatement: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            personnel_competence_category: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            personnel_competence_line: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            personnel_incidental_line: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            personnel_contact_person: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            personnel_telephone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            personnel_email_address: {
                type: Sequelize.STRING,
                allowNull: true,
            },


            // Declaration
            responsible_charge_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            declaration_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },


            // Uploaded Documents
            company_documentation: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            supervisor_documentation: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            inspector_documentation: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            log_book: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            application_letter: {
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

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("RenewalForms");
    }
};
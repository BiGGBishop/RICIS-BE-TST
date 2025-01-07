"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("TrainingOrganizationForm", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: "users", // Name of the users table
					key: "id",
				},
				onDelete: "SET NULL", // Action on user deletion
				allowNull: true,
			},
			date_received: {
				type: Sequelize.DATE,
			},
			authorized_inspector: {
				type: Sequelize.BOOLEAN,
			},
			design_engineer: {
				type: Sequelize.BOOLEAN,
			},
			power_engineer: {
				type: Sequelize.BOOLEAN,
			},
			welding_engineer: {
				type: Sequelize.BOOLEAN,
			},
			refrigerator_engineer: {
				type: Sequelize.BOOLEAN,
			},
			boiler_and_pressure_vessel_operator: {
				type: Sequelize.BOOLEAN,
			},
			pressure_welder: {
				type: Sequelize.BOOLEAN,
			},
			refrigeration_technician: {
				type: Sequelize.BOOLEAN,
			},
			approved_person: {
				type: Sequelize.BOOLEAN,
			},
			lift_technician: {
				type: Sequelize.BOOLEAN,
			},
			crane_operator: {
				type: Sequelize.BOOLEAN,
			},
			forklift_operator: {
				type: Sequelize.BOOLEAN,
			},
			work_equipment_operator: {
				type: Sequelize.BOOLEAN,
			},
			rigger: {
				type: Sequelize.BOOLEAN,
			},
			scaffolding_technician: {
				type: Sequelize.BOOLEAN,
			},
			abseiling_technician: {
				type: Sequelize.BOOLEAN,
			},
			new_application: {
				type: Sequelize.BOOLEAN,
			},
			re_application: {
				type: Sequelize.BOOLEAN,
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
				type: Sequelize.BOOLEAN,
			},
			member_leia: {
				type: Sequelize.BOOLEAN,
			},
			member_indt: {
				type: Sequelize.BOOLEAN,
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
			high_school: {
				type: Sequelize.JSONB,
			},
			polytechnic: {
				type: Sequelize.JSONB,
			},
			university: {
				type: Sequelize.JSONB,
			},
			professional_qualification: {
				type: Sequelize.JSONB,
			},
			professional_qualification_institution: {
				type: Sequelize.JSONB,
			},
			experience: {
				type: Sequelize.JSONB,
			},
			name_of_user: {
				type: Sequelize.STRING,
			},
			company_responsible_charge: {
				type: Sequelize.STRING,
			},
			date_sign: {
				type: Sequelize.DATE,
			},
			approval_category: {
				type: Sequelize.STRING,
			},
			approval_class: {
				type: Sequelize.STRING,
			},
			training_approval_number_ngtan: {
				type: Sequelize.STRING,
			},
			director_of_factories: {
				type: Sequelize.TEXT,
			},
			date_sign_director_of_factories: {
				type: Sequelize.DATE,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("TrainingOrganizationForm");
	},
};

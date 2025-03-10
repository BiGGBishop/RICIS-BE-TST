"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("blogs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            title: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            status: {
                type: Sequelize.ENUM("pending", "approved", "rejected", "suspended"),
                defaultValue: "pending",
            },
            published: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("blogs");
    },
};

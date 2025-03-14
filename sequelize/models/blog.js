"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Blog extends Model {
        static associate(models) {
            Blog.belongsTo(models.User, {
                foreignKey: "user_id",
                as: "user",
            });
        }
    }

    Blog.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
                onDelete: "CASCADE",
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.TEXT,
            },
            image: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.ENUM("pending", "approved", "rejected", "suspended"),
                defaultValue: "pending",
            },
            category: {
                type: DataTypes.ENUM("news", "notice", "circular", "order"),
                defaultValue:"news",
            },
            published: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "Blog",
            tableName: "blogs",
            timestamps: true,
        }
    );

    return Blog;
};

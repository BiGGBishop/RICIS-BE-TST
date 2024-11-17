"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Conversation.belongsTo(models.Application, {
        foreignKey: "applicationId",
      });
      Conversation.belongsTo(models.User, {
        foreignKey: "userId",
        as:"userdetails"

      });
      Conversation.belongsTo(models.AdminStaff, {
        foreignKey: "adminId",
        as:"admindetails"
      });
    }
  }
  Conversation.init(
    {
      adminId: {
        type: DataTypes.INTEGER,
        references: {
          model: "adminstaffs", // Name of the admnstatffs table
          key: "id",
        },
        onDelete: "SET NULL", // What to do if the referenced users is deleted
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users", // Name of the users table
          key: "id",
        },
        onDelete: "SET NULL", // What to do if the referenced users is deleted
        allowNull: true,
      },
      applicationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "applications", // Name of the users table
          key: "id",
        },
        onDelete: "SET NULL", // What to do if the referenced users is deleted
        allowNull: true,
      },
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Conversation",
      tableName: "conversations",
    }
  );
  return Conversation;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdminStaff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AdminStaff.belongsTo(models.UserRole, {
        foreignKey: "userroleId", // This will create the foreign key in the 'User' table
        as: "userrole", // Alias for the association
      });
      AdminStaff.hasMany(models.Conversation, {
        foreignKey: "adminId", // or use polymorphic association
        as: "admindetails",
      });
    }
  }
  AdminStaff.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      full_name: DataTypes.STRING,
      ref_number: DataTypes.STRING,
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      userroleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "userroles", // Name of the Auth table
          key: "id",
        },
        onDelete: "SET NULL", // What to do if the referenced Auth is deleted
        allowNull: true,
      },
      user_status: {
        type: DataTypes.ENUM("pending", "approved", "rejected", "suspended"), // Define ENUM with the possible values
        allowNull: true, // You can also make it required by using allowNull: false
        defaultValue: "pending", // Set the default value
      },
      payment_status: {
        type: DataTypes.ENUM("unpaid", "paid"), // Define ENUM with the possible values
        allowNull: true, // You can also make it required by using allowNull: false
        defaultValue: "unpaid", // Set the default value
      },
    },
    {
      sequelize,
      modelName: "AdminStaff",
      tableName: "adminstaffs",
    }
  );
  return AdminStaff;
};

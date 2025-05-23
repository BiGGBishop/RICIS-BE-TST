"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    //  */
    static associate(models) {                                                                                                                 
      // define association here
      User.belongsTo(models.UserRole, {             
        foreignKey: "userroleId", // This will create the foreign key in the 'User' table               
        as: "userrole", // Alias for the association
      });                       
      User.hasMany(models.Application, {
        foreignKey: "userId", // Foreign key in the Application model
        as: "applications", // Alias for the association
      });
      User.hasMany(models.Conversation, {
        foreignKey: 'userId', // or use polymorphic association
        as: 'userdetails',
      });
    }
  } 
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      company_name: DataTypes.STRING,
      company_location: DataTypes.STRING,
      company_email: DataTypes.STRING,
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      completion_percent: DataTypes.INTEGER,
      isFeedBackReceived:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userroleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "userroles", // Name of the Auth table
          key: "id",
        },
        onDelete: "SET NULL", // What to do if the referenced Auth is deleted
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};

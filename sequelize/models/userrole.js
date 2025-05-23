'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserRole.hasOne(models.User, {
        foreignKey: 'userroleId',     // The foreign key in the 'User' model
        as: 'user',               // Alias for the association
      });

         // Association with AdminStaff model
      UserRole.hasOne(models.AdminStaff, {
        foreignKey: 'userroleId',   // The foreign key in the 'AdminStaff' model
        as: 'adminstaff',           // Alias for the association
      });

    }
  } 
  UserRole.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserRole',
    tableName: "userroles",

  });
  return UserRole;
};
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      Report.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }

  Report.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
        allowNull: true,
      },
      inspection_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Company_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      equipment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      serial_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      report: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      certificate_image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      certificate_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expiry_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected", "suspended","paid","unpaid"),
      },
      is_draft: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Report",
      tableName: "Reports",
      timestamps: true,
    }
  );

  return Report;
};
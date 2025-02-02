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
      },
      Company_name: {
        type: DataTypes.STRING,
      },
      equipment: {
        type: DataTypes.STRING,
      },
      serial_no: {
        type: DataTypes.STRING,
      },
      report: {
        type: DataTypes.TEXT, // Assuming a file path or URL
      },
      certificate_image: {
        type: DataTypes.TEXT, // Assuming a file path or URL
      },
      certificate_number: {
        type: DataTypes.STRING,
      },
      expiry_date: {
        type: DataTypes.DATE,
      },
      status: {
				type: DataTypes.ENUM("pending", "approved", "rejected", "suspended"),
				defaultValue:"pending"  
			  },
        is_draft: {
          type: DataTypes.BOOLEAN,                  
          defaultValue: false,
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
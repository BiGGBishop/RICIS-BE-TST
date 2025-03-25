module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        user_id: {
            type: DataTypes.INTEGER,
          },
      
        form_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      form_name:{
       type: DataTypes.STRING, 
      },
      rrr: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      billerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      statutoryFees: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      totalFees: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      transactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    }, {
      timestamps: true,
      createdAt: 'transactionDate',
      updatedAt: false,
    });
  
    return Transaction;
  };
  
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Transactions', {
            id: {
                type: Sequelize.INTEGER, // Change to INTEGER for auto-increment
                autoIncrement: true, // Enable auto-increment
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
                onDelete: "SET NULL",
                allowNull: true,
            },
            form_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            form_name: {
                type: Sequelize.STRING,
            },
            rrr: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            billerName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            payerName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            payerEmail: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            statutoryFees: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            totalFees: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            transactionDate: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Transactions');
    }
};

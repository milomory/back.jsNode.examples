
const { sequelize, DataTypes } = require('./sequelize')

const Count = sequelize.define('count', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    countStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = { Count };

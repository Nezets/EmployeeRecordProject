const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const skill = sequelize.define("skill", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
});

module.exports = skill;
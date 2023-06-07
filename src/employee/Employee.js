const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define("employee", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    dob: {
        type: DataTypes.DATEONLY,
    },
    email: {
        type: DataTypes.STRING,
    },
    skill_id: {
        //todo: Turn into foreign key
        type: DataTypes.UUID,
    },
    active: {
        type: DataTypes.BOOLEAN,
    },
    age: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Employee;
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DIALECT,
    host: process.env.DB_PATH, 
    logging: console.log, 
})

module.exports = sequelize;
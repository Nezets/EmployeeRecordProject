const { Sequelize } = require('sequelize');
const config = require('config');

const configuration = config.get("database");

const sequelize = new Sequelize(configuration.db, configuration.username, configuration.password, {
  dialect: "sqlite",
  host: "./db/db.sqlite",
  logging: console.log,
})

module.exports = sequelize;
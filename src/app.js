const express = require("express");

const UserRouter = require('./user/UserRouter');
const EmployeeRouter = require('./employee/EmployeeRouter');
const ErrorHandler = require('./error/ErrorHandler');

const app = express();
app.use(express.json());

app.use(UserRouter);
app.use(EmployeeRouter);
app.use(ErrorHandler);

module.exports = app;
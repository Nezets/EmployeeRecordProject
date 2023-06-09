const cookieParser = require("cookie-parser");
const express = require("express");

const UserRouter = require('./user/UserRouter');
const EmployeeRouter = require('./employee/EmployeeRouter');
const SkillRouter = require('./skills/SkillRouter');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(UserRouter);
app.use(EmployeeRouter);
app.use(SkillRouter);

module.exports = app;
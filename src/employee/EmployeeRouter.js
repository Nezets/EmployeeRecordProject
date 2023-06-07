const express = require('express');
const Employee = require('./Employee');
const router = express.Router();
const EmployeeService = require('./EmployeeService');

router.get('/employees', async (req, res) => {
    const employeeList = await EmployeeService.getEmployees();
    res.send(employeeList);
});

router.get('/employees/:id', async (req, res) => {
    try {
        const employee = await EmployeeService.getEmployee(req.params.id);
        res.send(employee);
    } catch (err) {
        console.log(err)
        return res.status(401).send({ message: 'Failed to get Employee. ' });
    }
});

module.exports = router;
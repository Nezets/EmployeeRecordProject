const express = require('express');
const router = express.Router();
const EmployeeService = require('./EmployeeService');

router.post('/employees', async (req, res) => {
    await EmployeeService.createEmployee(req.body)
        .then(() => {
            res.status(201).send({ message: "Successfully added employee. " })
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ message: "Error when accessing database. Failed to add employee." });
        });
})

router.get('/employees', async (req, res) => {
    const employeeList = await EmployeeService.getEmployees()
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Error when accessing database. Failed to get employee list." });
        });
    res.status(200).send(employeeList);
});

router.get('/employees/:id', async (req, res) => {
    const employee = await EmployeeService.getEmployee(req.params.id)
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Error when accessing database. Failed to get employee." });
        });
    res.status(200).send(employee);
});

router.put('/employees/:id', async (req, res) => {
    await EmployeeService.updateEmployee(req.params.id, req.body)
        .then(() => {
            res.status(200).send({ message: "Successfully updated employee. " })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Error when accessing database. Failed to update employee." });
        });
});

router.delete('/employees/:id', async (req, res) => {
    await EmployeeService.deleteEmployee(req.params.id)
        .then(() => {
            res.status(200).send({ message: "Successfully deleted employee. " })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Error when accessing database. Failed to update employee." });

        });
});

module.exports = router;
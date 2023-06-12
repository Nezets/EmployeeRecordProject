const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const EmployeeService = require('./EmployeeService');

dotenv.config();

const verifyJwt = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (decoded) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        //console.log(err);
        return false;
    }
}

router.post('/employees', async (req, res) => {
    const employeeId = await EmployeeService.createEmployee(req.body)
        .catch(err => {
            console.log(err);
            res.status(400).send({ message: "Error when accessing database. Failed to add employee." });
        });

    res.status(201).send({ message: "Successfully added employee. ", id: employeeId })
})

router.get('/employees', async (req, res) => {
    const token = req.cookies.token;
    if (verifyJWT(token) === false) {
        return res.status(401).send({ message: "Failed to authenticate. Invalid token." });
    }

    const employeeList = await EmployeeService.getEmployees()
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Error when accessing database. Failed to get employee list." });
        });
    res.status(200).send(employeeList);
});

router.get('/employees/:id', async (req, res) => {
    const token = req.cookies.token;
    if (verifyJwt(token) === false) {
        return res.status(401).send({ message: "Failed to authenticate. Invalid token." });
    }

    const employee = await EmployeeService.getEmployee(req.params.id)
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Error when accessing database. Failed to get employee." });
        });
    res.status(200).send(employee);
});

router.put('/employees/:id', async (req, res) => {
    const token = req.cookies.token;
    if (verifyJwt(token) === false) {
        return res.status(401).send({ message: "Failed to authenticate. Invalid token." });
    }

    const updatedEmployee = await EmployeeService.updateEmployee(req.params.id, req.body)
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Error when accessing database. Failed to update employee." });
        });

    res.status(200).send({ message: "Successfully updated employee. ", employee: updatedEmployee})
});

router.delete('/employees/:id', async (req, res) => {
    const token = req.cookies.token;
    if (verifyJwt(token) === false) {
        return res.status(401).send({ message: "Failed to authenticate. Invalid token." });
    }

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
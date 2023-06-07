const Employee = require('./Employee');

const createEmployee = async (body) => {
    const {first_name, last_name, dob, email, skill_ID, active, age } = body;
    await Employee.create({
        first_name,
        last_name,
        dob,
        email,
        skill_ID, 
        active,
        age
    });
}

const getEmployees = async () => {
    const employeeList = await Employee.findAll();
    return { employeeList };
}

const getEmployee = async (id) => {
    const employee = await Employee.findOne({
        where: { id: id },
    })
    return employee;
}

module.exports = {
    createEmployee,
    getEmployee,
    getEmployees,
}
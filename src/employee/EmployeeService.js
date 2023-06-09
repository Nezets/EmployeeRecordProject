const Employee = require('./Employee');

const createEmployee = async (body) => {
    const {first_name, last_name, dob, email, skill_id, active, age } = body;
    const newEmployee = await Employee.create({
        first_name,
        last_name,
        dob,
        email,
        skill_id, 
        active,
        age
    });

    return newEmployee.id;
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

const updateEmployee = async (id, body) => {
    const { first_name, last_name, dob, email, skill_id, active, age } = body;
    await Employee.update(
        {
            first_name: first_name,
            last_name: last_name,
            dob: dob,
            email: email,
            skill_id: skill_id,
            active: active,
            age: age,
        },
        {
            where: { id, id },
        }
    )

    const updatedEmployee = await Employee.findOne({ where: { id: id } });
    return updatedEmployee.dataValues;
}

const deleteEmployee = async (id) => {
    await Employee.destroy({
        where: { id: id },
    })
}


module.exports = {
    createEmployee,
    getEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
}
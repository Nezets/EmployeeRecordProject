const sequelize = require('./src/config/database');
const app = require('./src/app');
const UserService = require('./src/user/UserService');
const EmployeeService = require('./src/employee/EmployeeService');
const SkillService = require('./src/skills/SkillService');

console.log("Debug Dev Mode. ");
sequelize.sync({ force: true }).then(async () => {
    for (let i = 1; i <= 5; i++) {
        const user = {
            username: `user${i}`,
            password: 'P4ssword'
        }
        const employee = {
            first_name: `John${i}`,
            last_name: `Doe${i}`,
            dob: `200${i}-${i}-${i}`,
            email: `user${i}@mail.com`,
            active: (i % 2 === 0),
            age: (i+18),
        }
        const skill = {
            name: `skill${i}`,
            description: `Description for skill${i}`,
        }

        await UserService.createUser(user);
        await EmployeeService.createEmployee(employee);
        await SkillService.createSkill(skill);
    }
});

app.listen(3000, () => {
  console.log("app is running in mode: ", process.env.NODE_ENV);
});

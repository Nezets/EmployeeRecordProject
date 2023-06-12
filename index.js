const sequelize = require('./src/config/database');
const app = require('./src/app');
const dotenv = require('dotenv');
const UserService = require('./src/user/UserService');
const EmployeeService = require('./src/employee/EmployeeService');
const SkillService = require('./src/skills/SkillService');

dotenv.config();

if (process.env.DEBUG === true) {
    console.log("Debug Dev Mode. ");
    console.log("Generating testing data. ");
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
                active: (i % 3 > 0),
                age: (i + 18),
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
} else {
    console.log("Syncing server with database. ");
    sequelize.sync();
    console.log("Syncing complete. ");
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Backend API and Database server is running");
});

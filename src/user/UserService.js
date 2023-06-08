const User = require('./User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const createUser = async (body) => {
  const { username, password } = body;
  const hashedPassword = await bcrypt.hash(password, 8);
  await User.create({ username, password: hashedPassword});
}

const getUsers = async () => {
  const userList = await User.findAll();
    return { userList };
}

const getUser = async (id) => {
  const user = await User.findOne({
    where: {id: id},
  });
  if(!user) {
    throw new UserNotFoundException();
  }
  return user;
}

const updateUser = async (id, username, password) => {
    await User.update(
        {
            username: username,
            password: await bcrypt.hash(password, 8),
        },
        {
            where: { id, id },
        }
    )

}

const deleteUser = async (id) => {
    await User.destroy({
        where: {id: id},
    })
}

const authenticate = async (username, password) => {
    const hashedPassword = bcrypt.hash(password, 8);
    const user = await User.findOne({
        where: {
            username: username,
            password: hashedPassword,
        },
    })
        .then(() => {
            //todo: Generate JWT

            return user;
        }).catch((err) => {
            console.log(err);
            return err;
        });
}

const checkLoginInfo = async (username, password) => {
    const hashedPassword = bcrypt.hash(password, 8);
    const user = await User.findOne({
        where: {
            username: username,
            password: hashedPassword,
        },
    })

    if (user == null) {
        return false; 
    } else {
        return true;
    }
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
}
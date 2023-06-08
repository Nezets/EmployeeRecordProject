const express = require('express');
const router = express.Router();
const UserService = require('./UserService');

router.post('/api/Authenticate', async (req, res) => {
    //todo: everything
});

router.post('/users', async (req, res) => {
    await UserService.createUser(req.body)
        .then(() => {
            res.status(201).send({ message: "Successfully added user. " })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Error when accessing database. Failed to add user." });
        });
})

router.get('/users', async (req, res) => {
    const userList = await UserService.getUsers()
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Error when accessing database. Failed to get employee list." });
        });

    res.status(200).send(userList);
})

router.get('/users/:id', async (req, res) => {
    const user = await UserService.getUser(req.params.id)
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Error when accessing database. Failed to get employee." });
        });

    res.status(200).send(user);
})


router.put('/users/:id', async (req, res) => {
    await UserService.updateUser(req.params.id, req.body.username, req.body.password)
        .then(() => {
            res.status(200).send({ message: "Successfully updated employee. " })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Error when accessing database. Failed to update employee." });
        });
})

router.delete('/users/:id', async (req, res) => {
    try {
        await UserService.deleteUser(req.params.id);
        res.status(200).send({ message: "Successfully deleted user. " });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error when trying to delete user from database. Failed to delete user." })
    }

})

module.exports = router;
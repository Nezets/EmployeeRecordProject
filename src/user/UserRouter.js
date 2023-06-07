const express = require('express');
const User = require('./User');
const router = express.Router();
const idNumberControl = require('../shared/idNumberControl');
const UserService = require('./UserService');
const basicAuthentication = require('../shared/basicAuthentication');


router.post('/api/Authenticate', async (req, res) => {
    const username = req.body.username;
});

router.get('/users', async (req, res) => {
  const page = await UserService.getUsers();
  res.send(page);
})

router.get('/users/:id', idNumberControl, async (req, res, next) => {
  try {
    const user = await UserService.getUser(req.params.id);
    res.send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

router.put('/users/:id', idNumberControl, basicAuthentication, async (req, res) => {
  const authenticatedUser = req.authenticatedUser;
  if(!authenticatedUser) {
    return res.status(403).send({message: 'Forbidden'});
  }

  const id = req.params.id;
  
  if(authenticatedUser.id != id) {
    return res.status(403).send({message: 'Forbidden'});
  }
  const user = await User.findOne({where: {id: id}});
  user.username = req.body.username;
  await user.save();
  res.send('updated');
})

router.delete('/users/:id', idNumberControl, basicAuthentication, async (req, res) => {
  const authenticatedUser = req.authenticatedUser;
  if(!authenticatedUser) {
    return res.status(403).send({message: 'Forbidden'});
  }

  const id = req.params.id;
  
  if(authenticatedUser.id != id) {
    return res.status(403).send({message: 'Forbidden'});
  }
  await User.destroy({where: {id: id}});
  res.send('removed');
})



module.exports = router;
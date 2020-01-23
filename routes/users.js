const router = require('express').Router();

const users = require('../data/users.json');

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/users/:_id', (req, res) => {
  const id = req.params;

  let user = users.find(item => item._id === id._id);

  if (!user) {
    res.statusCode = 400;
    res.send({ message: 'Нет пользователя с таким id' });
    return;
  }

  res.send(users);
});

module.exports = router;

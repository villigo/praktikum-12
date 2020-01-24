const router = require('express').Router();

const users = require('../data/users.json');

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/users/:id', (req, res) => {
  const id = req.params;

  const user = users.find((item) => item._id === id.id);

  if (!user) {
    res.statusCode = 404;
    res.send({ message: 'Нет пользователя с таким id' });
    return;
  }

  res.send(user);
});

module.exports = router;

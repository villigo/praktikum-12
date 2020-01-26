const path = require('path');
const router = require('express').Router();
const fsp = require('fs').promises;

async function getUsers() {
  const pathToFile = path.join(__dirname, '../data/users.json');

  return fsp.readFile(pathToFile, 'utf8')
    // Обращаю внимание, что try/catch в данном случае не нужен, т.к. промисы
    // под капотом содержат обработку ошибок, и если в JSON.parse что-то пойдет
    // не так промис просто заREJECTится.
    .then((data) => [JSON.parse(data), null])
    .catch((err) => [null, err]);
}

router.get('/users', async (req, res) => {
  // Деструктуризация массива
  const [users, error] = await getUsers();

  if (error) {
    // Можно отправлять разные сообщения в зависимости от error.code
    return res.status(500).json({ message: 'Что-то пошло не так' });
  }
  return res.json(users);
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const [users, error] = await getUsers();

  if (error) {
    return res.status(500).json({ message: 'Что-то пошло не так' });
  }
  for (let i = 0; i < users.length; i += 1) {
    // eslint-disable-next-line no-underscore-dangle
    if (users[i]._id === id) {
      return res.json(users[i]);
    }
  }
  return res.status(404).json({ message: 'Нет пользователя с таким id' });
});

module.exports = router;

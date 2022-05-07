const router = require('express').Router();
const dbConn = require('../config/db.config')

router.get('/users', async (req, res) => {
  try {
    const result = await dbConn.query('select * from users order by id asc')
    res.send(result.rows)
    // res.send({ message: 'Ok api is working 🚀' });

  } catch (err) {
    res.send(err.message)
    console.error(err.message);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const result = await dbConn.query(`insert into users(name, email, password) values('${req.body.name}', '${req.body.email}', '${req.body.password}')`);
    res.send(`Data ${result.command}ED successfully.`)

  } catch (err) {
    res.send(err.message)
    console.error(err.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await dbConn.query(`select * from users where email='${req.body.email}' and password='${req.body.password}'`)
    res.send(result.rows)

  } catch (err) {
    res.send(err.message)
    console.error(err.message);
  }
});

router.patch('/change_password/:id', async (req, res) => {
  try {
    const result = await dbConn.query(`update users set password='${req.body.password}' where id=${req.params.id}`)
    res.send(`Data ${result.command}D successfully.`)

  } catch (err) {
    res.send(err.message)
    console.error(err.message);
  }
});

router.put('/update_user/:id', async (req, res) => {
  try {
    const result = await dbConn.query(`update users set name='${req.body.name}', email='${req.body.email}', password='${req.body.password}' where id=${req.params.id}`)
    res.send(`Data ${result.command}D successfully.`)

  } catch (err) {
    res.send(err.message)
    console.error(err.message);
  }
});

router.delete('/delete_user/:id', async (req, res) => {
  try {
    const result = await dbConn.query(`delete from users where id=${req.params.id}`)
    res.send(`The data ${result.command}D.`)

  } catch (err) {
    res.send(err.message)
    console.error(err.message)

  }
})

module.exports = router;

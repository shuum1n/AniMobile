if (process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}

const express = require('express')
const app = express()
const port = 4001
const { connect, getDatabase } = require('./config/mongodb');
const Controller = require('./controllers/index');

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/users', Controller.findAll);
app.post('/users', Controller.createOne)
app.get('/users/:id', Controller.findById);
app.delete('/users/:id', Controller.deleteUser)

connect()
    .then((result) =>
    {
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    }).catch((err) =>
    {
        console.log(err);
    });

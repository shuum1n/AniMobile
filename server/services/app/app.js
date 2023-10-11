if (process.env.NODE_ENV !== "production")
{
    require('dotenv').config();
}

const express = require('express')
const app = express()
const router = require('./routes');
const port = 4002   
const cors = require('cors');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
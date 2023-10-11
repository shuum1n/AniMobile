const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');



app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
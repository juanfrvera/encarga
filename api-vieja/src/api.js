const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())
app.use(express.json());

// heroku port, 3000 if we are local
const port = process.env.PORT ?? 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const itemRoute = require('./route/item.route');
app.use(itemRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
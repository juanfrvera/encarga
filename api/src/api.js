const express = require('express')
const app = express()

// heroku port, 3000 if we are local
const port = process.env.PORT ?? 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const itemRoute = require('./route/item.route');
app.use(itemRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
const express = require('express')
const app = express()


// heroku port, 3000 if we are local
const port = process.env.PORT ?? 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
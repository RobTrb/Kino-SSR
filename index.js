import express from 'express'
import fs from 'fs/promises'

const app = express()

//test get function with a query paramaters in url
app.get('/', async (request, response) => {
  const buf = await fs.readFile('./index.html')
  const text = buf.toString()
  response.send(text)
})

//app.use('/dist', express.static('./dist'));
//app.use('/Script', express.static('./Script'));
app.use('/', express.static('./'))

app.listen(5080)

console.log('Server started and listening on port 5080')

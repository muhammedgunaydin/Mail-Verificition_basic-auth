const express = require('express')
const mongoose = require('mongoose')
const volleyball = require('volleyball')
const cors = require('cors')
const authRouter = require('./routers/authRouter')
const app = express()
require('dotenv').config()
const hash = require('./hash/hash')
const User = require('./models/User')

let db_conn = process.env.DB_CONN
let port = process.env.PORT

mongoose
  .connect(db_conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected successfully')
  })

app.use(volleyball)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', authRouter)

app.use('/verify/:hash/:id', async (req, res) => {
  if (req.params.hash !== hash(req.params.id))
    return res.status(404).send('Page not found')

  const user = await User.findById(req.params.id)
  user.status = true
  user.save()
  res.send('Hesap Doğrulandı')
  console.log('Verified')
})

app.listen(port, () => {
  console.log(`App started on port ${port}`)
})
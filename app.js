const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000;

app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/ping', (req,res,next) => {
  res.status(200).send({ message: "pong!"})
})

app.use(function(req, res, next){
  const status = 404
  const message = `Could not ${req.method} ${req.url}`

  next({status, message})
})

app.use((err, req, res, next) => {
  console.error(err)
  const errorToSendBack = {}

  errorToSendBack.status = err.status || 500
  errorToSendBack.message = err.message || `Something went wrong`

  if(process.env.NODE_ENV !== "production"){
    errorToSendBack.stack = error.stack
  }

  res.status(errorToSendBack.status).send(errorToSendBack)
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener);

//
// app.disable('x-powered-by')
//

const express = require('express');
const {router} = require('./src/router');
const cors = require('cors')

const app = express()

app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(router)

app.listen(3030, ()=>{console.log('Server online');})
const express = require('express');
const app = express();
const swapi =  require('./swapi-call');


app.use('/swapi', swapi);

app.listen(4100 , () => console.log('Server started at port 4100'));
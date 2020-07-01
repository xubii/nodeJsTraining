const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const baseRoutes = require('./src/routes');

app.use(bodyParser.json());
app.use('', baseRoutes);

//app.use(() => errorHandler);

app.listen(4000, () => console.log('listening on port 4000'));

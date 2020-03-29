const express = require('express');
const app = express();
const { notMatchRouter, handleError } = require('../apps/middlewares')

require("express-group-routes");

require('../apps/kernel')(app);

app.use('/api', require('../routes/api'));
app.use('/', require('../routes/web'));

app.use('*', notMatchRouter);
app.use(handleError)


module.exports = app;
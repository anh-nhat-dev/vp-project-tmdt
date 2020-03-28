const express = require('express');
const app = express();
require("express-group-routes");

require('../apps/kernel')(app);

app.use('/api', require('../routes/api'));
app.use('/', require('../routes/web'));


module.exports = app;
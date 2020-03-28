const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const connectMongo = require('../libs/connect-mongo')

module.exports = function(app) {
    app.set("view engine", config.get("views.engine"));
    app.set("views", config.get("views.path"))

    app.use('/static', express.static(config.get('app.static_folder')))

    app.use(bodyParser.urlencoded({ extended: true }));

    connectMongo.connectMongoDb();
}
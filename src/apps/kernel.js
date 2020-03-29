const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const connectMongo = require('../libs/connect-mongo');
const session = require("express-session");
const { categoryProvider } = require('./middlewares')

module.exports = function(app) {
    app.set("view engine", config.get("views.engine"));
    app.set("views", config.get("views.path"))

    app.use('/static', express.static(config.get('app.static_folder')))

    app.use(bodyParser.urlencoded({ extended: true }));

    connectMongo.connectMongoDb();
    app.use(categoryProvider);

    //  Config Express Session
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }))
}
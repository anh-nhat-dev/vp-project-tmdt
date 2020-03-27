#! /usr/bin/node

const app = require('../bootstrap/app');
const config = require('config');

const port = config.get('app.port');

const server = app.listen(port, onListening);

function onListening() {
    console.log(`Server listening on port: ${port}`)
}
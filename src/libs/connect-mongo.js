const mongoose = require('mongoose');
const config = require('config');

module.exports.connectMongoDb = function() {
    mongoose.connect(config.get('db.mongodb.uri'), config.get("db.mongodb.option"))
        .then(function() {
            console.log('Connect to mongodb successfully')
        })
        .catch(function(error) {
            console.log(error)
        })

}
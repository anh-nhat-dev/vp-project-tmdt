const mongoose = require('mongoose');
const config = require('config');
const fs = require('fs');
const { join } = require('path');

const modelPath = config.get('db.mongodb.model_path')

function autoLoadModel() {
    fs.readdirSync(modelPath)
        .filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
        .forEach(file => require(join(modelPath, file)));
}

module.exports.connectMongoDb = function() {
    autoLoadModel()
    mongoose.connect(config.get('db.mongodb.uri'), config.get("db.mongodb.option"))
        .then(function() {
            console.log('Connect to mongodb successfully')
        })
        .catch(function(error) {
            console.log(error)
        })

}
const { join } = require('path');
const defer = require('config/defer').deferConfig;


module.exports = {
    app: {
        port: process.env.PORT || 3000,
        static_folder: join(__dirname, '..', 'public')
    },
    views: {
        engine: "ejs",
        path: join(__dirname, '..', 'apps', 'views')
    }
}
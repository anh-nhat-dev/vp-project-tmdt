const { join } = require('path');
module.exports = {
    app: {
        port: process.env.PORT || 3000,
        static_folder: join(__dirname, '..', 'public')
    },
    views: {
        engine: "ejs",
        path: join(__dirname, '..', 'apps', 'views')
    },
    db: {
        mongodb: {
            uri: 'mongodb://127.0.0.1:27017/vietpro-shop',
            option: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            model_path: join(__dirname, '..', 'apps', 'models')
        }
    }

}
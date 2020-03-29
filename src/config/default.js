const { join } = require('path');
module.exports = {
    app: {
        port: process.env.PORT || 3000,
        static_folder: join(__dirname, '..', 'public'),
        root_path: join(__dirname, '..', '..')
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
    },
    mail: {
        transporter: {
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "anhnhatdev2504@gmail.com", // generated ethereal user
                pass: "aooetapcleuuisun" // generated ethereal password
            }
        },
        options: {
            from: 'Vietpro vietpro@gmailcom'
        }
    }

}
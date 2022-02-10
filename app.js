const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const {body} = require("express-validator");


const app = express();
const PORT = config.get('port');
app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/link', require('./routes/link.routes'));

async function start() {
    try {

        console.log("connecting to db");
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("connection without any errors");
        app.listen(5000, () => {
            console.log("App has been started on port:", PORT);
        })

    } catch (e) {
        console.error(e);

    }

}

start();
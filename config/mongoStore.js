const MongoStore = require('connect-mongo');

const secret = process.env.SECRET || 'thisissecretname';

const store = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    crypto: {
        secret

    },
    touchAfter: 24 * 60 * 60
});


const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        // secure: true,
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

module.exports = { store, sessionConfig }
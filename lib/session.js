import session from "express-session";
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

const sessionMiddleware = session({
    secret: serverRuntimeConfig.secretKey,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: false,
        secure: true
    }
})

export default sessionMiddleware;
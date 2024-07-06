import passport from "passport";
import { Strategy as SteamStrategy } from "passport-steam";
import jwt from "jsonwebtoken";
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();


passport.use(new SteamStrategy({
    returnURL: `http://${serverRuntimeConfig.domain}:${serverRuntimeConfig.port}/api/auth/steam/return`,
    realm: `http://${serverRuntimeConfig.domain}:${serverRuntimeConfig.port}/`,
    apiKey: serverRuntimeConfig.steamApiKey
}, (identifier, profile, done) => {
    process.nextTick(() => {
        const steamid = identifier.split('/').pop();

        const accessToken = jwt.sign(steamid, serverRuntimeConfig.secretKey);

        return done(null, {token: accessToken });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

export default passport;
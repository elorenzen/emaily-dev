const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport       = require('passport');
const keys           = require('../config/keys');


passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        //Route user will be sent to after authorization
        callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
        console.log(`
            accessToken: ${accessToken}
            refreshToken: ${refreshToken}
            profile: ${JSON.stringify(profile)}
            done: ${done}
        `);
    })
);
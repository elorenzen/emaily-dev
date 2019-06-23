const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport       = require('passport');
const express        = require('express');
const keys           = require('./config/keys');

const app            = express();

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

app.get(
    '/auth/google', 
    passport.authenticate('google', {
        // Defines what info to request from Google
        scope: ['profile', 'email']
    })
)

app.get('/auth/google/callback', passport.authenticate('google'));


// If in development mode, set PORT to 5000.
// Otherwise, set PORT to one assigned by Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is started...');
    console.log(`Listening on port ${PORT}`);
});
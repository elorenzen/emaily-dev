const   GoogleStrategy = require('passport-google-oauth20').Strategy,
        passport       = require('passport'),
        mongoose       = require('mongoose'),
        keys           = require('../config/keys');

// Require User model from /models/User.js
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        //Route user will be sent to after authorization
        callbackURL: 'http://localhost:5000/auth/google/callback'
    }, 
    async (accessToken, refreshToken, profile, done) => {
        // Finds first occurrence of googleId matching Google Profile ID in DB collections
        User.findOne({ googleId: profile.id }).then((existingUser) => {
            if (existingUser) {
                // User exists already
                // Tell passport to finish authentication where null = no error
                done(null, existingUser);
            } else {
                // Sets value of googleId in User model to Google Profile ID and saves to DB
                new User({ googleId: profile.id }).save()
                    .then(newUser => done(null, newUser))
            }
        })
        .catch((err) => {
            console.log(err);
        })
    })
);